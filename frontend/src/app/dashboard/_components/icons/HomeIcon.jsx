export default function HomeIcon({active}) {


    return (
        active ?
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
                <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.592 17.825h6.784" />
                <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.8 14.998c0-6.569.716-6.11 4.572-9.686 1.687-1.358 4.312-3.979 6.579-3.979 2.265 0 4.943 2.608 6.645 3.979 3.856 3.575 4.571 3.117 4.571 9.686 0 9.669-2.285 9.669-11.184 9.669-8.898 0-11.183 0-11.183-9.669Z" clipRule="evenodd" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
                <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.592 17.825h6.784" />
                <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.8 14.998c0-6.569.716-6.11 4.572-9.686 1.687-1.358 4.312-3.979 6.579-3.979 2.265 0 4.943 2.608 6.645 3.979 3.856 3.575 4.571 3.117 4.571 9.686 0 9.669-2.285 9.669-11.184 9.669-8.898 0-11.183 0-11.183-9.669Z" clipRule="evenodd" />
            </svg>

    )
}
