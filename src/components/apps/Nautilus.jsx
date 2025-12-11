import React from 'react';
import { Folder, FileText, ChevronRight, Home, LayoutGrid, Clock, Star } from 'lucide-react';
import Tooltip from '../ui/MicroUI';

const Nautilus = () => {
    const [currentFolder, setCurrentFolder] = React.useState(null);

    const sidebarItems = [
        { icon: Home, label: 'Home', active: true },
        { icon: LayoutGrid, label: 'Desktop' },
        { icon: Clock, label: 'Recent' },
        { icon: Star, label: 'Starred' },
    ];

    const projects = [
        { id: 1, name: 'Chat Agent', type: 'folder' },
        { id: 2, name: 'Toon Formatter(npm)', type: 'folder' },
        { id: 3, name: 'Toon Parse(pypi)', type: 'folder' },
        { id: 4, name: 'chrome-extensions.zip', type: 'file', url: 'https://better-web.netlify.app/' },
    ];

    const projectFiles = {
        1: [
            { id: 1, name: 'source.code', type: 'file', url: 'https://github.com/ankitpal181/Chat-Agent' }
        ],
        2: [
            { id: 1, name: 'source.code', type: 'file', url: 'https://github.com/ankitpal181/toon-formatter-lib' },
            { id: 2, name: 'documentation.html', type: 'file', url: 'https://toonformatter.net/docs.html?package=toon-formatter' },
            { id: 3, name: 'package.install', type: 'file', url: 'https://www.npmjs.com/package/toon-formatter' }
        ],
        3: [
            { id: 1, name: 'source.code', type: 'file', url: 'https://github.com/ankitpal181/toon-formatter-py' },
            { id: 2, name: 'documentation.html', type: 'file', url: 'https://toonformatter.net/docs.html?package=toon-parse' },
            { id: 3, name: 'package.install', type: 'file', url: 'https://pypi.org/project/toon-parse/' }
        ],
    };

    const handleItemClick = (item) => {
        if (item.type === 'file') {
            window.open(item.url, '_blank');
        } else if (item.type === 'folder') {
            setCurrentFolder(item.id);
        }
    };

    const currentItems = currentFolder ? (projectFiles[currentFolder] || []) : projects;
    const currentFolderName = currentFolder ? projects.find(p => p.id === currentFolder)?.name : 'Projects';

    return (
        <div className="flex w-full h-full bg-white text-gray-800">
            {/* Sidebar */}
            <div className="w-48 bg-gray-100 border-r border-gray-300 flex flex-col pt-2">
                {sidebarItems.map((item, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-3 px-4 py-1.5 cursor-pointer ${item.active ? 'bg-ubuntu-orange/10 text-ubuntu-orange' : 'hover:bg-gray-200 text-gray-700'} group`}
                    >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                        <Tooltip tooltip="0" className="left-30 -translate-y-1/2 mr-3" />
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Toolbar/Breadcrumb */}
                <div className="h-10 border-b border-gray-200 flex items-center px-4 gap-2 text-sm text-gray-500 bg-white">
                    <div
                        className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer group"
                        onClick={() => setCurrentFolder(null)}
                    >
                        <Home className="w-4 h-4" />
                        <Tooltip tooltip="1" className="left-50 top-5 -translate-y-1/2 mr-3" />
                    </div>
                    <ChevronRight className="w-4 h-4" />
                    <span
                        className={`font-medium ${currentFolder ? 'hover:bg-gray-100 px-2 py-1 rounded cursor-pointer' : 'text-gray-800'}`}
                        onClick={() => setCurrentFolder(null)}
                    >
                        Projects
                    </span>
                    {currentFolder && (
                        <>
                            <ChevronRight className="w-4 h-4" />
                            <span className="font-medium text-gray-800">{currentFolderName}</span>
                        </>
                    )}
                </div>

                {/* Grid View */}
                <div className="p-4 grid grid-cols-4 gap-4 overflow-auto">
                    {currentItems.map((item) => (
                        <div key={item.id} className="flex flex-col items-center gap-1 p-2 hover:bg-ubuntu-orange/10 rounded-lg cursor-pointer group" onClick={() => handleItemClick(item)}>
                            {item.type === 'folder' ? (
                                <Folder className="w-16 h-16 text-ubuntu-orange fill-ubuntu-orange/20" />
                            ) : (
                                <FileText className="w-16 h-16 text-gray-400" />
                            )}
                            <span className="text-sm text-center group-hover:text-ubuntu-orange transition-colors line-clamp-2 w-full break-words">
                                {item.name}
                            </span>
                            <Tooltip tooltip="1" className="mr-45" />
                        </div>
                    ))}
                    {currentItems.length === 0 && (
                        <div className="col-span-4 text-center text-gray-500 mt-10">This folder is empty.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Nautilus;
