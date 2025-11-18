import React from 'react';

const Logo: React.FC = () => (
    // Wrapper to give it a fixed width and prevent layout shifts
    <div className="w-44 shrink-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-200">
            BloomX
        </h1>
        <div className="flex h-1">
            {/* Approximate percentages from the logo image */}
            <div className="w-[33%] bg-lime-400"></div>
            <div className="w-[33%] bg-yellow-400"></div>
            <div className="w-[34%] bg-sky-400"></div>
        </div>
        <p className="text-[10px] tracking-[0.2em] text-gray-400 mt-1 font-serif">
            BUSINESS SOLUTIONS
        </p>
    </div>
);


interface HeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onBack }) => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <Logo />
          {onBack && (
            <button
              onClick={onBack}
              className="hidden sm:flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label="Back to Dashboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Dashboard</span>
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="text-right">
          <h2 className="text-lg md:text-xl font-bold text-cyan-400">
            {title}
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
};
