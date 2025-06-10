"use client"

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState, useContext } from "react";

const Context = createContext({});

export function DashboardProvider({children}){
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = () => {
        setIsOpen(true);
    }
    const closeSidebar = () => {
        setIsOpen(false);
    } 

    useEffect(() => {
        return () => {
            if(isOpen) {
                setIsOpen(false);
            }
        };

    }, [isOpen, pathname]);

    return(
        <Context.Provider value={{isOpen, openSidebar, closeSidebar}}>{children}</Context.Provider>
    )
}

export function useDashboardContext() {
    return useContext(Context);
}