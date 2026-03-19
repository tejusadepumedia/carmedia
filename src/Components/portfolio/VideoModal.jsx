import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function VideoModal({ videos, title, onClose }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + videos.length) % videos.length);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 text-white/70 hover:text-white z-50 transition-colors"
      >
        <X size={32} />
      </button>

      {/* Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <p className="text-[#d4a853] text-xs uppercase tracking-[0.3em]">{title}</p>
      </div>

      {/* Left Arrow */}
      {videos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); paginate(-1); }}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 transition-colors"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Right Arrow */}
      {videos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); paginate(1); }}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 transition-colors"
        >
          <ChevronRight size={40} />
        </button>
      )}

      {/* Video */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.video
            key={index}
            src={videos[index]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "tween", duration: 0.35 }, opacity: { duration: 0.2 } }}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] max-w-[90vw] outline-none"
          />
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      {videos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-[#d4a853] w-4" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}