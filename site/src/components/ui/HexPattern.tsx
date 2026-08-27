import React from 'react';

interface HexPatternProps {
  className?: string;
  opacity?: number;
}

export default function HexPattern({ className = '', opacity = 0.08 }: HexPatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hex-grid"
            width="60"
            height="104"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1)"
          >
            <path
              d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z M30 104 L60 86.68 L60 52.04 L30 34.72 L0 52.04 L0 86.68 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" className="text-white" />
      </svg>
    </div>
  );
}
