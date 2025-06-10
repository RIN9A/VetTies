import React from 'react'

export default async function apiAuthLogin(credentials) {
    try {
        const response = await fetch(`http://localhost:8080/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (!response.ok) {
            return { 
                error: true,
                message: data.message || "Данные введены не верно!",
                status: response.status
            };
        }
        return data;
    } catch (error) {
        console.error("No connection to Backend:", error.message);
        return {
            error: true,
            message: "Ошибка соединения с сервером",
            status: 500
        };
    }
}