import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Power } from 'lucide-react';

const TopBar = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        // Format: "Oct 26 10:30"
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
            date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div className="w-full h-[30px] bg-[#1E1E1E] text-white flex items-center justify-between px-2 text-sm select-none z-50 fixed top-0 left-0 shadow-md">
            {/* Left: Activities */}
            <div className="flex items-center">
                <button className="px-3 py-1 hover:bg-white/10 rounded-full transition-colors text-sm font-medium">
                    Activities
                </button>
            </div>

            {/* Center: Date & Time */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <button className="px-3 py-1 hover:bg-white/10 rounded-full transition-colors font-medium">
                    {formatDate(date)}
                </button>
            </div>

            {/* Right: System Tray */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-3 px-2 py-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                    <Wifi className="w-4 h-4" />
                    <Volume2 className="w-4 h-4" />
                    <Battery className="w-4 h-4" />
                    <div className="w-0 border-l border-gray-600 h-3 mx-1"></div>
                    <Power className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
