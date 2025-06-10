"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { getPatientById } from "../../../../../utils/getData";
import PetProfile from "./_components/PetProfile";
import Link from "next/link";
import MedicalHistory from "./_components/MedicalHistory";


export default function PatientPage() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            const data = await getPatientById(id);
            if (data.error) {
                console.error("Error", data.error);
                return;
            }
            setPatient(data);
        };
        fetchData();
    }, [id]);

    if (!patient) return <p>Загрузка...</p>;
    return (
        <div className="grid grid-cols-3  gap-4 mx-auto  h-full">
            <div className="col-span-2  bg-white rounded-3xl flex flex-col   p-6">
                <div className="flex justify-between">
                    <h1 className="font-bold">Медицинские записи</h1>
                    <Link href={`/dashboard/admin/patients/${id}/new-record`} className="rounded-full bg-mainDarkGreen-600 text-white align-baseline  px-3 py-1 cursor-pointer hover:bg-mainBlue">
                        <span className="text-xl mr-2">+</span>
                        Добавить
                    </Link>
                </div>
                <div className="w-full h-full     flex flex-col ">
                <MedicalHistory petId={id} isAdmin={true} />
                </div>
            </div>
            <div className="w-full bg-white rounded-3xl">
                <PetProfile pet={patient} />
            </div>
        </div>
    )
}
