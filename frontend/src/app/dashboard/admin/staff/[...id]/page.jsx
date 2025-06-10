"use client"
import {  useEffect, useState } from "react";
import { getAppointmentsByEmployee, getUserProfile, getWorkingHoursByVet } from "../../../../../utils/getData";
import ProfileIcon from "../../../_components/icons/ProfileIcon";
import BigCalendar from "../../calendar/_components/BigCalendar";
import { useParams } from "next/navigation";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import EditIcon from "../../../../../components/icons/EditIcon";
import { updateVet, updateWorkingHours } from "../../../../../utils/putData";
import DoctorTasksList from "../_components/DoctorTasksList";

const WorkDay = [
    { id: "MONDAY", name: "Понедельник" },
    { id: "TUESDAY", name: "Вторник" },
    { id: "WEDNESDAY", name: "Среда" },
    { id: "THURSDAY", name: "Четверг" },
    { id: "FRIDAY", name: "Пятница" },
    { id: "SATURDAY", name: "Суббота" },
    { id: "SUNDAY", name: "Воскресенье" },
];

const map = {
    'MONDAY': 1,
    'TUESDAY': 2,
    'WEDNESDAY': 3,
    'THURSDAY': 4,
    'FRIDAY': 5,
    'SATURDAY': 6,
    'SUNDAY': 7
};


