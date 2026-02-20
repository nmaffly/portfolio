import React, { useRef } from 'react';

const ItemListRow = ({ 
  index, 
  title, 
  subtitle, 
  tags, 
  onClick, 
  thumbnail, 
  thumbnailVideo,
  thumbnailVideoStart = "end",
  thumbnailVideoDuration = 6
}) => {
  const formattedIndex = String(index).padStart(2, '0');
  const videoRef = useRef(null);
  const startTimeRef = useRef(0);
  const playPromiseRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Set start position
      if (thumbnailVideoStart === "end") {
        startTimeRef.current = Math.max(0, video.duration - thumbnailVideoDuration);
      } else {
        startTimeRef.current = 0;
      }
      
      video.currentTime = startTimeRef.current;
      
      // Store the play promise
      playPromiseRef.current = video.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      // Wait for play promise to resolve before pausing
      if (playPromiseRef.current !== null) {
        playPromiseRef.current
          .then(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = startTimeRef.current;
            }
          })
          .catch(() => {
            // Ignore errors if play was already interrupted
          });
        playPromiseRef.current = null;
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = startTimeRef.current;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const endTime = startTimeRef.current + thumbnailVideoDuration;
      
      // Loop back to start position when we've played the duration
      if (video.currentTime >= endTime || video.currentTime >= video.duration) {
        video.currentTime = startTimeRef.current;
      }
    }
  };

  const handleVideoLoaded = () => {
    // Set initial frame based on thumbnailVideoStart setting
    if (videoRef.current) {
      if (thumbnailVideoStart === "end") {
        videoRef.current.currentTime = Math.max(0, videoRef.current.duration - thumbnailVideoDuration);
      } else {
        videoRef.current.currentTime = 0;
      }
    }
  };
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group w-full text-left border border-[#111111] p-6 transition-colors hover:bg-[#ececea] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
    >
      <div className="flex items-start gap-4">
        <span className="text-sm font-mono text-gray-600 flex-shrink-0 mt-1">{formattedIndex}</span>
        
        {(thumbnail || thumbnailVideo) && (
          <div className="flex-shrink-0 w-48 h-32 overflow-hidden border border-[#111111]">
            {thumbnailVideo ? (
              <video
                ref={videoRef}
                muted
                playsInline
                onLoadedMetadata={handleVideoLoaded}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover"
              >
                <source src={thumbnailVideo} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={thumbnail} 
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
        
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-2 group-hover:underline">{title}</h3>
          {subtitle && <p className="text-base mb-3">{subtitle}</p>}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, idx) => (
                <span key={idx} className="text-xs font-mono text-gray-600">
                  [{tag.toLowerCase()}]
                </span>
              ))}
            </div>
          )}
        </div>
        
        <span className="text-2xl flex-shrink-0 text-gray-400 group-hover:text-[#111111] transition-colors">
          →
        </span>
      </div>
    </button>
  );
};

export default ItemListRow;
