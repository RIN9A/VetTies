"use client";

import { useEffect, useState } from "react";
import { getDoctorTasks } from "../../../../../utils/getData";


const statusOptions = [
    {id: "56b8a580-18bd-4d61-b14f-207f9581332d", name: "pending", description: "Назначено" },
    {id: "91296b37-e14f-40a8-af48-08574c58627b", name: "in_progress", description: "Выполняется" },
    { id: "3c48b11f-bb28-4c7b-8781-1d9a3f8ce3e1",name: "completed", description: "Завершено" },
    { id: "a791c42a-7508-4614-9c2a-7c4bd2e77a9e" , name: "canceled", description: "Отменено" },
];

const eventStyleGetter = (status) => {
    let backgroundColor, color, borderColor;

    switch (status) {
        case "pending":
            backgroundColor = "#BEE8FF";
            color = "#004E79";
            borderColor = "#004E79";
            break;
        case "in_progress":
            backgroundColor = "rgba(97.11, 217.81, 130.91, 0.40)";
            color = "#004D15";
            borderColor = "#004D15";
            break;
        case "completed":
            backgroundColor = "#FFF2C7";
            color = "#CC5500";
            borderColor = "#CC5500";
            break;
        case "canceled":
            backgroundColor = "#FCB8B8";
            color = "#710700";
            borderColor = "#710700";
            break;
        default:
            backgroundColor = "#ffffff";
            color = "#000000";
            borderColor = "#cccccc";
    }

    return {
        style: {
            backgroundColor,
            color,
            borderRadius: "999px",
            padding: "3px 8px",
            border: `1px solid ${borderColor}`,
            cursor: "pointer",
        },
    };
};

export default function DoctorTasksList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingStatusId, setEditingStatusId] = useState(null);
    const [tempStatus, setTempStatus] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const data = await getDoctorTasks();
                setTasks(data);
                console.log(data)
            } catch (error) {
                console.error("Ошибка при получении задач:", error);
            } finally {
                setLoading(false);
            }
        };
    fetchTasks();
    }, []);


    const fetchTask = async () => {
        setLoading(true);
        try {
            const data = await getDoctorTasks();
            setTasks(data);
            console.log(data)
        } catch (error) {
            console.error("Ошибка при получении задач:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const handleStatusClick = (task) => {
        setEditingStatusId(task.id);
        setTempStatus(task.statusId);
    };

    const handleStatusChange = (e) => {
        setTempStatus(e.target.value);
    };

    const handleStatusSave = async (taskId) => {
        try {
            const selectedStatus = statusOptions.find(s => s.id === tempStatus);
            console.log(selectedStatus)
            const taskToUpdate = tasks.find(t => t.id === taskId);

            const statusDto = {
                taskStatusId: selectedStatus.id,
                statusName: selectedStatus.name,
                description: selectedStatus.description,
            };

            const data = await updateDoctorTaskStatus(taskId, statusDto);

            await fetchTask();
            console.log("updateeee")
            setTasks(prev =>
                prev.map(t =>
                    t.id === taskId
                        ? { ...t, status: selectedStatus.name, statusId: selectedStatus.id }
                        : t
                )
            );
        } catch (err) {
            console.error("Ошибка при обновлении статуса:", err);
        } finally {
            setEditingStatusId(null);
        }
    };

    const handleStatusCancel = () => {
        setEditingStatusId(null);
        setTempStatus("");
    };

    return (
        <div className="w-full p-4 bg-white rounded-xl shadow border">
            <h2 className="text-xl font-bold mb-4">Задачи</h2>
            {loading ? (
                <p>Загрузка задач...</p>
            ) : tasks.length === 0 ? (
                <p className="text-zinc-500">Нет задач</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.map(task => (
                        <li
                            key={task.id}
                            className="p-4 border border-zinc-200 rounded-lg flex justify-between items-center bg-zinc-50"
                        >
                            <div>
                                <p className="font-medium text-zinc-800">{task.procedureName}</p>
                                <p className="text-sm text-zinc-500">
                                    {new Date(task.performedAt).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                {editingStatusId === task.id ? (
                                    <div className="flex flex-col items-end gap-1">
                                        <select
                                            className="border border-gray-300 rounded-md p-1"
                                            value={tempStatus}
                                            onChange={handleStatusChange}
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status.id} value={status.id}>
                                                    {status.description}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="flex gap-2 text-sm">
                                            <button
                                                className="text-green-600 hover:underline"
                                                onClick={() => handleStatusSave(task.id)}
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
                                        onClick={() => handleStatusClick(task)}
                                        style={eventStyleGetter(task.statusName).style}
                                    >
                                        {statusOptions.find((i) => i.name === task.statusName)?.description}
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}