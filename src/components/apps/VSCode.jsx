import React from 'react';

const VSCode = () => {
    const contactInfo = {
        name: "Ankit Pal",
        role: "Senior Software Development Engineer",
        email: "ankitpal181@gmail.com",
        github: "https://github.com/ankitpal181",
        linkedin: "https://linkedin.com/in/ankitpal181",
        availableForHire: true
    };

    const jsonString = JSON.stringify(contactInfo, null, 4);

    return (
        <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-white font-mono text-sm">
            {/* Title Bar */}
            <div className="h-8 bg-[#252526] flex items-center md:justify-center justify-between px-4 border-b border-black text-xs text-gray-400 select-none">
                <span>contact.json - Visual Studio Code</span>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-black">
                    <div className="w-6 h-6 border-l-2 border-white pl-2"></div>
                    {/* Placeholder icons */}
                    <div className="w-6 h-6 bg-gray-500/20"></div>
                    <div className="w-6 h-6 bg-gray-500/20"></div>
                </div>

                {/* Explorer File List */}
                <div className="w-48 bg-[#252526] flex flex-col text-gray-300">
                    <div className="p-2 text-xs font-bold uppercase tracking-wider">Explorer</div>
                    <div className="px-4 py-1 hover:bg-[#37373d] cursor-pointer bg-[#37373d] text-white">
                        <span className="text-yellow-400 mr-2">{"{}"}</span> contact.json
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 bg-[#1E1E1E] p-4 overflow-auto">
                    <pre className="text-sm">
                        <code className="language-json">
                            {jsonString.split('\n').map((line, i) => (
                                <div key={i} className="flex">
                                    <span className="text-gray-500 w-8 text-right mr-4 select-none">{i + 1}</span>
                                    <span className="group" dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }}></span>
                                </div>
                            ))}
                        </code>
                    </pre>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#007ACC] flex items-center px-4 text-xs text-white justify-between">
                <div className="flex gap-4">
                    <span>main*</span>
                    <span>0 errors, 0 warnings</span>
                </div>
                <div className="flex gap-4">
                    <span>JSON</span>
                    <span>Prettier</span>
                </div>
            </div>
        </div>
    );
};

// Simple syntax highlighting helper
function syntaxHighlight(line) {
    // This is a very basic replacement for demo purposes
    // Real implementation would parse tokens.
    let colored = line
        .replace(/"(.*?)":/g, '<span class="text-[#9CDCFE]">"$1"</span>:') // Keys
        .replace(/: "(.*?)"/g, `: <span class="text-[#CE9178] group-hover:cursor-pointer" onclick="navigator.clipboard.writeText('$1')" title="click to copy">"$1"</span>`) // String Values
        .replace(/: (true|false)/g, ': <span class="text-[#569CD6]">$1</span>'); // Booleans
    return colored;
}

export default VSCode;
