import React from 'react';
import { Folder, FileText, ChevronRight, Home, LayoutGrid, Clock, Star } from 'lucide-react';

const Nautilus = () => {
    const sidebarItems = [
        { icon: Home, label: 'Home', active: true },
        { icon: LayoutGrid, label: 'Desktop' },
        { icon: Clock, label: 'Recent' },
        { icon: Star, label: 'Starred' },
    ];

    const projects = [
        { id: 1, name: 'E-Commerce App', type: 'folder' },
        { id: 2, name: 'AI-Tool', type: 'folder' },
        { id: 3, name: 'Portfolio v1', type: 'folder' },
        { id: 4, name: 'Task Manager', type: 'folder' },
        { id: 5, name: 'about.txt', type: 'file' },
        { id: 6, name: 'resume.pdf', type: 'file' },
    ];

    return (
        <div className="flex w-full h-full bg-white text-gray-800">
            {/* Sidebar */}
            <div className="w-48 bg-gray-100 border-r border-gray-300 flex flex-col pt-2">
                {sidebarItems.map((item, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-3 px-4 py-1.5 cursor-pointer ${item.active ? 'bg-ubuntu-orange/10 text-ubuntu-orange' : 'hover:bg-gray-200 text-gray-700'}`}
                    >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Toolbar/Breadcrumb placeholder */}
                <div className="h-10 border-b border-gray-200 flex items-center px-4 gap-2 text-sm text-gray-500 bg-white">
                    <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                        <Home className="w-4 h-4" />
                    </div>
                    <ChevronRight className="w-4 h-4" />
                    <span className="font-medium text-gray-800">Projects</span>
                </div>

                {/* Grid View */}
                <div className="p-4 grid grid-cols-4 gap-4 overflow-auto">
                    {projects.map((item) => (
                        <div key={item.id} className="flex flex-col items-center gap-1 p-2 hover:bg-ubuntu-orange/10 rounded-lg cursor-pointer group">
                            {item.type === 'folder' ? (
                                <Folder className="w-16 h-16 text-ubuntu-orange fill-ubuntu-orange/20" />
                            ) : (
                                <FileText className="w-16 h-16 text-gray-400" />
                            )}
                            <span className="text-sm text-center group-hover:text-ubuntu-orange transition-colors line-clamp-2 w-full break-words">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Nautilus;
