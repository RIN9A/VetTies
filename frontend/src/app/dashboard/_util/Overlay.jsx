'use client'
import { useDashboardContext } from './Provider'

export default function Overlay() {
    const {isOpen, closeSidebar} = useDashboardContext();
  return (
    <div
    onClick={closeSidebar}
    className={
        isOpen
          ? 'fixed left-0 top-0 z-30 h-screen w-screen  opacity-40 lg:bg-transparent'
          : ''
      } />  
  )
}
