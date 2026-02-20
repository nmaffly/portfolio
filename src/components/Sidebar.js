import React from 'react';
import { portfolioData } from '../data/portfolio';

const SECTIONS = [
  { id: 0, name: 'HOME' },
  { id: 1, name: 'PROJECTS' },
  { id: 2, name: 'EXPERIENCE' },
  { id: 3, name: 'nateAI' }
];

const Sidebar = ({ currentChapter, onNavigate }) => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-2/12 min-w-[200px] bg-[#f7f7f5] border-r border-[#111111] pt-24 px-6 z-40">
      <nav className="mb-12">
        <ul className="space-y-1">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onNavigate(section.id)}
                className={`w-full text-left py-2 font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] ${
                  currentChapter === section.id
                    ? 'text-[#1d4ed8] underline font-bold'
                    : 'text-[#111111] hover:text-[#1d4ed8]'
                }`}
              >
                {section.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-[#111111] pt-6 mb-8">
        <p className="text-xs font-mono mb-3 text-gray-600">NAVIGATE</p>
        <p className="text-xs font-mono">← → keys</p>
        <p className="text-xs font-mono">HOME / END</p>
      </div>

      <div className="border-t border-[#111111] pt-6">
        <p className="text-xs font-mono mb-3 text-gray-600">LINKS</p>
        <ul className="space-y-2">
          <li>
            <a
              href={portfolioData.intro.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono hover:underline focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
            >
              GITHUB ↗
            </a>
          </li>
          <li>
            <a
              href={portfolioData.intro.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono hover:underline focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
            >
              LINKEDIN ↗
            </a>
          </li>
          <li>
            <a
              href={`mailto:${portfolioData.intro.links.email}`}
              className="text-xs font-mono hover:underline focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
            >
              EMAIL ↗
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
