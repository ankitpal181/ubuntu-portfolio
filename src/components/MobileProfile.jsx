import React, { useState, useEffect, useRef } from 'react';
import TopBar from './os/TopBar';

const MobileProfile = () => {
    const [history, setHistory] = useState([
        "Welcome to my Mobile Ubuntu 24.04.1 LTS Portfolio (GNU/Linux 6.5.0-generic x86_64)",
        "",
        "Last login: " + new Date().toUTCString() + " from 192.168.1.5",
        "",
        " * Use `help` command to get started *",
        "ankitpal@ubuntu:~$ " // Prompt for typing effect
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    // Mock Filesystem
    const fileSystem = {
        projects: {
            type: 'folder',
            children: {
                'chat-agent': {
                    type: 'folder',
                    children: {
                        'source': { type: 'file', url: 'https://github.com/ankitpal181/Chat-Agent', ext: '.code' }
                    },
                    ext: ''
                },
                'toon-formatter-npm': {
                    type: 'folder',
                    children: {
                        'source': { type: 'file', url: 'https://github.com/ankitpal181/toon-formatter-lib', ext: '.code' },
                        'documentation': { type: 'file', url: 'https://toonformatter.net/docs.html?package=toon-formatter', ext: '.html' },
                        'package': { type: 'file', url: 'https://www.npmjs.com/package/toon-formatter', ext: '.install' }
                    },
                    ext: ''
                },
                'toon-parse-pypi': {
                    type: 'folder',
                    children: {
                        'source': { type: 'file', url: 'https://github.com/ankitpal181/toon-formatter-py', ext: '.code' },
                        'documentation': { type: 'file', url: 'https://toonformatter.net/docs.html?package=toon-parse', ext: '.html' },
                        'package': { type: 'file', url: 'https://pypi.org/project/toon-parse/', ext: '.install' }
                    },
                    ext: ''
                },
                'chrome-extensions': { type: 'file', url: 'https://better-web.netlify.app/', ext: '.zip' }
            }
        },
        contact: {
            type: 'folder',
            children: {
                github: { type: 'file', url: 'https://github.com/ankitpal181', ext: '' },
                linkedin: { type: 'file', url: 'https://linkedin.com/in/ankitpal181', ext: '' },
                email: { type: 'file', url: 'mailto:ankitpal181@gmail.com', ext: '' }
            },
            ext: ''
        }
    };

    const commands = {
        help: () => [
            "Available commands:",
            "  about     - Learn more about me",
            "  projects  - List my projects",
            "  contact   - How to reach me",
            "  clear     - Clear the terminal",
            "  ls        - List directory contents",
            "  reboot    - Reload the page",
            "  open      - Open a file or folder (e.g., `open projects.chat-agent`)"
        ],
        ls: () => ["Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos"],
        about: () => [
            "Hello! I'm Ankit Pal.",
            "I'm a Senior Software Development Engineer.",
            "Specialised in Backend Development and AI Agents.",
            "Could code for Frontend but not a pro.",
        ],
        projects: () => {
            const children = Object.keys(fileSystem.projects.children);
            return [
                ...children.map(name => {
                    return `${name}${fileSystem.projects.children[name].ext}`;
                }),
                "",
                "(use `open projects.<name>` to explore)"
            ];
        },
        contact: () => [
            "Contact Info:",
            "  github:   https://github.com/ankitpal181",
            "  linkedin: https://linkedin.com/in/ankitpal181",
            "  email:    ankitpal181@gmail.com",
            "",
            "(click link to copy)",
            "(use `open contact.<name>` to open link in tab)"
        ],
        open: (args) => {
            if (!args) return ["Usage: open <path> (e.g., open projects.chat-agent)"];

            const pathParts = args.split('.');
            let current = fileSystem[pathParts[0]];
            pathParts.shift();

            // Traverse
            for (const part of pathParts) {
                if (current.type === 'folder' && current.children && current.children[part]) {
                    current = current.children[part];
                } else {
                    return [`Error: Path '${args}' not found.`];
                }
            }

            if (current.type === 'folder') {
                const children = Object.keys(current.children);
                return [
                    ...children.map(name => {
                        return `${name}${current.children[name].ext}`;
                    })
                ];
            } else if (current.type === 'file') {
                window.open(current.url, '_blank');
                return [`Opening ${args}...`];
            }

            return ["Error: Unknown file type."];
        },
        clear: () => [],
        reboot: () => {
            window.location.reload();
            return ["Rebooting..."];
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const rawInput = input.trim();
            const [cmd, ...args] = rawInput.split(' '); // Split command and arguments
            const argString = args.join(' ');           // Rejoin args for processing

            let output = [];
            const safeCmd = cmd.toLowerCase();

            if (rawInput) {
                if (commands[safeCmd]) {
                    if (safeCmd === 'clear') {
                        setHistory(["ankitpal@mobile:~$ "]);
                        setInput('');
                        return;
                    }
                    // Pass argument string to command function
                    output = commands[safeCmd](argString);
                } else {
                    output = [`Command not found: ${safeCmd}`];
                }
            }

            setHistory(prev => [
                ...prev.slice(0, prev.length - 1),
                `ankitpal@mobile:~$ ${rawInput}`,
                ...output,
                "ankitpal@mobile:~$ "
            ]);
            setInput('');
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="w-full h-screen bg-[#300a24] text-white overflow-hidden font-ubuntu flex flex-col">
            <TopBar />
            {/* Terminal Container - fills remaining space below TopBar */}
            <div
                className="flex-1 overflow-auto p-4 text-sm font-mono mt-[30px]"
                onClick={() => document.getElementById('mobile-terminal-input').focus()}
            >
                {history.slice(0, history.length - 1).map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words leading-snug mb-1">
                        {/* Simple link detector for display purposes */}
                        {line.split(/(https?:\/\/[^\s]+|mailto:[^\s]+)/g).map((part, j) => {
                            if (part.match(/https?:\/\/[^\s]+|mailto:[^\s]+/)) {
                                return (
                                    <span
                                        key={j}
                                        className="text-blue-400 underline cursor-pointer hover:text-blue-300"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent focusing input
                                            navigator.clipboard.writeText(part.replace('mailto:', ''));
                                            // Optional visual feedback could go here
                                        }}
                                        title="Click to copy"
                                    >
                                        {part}
                                    </span>
                                );
                            }
                            return part;
                        })}
                    </div>
                ))}
                <div className="flex">
                    <span className="text-green-400 font-bold mr-2 whitespace-nowrap">ankitpal@mobile:~$</span>
                    <input
                        id="mobile-terminal-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-white flex-1 min-w-0"
                        autoFocus
                        autoComplete="off"
                        autoCapitalize="none"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default MobileProfile;
