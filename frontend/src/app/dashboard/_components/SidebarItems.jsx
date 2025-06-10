import { usePathname } from "next/navigation"
import { useDashboardContext } from "../_util/Provider";
import Link from "next/link";
import { data } from "../_util/data";
import LogoutIcon from "./icons/LogoutIcon";
import { signOut } from "next-auth/react"
import logout from "../../../utils/logout";


const style = {
    title: 'mx-4 text-md font-bold whitespace-pre',
    active: 'bg-mainBlue text-white',
    link: 'flex items-center justify-start my-1  w-full hover:underline',
    close: 'lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all',
    open: 'lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto',
}


export function SidebarItems() {
    const pathname = usePathname();
    const { isOpen } = useDashboardContext();
    return (
        <ul className="mt-5 md:pl-2" >
            {data.map((item) => (

                <li key={item.title}>
                    <Link href={item.link}>
                        <span className={`${style.link} rounded-[24px]   ${isOpen ? `hover:bg-blue-100 ${pathname.startsWith(item.link) ? `${style.active} hover:bg-mainBlue` : ''}` : ''}`}>
                            <div className={`p-6   rounded-[24px] ${pathname.startsWith(item.link) ? style.active : 'hover:bg-blue-100'}`}>
                                <span >{pathname.startsWith(item.link)? item.iconActive : item.icon}</span>
                            </div>
                            <span className={`${style.title} ${isOpen ? style.open : style.close}`}>
                                {item.title}
                            </span>
                        </span>
                    </Link>

                </li>
            ))
            }
            <li className="w-full">
                <button onClick={logout} className={"w-full"}>  
                    <span className={`${style.link} rounded-[24px]   ${isOpen ? ` w-full hover:bg-blue-100` : ''}`}>
                        <div className={`p-6  rounded-[24px] hover:bg-blue-100`}>
                            <span> <LogoutIcon /> </span>
                        </div>
                        <span className={`${style.title} ${isOpen ? style.open : style.close}`}>
                            Выйти
                        </span>
                    </span>
                </button>
            </li>

        </ul>
    )
}



