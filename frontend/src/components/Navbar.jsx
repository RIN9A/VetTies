"use client";

import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1>Ветеринарная клиника</h1>
      {/* { ? ( */}
        <button className="bg-red-500 px-4 py-2 rounded">
          Выйти
        </button>
      {/* ) : null} */}
    </nav>
  );
}
