"use client"

import ScheduleDetailsTable from "./_components/ScheduleDetailsTable"
import VetAppointmentsChart from './_components/VetAppointmentsChart'
import { useEffect, useRef, useState } from "react";


export default function Dashboard() {
  const [chart, setChart] = useState(true);
  const [table, setTable] = useState(false)


  return (
    <div className=" mx-auto w-full h-screen rounded-md bg-white px-2 py-2 overflow-y-scroll">

      <div className=" p-2  flex gap-3">
        {/* <p className="text-xl">Администратор: {session?.user?.email} </p> */}
        <button className={`${chart ? 'bg-mainBlue rounded-full px-4 py-2 text-white' : 'underline cursor-pointer'}`} onClick={() => { setChart(true); setTable(false) }}>Аналитика приемов</button>
        <button className={`${table ? 'bg-mainBlue rounded-full px-4 py-2 text-white' : 'underline cursor-pointer'}`} onClick={() => { setTable(true); setChart(false) }}>Подбор расписания</button>

      </div>

      <div className="flex flex-col ">
        <div className="">
          {chart &&
            <VetAppointmentsChart />}
          {table &&
            <ScheduleDetailsTable />}
        </div>
      </div>

    </div>
  );
}