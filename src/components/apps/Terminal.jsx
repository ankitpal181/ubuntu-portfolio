import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';

const Terminal = () => {
    const [history, setHistory] = useState([
        "Welcome to my Ubuntu 24.04.1 LTS Portfolio (GNU/Linux 6.5.0-generic x86_64)",
        "",
        "Last login: " + new Date().toUTCString() + " from 192.168.1.5",
        "",
        " * Use `help` command to get started *",
        "ankitpal@ubuntu:~$ " // Prompt for typing effect
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);
    const { windows, launchApp, minimizeWindow, focusWindow } = useOS();

    const commands = {
        help: () => [
            "Available commands:",
            "  about     - Learn more about me",
            "  projects  - List my projects",
            "  contact   - How to reach me",
            "  clear     - Clear the terminal",
            "  ls        - List directory contents"
        ],
        ls: () => ["Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos"],
        about: () => [
            "Hello! I'm Ankit Pal.",
            "I'm a Senior Software Development Engineer.",
            "Specialised in Backend Development and AI Agents.",
            "Could code for Frontend but not a pro.",
        ],
        projects: () => {
            const projectsApp = { id: 'nautilus' }
            handleAppOpen(projectsApp)
            return [""]
        },
        contact: () => {
            const contactApp = { id: 'vscode' }
            handleAppOpen(contactApp)
            return [""]
        },
        clear: () => [],
    };

    const handleAppOpen = (app) => {
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const trimmedInput = input.trim();
            let output = [];

            if (trimmedInput) {
                if (commands[trimmedInput]) {
                    if (trimmedInput === 'clear') {
                        setHistory(["ankitpal@ubuntu:~$ "]);
                        setInput('');
                        return;
                    }
                    output = commands[trimmedInput]();
                } else {
                    output = [`Command not found: ${trimmedInput}`];
                }
            }

            setHistory(prev => [
                ...prev.slice(0, prev.length - 1), // Remove the last partial prompt line
                `ankitpal@ubuntu:~$ ${input}`,     // Add the completed line
                ...output,
                "ankitpal@ubuntu:~$ "             // New prompt
            ]);
            setInput('');
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="w-full h-full bg-[#300a24] text-white p-2 text-sm font-mono overflow-auto" onClick={() => document.getElementById('terminal-input').focus()}>
            {history.slice(0, history.length - 1).map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">{line}</div>
            ))}
            <div className="flex">
                <span className="text-green-400 font-bold mr-2">ankitpal@ubuntu:~$</span>
                <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-white flex-1"
                    autoFocus
                    autoComplete="off"
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

export default Terminal;
