"use client"
import Link from "next/link";
import { useDashboardContext } from "../_util/Provider";
import css from '../_util/style/style.module.css'
import { SidebarItems } from "./SidebarItems";
import SidebarHeader from "./SidebarHeader";


const style = {
  mobileOrientation: {
    start: 'left-0 ',
    end: 'right-0 lg:left-0',
  },
  container: 'pb-32 lg:pb-12',
  close: 'duration-700 ease-out hidden transition-all lg:w-24',
  open: 'absolute duration-500 ease-in transition-all w-8/12 z-40 sm:w-5/12 md:w-64 bg-[#F0F7FF]',
  default: 'h-screen py-7 overflow-y-auto text-[#240066] top-0 lg:absolute bg-[#F0F7FF]   lg:block lg:z-40',
};

export default function Sidebar(props) {
  const { isOpen } = useDashboardContext();
  return (

    <aside
      className={`${style.default} 
            ${style.mobileOrientation[props.mobileOrientation]}
            ${isOpen ? style.open : style.close} ${css.scrollbar}
            `}
    >
      <div className={style.container}>
        <SidebarHeader />
        <SidebarItems />
      
      </div>

    </aside>

  )
}