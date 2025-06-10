'use client'
import { slotRatings } from './data/mockData'

function interpretRating(rating) {
  if (rating >= 0.7) return '🟢 Отличный слот'
  if (rating >= 0.4) return '🟡 Приемлемо'
  return '🔴 Низкое качество'
}

export default function SlotRatingsTable() {
  return (
    <div className="p-6 rounded ">
      <h2 className="text-xl font-semibold mb-4">Оценка пригодности слотов</h2>
                  <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-gray-800 border rounded-md">
                    <thead className=" uppercase bg-gray-50 border rounded-md">
          <tr className='border rounded-md'>
            <th className=" px-4 py-2">Врач</th>
            <th className=" px-4 py-2">Загруженность (%)</th>
            <th className=" px-4 py-2">Время (часы)</th>
            <th className=" px-4 py-2">Интервал до слота (мин)</th>
            <th className=" px-4 py-2">Рейтинг пригодности</th>
            <th className=" px-4 py-2">Интерпретация</th>
          </tr>
        </thead>
        <tbody>
          {slotRatings.map((slot) => (
            <tr key={slot.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200 text-center">
              <td className="border px-4 py-2">{slot.vet}</td>
              <td className="border px-4 py-2">{slot.load}</td>
              <td className="border px-4 py-2">{slot.time}</td>
              <td className="border px-4 py-2">{slot.gap}</td>
              <td className="border px-4 py-2 font-bold">{slot.rating.toFixed(2)}</td>
              <td className="border px-4 py-2">{interpretRating(slot.rating)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
