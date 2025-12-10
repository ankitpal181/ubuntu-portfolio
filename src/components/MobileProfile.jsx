import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const MobileProfile = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 font-ubuntu overflow-y-auto">
            <header className="flex flex-col items-center mb-10 mt-10">
                <div className="w-32 h-32 bg-gray-700 rounded-full mb-4 flex items-center justify-center border-4 border-ubuntu-orange">
                    {/* Avatar Placeholder */}
                    <span className="text-4xl">AP</span>
                </div>
                <h1 className="text-3xl font-bold">Ankit Pal</h1>
                <h2 className="text-ubuntu-orange text-lg">Senior Frontend Engineer</h2>
            </header>

            <section className="mb-8">
                <h3 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4">About Me</h3>
                <p className="text-gray-300 leading-relaxed">
                    Hello! I'm a developer passionate about building correct, beautiful, and performant web applications.
                    This portfolio is a simulation of the Ubuntu Desktop environment - try opening it on a desktop to see the magic!
                </p>
            </section>

            <section className="mb-8">
                <h3 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4">Projects</h3>
                <div className="grid gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-bold text-ubuntu-orange">E-Commerce App</h4>
                        <p className="text-sm text-gray-400">A full-stack e-commerce solution.</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-bold text-ubuntu-orange">AI-Tool</h4>
                        <p className="text-sm text-gray-400">Generative AI implementation.</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-bold text-ubuntu-orange">Ubuntu Portfolio</h4>
                        <p className="text-sm text-gray-400">The site you are viewing right now.</p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h3 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4">Contact</h3>
                <div className="flex justify-center gap-6">
                    <a href="https://github.com/ankitpal" className="flex flex-col items-center gap-2 hover:text-ubuntu-orange transition-colors">
                        <Github className="w-8 h-8" />
                        <span className="text-xs">GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/ankitpal" className="flex flex-col items-center gap-2 hover:text-ubuntu-orange transition-colors">
                        <Linkedin className="w-8 h-8" />
                        <span className="text-xs">LinkedIn</span>
                    </a>
                    <a href="mailto:email@example.com" className="flex flex-col items-center gap-2 hover:text-ubuntu-orange transition-colors">
                        <Mail className="w-8 h-8" />
                        <span className="text-xs">Email</span>
                    </a>
                </div>
            </section>

            <footer className="text-center text-gray-500 text-sm mt-10">
                <p>© {new Date().getFullYear()} Ankit Pal</p>
                <p>Built with React & Tailwind</p>
            </footer>
        </div>
    );
};

export default MobileProfile;
