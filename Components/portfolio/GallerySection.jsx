import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const photos = [
  {
    id: 1,
    src: "/components/portfolio/photos/DSC05345.png",
    alt: "Nissan GT-R by Lake",
    span: "col-span-2 row-span-2"
  },
  {
    id: 2,
    src: "/components/portfolio/photos/DSC05539.png",
    alt: "White GT-R Sunset",
    span: "col-span-1 row-span-1"
  },
  {
    id: 3,
    src: "/components/portfolio/photos/DSC05557.png",
    alt: "Lamborghini Revuelto Front",
    span: "col-span-1 row-span-2"
  },
  {
    id: 4,
    src: "/components/portfolio/photos/DSC05573.png",
    alt: "Lamborghini Revuelto Side",
    span: "col-span-1 row-span-1"
  },
  {
    id: 5,
    src: "/components/portfolio/photos/DSC05581.png",
    alt: "Lamborghini Doors Up",
    span: "col-span-2 row-span-1"
  },
  {
    id: 6,
    src: "/components/portfolio/photos/DSC05638.png",
    alt: "Lamborghini Wide Shot",
    span: "col-span-1 row-span-1"
  },
  {
    id: 7,
    src: "/components/portfolio/photos/DSC05671.png",
    alt: "Lamborghini Badge Detail",
    span: "col-span-1 row-span-1"
  },
  {
    id: 8,
    src: "/components/portfolio/photos/DSC05765.png",
    alt: "Lamborghini Headlight",
    span: "col-span-1 row-span-1"
  },
  {
    id: 9,
    src: "/components/portfolio/photos/DSC05840.png",
    alt: "Lamborghini Wheel Detail",
    span: "col-span-1 row-span-1"
  },
  {
    id: 10,
    src: "/components/portfolio/photos/DSC05949.png",
    alt: "Lamborghini Interior",
    span: "col-span-2 row-span-1"
  },
  {
    id: 11,
    src: "/components/portfolio/photos/DSC05978.png",
    alt: "Lamborghini Hood",
    span: "col-span-2 row-span-1",
    style: { width: "50%", height: "auto" }
  }
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
          <p className="text-[#d4a853] text-xs uppercase tracking-[0.4em] mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-light text-white">Selected Works</h2>
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
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ imageRendering: 'high-quality' }}
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

      {/* Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            className="max-w-full max-h-[90vh] object-contain"
            style={{ imageRendering: 'high-quality' }}
          />
        </motion.div>
      )}
    </section>
  );
}
