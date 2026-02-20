import { useState, useEffect, useCallback } from 'react';

export const useChapterNav = (totalChapters) => {
  const [currentChapter, setCurrentChapter] = useState(0);

  const scrollToChapter = useCallback((index) => {
    const section = document.getElementById(`section-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentChapter < totalChapters - 1) {
        const nextChapter = currentChapter + 1;
        setCurrentChapter(nextChapter);
        scrollToChapter(nextChapter);
      } else if (e.key === 'ArrowLeft' && currentChapter > 0) {
        const prevChapter = currentChapter - 1;
        setCurrentChapter(prevChapter);
        scrollToChapter(prevChapter);
      } else if (e.key === 'Home') {
        setCurrentChapter(0);
        scrollToChapter(0);
      } else if (e.key === 'End') {
        setCurrentChapter(totalChapters - 1);
        scrollToChapter(totalChapters - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter, totalChapters, scrollToChapter]);

  // Track scroll position to update current chapter
  useEffect(() => {
    const container = document.getElementById('chapters-container');
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const sectionWidth = container.offsetWidth;
      const newChapter = Math.round(scrollLeft / sectionWidth);
      if (newChapter !== currentChapter) {
        setCurrentChapter(newChapter);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentChapter]);

  return { currentChapter, scrollToChapter };
};
