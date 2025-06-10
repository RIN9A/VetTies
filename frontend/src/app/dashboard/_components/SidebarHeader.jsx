import { useDashboardContext } from "../_util/Provider";
import MenuIcon from "./icons/MenuIcon";

export default function SidebarHeader() {
    const {openSidebar, isOpen} = useDashboardContext();

  return (
    <button className="sticky top-0 z-10 md:pl-4 md:ms-2 mb-6 flex items-center justify-center pb-6 pt-3"
    type="button"
    onClick={openSidebar}
    >
      
        <MenuIcon />
  </button>
  )
}
