'use client';

import { useRef, useState } from 'react';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ 
  src = "/eltuhami.MP4", 
  poster = "/video-poster.jpg",
  className = "" 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      id='home'
      className={`relative group cursor-pointer ${className}`}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg shadow-2xl"
        poster={poster}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        muted
        loop
        autoPlay
      >
        <source src={src} type="video/mp4" />
        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-center">
            Video not supported<br />
            <small>Please add a video file to /public/sample-video.mp4</small>
          </span>
        </div>
      </video>
    </div>
  );
}

