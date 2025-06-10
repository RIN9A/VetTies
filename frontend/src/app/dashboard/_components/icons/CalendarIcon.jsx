
export default function CalendarIcon({ active }) {
  return (
    active ?
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" fill="none" viewBox="0 0 24 26">
        <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.208 13.905c0-8.115 2.706-10.82 10.82-10.82 8.115 0 10.82 2.705 10.82 10.82s-2.705 10.82-10.82 10.82c-8.114 0-10.82-2.705-10.82-10.82Z" clipRule="evenodd" />
        <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.53 9.878h21.009m-5.372 4.593h.01m-5.143 0h.01m-5.152 0h.01m10.265 4.494h.01m-5.143 0h.01m-5.152 0h.01m9.803-17.573v3.805M7.362 1.392v3.805" />
      </svg>
      :
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" fill="none" viewBox="0 0 24 26">
        <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.208 13.905c0-8.115 2.706-10.82 10.82-10.82 8.115 0 10.82 2.705 10.82 10.82s-2.705 10.82-10.82 10.82c-8.114 0-10.82-2.705-10.82-10.82Z" clipRule="evenodd" />
        <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.53 9.878h21.009m-5.372 4.593h.01m-5.143 0h.01m-5.152 0h.01m10.265 4.494h.01m-5.143 0h.01m-5.152 0h.01m9.803-17.573v3.805M7.362 1.392v3.805" />
      </svg>
  )
}
