"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getMedicationById, getMedicationsTypes } from '../../../../../../../utils/getData';
import { updateMedication } from '../../../../../../../utils/putData';
import Link from 'next/link';


const toMedicationDto = (data) => ({
  name: data.name,
  typeId: data.typeId,
  typeName: data.typeName,
  quantity: data.quantity,
  expiryDate: data.expiryDate,
  minThreshold: data.minThreshold,
})

export default function EditMedicationPage() {
    const router = useRouter();
    const {id: medicationId} = useParams();
    
    const [formData, setFormData] = useState({
        name: '',
        typeId: '',
        typeName:'',
        quantity: 0,
        expiryDate: '',
        minThreshold: 5
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
        const [types, setTypes] = useState([]);
        const [selectedType, setSelectedType] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const fetchMedication = async () => {
            try {
                const data = await getMedicationById(medicationId);
                setFormData({
                    name: data.name,
                    typeId: data.typeId || '',
                    typeName: data.typeName,
                    quantity: data.quantity,
                    expiryDate: data.expiryDate.split('T')[0],
                    minThreshold: data.minThreshold
                });
                setSelectedType({typeId: data.typeId, typeName: data.typeName});
            } catch (err) {
                console.error('Ошибка загрузки медикамента:', err);
                setError('Не удалось загрузить данные медикамента');
            } finally {
                setInitialLoading(false);
            }
        };
        
        fetchMedication();
    }, [medicationId]);

       useEffect(() => {
          setLoading(true);
          getMedicationsTypes().then(setTypes)
          .finally(() => setLoading(false))
        }, [medicationId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' || name === 'minThreshold' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await updateMedication(medicationId, formData);
            router.back();
        } catch (err) {
            console.error('Ошибка обновления медикамента:', err);
            setError(err.message || 'Не удалось обновить медикамент');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <p className="p-4">Загрузка...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
      <div className='w-full h-full'>
          <div className='flex justify-start items-baseline'>
        <Link className='flex justify-center w-fit cursor-pointer rounded-full px-1.5 py-2  hover:bg-gray-100' href={"/dashboard/admin/inventory"}>
          <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24">
            <path stroke='#000' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M26.917 12H7.083M12 19l-7-7 7-7" />
          </svg>
        </Link>
        </div>
        <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-mainBlue">Редактировать медикамент</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Тип медикамента</label>
                <select
                      value={selectedType.typeId}
                      onChange={(e) => setSelectedType({typeId:e.target.key, typeName: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                      >
                        <option value={selectedType.typeName}>{selectedType.typeName}</option>
                        {types.map((item) => (
                          <option key={item.typeId} value={item.typeName}>
                            {item.typeName}
                          </option>
                        ))
                        }
                      </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Количество</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Срок годности</label>
                    
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="w-full p-2 border border-red-300 rounded-md"
                        required
                    />
                    {<p className="text-red-500">Дата меньше текущей</p>}

                </div>

                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Минимальный запас</label>
                    <input
                        type="number"
                        name="minThreshold"
                        value={formData.minThreshold}
                        onChange={handleChange}
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.push('/dashboard/admin/inventory')}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 bg-mainBlue text-white rounded-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Сохранение...' : 'Сохранить изменения'}
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}

            </form>
        </div>
        </div>
    );
}