import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center relative overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: 'linear-gradient(to bottom right, #4a192c, #772953, #E95420)',
                // Approximating the Jammy Jellyfish / Ubuntu gradient
            }}
        >
            {/* Blurred Overlay */}
            <div className="absolute inset-0 backdrop-blur-md bg-black/20" />

            {/* Login Card */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <User className="w-12 h-12 text-gray-500" />
                </div>

                <h2 className="text-white text-xl font-medium mb-4">Ankit Pal</h2>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 rounded px-4 py-2 w-64 focus:outline-none focus:border-ubuntu-orange focus:ring-1 focus:ring-ubuntu-orange transition-all text-center"
                        autoFocus
                    />
                    <p className="text-gray-300 text-sm mt-4 cursor-pointer hover:underline">
                        Press Enter to unlock
                    </p>
                </form>
            </div>

            <div className="absolute bottom-8 right-8 flex gap-4 text-white">
                {/* Quick placeholder mainly for visual balance */}
                <div className="flex flex-col items-center">
                    <span className="text-xs">Battery</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs">Wifi</span>
                </div>
            </div>
        </motion.div>
    );
};

export default LoginScreen;
