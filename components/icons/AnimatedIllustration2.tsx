
import React from 'react';

const AnimatedIllustration2: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g>
        {/* Star */}
        <path d="M100 10 L115 50 L160 55 L125 85 L135 130 L100 110 L65 130 L75 85 L40 55 L85 50 Z" fill="#facc15" className="transform group-hover:scale-110 transition-transform"/>
        
        {/* Person */}
        <circle cx="80" cy="150" r="15" fill="#fde047"/> {/* Head */}
        <path d="M 80 165 Q 80 180 70 190 L 90 190 Q 80 180 80 165" fill="#67e8f9"/> {/* Body */}
        
        {/* Reaching Arm */}
        <path d="M85 160 C 100 140, 100 100, 95 80" stroke="#fde047" strokeWidth="10" fill="none" strokeLinecap="round" className="transform group-hover:-rotate-3 transition-transform"/>
        
        {/* Clouds */}
        <circle cx="40" cy="180" r="20" fill="#e0f2fe" opacity="0.8"/>
        <circle cx="65" cy="185" r="25" fill="#e0f2fe" opacity="0.8"/>
        <circle cx="150" cy="180" r="30" fill="#e0f2fe" opacity="0.8"/>
        <circle cx="120" cy="185" r="20" fill="#e0f2fe" opacity="0.8"/>

      </g>
    </svg>
);

export default AnimatedIllustration2;
