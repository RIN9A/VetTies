"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createMedication } from '../../../../../../utils/postData';
import Link from 'next/link';
import { getMedicationsTypes } from '../../../../../../utils/getData';


const toMedicationDto = (data) => ({
  name: data.name,
  typeId: data.typeId,
  typeName: data.typeName,
  quantity: data.quantity,
  expiryDate: data.expiryDate,
  minThreshold: data.minThreshold,
})


export default function NewMedicationPage() {

    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        typeId:'',
        quantity: 0,
        expiryDate: '',
        minThreshold: 5
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [message, setMessage] = useState('')
    


    useEffect(() => {
      setLoading(true);
      getMedicationsTypes().then(setTypes)
      .finally(() => setLoading(false))
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' || name === 'minThreshold' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!selectedType) {
          setError("Необходимо выбрать тип препарата");
          return;
        }
        setLoading(true);
        setError('');
        setMessage('');
        console.log(selectedType);
        const body = toMedicationDto({
          name: formData.name,
          typeId: selectedType,
          quantity: formData.quantity,
          expiryDate: formData.expiryDate,
          minThreshold:formData.minThreshold
        })
        try {
            await createMedication(body);
            setMessage('Медикамент успешно добавлен');
        } catch (err) {
            console.error('Ошибка создания медикамента:', err);
            setMessage('');
            setError(err.message || 'Не удалось создать медикамент');
        } finally {
            setLoading(false);
        }
        // if(!error)  router.push('/dashboard/admin/inventory');

    };

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

            <h1 className="text-2xl font-semibold mb-6 text-mainBlue">Добавить новый медикамент</h1>
            
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
                    {
                      types.length &&
                      <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                      >
                        <option value="">Выберите</option>
                        {types.map((item) => (
                          <option key={item.typeId} value={item.typeId}>
                            {item.typeName}
                          </option>
                        ))
                        }
                      </select>
                    }
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
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
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
                        {loading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {message && <p className="text-green-600 text-center">{message}</p>}
                </form>
        </div>
        </div>
    );
}