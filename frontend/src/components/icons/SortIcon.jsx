export default function SortIcon({ direction }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-transform ${direction === 'descending' ? 'rotate-180' : ''}`}
        >
            <path d="M11 5h10M11 9h7M11 13h4M3 17l4 4 4-4M7 21V3"/>
        </svg>
    );
}