import { useState, useEffect, useRef } from "react";
import VideoModal from "./VideoModal";

const videoModules = import.meta.glob("../../videos/*.{mp4,webm,mov}", {
  eager: true,
});

export default function VideoGallerySection() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const videoArray = Object.entries(videoModules).map(([path, mod], i) => {
      const filename = path.split("/").at(-1).replace(/\.[^.]+$/, "");
      return {
        id: i,
        title: filename,
        src: mod.default,
        allFiles: [mod.default],
      };
    });

    setVideos(videoArray);
  }, []);

  return (
    <section id="videogallery" className="bg-[#0f0f0f] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[#d4a853] text-xs uppercase tracking-[0.4em] mb-4">
            Footage
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Video Gallery
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {videos.map((video) => (
            <VideoThumbnail
              key={video.id}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedVideo && (
        <VideoModal
          videos={selectedVideo.allFiles}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}

function VideoThumbnail({ video, onClick }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer overflow-hidden group"
    >
      <video
        ref={videoRef}
        src={video.src}
        muted
        playsInline
        loop
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full border border-white/60 flex items-center justify-center group-hover:border-[#d4a853] transition-colors duration-300">
          <svg className="w-4 h-4 text-white group-hover:text-[#d4a853] ml-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs uppercase tracking-wider">{video.title}</p>
      </div>
    </div>
  );
}