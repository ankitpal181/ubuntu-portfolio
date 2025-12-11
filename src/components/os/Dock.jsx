import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Folder, Chrome, Code, Music, Trash2, Grid } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import Tooltip from '../ui/MicroUI';

const Dock = () => {
    const { windows, launchApp, minimizeWindow, focusWindow } = useOS();

    // Placeholder apps list - usually this would come from a config
    const apps = [
        { id: 'chrome', title: 'Google Chrome', icon: Chrome, color: 'text-orange-500', text: 'Resume' },
        { id: 'nautilus', title: 'Files', icon: Folder, color: 'text-blue-400', text: 'Projects' },
        { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'text-gray-300', text: 'About me' },
        { id: 'vscode', title: 'VS Code', icon: Code, color: 'text-blue-500', text: 'Contact' },
        { id: 'spotify', title: 'Spotify', icon: Music, color: 'text-green-500', text: 'Music' },
    ];

    const handleAppClick = (app) => {
        const windowState = windows[app.id];
        if (windowState?.isOpen) {
            if (windowState.isMinimized) {
                launchApp(app); // Re-opens/unminimizes
            } else {
                // If already open and focused, minimize. If not focused, focus.
                // For simplified logic: click always focuses or unminimizes. 
                // To implement "minimize on click if active", we'd need activeWindowId check.
                // Let's just focus/launch for now.
                focusWindow(app.id);
            }
        } else {
            launchApp(app);
        }
    };

    return (
        <div className="fixed left-2 top-1/2 transform -translate-y-1/2 h-auto py-2 bg-[#1E1E1E]/90 backdrop-blur-md rounded-2xl flex flex-col items-center gap-2 z-50 border border-white/5 shadow-2xl">
            {apps.map((app) => (
                <DockItem
                    key={app.id}
                    icon={app.icon}
                    color={app.color}
                    isOpen={windows[app.id]?.isOpen}
                    text={app.text}
                    tooltip={app.id === 'spotify' ? '0.1' : '1'}
                    onClick={() => handleAppClick(app)}
                />
            ))}

            <div className="w-8 h-[1px] bg-white/10 my-1" />

            <DockItem icon={Trash2} color="text-gray-400" text="Trash" tooltip="0" />
            <DockItem icon={Grid} color="text-white" text="Apps" tooltip="0" />
        </div>
    );
};

const DockItem = ({ icon: Icon, color, isOpen, text, tooltip, onClick }) => {
    return (
        <div className="relative group p-2 cursor-pointer" onClick={onClick}>
            {/* Indicator Dot */}
            {isOpen && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-ubuntu-orange rounded-full -ml-1"></div>
            )}

            <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors ${color}`}
            >
                <Icon className="w-6 h-6" />
                <span className="text-xs text-white">{text}</span>
            </motion.div>

            {/* Tooltip */}
            {tooltip && <Tooltip tooltip={tooltip} />}
        </div>
    );
};

export default Dock;
