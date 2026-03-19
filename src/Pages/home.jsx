import Navigation from "/src/components/portfolio/Navigation";
import HeroSection from "/src/components/portfolio/HeroSection";
import GallerySection from "/src/components/portfolio/PhotoGallerySection";
import VideoGallerySection from "/src/components/portfolio/VideoGallerySection";
import AboutSection from "/src/components/portfolio/AboutSection";
import SocialLinks from "/src/components/portfolio/SocialLinks";
import Footer from "/src/components/portfolio/Footer";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <HeroSection />
      <GallerySection />
      <VideoGallerySection />
      <div id="about">
        <AboutSection />
      </div>
      <div id="connect">
        <SocialLinks />
      </div>
      <Footer />
    </div>
  );
}