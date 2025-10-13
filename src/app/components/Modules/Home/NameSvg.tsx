import React from 'react';

const NameSvg = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 660 100"
            className="w-full max-w-lg mx-auto"
            id="name-svg"
        >
            <defs>
                <linearGradient id="svgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: 'var(--accent-blue)', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'var(--accent-violet)', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <style>
                {`
                    #name-svg text {
                        font-family: 'Montserrat', sans-serif;
                        font-weight: 700;
                        font-size: 64px;
                        fill: transparent;
                        stroke: url(#svgGradient);
                        stroke-width: 1;
                    }
                `}
            </style>
            <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle">
                Hello! I&apos;m Mehefuj Ali,
            </text>
        </svg>
    );
};

export default NameSvg;
