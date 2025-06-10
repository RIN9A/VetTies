import { getSession } from "next-auth/react";
import { BASE_URL } from "./getData";

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
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error fetching ${path}`);
        }

        return response;
    } catch (error) {
        console.error(`Request failed: ${path}`, error);
        return { error: error.message };
    }
}


export const deleteRecord = (id) => fetchWithAuth(`/records/${id}`);
export const deleteMedication = (id) => fetchWithAuth(`/medications/${id}`);
