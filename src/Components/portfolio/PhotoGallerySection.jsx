import { useState, useEffect } from "react";
import SlideshowModal from "./SlideshowModal";

const imageModules = import.meta.glob("../../photos_compressed/**/**/*.webp", {
  eager: true,
});

export default function GallerySection() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const grouped = {};

    Object.entries(imageModules).forEach(([path, mod]) => {
      const folder = path.split("/").at(-2);
      if (!grouped[folder]) grouped[folder] = [];
      grouped[folder].push(mod.default);
    });

    Object.values(grouped).forEach((imgs) => imgs.sort());

    const photoArray = Object.entries(grouped).map(
      ([folder, images], i) => ({
        id: i,
        title: folder,
        cover: images[0],
        slides: images,
      })
    );

    setPhotos(photoArray);
  }, []);

  return (
    <section id="photogallery" className="bg-[#0a0a0a] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[#d4a853] text-xs uppercase tracking-[0.4em] mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Selected Works
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative cursor-pointer overflow-hidden group"
            >
              <img
                src={photo.cover}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
            </div>
          ))}
        </div>
      </div>

      {/* Slideshow Modal */}
      {selectedPhoto && (
        <SlideshowModal
          images={selectedPhoto.slides}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </section>
  );
}
