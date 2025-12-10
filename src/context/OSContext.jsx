import React, { createContext, useContext, useState } from 'react';

const OSContext = createContext();

export const useOS = () => useContext(OSContext);

export const OSProvider = ({ children }) => {
    // apps: { [id]: { id, title, component, isOpen, isMinimized, ... } }
    const [windows, setWindows] = useState({});
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [zIndexes, setZIndexes] = useState({});

    const launchApp = (app) => {
        const appId = typeof app === 'string' ? app : app.id;
        const appConfig = typeof app === 'string' ? {} : app;

        setWindows((prev) => ({
            ...prev,
            [appId]: {
                ...prev[appId],
                ...appConfig, // Ensure title/id are set
                id: appId,
                isOpen: true,
                isMinimized: false
            }
        }));
        focusWindow(appId);
    };

    const closeWindow = (appId) => {
        setWindows((prev) => ({
            ...prev,
            [appId]: { ...prev[appId], isOpen: false }
        }));
    };

    const minimizeWindow = (appId) => {
        setWindows((prev) => ({
            ...prev,
            [appId]: { ...prev[appId], isMinimized: true }
        }));
        setActiveWindowId(null);
    };

    const focusWindow = (appId) => {
        setActiveWindowId(appId);
        // Simple z-index increment handling
        setZIndexes((prev) => {
            const maxZ = Math.max(...Object.values(prev), 0);
            return { ...prev, [appId]: maxZ + 1 };
        });
    };

    const registerApp = (appConfig) => {
        // Allow apps to register themselves initially if needed, or we just pre-define them
        // For now, let's assume `windows` keys are pre-seeded or added dynamically
        setWindows(prev => ({
            ...prev,
            [appConfig.id]: {
                isOpen: false,
                isMinimized: false,
                ...appConfig
            }
        }));
    };

    return (
        <OSContext.Provider value={{
            windows,
            activeWindowId,
            launchApp,
            closeWindow,
            minimizeWindow,
            focusWindow,
            registerApp,
            zIndexes
        }}>
            {children}
        </OSContext.Provider>
    );
};
