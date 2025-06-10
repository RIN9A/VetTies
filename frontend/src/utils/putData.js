import { getSession } from "next-auth/react";
import { getServerAuthSession } from "./auth";


const BASE_URL = "http://localhost:8080";

// Универсальный запрос с авторизацией
async function fetchWithAuth(path, options = {}) {
    const session = await getSession();
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.accessToken || ""}`,
        ...options.headers,
    };

    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            ...options,
            headers,
            method: "PUT",
        });

        if (!response.ok) {
            throw new Error(`Error fetching ${path}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Request failed: ${path}`, error);
        return { error: "Ошибка подключения к базе данных!" };
    }
}


export const updateAppointment = (appointment) => fetchWithAuth(`/appointments/${appointment.id}`, { body: JSON.stringify(appointment), });
export const updateMedication = (id, medication) => fetchWithAuth(`/medications/${id}`, { body: JSON.stringify(medication), });
export const updateEquipment = (id, data) => fetchWithAuth(`/api/equipment/${id}`, {body: JSON.stringify(data), }); 
export const updateWorkingHours = (data) => fetchWithAuth(`/vets/working-hours`, {body: JSON.stringify(data), });
export const updateVet = (id, data) => fetchWithAuth(`/vets/${id}`, {body: JSON.stringify(data), });
export const updateUser = (id, data) => fetchWithAuth(`/users/${id}`, {body: JSON.stringify(data), });