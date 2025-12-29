import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Import all compressed images
const imageModules = import.meta.glob("/src/photos_compressed/**/**/*.webp", {
  eager: true,
});

export default function GallerySection() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const grouped = {};

  Object.entries(imageModules).forEach(([path, module]) => {
    // path example: "../../photos_compressed/supra/1.webp"
    // split and take the folder name
    const parts = path.split("/");
    const folder = parts[parts.length - 2]; // second-to-last = folder

    if (!grouped[folder]) grouped[folder] = [];
    grouped[folder].push(module.default);
  });

  // Sort images in each folder
  Object.keys(grouped).forEach(folder => {
    grouped[folder].sort(); 
  });

  const photoArray = Object.entries(grouped).map(([folderName, images], index) => ({
    id: index + 1,
    title: folderName,
    cover: images[0],   // first image = tile cover
    slides: images,     // all images in this folder = slideshow
    alt: folderName,
    span: "col-span-1 row-span-1",
  }));

  setPhotos(photoArray);
}, []);


  const openGallery = (photo) => {
    setSelectedPhoto(photo);
    setCurrentIndex(0);
  };

  const closeGallery = () => setSelectedPhoto(null);

  const next = () => {
    setCurrentIndex((i) => (i + 1) % selectedPhoto.slides.length);
  };

  const prev = () => {
    setCurrentIndex((i) =>
      (i - 1 + selectedPhoto.slides.length) % selectedPhoto.slides.length
    );
  };

  return (
    <section id="gallery" className="bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-[#d4a853] text-xs uppercase tracking-[0.4em] mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Selected Works
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${photo.span}`}
              onClick={() => openGallery(photo)}
            >
              <img
                src={photo.cover}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#d4a853] rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Slideshow */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); closeGallery(); }}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 text-white text-4xl"
            >
              ‹
            </button>

            {/* Image */}
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={selectedPhoto.slides[currentIndex]}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-6 text-white text-4xl"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
