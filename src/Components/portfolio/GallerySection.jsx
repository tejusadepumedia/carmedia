import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Import all compressed images
const imageModules = import.meta.glob("../../photos_compressed/**/**/*.webp", {
  eager: true,
});

const swipeConfidenceThreshold = 100;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export default function GallerySection() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const grouped = {};

    Object.entries(imageModules).forEach(([path, module]) => {
      const folder = path.split("/").at(-2);
      if (!grouped[folder]) grouped[folder] = [];
      grouped[folder].push(module.default);
    });

    Object.values(grouped).forEach((imgs) => imgs.sort());

    setPhotos(
      Object.entries(grouped).map(([folder, images], i) => ({
        id: i + 1,
        title: folder,
        cover: images[0],
        slides: images,
        alt: folder,
        span: "col-span-1 row-span-1",
      }))
    );
  }, []);

  const openGallery = (photo) => {
    setSelectedPhoto(photo);
    setCurrentIndex(0);
    setPage([0, 0]);
  };

  const paginate = (dir) => {
    setPage(([p]) => [p + dir, dir]);
    setCurrentIndex((i) =>
      (i + dir + selectedPhoto.slides.length) % selectedPhoto.slides.length
    );
  };

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "Escape") setSelectedPhoto(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedPhoto]);

  return (
    <section id="gallery" className="bg-[#0a0a0a] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#d4a853] text-xs uppercase tracking-[0.4em] mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Selected Works
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => openGallery(photo)}
              className="relative cursor-pointer overflow-hidden"
            >
              <img
                src={photo.cover}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence initial={false} custom={direction}>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              className="absolute top-6 right-6 text-white z-50"
            >
              <X size={32} />
            </button>

            {/* Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50"
            >
              <ChevronLeft size={48} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50"
            >
              <ChevronRight size={48} />
            </button>

            {/* Drag Container */}
            <motion.div
              className="relative w-full max-w-5xl flex justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) paginate(1);
                else if (swipe > swipeConfidenceThreshold) paginate(-1);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={page}
                  src={selectedPhoto.slides[currentIndex]}
                  custom={direction}
                  variants={{
                    enter: (d) => ({
                      x: d > 0 ? 300 : -300,
                      opacity: 0,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                    },
                    exit: (d) => ({
                      x: d > 0 ? -300 : 300,
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="max-h-[90vh] object-contain select-none pointer-events-none"
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
