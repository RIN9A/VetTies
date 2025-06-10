
export default function PatientsIcon({ active }) {

    return (
        active ?
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.262 24.55c-4.59 0-8.512-.676-8.512-3.381 0-2.706 3.896-5.143 8.512-5.143 4.59 0 8.511 2.414 8.511 5.119 0 2.704-3.895 3.404-8.511 3.404Zm0-12.383c3.013 0 5.456-2.377 5.456-5.309 0-2.931-2.443-5.308-5.456-5.308-3.013 0-5.456 2.377-5.456 5.308-.01 2.922 2.416 5.3 5.417 5.31h.04Z" clipRule="evenodd" />
                <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.317 10.709c1.754-.456 3.046-2.012 3.046-3.864.002-1.931-1.407-3.545-3.28-3.918m1.058 12.131c2.486 0 4.608 1.64 4.608 3.103 0 .862-.731 1.748-1.844 2.002" />
            </svg>

            :
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
                <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.262 24.55c-4.59 0-8.512-.676-8.512-3.381 0-2.706 3.896-5.143 8.512-5.143 4.59 0 8.511 2.414 8.511 5.119 0 2.704-3.895 3.404-8.511 3.404Zm0-12.383c3.013 0 5.456-2.377 5.456-5.309 0-2.931-2.443-5.308-5.456-5.308-3.013 0-5.456 2.377-5.456 5.308-.01 2.922 2.416 5.3 5.417 5.31h.04Z" clipRule="evenodd" />
                <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.317 10.709c1.754-.456 3.046-2.012 3.046-3.864.002-1.931-1.407-3.545-3.28-3.918m1.058 12.131c2.486 0 4.608 1.64 4.608 3.103 0 .862-.731 1.748-1.844 2.002" />
            </svg>


    )
}
