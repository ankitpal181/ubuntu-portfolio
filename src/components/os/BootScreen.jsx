import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const BootScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="bg-black w-full h-full flex flex-col items-center justify-between py-20 cursor-none z-50 absolute top-0 left-0">
            <div className="flex flex-col items-center justify-center flex-grow">
                {/* Ubuntu Logo Placeholder - Simple SVG representation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
                        <div className="w-full h-1/3 absolute top-0 bg-transparent" />
                        {/* Simplified Circle of Friends logo concept */}
                        <div className="w-16 h-16 border-4 border-ubuntu-orange rounded-full flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-ubuntu-orange rounded-full"></div>
                        </div>
                    </div>

                    <h1 className="text-white text-4xl font-light tracking-wide">ubuntu</h1>
                </motion.div>
            </div>

            <div className="flex flex-col items-center">
                {/* Spinner */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-8 h-8 border-4 border-t-ubuntu-orange border-r-gray-600 border-b-gray-600 border-l-gray-600 rounded-full"
                />
            </div>
        </div>
    );
};

export default BootScreen;
