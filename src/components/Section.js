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
              <h2 className="text-5xl font-bold tracking-tight">{title}</h2>
              {metadata && (
                <span className="text-xs font-mono text-gray-600">{metadata}</span>
              )}
            </div>
            {subtitle && (
              <>
                <p className="text-base mt-4 max-w-2xl mb-4">{subtitle}</p>
                <div className="w-full h-[1px] bg-[#111111]"></div>
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
