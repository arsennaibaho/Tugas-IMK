
import React from 'react';

const AnimatedIllustration1: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g>
        {/* Person */}
        <circle cx="100" cy="80" r="20" fill="#fde68a"/> {/* Head */}
        <rect x="85" y="100" width="30" height="50" rx="15" fill="#a7f3d0"/> {/* Body */}
        
        {/* Blocks */}
        <rect x="30" y="130" width="40" height="40" rx="5" fill="#fca5a5" className="transform group-hover:rotate-3 transition-transform"/>
        <rect x="80" y="130" width="40" height="40" rx="5" fill="#93c5fd" className="transform group-hover:-rotate-2 transition-transform"/>
        <rect x="130" y="130" width="40" height="40" rx="5" fill="#d8b4fe" className="transform group-hover:rotate-2 transition-transform"/>

        <rect x="55" y="90" width="40" height="40" rx="5" fill="#6ee7b7" className="transform group-hover:-translate-y-1 transition-transform"/>
        <rect x="105" y="90" width="40" height="40" rx="5" fill="#fdba74" className="transform group-hover:translate-y-1 transition-transform"/>
        
        <rect x="80" y="50" width="40" height="40" rx="5" fill="#f9a8d4" className="transform group-hover:-rotate-3 transition-transform"/>

        <path d="M 80 120 C 70 130, 60 120, 50 125" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 120 120 C 130 130, 140 120, 150 125" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
);

export default AnimatedIllustration1;
