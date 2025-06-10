"use client";

import { useEffect, useState } from "react";
import { getUsersByRole, getVetsBySpec } from "../../../../../../utils/getData";
import { createMedicalRecord } from "../../../../../../utils/postData";
import { useParams } from "next/navigation";
import { specializations } from "../../../staff/_components/data";
import MarkdownListEditor from "../_components/MarkdownListEditor";

// Заглушка, можешь заменить на fetch из API или импорт из файла

// DTO адаптер для запроса
const toMedicalRecordDto = (data) => ({
  petId: data.petId,
  vetId: data.vetId,
  diagnosis: data.diagnosis,
  treatmentPlan: data.treatmentPlan,
  labResults: data.labResults,
});

export default function CreateMedicalRecord() {
  const { id: petId } = useParams(); // ID питомца из URL

  const [selectedSpec, setSelectedSpec] = useState("");
  const [vets, setVets] = useState([]);
  const [selectedVetId, setSelectedVetId] = useState("");

  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [labResults, setLabResults] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingVets, setLoadingVets] = useState(false);

  // Загружаем врачей по выбранной специализации
  useEffect(() => {
    if (!selectedSpec) return;

    setLoadingVets(true);
    getVetsBySpec(selectedSpec)
      .then(setVets)
      .finally(() => setLoadingVets(false));
  }, [selectedSpec]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const dto = toMedicalRecordDto({
      petId,
      vetId: selectedVetId,
      diagnosis,
      treatmentPlan,
      labResults,
    });

    try {
      const res = await createMedicalRecord(dto);
      setMessage("Медицинская запись успешно добавлена ✅");
      console.log(res);
      setDiagnosis(res.diagnosis);
      setTreatmentPlan(res.treatmentPlan);
      setLabResults(res.labResults);
      setSelectedVetId(res.vetId);
      setSelectedSpec(selectedSpec);

    } catch (e) {
      console.log(e);
      setError(e?.response?.data?.message || "Ошибка при добавлении записи");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Добавить медицинскую запись</h2>

      <div>
        <label className="block font-medium mb-1">Специализация</label>
        <select
          value={selectedSpec}
          onChange={(e) => setSelectedSpec(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">-- Выберите специализацию --</option>
          {specializations.map((spec, index) => (
            <option key={index} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {selectedSpec && (
        <div>
          <label className="block font-medium mb-1">Врач</label>
          {loadingVets ? (
            <div className="animate-pulse h-10 bg-gray-200 rounded w-full" />
          ) : (
            <select
              value={selectedVetId}
              onChange={(e) => setSelectedVetId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Выберите врача --</option>
              {vets.map((vet) => (
                <option key={vet.id} value={vet.id}>
                  {vet.user?.lastName} {vet.user?.firstName}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      <div>
        <label className="block font-medium mb-1">Диагноз</label>
        <input
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Например: гастрит"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <MarkdownListEditor
        label="План лечения"
        value={treatmentPlan}
        onChange={setTreatmentPlan}
        mode="list"
      />

      <MarkdownListEditor
        label="Результаты анализов"
        value={labResults}
        onChange={setLabResults}
        mode="markdown"
      />

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={!selectedVetId || !diagnosis || !treatmentPlan}
      >
        Добавить запись
      </button>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}
