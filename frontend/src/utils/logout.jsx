"use client";
import { signOut } from "next-auth/react";

export default async function logout() {
    try {
        // await fetch("http://localhost:8080/auth/logout", {
        //     method: "POST",
        //     credentials: "include", // Если используются cookies-сессии
        // });

        // Очищаем сессию NextAuth
        await signOut({ callbackUrl: "/login" }); // Перенаправляем на страницу входа
    } catch (error) {
        console.error("Ошибка выхода:", error);
    }
}