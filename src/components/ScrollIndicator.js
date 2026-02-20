import React, { useEffect, useState } from 'react';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setIsVisible(false);
      }
    };

    const container = document.getElementById('chapters-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('keydown', handleKeyPress);

    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('keydown', handleKeyPress);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[45] flex flex-col items-end gap-3 animate-pulse pointer-events-none">
      <div className="text-right">
        <p className="text-sm font-mono mb-1">SCROLL OR USE ARROW KEYS</p>
        <p className="text-xs">← →</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="border border-[#111111] px-4 py-2 bg-[#f7f7f5]">
          <span className="text-2xl">→</span>
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
