import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function SlideshowModal({ images, onClose }) {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Responsive detection (safe + reactive)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const swipeThreshold = isMobile ? 60 : 120;
  const imageIndex = (index + images.length) % images.length;

  const paginate = (dir) => {
    setIndex([index + dir, dir]);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 text-white z-50"
      >
        <X size={32} />
      </button>

      {/* Arrows (desktop only) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          paginate(-1);
        }}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          paginate(1);
        }}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50"
      >
        <ChevronRight size={40} />
      </button>

      {/* Mobile hint */}
      {isMobile && (
        <div className="absolute top-[70%] text-white/60 text-2xl font-medium tracking-wide z-40">
          Swipe left or right
        </div>
      )}

      {/* Image */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.img
            key={imageIndex}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.35 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(e, info) => {
              if (info.offset.x > swipeThreshold) paginate(-1);
              else if (info.offset.x < -swipeThreshold) paginate(1);
            }}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
