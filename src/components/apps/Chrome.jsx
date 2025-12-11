import React from 'react';
import { Download } from 'lucide-react';
import Tooltip from '../ui/MicroUI';

const Chrome = () => {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* Fake Address Bar */}
            <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-4 gap-2">
                <div className="flex-1 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600">
                    https://ankitpal181.github.io/resume.pdf
                </div>
                <div className="flex justify-center group">
                    <a href="https://drive.usercontent.google.com/u/0/uc?id=1aWEtL1Mn4OcCRScb48yWbTDdk2NzfkVs&export=download" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                        <Download className="w-4 h-4" />
                    </a>
                    <Tooltip tooltip='1' className='top-20 -translate-y-1/2 mr-3' />
                </div>
            </div>

            {/* Content area */}
            <div className="flex-1 bg-gray-200">
                <iframe
                    src="https://drive.google.com/file/d/1aWEtL1Mn4OcCRScb48yWbTDdk2NzfkVs/preview"
                    width="100%"
                    height="100%"
                    className="border-none"
                    title="Resume PDF"
                ></iframe>
            </div>
        </div>
    );
};

export default Chrome;
