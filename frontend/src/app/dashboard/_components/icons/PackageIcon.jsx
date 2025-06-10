
export default function PackageIcon({active}) {
    return (
        active ?
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
            <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8.75 10.967 10.5-6.055M3.5 18.667V9.333a2.333 2.333 0 0 1 1.167-2.018l8.166-4.667a2.333 2.333 0 0 1 2.334 0l8.166 4.667A2.333 2.333 0 0 1 24.5 9.333v9.334a2.333 2.333 0 0 1-1.167 2.018l-8.166 4.667a2.333 2.333 0 0 1-2.334 0l-8.166-4.667A2.333 2.333 0 0 1 3.5 18.667Z" />
            <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24.185 8.12 14 14.012 3.815 8.12M14 25.76V14" />
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
        <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8.75 10.967 10.5-6.055M3.5 18.667V9.333a2.333 2.333 0 0 1 1.167-2.018l8.166-4.667a2.333 2.333 0 0 1 2.334 0l8.166 4.667A2.333 2.333 0 0 1 24.5 9.333v9.334a2.333 2.333 0 0 1-1.167 2.018l-8.166 4.667a2.333 2.333 0 0 1-2.334 0l-8.166-4.667A2.333 2.333 0 0 1 3.5 18.667Z" />
        <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24.185 8.12 14 14.012 3.815 8.12M14 25.76V14" />
    </svg>

    )
}
