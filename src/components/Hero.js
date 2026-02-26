import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

function Hero() {
    const [displayedText, setDisplayedText] = useState('');
    const [showContent, setShowContent] = useState(false);
    const fullName = 'Nathaniel Maffly';

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullName.length) {
                setDisplayedText(fullName.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => setShowContent(true), 300);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="col-span-12 lg:col-span-8">
            <h1 className="text-7xl font-bold mb-8 leading-tight tracking-tight inline-block bg-[#2D5016] text-white px-2 py-0.5 min-h-[1.2em]">
                {displayedText}
            </h1>
            <div 
                className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}
            >
                <p className="text-2xl mb-8 leading-relaxed">
                    Software Engineer who builds systems that turn raw data into usable intelligence.
                </p>
                
                <div className="mt-12 mb-12">
                    <h2 className="text-2xl font-bold mb-6 inline-block bg-[#2D5016] text-white px-2 py-0.5">
                        What I Build
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex text-lg leading-relaxed">
                            <span className="mr-3 text-[#2D5016]">—</span>
                            <span>AI systems grounded in structured data</span>
                        </li>
                        <li className="flex text-lg leading-relaxed">
                            <span className="mr-3 text-[#2D5016]">—</span>
                            <span>Data pipelines that turn raw signals into decision tools</span>
                        </li>
                        <li className="flex text-lg leading-relaxed">
                            <span className="mr-3 text-[#2D5016]">—</span>
                            <span>Applied analytics products for real stakeholders</span>
                        </li>
                    </ul>
                </div>

                <div className="mt-12 mb-12">
                    <h2 className="text-2xl font-bold mb-6 inline-block bg-[#2D5016] text-white px-2 py-0.5">
                        Core Technologies
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <span className="text-sm font-mono px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] font-semibold">Python</span>
                        <span className="text-sm font-mono px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] font-semibold">JavaScript</span>
                        <span className="text-sm font-mono px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] font-semibold">SQL</span>
                        <span className="text-sm font-mono px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] font-semibold">React</span>
                        <span className="text-sm font-mono px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] font-semibold">Flask</span>
                        <span className="text-sm font-mono px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] font-semibold">LangChain</span>
                        <span className="text-sm font-mono px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] font-semibold">PyTorch</span>
                    </div>
                </div>

                <div className="mt-12 mb-12">
                    <h2 className="text-2xl font-bold mb-6 inline-block bg-[#2D5016] text-white px-2 py-0.5">
                        Outside of Work
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex text-lg leading-relaxed">
                            <span className="mr-3 text-[#2D5016]">—</span>
                            <span>Hooper: play pickup basketball several times a week</span>
                        </li>
                        <li className="flex text-lg leading-relaxed">
                            <span className="mr-3 text-[#2D5016]">—</span>
                            <span>Outdoorsman: hiking, backpacking, and getting outside whenever possible</span>
                        </li>
                        <li className="flex text-lg leading-relaxed">
                            <span className="mr-3 text-[#2D5016]">—</span>
                            <span>Self-proclaimed DJ: curating playlists and exploring new music</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`flex gap-6 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                <a
                    href={portfolioData.intro.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#111111] px-6 py-3 hover:bg-[#111111] hover:text-[#f7f7f5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                >
                    GITHUB
                </a>
                <a
                    href={portfolioData.intro.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#111111] px-6 py-3 hover:bg-[#111111] hover:text-[#f7f7f5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                >
                    LINKEDIN
                </a>
                <a
                    href={`mailto:${portfolioData.intro.links.email}`}
                    className="border border-[#111111] px-6 py-3 hover:bg-[#111111] hover:text-[#f7f7f5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                >
                    EMAIL
                </a>
            </div>
        </div>
    );
}

export default Hero;