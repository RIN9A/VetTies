"use client"
import { useEffect, useState } from 'react'
import { getVets } from '../../../../utils/getData';
import Link from 'next/link';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import SortIcon from '../../../../components/icons/SortIcon';

export default function StaffPage() {
    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVet, setSelectedVet] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });


    const handleDelete = (vet) => {
        setSelectedVet(vet);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectedVet) {
            try {
                // await deleteVet(selectedVet.id);
                setVets(vets.filter((v) => v.id !== selectedVet.id));
            } catch (error) {
                console.error("Ошибка удаления:", error);
            } finally {
                setShowDeleteModal(false);
                setSelectedVet(null);
            }
        }
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedVets = [...vets].sort((a, b) => {
        const fullNameA = `${a.user.lastName} ${a.user.firstName}`.toLowerCase();
        const fullNameB = `${b.user.lastName} ${b.user.firstName}`.toLowerCase();

        if (sortConfig.key === 'name') {
            if (fullNameA < fullNameB) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (fullNameA > fullNameB) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });


    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getVets();
                console.log(data);
                setVets(data)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        getData();

    }, [])
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p className="text-red-500">Ошибка: {error}</p>;

    return (

        <>
            <div className="flex justify-end mb-4">

                <Link
                    // onClick={handleAddClick}
                    className="bg-mainBlue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                    href={"/dashboard/admin/staff/register"}
                >
                    + Добавить пользователя
                </Link>
            </div>

            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <button
                                    onClick={() => requestSort('name')}
                                    className="flex items-center justify-center gap-1 w-full uppercase text-center"
                                >
                                    ФИО
                                    <SortIcon
                                        direction={sortConfig.key === 'name' ? sortConfig.direction : null}
                                    />
                                </button>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Почта
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Номер телефона
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Специализация
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedVets.length > 0 ? (
                            sortedVets.map((vet) => (
                                <tr key={vet.id} className="odd:bg-white  even:bg-gray-50  border-b  border-gray-200 cursor-pointer text-center">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        <Link href={`/dashboard/admin/staff/${vet.id}`} className='underline hover:no-underline'>
                                            {vet.id.split('-')[0]}
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        {vet.user.lastName + " " + vet.user.firstName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {vet.user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {vet.user.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        {vet.specialization}
                                    </td>
                                    <td className="px-2 py-1">
                                        <div className='flex justify-center gap-2 '>
                                            <button className='cursor-pointer rounded-full p-2 hover:bg-gray-100' onClick={() => handleDelete()}>
                                                
                                                <EditIcon />
                                                
                                            </button>

                                            <button className='cursor-pointer rounded-full p-2 hover:bg-gray-100' onClick={() => handleDelete(vet)}>
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))) :
                            (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">Нет данных</td>
                                </tr>

                            )}
                    </tbody>
                </table>

                {/* Модальное окно подтверждения удаления */}
                {showDeleteModal && (
                    <div className="fixed  inset-0 bg-zinc-500/40 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            {/* <p className="text-lg">Вы уверены, что хотите удалить {selectedVet?.user.fi}?</p> */}
                            <div className='flex justify-center w-full items-center p-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 56 56">
                                    <path fill="#FF4848" d="M38.558 51.666H16.78c-.115-.026-.231-.071-.35-.082-6.84-.665-12.313-6.56-12.365-13.437-.053-6.735-.02-13.47-.008-20.208.004-1.363.246-2.692.676-3.984 1.911-5.734 7.116-9.52 13.16-9.538 6.518-.02 13.037-.008 19.559 0 .444 0 .892.03 1.333.07 5.618.508 10.438 4.51 11.957 9.961.247.881.37 1.8.55 2.7v21.78c-.027.115-.072.23-.083.35-.552 5.656-4.756 10.55-10.267 11.928-.784.198-1.59.31-2.385.46ZM16.139 20.459v.59c0 5.551-.004 11.102.008 16.654 0 .455.037.926.145 1.37.534 2.17 2.341 3.502 4.753 3.506 4.413.007 8.825.003 13.238-.004.415 0 .836-.023 1.236-.108 2.214-.47 3.681-2.304 3.685-4.607.007-5.615.003-11.226.003-16.841v-.564l.385-.075c.713-.123 1.25-.5 1.609-1.12.892-1.542-.194-3.416-2.012-3.442a270.147 270.147 0 0 0-5.764 0c-.322.004-.448-.07-.497-.414-.146-1.03-.993-1.852-2.038-1.87a166.847 166.847 0 0 0-6.41-.004c-.975.014-1.837.728-2.005 1.676-.097.556-.321.623-.807.616a210.237 210.237 0 0 0-5.536-.004c-1.199.015-2.128.859-2.281 2.005a2.304 2.304 0 0 0 1.62 2.49c.198.067.41.093.668.146Z" />
                                    <path fill="#FF4848" d="M27.694 29.863c.765-.773 1.49-1.505 2.218-2.233.31-.313.675-.485 1.123-.392.904.195 1.221 1.247.568 1.95-.609.652-1.25 1.268-1.886 1.896-.13.13-.287.231-.462.366.787.784 1.512 1.49 2.213 2.22.195.203.37.464.445.729.138.489-.101.97-.527 1.22-.459.27-.974.221-1.396-.186-.653-.627-1.288-1.28-1.93-1.919-.116-.116-.24-.228-.4-.38l-1.8 1.81c-.152.153-.298.31-.458.456-.545.5-1.221.507-1.688.026-.444-.463-.43-1.15.06-1.654.62-.642 1.258-1.266 1.893-1.893.12-.12.272-.205.448-.336-.833-.825-1.594-1.557-2.334-2.319-.675-.698-.418-1.736.478-1.974.463-.127.844.044 1.169.366.63.63 1.262 1.261 1.893 1.889.104.115.216.216.373.358Z" />
                                </svg>

                            </div>
                            <p className="text-lg text-gray-700">Вы уверены, что хотите удалить пользователя?</p>

                            <div className="flex justify-between mt-4">
                                <button
                                    className="border px-14 py-3 rounded-full mr-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Отмена
                                </button>
                                <button
                                    className="bg-red-500 text-white px-14 py-3 rounded-full cursor-pointer hover:bg-red-700"
                                    onClick={confirmDelete}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}
