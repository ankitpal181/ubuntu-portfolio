import React from 'react';
import { ExternalLink } from 'lucide-react';

const Chrome = () => {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* Fake Address Bar */}
            <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-4 gap-2">
                <div className="flex-1 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600">
                    https://ankitpal.dev/resume.pdf
                </div>
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-10">
                <div className="bg-white shadow-xl w-full max-w-3xl h-full border border-gray-200 p-8 overflow-auto">
                    <h1 className="text-3xl font-bold mb-4">Ankit Pal</h1>
                    <h2 className="text-xl text-gray-600 mb-6">Senior Frontend Engineer</h2>

                    <hr className="my-6" />

                    <h3 className="font-bold uppercase text-gray-500 text-sm mb-2">Summary</h3>
                    <p className="mb-4">Experienced developer specializing in React, UX Design, and web simulation interfaces...</p>

                    <h3 className="font-bold uppercase text-gray-500 text-sm mb-2">Experience</h3>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Tech Corp Inc.</span>
                            <span className="text-sm text-gray-500">2023 - Present</span>
                        </div>
                        <p className="text-sm">Leading frontend architecture...</p>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
                            <ExternalLink className="w-4 h-4" /> Download PDF
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chrome;
