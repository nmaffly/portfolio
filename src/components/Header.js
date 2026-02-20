import React from 'react';

const CHAPTER_NAMES = ['HOME', 'PROJECTS', 'EXPERIENCE', 'EXPERIMENTS', 'CHAT'];

const Header = ({ name, descriptor, currentChapter, totalChapters }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f7f5] border-b border-[#111111]">
      <div className="ml-[16.666667%] px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold tracking-tight leading-none">{name}</h1>
          <p className="text-sm mt-1">{descriptor}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-mono">
            {currentChapter + 1} / {totalChapters} — {CHAPTER_NAMES[currentChapter]}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
