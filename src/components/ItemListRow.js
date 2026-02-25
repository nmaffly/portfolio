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
    if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
      const video = videoRef.current;
      
      // Set start position
      if (thumbnailVideoStart === "end") {
        startTimeRef.current = Math.max(0, video.duration - thumbnailVideoDuration);
      } else {
        startTimeRef.current = 0;
      }
      
      if (Number.isFinite(startTimeRef.current)) {
        video.currentTime = startTimeRef.current;
      }
      
      // Store the play promise
      playPromiseRef.current = video.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
      // Wait for play promise to resolve before pausing
      if (playPromiseRef.current !== null) {
        playPromiseRef.current
          .then(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              if (Number.isFinite(startTimeRef.current)) {
                videoRef.current.currentTime = startTimeRef.current;
              }
            }
          })
          .catch(() => {
            // Ignore errors if play was already interrupted
          });
        playPromiseRef.current = null;
      } else {
        videoRef.current.pause();
        if (Number.isFinite(startTimeRef.current)) {
          videoRef.current.currentTime = startTimeRef.current;
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
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
    if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
      if (thumbnailVideoStart === "end") {
        const newTime = Math.max(0, videoRef.current.duration - thumbnailVideoDuration);
        if (Number.isFinite(newTime)) {
          videoRef.current.currentTime = newTime;
        }
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
      className="group w-full text-left border border-[#111111] p-6 transition-colors hover:bg-[#E8F1E8] focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
    >
      <div className="flex items-start gap-4">
        <span className="text-sm font-mono text-[#2D5016] flex-shrink-0 mt-1 font-bold">{formattedIndex}</span>
        
        {(thumbnail || thumbnailVideo) && (
          <div className="flex-shrink-0 w-32 h-24 overflow-hidden flex items-center justify-center">
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
                className="w-full h-full object-contain"
              />
            )}
          </div>
        )}
        
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-[#2D5016] group-hover:underline transition-colors">{title}</h3>
          {subtitle && <p className="text-base mb-3">{subtitle}</p>}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, idx) => (
                <span key={idx} className="text-xs font-mono px-2 py-1 border border-[#111111] text-[#111111]">
                  {tag.toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <span className="text-2xl flex-shrink-0 text-gray-400 group-hover:text-[#2D5016] transition-colors">
          →
        </span>
      </div>
    </button>
  );
};

export default ItemListRow;
