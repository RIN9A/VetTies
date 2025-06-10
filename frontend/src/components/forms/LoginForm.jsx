"use client"
import { signIn } from "next-auth/react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Сбрасываем предыдущие ошибки
        
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
    
        if (result?.error) {
            try {
                // Парсим JSON строку с ошибкой
                const errorData = JSON.parse(result.error);
                setError(errorData.message || "Ошибка авторизации");
            } catch {
                // Если не получилось распарсить, показываем общую ошибку
                setError("Ошибка авторизации");
            }
        } else {
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
            }
            router.push("/dashboard/admin/profile");
        }

    };

    return (
        <>
            <div className="mt-5 mx-auto hover:animate-background rounded-2xl bg-gradient-to-r from-mainDarkGreen-600 via-mainBlue to-ShakespeareBlue-500 p-1 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-xs hover:[animation-duration:_4s]  max-w-6/12 ">
                <form onSubmit={handleSubmit} className=" mb-0 space-y-4  p-4 rounded-xl bg-white  border border-zinc-200 shadow shadow-zinc-100 sm:p-6 lg:p-8  ">

                    <div>
                        <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-zinc-900">Почта</label>


                        <div className="relative">

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.trim())}
                                className={`w-full ps-12 p-4 rounded-2xl text-sm shadow-xs  border border-zinc-200 ${error && 'ring-2 ring-red-300'}`}
                                placeholder="Введите почту"
                                required
                            />
                            <span className="absolute inset-y-0 start-0  grid place-content-center px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="#8C8C8C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.845 21.662C8.152 21.662 5 21.087 5 18.787c0-2.301 3.133-4.425 6.845-4.425 3.691 0 6.844 2.103 6.844 4.404 0 2.3-3.133 2.896-6.845 2.896Zm-.008-10.488a4.386 4.386 0 1 0 0-8.774A4.388 4.388 0 0 0 7.45 6.787a4.371 4.371 0 0 0 4.356 4.387h.031Z" clipRule="evenodd" />
                                </svg>

                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-zinc-900">Пароль</label>

                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full ps-12 p-4 rounded-2xl text-sm shadow-xs  ring ring-red-300 ${error && 'ring-2 ring-red-300'}`}
                                placeholder="Введите пароль"
                                required
                            />

                            <span className="absolute inset-y-0 start-0 grid place-content-center px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="#8C8C8C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.068 12.876a3 3 0 1 1-3.973-1.49l.005-.003a2.999 2.999 0 0 1 3.968 1.493Z" clipRule="evenodd" />
                                    <path stroke="#8C8C8C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10.072 12.874 9.319-4.231 1.24 2.731m-4.171 1.894-1.24-2.731" />
                                </svg>

                            </span>

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                                                                                                                            {!error && <p className="text-red-500 text-sm">{'Неверный пароль'}</p>}

                    </div>
                    <div className="flex justify-between  mt-11">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                id="remember-me"
                                className="w-4 h-4 text-zinc-900 bg-gray-100 border-gray-300 rounded-2xl focus:ring-mainDarkGreen-600  focus:ring-2 " />
                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-zinc-700 ">Запомнить меня</label>
                        </div>

                        <div className="">
                            <Link href={"/*"} className="text-sm underline text-mainDarkGreen-600 hover:no-underline">Забыли пароль?</Link>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}


                    <button
                        type="submit"
                        className="block w-full rounded-full bg-mainBlue px-5 py-3 text-sm font-medium text-white hover:bg-mainDarkGreen-600"
                    >
                        Войти
                    </button>
                    {/* 
      <p className="text-center text-sm text-gray-500">
        No account?
        <a className="underline" href="#">Sign up</a>
      </p> */}
                </form>


            </div>
        </>

    )
}



