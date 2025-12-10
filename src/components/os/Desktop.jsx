import React from 'react';
import TopBar from './TopBar';
import Dock from './Dock';
import Window from '../ui/Window';
import { useOS } from '../../context/OSContext';

// App Components
import Terminal from '../apps/Terminal';
import Nautilus from '../apps/Nautilus';
import Chrome from '../apps/Chrome';
import VSCode from '../apps/VSCode';

const APP_COMPONENTS = {
    'terminal': Terminal,
    'nautilus': Nautilus,
    'chrome': Chrome,
    'vscode': VSCode,
    'spotify': () => <div className="flex items-center justify-center h-full bg-black text-white">Spotify Clone Placeholder</div> // Simple placeholder for now
};

const Desktop = () => {
    const { windows, closeWindow, minimizeWindow, focusWindow, activeWindowId, zIndexes } = useOS();

    return (
        <div
            className="w-full h-full bg-cover bg-center relative overflow-hidden"
            style={{
                backgroundImage: 'linear-gradient(to bottom right, #4a192c, #772953, #E95420)',
            }}
        >
            {/* System Bars */}
            <TopBar />
            <Dock />

            {/* Desktop Content Area */}
            <div className="absolute top-[30px] left-0 w-full h-[calc(100vh-30px)] z-0">
                {/* Windows Layer */}
                {Object.values(windows).map((win) => {
                    return (
                        <Window
                            key={win.id}
                            id={win.id}
                            title={win.title || win.id}
                            isOpen={win.isOpen}
                            isMinimized={win.isMinimized}
                            isActive={activeWindowId === win.id}
                            onClose={closeWindow}
                            onMinimize={minimizeWindow}
                            onFocus={() => focusWindow(win.id)}
                            style={{ zIndex: zIndexes[win.id] || 10 }}
                        >
                            {/* Dynamic Component Rendering */}
                            {APP_COMPONENTS[win.id] ? React.createElement(APP_COMPONENTS[win.id]) : <div className="p-4">App not found</div>}
                        </Window>
                    );
                })}
            </div>
        </div>
    );
};

export default Desktop;
