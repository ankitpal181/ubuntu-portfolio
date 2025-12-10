import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';

const Window = ({ id, title, children, isOpen, isMinimized, isActive, onClose, onMinimize, onMaximize, onFocus, style = {} }) => {
    if (!isOpen && !isMinimized) return null;

    return (
        <AnimatePresence>
            {(isOpen && !isMinimized) && (
                <motion.div
                    drag
                    dragMomentum={false}
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    onMouseDown={onFocus}
                    className={`absolute flex flex-col bg-[#F7F7F7] rounded-lg shadow-2xl overflow-hidden ${isActive ? 'z-50' : 'z-40'}`}
                    style={{
                        width: style.width || 800,
                        height: style.height || 500,
                        // Center by default if no position provided logic usually handles this, 
                        // but drag controls position after.
                        top: 100,
                        left: 200,
                        ...style
                    }}
                >
                    {/* Window Header */}
                    <div
                        className={`h-[38px] bg-[#EBEBEB] border-b border-gray-300 flex items-center justify-between px-3 select-none ${isActive ? 'bg-[#E1E1E1]' : ''}`}
                    // Drag handle usually needs clear target, framer drag prop makes whole div draggable by default.
                    // We will restrict drag to header ideally, but for now whole window draggable is easier with framer-motion defaults 
                    // unless using dragControls. For simplicity, whole window is handle for this step or we add dragListener={false} to parent and true to header.
                    >
                        <div className="font-ubuntu font-bold text-gray-700 text-sm flex-1 text-center pointer-events-none">
                            {title}
                        </div>

                        <div className="flex items-center gap-2 absolute right-3">
                            <button onClick={(e) => { e.stopPropagation(); onMinimize(id); }} className="w-6 h-6 rounded-full hover:bg-gray-300 flex items-center justify-center transition-colors">
                                <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); onMaximize && onMaximize(id); }} className="w-6 h-6 rounded-full hover:bg-gray-300 flex items-center justify-center transition-colors">
                                <Square className="w-3 h-3 text-gray-600" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); onClose(id); }} className="w-6 h-6 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors group">
                                <X className="w-3 h-3 text-gray-600 group-hover:text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Window Content */}
                    <div className="flex-1 overflow-auto bg-white cursor-default" onMouseDown={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Window;
