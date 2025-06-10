
export default function UsersIcon({active}) {
    return (
        active ?
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" fill="none" viewBox="0 0 26 22">
                <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.968 20.763c-3.779 0-7.007-.572-7.007-2.86 0-2.29 3.207-4.282 7.007-4.282 3.779 0 7.007 1.974 7.007 4.261 0 2.288-3.207 2.88-7.007 2.88Zm-.001-10.406a4.491 4.491 0 1 0-4.491-4.49 4.476 4.476 0 0 0 4.46 4.49h.031Z" clipRule="evenodd" />
                <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.422 9.124a3.385 3.385 0 0 0-.194-6.584m.872 10.262c2.046 0 3.794 1.387 3.794 2.626 0 .73-.604 1.524-1.518 1.738M5.514 9.124a3.385 3.385 0 0 1 .193-6.584m-.872 10.262c-2.046 0-3.794 1.387-3.794 2.626 0 .73.603 1.524 1.519 1.738" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" fill="none" viewBox="0 0 26 22">
                <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.968 20.763c-3.779 0-7.007-.572-7.007-2.86 0-2.29 3.207-4.282 7.007-4.282 3.779 0 7.007 1.974 7.007 4.261 0 2.288-3.207 2.88-7.007 2.88Zm-.001-10.406a4.491 4.491 0 1 0-4.491-4.49 4.476 4.476 0 0 0 4.46 4.49h.031Z" clipRule="evenodd" />
                <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.422 9.124a3.385 3.385 0 0 0-.194-6.584m.872 10.262c2.046 0 3.794 1.387 3.794 2.626 0 .73-.604 1.524-1.518 1.738M5.514 9.124a3.385 3.385 0 0 1 .193-6.584m-.872 10.262c-2.046 0-3.794 1.387-3.794 2.626 0 .73.603 1.524 1.519 1.738" />
            </svg>
    )
}
