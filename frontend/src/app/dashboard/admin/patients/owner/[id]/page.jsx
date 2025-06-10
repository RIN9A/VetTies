"use client"
import React, { useState, useEffect } from 'react'
import ProfileIcon from '../../../../_components/icons/ProfileIcon'
import Link from 'next/link'
import { getAppointmentsByClient, getUserById, getPetsByOwner } from '../../../../../../utils/getData';
import { useParams, useRouter } from 'next/navigation';
import { updateUser } from '../../../../../../utils/putData';

const statusOptions = [
    { name: "Запрошено" },
    { name: "Подтверждено" },
    { name: "Завершено" },
    { name: "Отменено" },
];

export default function OwnerPage() {

    const { id: ownerId } = useParams()
    const [profile, setProfile] = useState("");
    const [pets, setPets] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [newPetMode, setNewPetMode] = useState(false);
        const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    const [petForm, setPetForm] = useState({
        name: '',
        species: '',
        breed: '',
        dateOfBirth: '',
        gender: '',
        weight: ''
    });

    useEffect(() => {

        getUserById(ownerId).then((data) => {
            setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone || ''
                });
            setProfile(data);
        });
        getPetsByOwner(ownerId).then(setPets);
        getAppointmentsByClient(ownerId).then(setAppointments);
        setLoading(false);

    }, [ownerId]);

    function getAge(dateOfBirth) {
        if (!dateOfBirth) return "";

        const birthDate = new Date(dateOfBirth);
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        const yearsStr = years > 0 ? `${years} ${pluralize(years, ['год', 'года', 'лет'])}` : "";
        const monthsStr = months > 0 ? `${months} ${pluralize(months, ['месяц', 'месяца', 'месяцев'])}` : "";

        return [yearsStr, monthsStr].filter(Boolean).join(" ");
    }

    function pluralize(n, forms) {
        const mod10 = n % 10;
        const mod100 = n % 100;

        if (mod10 === 1 && mod100 !== 11) return forms[0];
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
        return forms[2];
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    const eventStyleGetter = (event) => {
        let backgroundColor;
        let color;
        let borderColor

        switch (event) {
            case "ЗАПРОШЕНО":
                backgroundColor = "#BEE8FF";
                color = "#004E79";
                borderColor = "#004E79";
                break;
            case "ПОДТВЕРЖДЕНО":
                backgroundColor = "rgba(97.11, 217.81, 130.91, 0.40)";
                color = "#004D15"
                borderColor = "#004D15"
                break;

            case "ЗАВЕРШЕНО":
                backgroundColor = "#FFF2C7";
                color = "#CC5500"
                borderColor = "#CC5500"
                break;

            case "ОТМЕНЕНО":
                backgroundColor = "#FCB8B8";
                color = "#710700"
                borderColor = "#710700"
                break;

            default:
                backgroundColor = "#ffffff";
                color = "#0000"
                borderColor = "#0000"

        }
        return {
            style: {
                backgroundColor,
                color,
                borderRadius: "calc(infinity * 1px)",
                padding: "3px 6px",
                borderWidth: "1px",
                borderColor,

            },
        };
    };


        const handleChange = (e) => {
        if (!profile) return;
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

     const saveChanges = () => {
    
            updateUser(profile?.id, profile).then(() => setIsEditing(false));
        };
   

    const handlePetInputChange = (e) => {
        const { name, value } = e.target;
        setPetForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddPetClick = () => {
        setNewPetMode(!newPetMode);
    };

    const handleSavePetClick = async () => {
        try {
            const newPet = await createPet({
                ...petForm,
                ownerId: ownerId
            });
            setPets(prev => [...prev, newPet]);
            setPetForm({
                name: '',
                species: '',
                breed: '',
                dateOfBirth: '',
                gender: '',
                weight: ''
            });
            setNewPetMode(false);
        } catch (error) {
            console.error('Error creating pet:', error);
        }
    };

    const handleCancelPetClick = () => {
        setPetForm({
            name: '',
            species: '',
            breed: '',
            dateOfBirth: '',
            gender: '',
            weight: ''
        });
        setNewPetMode(false);
    };

    if (loading) return (
        <div className='inline-flex h-full w-full justify-center items-center'>
            <div
                className="h-12 w-12  animate-spin rounded-full border-4 border-solid border-[#240066] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
    )
    return (
        <div className='pb-6'>
            <button onClick={() => router.back()} className="mb-1 cursor-pointer rounded-full px-1.5 py-2  hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24">
                    <path stroke='#000' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M26.917 12H7.083M12 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="flex gap-6 items-start mx-auto h-screen">
                <div className="flex flex-col max-w-5xl min-w-3/5 ">
                    <div className="self-end bg-white rounded-3xl flex flex-col min-h-screen w-full p-6">
                        <div className=" mx-auto p-4 w-full flex gap-6  text-zinc-600">
                            <div className="flex  w-full pe-5">
                                <div className="text-center">
                                    <ProfileIcon />
                                    <p className="mt-2 text-zinc-600 text-sm uppercase">ID: {profile?.id?.slice(0, 10)}</p>
                                </div>
                                <div className="w-full">
                                    <div key={"lastName"} className="mb-3 w-full">
                                        <label className="block font-medium">{"Фамилия"}</label>
                                        <input
                                            className={`border ${isEditing ? "border-none ring ring-mainDarkGreen-600" : "border-zinc-500 "} rounded-full px-3 py-2 w-full`}
                                            type="text"
                                            name={profile.lastName}
                                            value={profile.lastName || ''}
                                            onChange={(e) => handleChange(e)}
                                            disabled={!isEditing}
                                               />
                                    </div>
                                    <div key={"firstName"} className="mb-3">
                                        <label className="block font-medium">{"Имя"}</label>
                                        <input
                                            className={`border ${isEditing ? "border-none ring ring-mainDarkGreen-600" : "border-zinc-500 "} rounded-full px-3 py-2 w-full`}
                                            type="text"
                                            name={profile.firstName}
                                            value={profile.firstName|| ''}
                                            onChange={(e) => handleChange(e)}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div key={"email"} className="mb-3">
                                        <label className="block font-medium">{"Электронная почта"}</label>
                                        <input
                                            className={`border ${isEditing ? "border-none ring ring-mainDarkGreen-600" : "border-zinc-500 "} rounded-full px-3 py-2 w-full`}
                                            type="text"
                                            name={profile.email}
                                            value={profile.email || ''}
                                            onChange={(e) => handleChange(e)}
                                            disabled={!isEditing}
                                        />
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
                        </div>
                        <h1 className='font-semibold text-center text-[#240066] text-2xl pb-2'>Записи на прием</h1>
                        <div className='relative w-full overflow-x-auto border rounded-lg'>
                            <table className="w-full text-sm rtl:text-right text-gray-800 text-center">
                                <thead className="text-xs text-[#240066] uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th scope="col" className="px-2 py-3">
                                            Дата и время
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Кличка животного
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Доктор
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Причина визита
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Статус
                                        </th>
                                    </tr>

                                </thead>
                                <tbody >
                                    {appointments.length > 0 ? (
                                        appointments.map((pet) => (
                                            <tr key={pet.id + "-appid"} className=" border-b  border-gray-200 text-center">
                                                <td className="px-2 py-4">
                                                    {
                                                        formatDate(pet.appointmentTime)
                                                    }
                                                </td>
                                                <td className="px-2 py-4  underline hover:no-underline cursor-pointer">
                                                    <Link href={`/dashboard/admin/patients/${pet.petDto.id}`}>
                                                        {pet.petDto.name}
                                                    </Link>
                                                </td>
                                                <td className=" py-4 underline hover:no-underline">
                                                     <Link href={`/dashboard/admin/staff/${pet.vetDto.id}`}>
                                                    {pet.vetDto.user.lastName + " " + pet.vetDto.user.firstName.slice(0, 1) + "."}
                                                    </Link>
                                                </td>
                                                <td className="px-2 py-4 ">
                                                    {/* {pet.procedures.join(", ")} */}
                                                    {pet.vetDto.specialization + ': ' + pet.name}
                                                </td>
                                                <td className="px-2 py-4">

                                                    <span
                                                        style={eventStyleGetter(pet.status).style}
                                                    >
                                                        {pet.status}
                                                    </span>

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
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white rounded-3xl  min-h-screen p-6">
                    {/* <PetProfile pet={patient} /> */}
                    <h1 className="font-bold text-center text-mainBlue">Медицинские карты питомцев</h1>
                    <div className='flex  justify-start items-start mt-5 gap-3'>
                        {pets.length > 0 ? (
                            pets.map((pet) => (
                                <Link key={pet.id} className='w-56 h-56 border rounded-2xl flex flex-col pt-5 p-4' href={`/dashboard/admin/patients/${pet.id}`}>
                                    <div className=' text-zinc-400 text-xs'>Дата регистрации: {new Date(pet.createdAt).toLocaleDateString("ru")}</div>
                                    <div className='mt-5 text-3xl'>{pet.name}
                                    </div>
                                    <div className="text-zinc-400 ">
                                        {`(${pet.species}, ${pet.breed})`}
                                    </div>
                                    <div className='text-sm mt-3 font-light'>
                                        Возраст: {getAge(pet.dateOfBirth)}
                                    </div>
                                </Link>
                            ))
                        ) :


                            <div>Питомцы не найдены</div>

                        }


                    </div>
                      
                                  {newPetMode ? (
                        <div className="mb-6 p-4 border rounded-lg bg-gray-50 mt-3">
                            <h2 className="text-lg font-semibold mb-3">Добавить нового питомца</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Кличка</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={petForm.name}
                                        onChange={handlePetInputChange}
                                        className="border rounded px-3 py-2 w-full bg-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Вид</label>
                                    <input
                                        type="text"
                                        name="species"
                                        value={petForm.species}
                                        onChange={handlePetInputChange}
                                        className="border rounded px-3 py-2 w-full bg-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Порода</label>
                                    <input
                                        type="text"
                                        name="breed"
                                        value={petForm.breed}
                                        onChange={handlePetInputChange}
                                        className="border rounded px-3 py-2 w-full bg-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Дата рождения</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={petForm.dateOfBirth}
                                        onChange={handlePetInputChange}
                                        className="border rounded px-3 py-2 w-full bg-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Пол</label>
                                    <select
                                        name="gender"
                                        value={petForm.gender}
                                        onChange={handlePetInputChange}
                                        className="border rounded px-3 py-2 w-full bg-white"
                                        required
                                    >
                                        <option value="">Выберите пол</option>
                                        <option value="M">Мужской</option>
                                        <option value="F">Женский</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Вес (кг)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={petForm.weight}
                                        onChange={handlePetInputChange}
                                        className="border rounded px-3 py-2 w-full bg-white"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-start gap-2 mt-4">
                                                               <button 
                                    onClick={handleCancelPetClick}
                                    className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-full"
                                >
                                    Отмена
                                </button>
                                <button 
                                    onClick={handleSavePetClick}
                                    className="bg-mainDarkGreen-600 text-white  px-4 py-2 rounded-full hover:bg-[#0c6e6e]"
                                >
                                    Сохранить
                                </button>

                            </div>
                        </div>
                    ):   <button key={"new-id-pet"} className={` w-56 h-56 border rounded-2xl flex flex-col justify-center p-4 mt-3 cursor-pointer ${newPetMode ? "bg-mainBlue/70":  "bg-mainBlue/75"}`} onClick={handleAddPetClick}>
                                    <div className='text-2xl text-white underline'>  {`+ Добавить нового питомца`}
                                    </div>
                                </button>}
                </div>

            </div>
        </div>)
}
