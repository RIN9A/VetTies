import { getSession } from "next-auth/react";
import { getServerAuthSession } from "./auth";

const session = await getSession();
const URL = "http://localhost:8080";

async function fetchPostWithAuth(path, options = {}) {
    const session = await getSession();
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.accessToken || ""}`,
        ...options.headers,
    }

    try {
        const response = await fetch(`${URL}${path}`, {
            ...options,
            headers,
            method: "POST",
        });

        if (!response.ok) {
            throw new Error(`Error fetching ${path}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Request failed: ${path}`, error);
        return { error: error.message };
    }
}

export const createMedication = (med) => fetchPostWithAuth(`/medications`, { body: JSON.stringify(med), })
export const createMaintenanceSchedule = (data) => fetchPostWithAuth(`/api/maintenance/schedule`, {body: JSON.stringify(data),})
export const postMaintenanceLog = (data) => fetchPostWithAuth(`/api/maintenance/log`, { body: JSON.stringify(data), })
export const postOptimize = (data) => fetchPostWithAuth(`/api/schedule/optimize`, { body: JSON.stringify(data), });
export const postGenerate = (start, end, duration) => fetchPostWithAuth(`/api/schedule/generate?start=${start}&end=${end}&durationMinutes=${duration}`)
export async function createUser(dataUser, isUser, isPet, isVet) {

    let url = 'http://localhost:8080/auth/signup';
    if (isPet) {
        url = 'http://localhost:8080/pets';
    }
    if (isVet) {
        url = "http://localhost:8080/vets"
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.accessToken}`

            },
            body: JSON.stringify(dataUser),
        });

        if (!response.ok) {
            return new Error("Invalid credentials");
        }


        const data = await response.json();
        console.log(data)
        if (data.error) {
            return { error: data.message };
        }
        // const userID = data.id;
        return data;
    } catch (error) {
        console.log(error?.message, "No connection to Backend");
        return error;

    }
}



export async function createAppointment(appointment) {
    try {
        const res = await fetch(`${URL}/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.accessToken}`,
            },
            body: JSON.stringify(appointment),
        });

        if (!res.ok) {
            return new Error("Ошибка")
        }

        return await res.json();
    } catch (e) {
        console.log(error?.message, "No connection to Backend");
        return error;
    }
}



export async function createPet(dataPet) {
    try {
        const response = await fetch(`http://localhost:8080/pets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.accessToken}`

            },
            body: JSON.stringify(dataPet),
        });

        if (!response.ok) {
            return new Error("Invalid credentials");
        }


        const data = await response.json();
        console.log(data)
        if (data.error) {
            return { error: data.message };
        }
        // const userID = data.id;
        return data;
    } catch (error) {
        console.log(error?.message, "No connection to Backend");
        return error;

    }
}


export const createMedicalRecord = async (data) => {
    try {
        const res = await fetch(`${URL}/records`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.accessToken}`
            },
            body: JSON.stringify(data),
        });


        if (!res.ok) {
            throw new Error("Failed to create record");
        }

        console.log(res);
        return res.json();
    } catch (error) {
        console.log(error?.message, "No connection to Backend");
        return error;

    }
};