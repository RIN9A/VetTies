"use client"

import { useState, useEffect } from 'react';
import { getVets } from "../../../../../utils/getData";
import { postOptimize } from "../../../../../utils/postData";


export default function ScheduleOptimizer() {
  const [vets, setVets] = useState([]);
  const [selectedVets, setSelectedVets] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    getVets()

      .then(setVets);
  }, []);

  const handleOptimize = () => {
    postOptimize({
      vetIds: selectedVets,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      preventOverwork: true
    }).then(setResult);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Оптимизация расписания</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">Дата начала:</label>
          <input
            type="date"
            className="p-2 border rounded w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Дата окончания:</label>
          <input
            type="date"
            className="p-2 border rounded w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Выберите врачей:</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {vets.map(vet => (
            <label key={vet.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedVets.includes(vet.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedVets([...selectedVets, vet.id]);
                  } else {
                    setSelectedVets(selectedVets.filter(id => id !== vet.id));
                  }
                }}
              />
              {vet.user.lastName + vet.user.firstName.slice(0,1) + "."}
            </label>
          ))}
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleOptimize}
      >
        Оптимизировать расписание
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Результаты оптимизации</h2>
          <p>Назначено приемов: {result.assignedSlots.length}</p>
          <p>Средняя загрузка на врача: {result.avgAppointmentsPerVet}</p>
        </div>
      )}
    </div>
  );
}