export default function StaffPage() {
    const [profile, setProfile] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [workingHours, setWorkingHours] = useState([]);
     const [isEditingHours, setIsEditingHours] = useState(false);
    const [tempWorkingHours, setTempWorkingHours] = useState([]);
    const [selectedDays, setSelectedDays] = useState(new Set());


    const { id } = useParams();

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {

        const getData = async () => {
            const data = await getUserProfile(id);
            setProfile(data);
            console.log(data)
        }

        getData();

        getWorkingHoursByVet(id).then((data) =>
        {
           const sortedData = data.sort((a, b) => map[a.dayOfWeek] - map[b.dayOfWeek]);
            setWorkingHours(sortedData);
            setTempWorkingHours([...sortedData]);
            updateSelectedDays(sortedData);
        }   
        );

    }, [id]);

    useEffect(() => {
        const getApp = async () => {
            if (profile?.id) {
                const apps = await getAppointmentsByEmployee(profile.id);
                console.log(apps)
                setAppointments(apps);
            }
        };

        getApp();
    }, [profile]);


    const updateSelectedDays = (hours) => {
        const days = new Set(hours.map(wh => wh.dayOfWeek));
        setSelectedDays(days);
    };

    const handleTimeChange = (index, field, time) => {
        const updatedHours = [...tempWorkingHours];
        updatedHours[index][field] = time.format('HH:mm');
        setTempWorkingHours(updatedHours);
    };

    const handleDayChange = (index, day) => {
        if (selectedDays.has(day)) {
            alert('Этот день недели уже выбран!');
            return;
        }

        const updatedHours = [...tempWorkingHours];
        const prevDay = updatedHours[index].dayOfWeek;
        
        // Обновляем выбранные дни
        const newSelectedDays = new Set(selectedDays);
        newSelectedDays.delete(prevDay);
        newSelectedDays.add(day);
        setSelectedDays(newSelectedDays);
        
        updatedHours[index].dayOfWeek = day;
        setTempWorkingHours(updatedHours);
    };


    const saveWorkingHours = async () => {
        tempWorkingHours.map(wh => {
            updateWorkingHours(wh).then("all updated").catch(
                (e) =>{alert("Ошибка: " + e)})
        })
         const sortedData = [...tempWorkingHours].sort((a, b) => map[a.dayOfWeek] - map[b.dayOfWeek]);
            setWorkingHours(sortedData);
            setIsEditingHours(false);
    }

     const addNewWorkingDay = () => {
        const availableDays = WorkDay.filter(day => !selectedDays.has(day.id));
        if (availableDays.length === 0) {
            alert('Все дни недели уже добавлены!');
            return;
        }
        
        const newDay = {
            id: null,
            vetId: id,
            dayOfWeek: availableDays[0].id,
            startTime: '09:00',
            endTime: '18:00'
        };
        
        setTempWorkingHours([...tempWorkingHours, newDay]);
        setSelectedDays(new Set([...selectedDays, availableDays[0].id]));
    };

    const removeWorkingDay = (index) => {
        const dayToRemove = tempWorkingHours[index].dayOfWeek;
        const updatedHours = tempWorkingHours.filter((_, i) => i !== index);
        
        setTempWorkingHours(updatedHours);
        
        const newSelectedDays = new Set(selectedDays);
        newSelectedDays.delete(dayToRemove);
        setSelectedDays(newSelectedDays);
    };

    const handleChange = (e) => {
        if (!profile) return;
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const saveChanges = () => {

        updateVet(profile?.id, profile).then(() => setIsEditing(false));
    };

    if (!profile) return <p>Загрузка...</p>;


    return (
        <div className=" mx-auto p-4 w-full flex gap-6  text-zinc-600">
            <div className="min-w-2xl bg-white rounded-3xl  min-h-[700px] p-6">
                <div className="flex  w-full pe-5">
                    <div className="text-center">
                        <ProfileIcon />
                        <p className="mt-2 text-zinc-600 text-sm uppercase">ID: {profile.id.slice(0, 10)}</p>
                    </div>
                    <div className="w-full">

                        <div key={"lastName"} className="mb-3">
                            <label className="block font-medium">{"Фамилия"}</label>
                            <input
                                className={`border ${isEditing ? "border-none ring ring-mainDarkGreen-600" : "border-zinc-500 "} rounded-full px-3 py-2 w-full`}
                                type="text"
                                name={profile.user.lastName}
                                disabled={!isEditing}
                                value={profile.user.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div key={"firstName"} className="mb-3">
                            <label className="block font-medium">{"Имя"}</label>
                            <input
                                className={`border ${isEditing ? "border-none ring ring-mainDarkGreen-600" : "border-zinc-500 "}   rounded-full px-3 py-2 w-full`}
                                type="text"
                                name={profile.user.firstName}
                                disabled={!isEditing}
                                value={profile.user.firstName}
                                onChange={handleChange}
                            />
                        </div>

                        <div key={"email"} className="mb-3">
                            <label className="block font-medium">{"Электронная почта"}</label>
                            <input
                                className={`border ${isEditing ? "border-none ring ring-mainDarkGreen-600" : "border-zinc-500 "}   rounded-full px-3 py-2 w-full`}
                                type="text"
                                name={profile.user.email}
                                disabled={!isEditing}
                                value={profile.user.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div key={"phoneNumber"} className="mb-3">
                            <label className="block font-medium">{"Номер телефона"}</label>
                            <input
                                className={`border ${isEditing ? "border-none ring ring-mainDarkGreen-600" : "border-zinc-500 "}   rounded-full px-3 py-2 w-full`}
                                type="text"
                                name={profile.user.phoneNumber}
                                disabled={!isEditing}
                                value={profile.user.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>



                        <div >
                            <p className="font-semibold mt-4 text-zinc-600">Направление:</p>
                            <p > {profile.specialization}</p>
                        </div>

                        <div className="mt-4">
                            <button
                                className={`${isEditing ? 'bg-red-500 hover:bg-red-800' :
                                    "bg-mainBlue hover:bg-[#0b3d61]"} text-white px-4 py-2 rounded-full mr-2 cursor-pointer `}
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? 'Отменить' : 'Редактировать'}
                            </button>
                            {isEditing && (
                                <button
                                    className="bg-mainDarkGreen-600 text-white  px-4 py-2 rounded-full hover:bg-[#0c6e6e]"
                                    onClick={saveChanges}
                                >
                                    Сохранить
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="flex justify-between items-center gap-3 my-2">
                        <div>
                    <h3 className="text-lg font-bold ">График работы</h3>
                    </div>
                    <div>
                   <button
                        className="px-2 py-1 rounded-full font-semibold hover:bg-mainDarkGreen-600/50 transition border-2 border-mainDarkGreen-600 flex justify-between"
                        onClick={() => setIsEditingHours(!isEditingHours)}
                    >
                        <EditIcon />
                    </button>          
                </div>
                   </div>
                    <div className='relative w-full overflow-x-auto border rounded-lg'>
                        <table className="w-full text-sm rtl:text-right text-gray-800 text-center">
                            <thead className="text-xs text-[#240066] uppercase bg-gray-50 border-b">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        День недели
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Время
                                    </th>
                                     {isEditingHours && <th scope="col" className="px-4 py-3">Действия</th>}
                                </tr>
                            </thead>
                                <tbody>
                            {isEditingHours ? (
                                <>
                                    {tempWorkingHours.map((wh, index) => (
                                        <tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td className="px-6 py-4">
                                                <select
                                                    value={wh.dayOfWeek}
                                                    onChange={(e) => handleDayChange(index, e.target.value)}
                                                    className="border rounded p-1"
                                                >
                                                    {WorkDay.map(day => (
                                                        <option 
                                                            key={day.id} 
                                                            value={day.id}
                                                            disabled={selectedDays.has(day.id) && wh.dayOfWeek !== day.id}
                                                        >
                                                            {day.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 flex gap-2 justify-center">
                                                <TimePicker
                                                    format="HH:mm"
                                                    value={dayjs(wh.startTime, 'HH:mm')}
                                                    onChange={(time) => handleTimeChange(index, 'startTime', time)}
                                                    minuteStep={15}
                                                />
                                                <span>-</span>
                                                <TimePicker
                                                    format="HH:mm"
                                                    value={dayjs(wh.endTime, 'HH:mm')}
                                                    onChange={(time) => handleTimeChange(index, 'endTime', time)}
                                                    minuteStep={15}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button 
                                                    onClick={() => removeWorkingDay(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={isEditingHours ? 3 : 2} className="px-6 py-4">
                                            <button
                                                onClick={addNewWorkingDay}
                                                className="text-mainDarkGreen-600 hover:text-mainDarkGreen-800"
                                            >
                                                + Добавить день
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={isEditingHours ? 3 : 2} className="px-6 py-4">
                                            <button
                                                onClick={saveWorkingHours}
                                                className="bg-mainDarkGreen-600 text-white px-4 py-2 rounded mr-2"
                                            >
                                                Сохранить
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEditingHours(false);
                                                    setTempWorkingHours([...workingHours]);
                                                    updateSelectedDays(workingHours);
                                                }}
                                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                            >
                                                Отмена
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ) : (
                                workingHours.map((wh) => (
                                    <tr key={wh.dayOfWeek} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                        <td className="px-6 py-4">
                                            {WorkDay.find((item) => item.id === wh.dayOfWeek)?.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {wh.startTime.substring(0, 5)} - {wh.endTime.substring(0, 5)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>


                        </table>
                    </div>
                </div>



            </div>



            {appointments &&
                <div className="bg-white rounded-2xl w-full p-4 h-[90vh] overflow-hidden flex flex-col">
                    <BigCalendar viewProp="agenda" appointments={appointments} />
                       <div className="mt-4 max-h-3/4 overflow-y-auto">
                <DoctorTasksList  />
            </div>
                </div>
                
            }

        </div>)
}
