import React from 'react';

interface LogoProps {
    className?: string;
    showText?: boolean;
    size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 32 }) => {
    return (
        <div className={`logo-component ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-icon-wrapper" style={{ position: 'relative', width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer Shield */}
                    <path
                        d="M20 2L4 9V20C4 28.5 10.5 35.5 20 38C29.5 35.5 36 28.5 36 20V9L20 2Z"
                        fill="black"
                        stroke="#00FF84"
                        strokeWidth="2.5"
                    />
                    {/* Inner Nest / Data Nodes */}
                    <circle cx="20" cy="18" r="4" fill="#00FF84" fillOpacity="0.8" />
                    <circle cx="14" cy="24" r="3" fill="#1DE9B6" fillOpacity="0.6" />
                    <circle cx="26" cy="24" r="3" fill="#1DE9B6" fillOpacity="0.6" />
                    {/* Connecting Lines */}
                    <path d="M20 18L14 24" stroke="#00FF84" strokeWidth="1" />
                    <path d="M20 18L26 24" stroke="#00FF84" strokeWidth="1" />
                    <path d="M14 24H26" stroke="#00FF84" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
            </div>
            {showText && <span className="logo-text">SecureNest</span>}
        </div>
    );
};

export default Logo;
