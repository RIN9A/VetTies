import AppointmentsIcon from "../_components/icons/AppointmentsIcon";
import CalendarIcon from "../_components/icons/CalendarIcon";
import HomeIcon from "../_components/icons/HomeIcon";
import LogoutIcon from "../_components/icons/LogoutIcon";
import PackageIcon from "../_components/icons/PackageIcon";
import PatientsIcon from "../_components/icons/PatientsIcon";
import UsersIcon from "../_components/icons/UsersIcon";

export const data = [
    {
        title: 'Главная',
        icon: <HomeIcon  />,
        iconActive: <HomeIcon active={true} />,
        link: '/dashboard/admin/profile',

    },
    {
        title: 'Записи на прием',
        icon: <AppointmentsIcon  />,
        iconActive: <AppointmentsIcon active={true} />,
        link: '/dashboard/admin/appointments',
    },
    {
        title: 'Календарь',
        icon: <CalendarIcon />,
        iconActive: <CalendarIcon active={true} />,
        link: '/dashboard/admin/calendar',
    },
    {
        title: 'Персонал',
        icon: <UsersIcon />,
        iconActive: <UsersIcon active={true} />,
        link: '/dashboard/admin/staff',
    },

    {
        title: 'Склад',
        icon: <PackageIcon />,
        iconActive: <PackageIcon active={true} />,
        link: '/dashboard/admin/inventory',
    },

    {
        title: 'Пациенты',
        icon: <PatientsIcon />,
        iconActive: <PatientsIcon active={true} />,
        link: '/dashboard/admin/patients',
    },
    // {
    //     title: 'Выйти',
    //     icon: <LogoutIcon />,
    //     iconActive: <LogoutIcon active={false} />,
    //     link: '/login',
    // },

]