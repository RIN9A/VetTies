"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getEquipment } from '../../../../../utils/getData';
import SortIcon from '../../../../../components/icons/SortIcon';
import EditIcon from '../../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../../components/icons/DeleteIcon';
import { useRouter } from 'next/navigation';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await getEquipment();
        console.log(response)
        setEquipment(response);
      } catch (error) {
        message.error('Ошибка при загрузке оборудования');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  return (
 <div className="w-full h-full mt-5">
        <div className="flex justify-between mb-4">

           <div className='flex justify-start items-baseline gap-3'>
        <Link className='flex justify-center w-fit cursor-pointer rounded-full px-1.5 py-2  hover:bg-gray-100' href={"/dashboard/admin/inventory"}>
          <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24">
            <path stroke='#000' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M26.917 12H7.083M12 19l-7-7 7-7" />
          </svg>
        </Link>
   
      <h1 className="text-3xl font-semibold  text-mainBlue">Медицинское оборудование</h1>
            </div>

        <Link href="equipment/new"
          className="bg-mainBlue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Добавить оборудование

        </Link>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-gray-800 text-center">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">
                <button
                  onClick={() => requestSort('name')}
                  className="flex items-center justify-center gap-1 w-full uppercase"
                >
                  Название
                  <SortIcon
                    direction={sortConfig.key === 'name' ? sortConfig.direction : null}
                  />
                </button>
              </th>

              <th className="px-6 py-3">
                <button
                  onClick={() => requestSort('model')}
                  className="flex items-center justify-center gap-1 w-full uppercase"
                >
                  Модель
                  <SortIcon
                    direction={sortConfig.key === 'model' ? sortConfig.direction : null}
                  />
                </button>
              </th>
              <th className="px-6 py-3">
                Серийный номер
              </th>
              <th className="px-6 py-3">
                <button
                  onClick={() => requestSort('status')}
                  className="flex items-center justify-center gap-1 w-full uppercase"
                >
                  Статус
                  <SortIcon
                    direction={sortConfig.key === 'status' ? sortConfig.direction : null}
                  />
                </button>
              </th>
              <th className="px-6 py-3">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {
              equipment.map((eq) => (
                <tr key={eq.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4">{eq.name}</td>
                  <td className="px-6 py-4">{eq.model}</td>
                  <td className="px-6 py-4">{eq.serialNumber}</td>
                  <td className="px-6 py-4">{eq.status}</td>
                   <td className="px-6 py-4">
                                <div className="flex justify-center items-center gap-2">
                                    <Link
                                        href={`/dashboard/admin/inventory/equipment/${eq.id}/edit`}
                                        className="p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <EditIcon />
                                    </Link>
                                    <Link
                href={`/dashboard/admin/inventory/equipment/${eq.id}/maintenance`}
                className="underline"
            >
                ТО
            </Link>
                                </div>
                            </td>
                </tr>



              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

