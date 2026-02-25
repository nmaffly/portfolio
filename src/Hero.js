import React, { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolio';

function Hero() {
    const [displayedText, setDisplayedText] = useState('');
    const [showContent, setShowContent] = useState(false);
    const fullName = 'Nate Maffly';

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
                <p className="text-2xl mb-6 leading-relaxed">
                    Engineer who builds systems that turn raw data into usable intelligence.
                </p>
                <p className="text-xl mb-12 leading-relaxed italic">
                    (also a hiker, hooper, and music-lover)
                </p>
            </div>
            <div className={`flex gap-6 mt-16 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
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