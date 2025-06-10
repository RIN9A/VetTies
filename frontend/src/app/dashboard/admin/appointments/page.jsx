"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { getAppointments } from '../../../../utils/getData';
import Link from 'next/link';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import { updateAppointment } from '../../../../utils/putData';
import SortIcon from '../../../../components/icons/SortIcon';

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVet, setSelectedVet] = useState(null);
    const [editingStatusId, setEditingStatusId] = useState(null);
    const [tempStatus, setTempStatus] = useState("");
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

    const sortedAppointments = useMemo(() => {
        let sortableItems = [...appointments];
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

    }, [appointments, sortConfig]);

    const statusOptions = [
        { name: "ЗАПРОШЕНО" },
        { name: "ПОДТВЕРЖДЕНО" },
        { name: "ЗАВЕРШЕНО" },
        { name: "ОТМЕНЕНО" },
    ];

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointments();
                setAppointments(data);
            } catch (err) {
                console.error('Ошибка загрузки:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const handleStatusClick = (appointment) => {
        setEditingStatusId(appointment.id);
        setTempStatus(appointment.status);
    };

    const handleStatusChange = (e) => {
        setTempStatus(e.target.value);
    };

    const handleStatusSave = async (appointmentId) => {
        const appointmentToUpdate = appointments.find(app => app.id === appointmentId);
        if (!appointmentToUpdate) return;

        const updatedAppointment = {
            ...appointmentToUpdate,
            status: tempStatus,
        };

        try {
            await updateAppointment(updatedAppointment); // Вызов API
            setAppointments(prev =>
                prev.map(app => app.id === appointmentId ? updatedAppointment : app)
            );
        } catch (error) {
            console.error("Ошибка обновления статуса:", error);
        } finally {
            setEditingStatusId(null);
        }
    };
    const handleStatusCancel = () => {
        setEditingStatusId(null);
        setTempStatus('');
    };

    const handleDelete = (vet) => {
        setSelectedVet(vet);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectedVet) {
            try {
                // await deleteVet(selectedVet.id);
                setAppointments(appointments.filter((v) => v.id !== selectedVet.id));
            } catch (error) {
                console.error("Ошибка удаления:", error);
            } finally {
                setShowDeleteModal(false);
                setSelectedVet(null);
            }
        }
    };

    const getTimeStr = (dataTime) => {
        const [date, time] = dataTime.split("T");
        const formattedDate = date.split("-").reverse().join(".");
        const [hh, mm] = time.split(":");
        return `${formattedDate} ${hh}:${mm}`;
    };

    const eventStyleGetter = (status) => {
        let backgroundColor = "#ffffff";
        let color = "#000";
        let borderColor = "#000";

        switch (status) {
            case "ЗАПРОШЕНО":
                backgroundColor = "#BEE8FF";
                color = "#004E79";
                borderColor = "#004E79";
                break;
            case "ПОДТВЕРЖДЕНО":
                backgroundColor = "rgba(97.11, 217.81, 130.91, 0.40)";
                color = "#004D15";
                borderColor = "#004D15";
                break;
            case "ЗАВЕРШЕНО":
                backgroundColor = "#FFF2C7";
                color = "#CC5500";
                borderColor = "#CC5500";
                break;
            case "ОТМЕНЕНО":
                backgroundColor = "#FCB8B8";
                color = "#710700";
                borderColor = "#710700";
                break;
        }

        return {
            style: {
                backgroundColor,
                color,
                borderRadius: "9999px",
                padding: "3px 6px",
                border: `1px solid ${borderColor}`,
            },
        };
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p className="text-red-500">Ошибка: {error}</p>;

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Link
                    href="/dashboard/admin/appointments/new"
                    className="bg-mainBlue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                    + Добавить запись
                </Link>
            </div>

            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-gray-800 text-center">
                    <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">
                                <button
                                    onClick={() => requestSort('appointmentTime')}
                                    className="flex items-center justify-center gap-1 w-full uppercase"
                                >
                                    Дата и время
                                    <SortIcon
                                        direction={sortConfig.key === 'appointmentTime' ? sortConfig.direction : null}
                                    />
                                </button>


                            </th>
                            <th className="px-2 py-3">

                                Владелец

                            </th>
                            <th className="px-2 py-3">Кличка животного</th>
                            <th className="px-2 py-3">Вид животного</th>
                            <th className="px-4 py-3">Доктор</th>
                            <th className="px-4 py-3">Услуга</th>

                            <th className="px-4 py-3">
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
                            <th className="px-4 py-3">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAppointments.map((pet) => (
                            <tr key={pet.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                <td className="px-4 py-4 underline cursor-pointer">
                                    <Link href={`/dashboard/admin/patients/${pet.id}`}>
                                        {pet.id.split('-')[0]}
                                    </Link>
                                </td>
                                <td className="px-4 py-4">{getTimeStr(pet.appointmentTime)}</td>
                                <td className="px-2 py-4">
                                    
                                    {pet.petDto.owner.lastName} {pet.petDto.owner.firstName[0]}.
                                </td>
                                <td className="px-2 py-4">{pet.petDto.name}</td>
                                <td className="px-2 py-4">{pet.petDto.species}</td>
                                <td className="px-2 py-4 underline cursor-pointer">
                                     <Link href={`/dashboard/admin/staff/${pet.vetDto.id}`}>
                                    {pet.vetDto.user.lastName} {pet.vetDto.user.firstName[0]}.
                                    </Link>
                                </td>
                                <td className="px-4 py-4">{pet.vetDto.specialization + ": " + pet.name}</td>
                                <td className="px-4 py-4">
                                    {editingStatusId === pet.id ? (
                                        <div className="flex flex-col items-center gap-1">
                                            <select
                                                className="border border-gray-300 rounded-md p-1"
                                                value={tempStatus}
                                                onChange={handleStatusChange}
                                            >
                                                {statusOptions.map(status => (
                                                    <option key={status.name} value={status.name}>
                                                        {status.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="flex gap-2 text-sm">
                                                <button
                                                    className="text-green-600 hover:underline"
                                                    onClick={() => handleStatusSave(pet.id)}
                                                >
                                                    ✔ Сохранить
                                                </button>
                                                <button
                                                    className="text-red-600 hover:underline"
                                                    onClick={handleStatusCancel}
                                                >
                                                    ✖ Отмена
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <span
                                            style={eventStyleGetter(pet.status).style}
                                            className="cursor-pointer"
                                            onClick={() => handleStatusClick(pet)}
                                        >
                                            {pet.status}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="p-2 hover:bg-gray-100 rounded-full"
                                            onClick={() => handleStatusClick(pet)}
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            className="p-2 hover:bg-gray-100 rounded-full"
                                            onClick={() => handleDelete(pet)}
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
                        <p className="text-lg text-gray-700">Вы уверены, что хотите удалить пользователя?</p>
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
