"use client"

import Sidebar from "./_components/Sidebar";
import { TopBar } from "./_components/TopBar";
import Overlay from "./_util/Overlay";
import { getSession } from "next-auth/react";
import { DashboardProvider } from "./_util/Provider";
import NotificationHandler from "../context/notification/NotificationHandler";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }) {

    const [token, setToken] = useState("");
    useEffect(() => {
      getSession().then((session) => 
        setToken(session.user.accessToken))
      }, []);

  const style = {
    container: 'h-full overflow-hidden relative bg-gradient-to-b from-[#DAE7F1] to-[#B3D8F2]',
    mainContainer: 'flex flex-col h-screen pl-0 w-full lg:pl-24 lg:space-y-4',
    main: 'h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4',
  };

  return (

    <DashboardProvider>
          {/* <NotificationHandler accessToken={token}/> */}

      <div className={style.container}>
        <div className=" mx-auto">
          <Overlay />
        <Sidebar mobileOrientation="end" />
        <div className={style.mainContainer}>
          <TopBar />
        <main className={style.main}>{children}</main>
        </div>
        </div>
      </div>
    </DashboardProvider>
   
  )
}
