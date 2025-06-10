import React from 'react'

export default function AppointmentsIcon({ active }) {

    return (
        active ?
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" fill="none" viewBox="0 0 24 26">
                <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m22.323 8.333-7.15-6.81a22.832 22.832 0 0 0-3.091-.19C4.149 1.333 1.5 4.26 1.5 13c0 8.753 2.649 11.667 10.582 11.667 7.946 0 10.595-2.914 10.595-11.667 0-1.791-.114-3.342-.354-4.667Z" clipRule="evenodd" />
                <path stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.47 1.438v3.356c0 2.343 1.9 4.242 4.244 4.242h3.722m-7.488 4.034h-6.18m3.092 3.09V9.98" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" fill="none" viewBox="0 0 24 26">
                <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m22.323 8.333-7.15-6.81a22.832 22.832 0 0 0-3.091-.19C4.149 1.333 1.5 4.26 1.5 13c0 8.753 2.649 11.667 10.582 11.667 7.946 0 10.595-2.914 10.595-11.667 0-1.791-.114-3.342-.354-4.667Z" clipRule="evenodd" />
                <path stroke="#240066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.47 1.438v3.356c0 2.343 1.9 4.242 4.244 4.242h3.722m-7.488 4.034h-6.18m3.092 3.09V9.98" />
            </svg>

    )
}
