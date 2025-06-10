"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { getMedications } from '../../../../utils/getData';
import { updateMedication } from '../../../../utils/putData';
import { deleteMedication } from '../../../../utils/deleteData';

import Link from 'next/link';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import SortIcon from '../../../../components/icons/SortIcon';

const medicationDto = (data) => ({
  name: data.name,
  typeId: data.typeId,
  typeName: data.typeName,
  quantity: data.quantity,
  expiryDate: data.expiryDate,
  minThreshold: data.minThreshold,
});

export default function InventoryPage() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);
  const [editingQuantityId, setEditingQuantityId] = useState(null);
  const [tempQuantity, setTempQuantity] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const data = await getMedications();
        setMedications(data);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        setError('Не удалось загрузить список медикаментов');
      } finally {
        setLoading(false);
      }
    };
    fetchMedications();
  }, []);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  const sortedMedications = useMemo(() => {
    let sortableItems = [...medications];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [medications, sortConfig]);




  const handleQuantityClick = (med) => {
    setEditingQuantityId(med.medicationId);
    setTempQuantity(med.quantity);
  };

  const handleQuantityChange = (e) => {
    setTempQuantity(parseInt(e.target.value) || 0);
  };

  const handleQuantitySave = async (medicationId) => {
    const medUpd = medications.find(med => med.medicationId === medicationId);
    if (!medUpd) return;

    const upMed = {
      ...medUpd,
      quantity: tempQuantity,
    }
    try {
      const updatedMed = await updateMedication(medicationId, upMed);
      setMedications(prev =>
        prev.map(m => m.medicationId === medicationId ? updatedMed : m)
      );
    } catch (error) {
      console.error("Ошибка обновления количества:", error);
      setError("Не удалось обновить количество");
    } finally {
      setEditingQuantityId(null);
    }
  };

  const handleQuantityCancel = () => {
    setEditingQuantityId(null);
    setTempQuantity(0);
  };

  const handleDelete = (med) => {
    setSelectedMed(med);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedMed) {
      try {
        await deleteMedication(selectedMed.medicationId);
        setMedications(medications.filter((m) => m.medicationId !== selectedMed.medicationId));
      } catch (error) {
        console.error("Ошибка удаления:", error);
        setError("Не удалось удалить медикамент");
      } finally {
        setShowDeleteModal(false);
        setSelectedMed(null);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="text-red-500">Ошибка: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">

        <div className='flex justify-start gap-3 items-center'>
          <h1 className="text-3xl font-semibold text-mainBlue">Медикаменты</h1>
          <Link
            href="/dashboard/admin/inventory/equipment"
            className=" underline font-bold text-mainBlue/85 text-2xl hover:text-mainBlue hover:no-underline"
          >
            Журнал ТО
          </Link>
        </div>

        <Link
          href="/dashboard/admin/inventory/medications/new"
          className="bg-mainBlue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          + Добавить медикамент
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
                  onClick={() => requestSort('typeName')}
                  className="flex items-center justify-center gap-1 w-full uppercase"
                >
                  Тип
                  <SortIcon
                    direction={sortConfig.key === 'typeName' ? sortConfig.direction : null}
                  />
                </button>
              </th>
              <th className="px-6 py-3">
                <button
                  onClick={() => requestSort('quantity')}
                  className="flex items-center justify-center gap-1 w-full uppercase"
                >
                  Количество
                  <SortIcon
                    direction={sortConfig.key === 'quantity' ? sortConfig.direction : null}
                  />
                </button>
              </th>
              <th className="px-6 py-3">
                <button
                  onClick={() => requestSort('expiryDate')}
                  className="flex items-center justify-center gap-1 w-full uppercase"
                >
                  Срок годности
                  <SortIcon
                    direction={sortConfig.key === 'expiryDate' ? sortConfig.direction : null}
                  />
                </button>
              </th>
              <th className="px-6 py-3">
                <button
                  onClick={() => requestSort('createdAt')}
                  className="flex items-center justify-center gap-1 w-full uppercase"
                >
                  Дата добавления
                  <SortIcon
                    direction={sortConfig.key === 'createdAt' ? sortConfig.direction : null}
                  />
                </button>
              </th>
              <th className="px-6 py-3">
                <button
                  onClick={() => requestSort('updatedAt')}
                  className="flex items-center justify-center gap-1 w-full uppercase"
                >
                  Дата изменения
                  <SortIcon
                    direction={sortConfig.key === 'updatedAt' ? sortConfig.direction : null}
                  />
                </button>
              </th>
              <th className="px-6 py-3">Минимальный запас</th>
              <th className="px-6 py-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {sortedMedications.map((med) => (
              <tr key={med.medicationId} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                <td className="px-6 py-4">{med.name}</td>
                <td className="px-6 py-4">{med.typeName || 'Не указан'}</td>
                <td className="px-6 py-4">
                  {editingQuantityId === med.medicationId ? (
                    <div className="flex flex-col items-center gap-1">
                      <input
                        type="number"
                        className="border border-gray-300 rounded-md p-1 w-20 text-center"
                        value={tempQuantity}
                        onChange={handleQuantityChange}
                        min="0"
                      />
                      <div className="flex gap-2 text-sm">
                        <button
                          className="text-green-600 hover:underline"
                          onClick={() => handleQuantitySave(med.medicationId)}
                        >
                          ✔ Сохранить
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={handleQuantityCancel}
                        >
                          ✖ Отмена
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span
                      className={`cursor-pointer ${med.quantity <= med.minThreshold ? 'text-red-500 font-bold' : ''}`}
                      onClick={() => handleQuantityClick(med)}
                    >
                      {med.quantity}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={new Date(med.expiryDate) < new Date() ? 'text-red-500 font-bold' : ''}>
                    {formatDate(med.expiryDate)}
                  </span>
                </td>

                <td className="px-6 py-4">{formatDate(med.createdAt)}</td>
                <td className="px-6 py-4">{formatDate(med.updatedAt)}</td>
                <td className="px-6 py-4">{med.minThreshold}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/dashboard/admin/inventory/medications/edit/${med.medicationId}`}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <EditIcon />
                    </Link>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() => handleDelete(med)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-zinc-500/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-lg text-gray-700">Вы уверены, что хотите удалить медикамент "{selectedMed?.name}"?</p>
            <div className="flex justify-between mt-4">
              <button
                className="border px-6 py-2 rounded-full hover:bg-gray-100"
                onClick={() => setShowDeleteModal(false)}
              >
                Отмена
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-700"
                onClick={confirmDelete}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}