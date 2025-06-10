"use client";
import { useEffect, useState } from "react";
import { getMedicalRecordsByPetId, getPatientById } from "../../../../../../utils/getData";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import { deleteRecord } from "../../../../../../utils/deleteData";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake?.vfs;

export default function MedicalHistory({ petId, isAdmin = false }) {
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
    const [pet, setPet] = useState("");


  const router = useRouter();

  useEffect(() => {
    if (!petId) return;
    getMedicalRecordsByPetId(petId).then((data) => {
      if (!data.error) {
        setRecords(data);
        console.log(data);
        setFiltered(data); // начальное состояние
      }
    });
    getPatientById(petId).then(setPet);

  }, [petId]);

  // фильтрация по дате
  useEffect(() => {
    const from = dateFrom ? dayjs(dateFrom) : null;
    const to = dateTo ? dayjs(dateTo) : null;

    const filteredData = records.filter((rec) => {
      const createdAt = dayjs(rec.createdAt);
      if (from && createdAt.isBefore(from, "day")) return false;
      if (to && createdAt.isAfter(to, "day")) return false;
      return true;
    });

    setFiltered(filteredData);
  }, [dateFrom, dateTo, records]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (recordId) => {
    if (confirm("Вы уверены, что хотите удалить эту запись?")) {
      try {
        const response = await deleteRecord(recordId);
        
        if (response) {
          setRecords(records.filter(rec => rec.id !== recordId));
          setFiltered(filtered.filter(rec => rec.id !== recordId));
        } else {
          console.error("Ошибка при удалении записи");
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
  };


  // const downloadPDF = (record) => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(14);
  //   doc.text(`Медицинская запись от ${dayjs(record.createdAt).format("DD.MM.YYYY")}`, 10, 20);
  //   doc.setFontSize(11);
  //   doc.text(`Врач: ${record.vetId?.user?.lastName || "Неизвестно"} ${record.vetId?.user?.firstName || ""}`, 10, 30);
  //   doc.text(`Диагноз: ${record.diagnosis}`, 10, 40);
  //   doc.text("Схема лечения:", 10, 50);

  //   const treatment = record.treatmentPlan?.split("\n") || [];
  //   treatment.forEach((line, i) => {
  //     doc.text(`- ${line}`, 15, 60 + i * 8);
  //   });

  //   doc.text("Результаты анализов:", 10, 70 + treatment.length * 8);
  //   doc.text(record.labResults || "—", 15, 80 + treatment.length * 8);

  //   doc.save(`Медзапись_${record.id}.pdf`);
  // };
  const downloadPDF = (record) => {
    console.log(record);
    const docDefinition = {
      content: [
        { text: `Медицинская запись от ${dayjs(record.createdAt).format("DD.MM.YYYY")}`, style: 'header' },
        { text: `Врач: ${record.vetId?.user?.lastName || "Неизвестно"} ${record.vetId?.user?.firstName || ""}`, margin: [0, 10, 0, 0] },
        {text: `Клиент: ${pet.owner.lastName} ${pet.owner.firstName}`, margin: [0, 5, 0, 0] },
        {text: `Питомец: ${pet.name}`,margin: [0, 5, 0, 0] },
        {text: `Вид животного: ${pet.species}`,margin: [0, 5, 0, 0]},
        {text: `Порода: ${pet.breed}`,margin: [0, 5, 0, 0]},
        {text: `Веc: ${pet.weight}`, margin:[0, 5, 0, 0]},
        {text: `Пол: ${pet.gender}`, margin:[0, 5, 0, 0]},

        { text: `Диагноз: ${record.diagnosis}`, margin: [0, 10, 0, 0] },
        // { text: `Симпотмы: ${record.symptoms}`, margin: [0, 10, 0, 0] },
        { text: 'Схема лечения:', style: 'subheader' },
        ...(record.treatmentPlan?.split("\n") || []).map(line => ({ text: `• ${line}` })),
        { text: 'Результаты анализов:', style: 'subheader', margin: [0, 10, 0, 0] },
        { text: record.labResults || "—" },
        { text: "Назначенные препараты:", bold: true, margin: [0, 10, 0, 0] },
        ...(record.medications?.length > 0
          ? record.medications.map((med) => ({
            text: `- ${med.name} – ${med.dosage}`,
          }))
          : [{ text: "- Омепразол - 200 Мг" }]),

        { text: "Назначенные процедуры:", bold: true, margin: [0, 10, 0, 0] },
        ...(record.procedures?.length > 0
          ? record.procedures.map((proc) => ({ text: `- ${proc}` }))
          : [{ text: "Нет назначений" }]),
      ],
      styles: {
        header: { fontSize: 16, bold: true },
        subheader: { fontSize: 12, bold: true, margin: [0, 10, 0, 2] }
      },
      defaultStyle: {
        font: 'Roboto'
      }
    };

    pdfMake.createPdf(docDefinition).download(`Медзапись_${record.id}.pdf`);
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex flex-wrap gap-4 items-end mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">От</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">До</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          onClick={() => {
            setDateFrom("");
            setDateTo("");
          }}
          className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-2 rounded"
        >
          Сбросить
        </button>
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500">Нет записей за выбранный период</p>
      )}

      {filtered.map((rec) => (
        <div
          key={rec.id}
          className="border rounded-xl p-4 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => toggleExpand(rec.id)}
              className="text-left text-blue-700 font-semibold text-lg"
            >
              Запись от {dayjs(rec.createdAt).format("DD.MM.YYYY")}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => downloadPDF(rec)}
                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
              >
                Скачать PDF
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(rec.id)}
                  className="text-sm px-3 py-1 bg-yellow-100 hover:bg-yellow-200 rounded"
                >
                  🗑️ Удалить
                  </button>
              )}
            </div>
          </div>

          {expandedId === rec.id && (
            <div className="mt-4 space-y-3 text-gray-700 text-sm">
              <div>
                <strong>Врач:</strong>{" "}
                {rec.vetId?.user
                  ? `${rec.vetId.user.lastName} ${rec.vetId.user.firstName}`
                  : "Неизвестно"}
              </div>

              <div>
                <strong>Диагноз:</strong> {rec.diagnosis}
              </div>

              <div>
                <strong>Схема лечения:</strong>
                <ul className="list-disc list-inside mt-1">
                  {rec.treatmentPlan
                    ?.split("\n")
                    .filter((line) => line.trim())
                    .map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                </ul>
              </div>

              <div>
                <strong>Результаты анализов:</strong>
                <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                  {rec.labResults || "—"}
                </pre>
              </div>

              <div>
                <strong>Назначенные препараты:</strong>
                {rec.medications?.length ? (
                  <ul className="list-disc list-inside mt-1">
                    {rec.medications.map((med) => (
                      <li key={med.id}>
                        {med.name} – {med.dosage}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span> Нет назначений</span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
