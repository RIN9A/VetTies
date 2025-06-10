"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';

import dayjs from "dayjs";
import { specializations } from "../../staff/_components/data";
import {  getFreeSlots, getPetsByOwner, getUsersByRole, getVetsBySpec } from "../../../../../utils/getData";
import { createAppointment} from "../../../../../utils/postData";

const toAppointmentDto = (data) => ({
  name: data.name,
  vetDto: { id: data.vetId },
  petDto: { id: data.petId },
  appointmentTime: data.time,
  status: "Запрошено" ,
});

export default function CreateAppointment() {
  const [vets, setVets] = useState([]);
  const [clients, setClients] = useState([]);
  const [pets, setPets] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const router = useRouter();

  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedVetId, setSelectedVetId] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedPetId, setSelectedPetId] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentName, setAppointmentName] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState({
    specs: false,
    vets: false,
    times: false,
    clients: true,
    pets: false,
  });

  useEffect(() => {
    const fetchClients = async () => {
      getUsersByRole("client")
      .then(setClients)
      .finally(() => setLoading((p) => ({ ...p, clients: false })))
    };
    // fetchSpecializations();
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedSpecialization) {
      setLoading((p) => ({ ...p, vets: true }));
      getVetsBySpec(selectedSpecialization)
      .then(setVets)
      .finally(() => setLoading((p) => ({ ...p, vets: false })));
    }
  }, [selectedSpecialization]);

  useEffect(() => {
    if (selectedVetId) {
      setLoading((p) => ({ ...p, times: true }));
      getFreeSlots(selectedVetId)
        .then(setAvailableTimes)
        .finally(() => setLoading((p) => ({ ...p, times: false })));
    }
  }, [selectedVetId]);

  useEffect(() => {
    if (selectedClientId) {
      setLoading((p) => ({ ...p, pets: true }));
      getPetsByOwner(selectedClientId)
        .then(setPets)
        .finally(() => setLoading((p) => ({ ...p, pets: false })));
    }
  }, [selectedClientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')


    const body = toAppointmentDto({
      name: appointmentName,
      vetId: selectedVetId,
      petId: selectedPetId,
      time: selectedTime,
    });

    try{
    const res = await createAppointment(body);
    setMessage('Запись успешно создана')

    } catch (e){
      setError(e.response?.data?.message || 'Ошибка создания записи')

    }


  };

  const skeleton = (
    <div className="animate-pulse bg-gray-200 h-10 rounded w-full mb-3" />
  );

  return (
    <>             
     <button onClick={() => router.back()} className="mb-1 cursor-pointer rounded-full px-1.5 py-2  hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24">
                    <path stroke='#000' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M26.917 12H7.083M12 19l-7-7 7-7" />
                </svg>
            </button>
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Запись на приём</h2>

      <input
        type="text"
        placeholder="Название записи"
        className="w-full px-4 py-2 border rounded"
        value={appointmentName}
        onChange={(e) => setAppointmentName(e.target.value)}
        required
      />

      <div>
        <label className="block font-medium mb-1">Специализация</label>
        {loading.specs ? (
          skeleton
        ) : (
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Выберите --</option>
            {specializations.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedSpecialization && (
        <div>
          <label className="block font-medium mb-1">Врач</label>
          {loading.vets ? (
            skeleton
          ) : (
            <select
              value={selectedVetId}
              onChange={(e) => setSelectedVetId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Выберите --</option>
              {vets.map((vet) => (
                <option key={vet.id} value={vet.id}>
                  {vet.user.lastName} {vet.user.firstName}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {selectedVetId && (
        <div>
          <label className="block font-medium mb-1">Свободное время</label>
          {loading.times ? (
            skeleton
          ) : (
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Выберите --</option>
              {availableTimes.map((time, i) => (
                <option key={i} value={time}>
                  {dayjs(time).format("DD.MM.YYYY HH:mm")}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      <div>
        <label className="block font-medium mb-1">Клиент</label>
        {loading.clients ? (
          skeleton
        ) : (
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Выберите --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.lastName} {client.firstName}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedClientId && (
        <div>
          <label className="block font-medium mb-1">Питомец</label>
          {loading.pets ? (
            skeleton
          ) : (
            <select
              value={selectedPetId}
              onChange={(e) => setSelectedPetId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Выберите --</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} ({pet.species})
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        
        disabled={
          !appointmentName ||
          !selectedVetId ||
          !selectedTime ||
          !selectedPetId
        }
      >
        Создать запись
      </button>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
    </>

  );
}
