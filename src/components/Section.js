import React from 'react';

const Section = ({ id, index, title, subtitle, metadata, children }) => {
  return (
    <section
      id={`section-${index}`}
      className="min-w-full h-screen flex-shrink-0 snap-start overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto px-8 pt-32 pb-16">
        {title && (
          <div className="mb-12">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-5xl font-bold tracking-tight inline-block bg-[#2D5016] text-white px-2 py-0.5">{title}</h2>
              {metadata && (
                <span className="text-xs font-mono text-[#2D5016] font-semibold">{metadata}</span>
              )}
            </div>
            {subtitle && (
              <>
                <p className="text-base mt-4 max-w-4xl mb-4">{subtitle}</p>
                <div className="w-full h-[2px] bg-[#2D5016]"></div>
              </>
            )}
          </div>
        )}
        <div className="grid grid-cols-12 gap-6">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
