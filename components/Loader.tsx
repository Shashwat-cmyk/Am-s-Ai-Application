
import React, { useState, useEffect } from 'react';

interface LoaderProps {
    messages: string[];
}

export const Loader: React.FC<LoaderProps> = ({ messages }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
        }, 2500); // Change message every 2.5 seconds

        return () => clearInterval(intervalId);
    }, [messages]);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-50 transition-opacity duration-300">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-6 text-lg text-gray-200 text-center px-4 animate-pulse">
                {messages[messageIndex]}
            </p>
        </div>
    );
};
