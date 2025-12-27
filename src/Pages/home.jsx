import Navigation from "/src/components/portfolio/Navigation";
import HeroSection from "/src/components/portfolio/HeroSection";
import GallerySection from "/src/components/portfolio/GallerySection";
import AboutSection from "/src/components/portfolio/AboutSection";
import SocialLinks from "/src/components/portfolio/SocialLinks";
import Footer from "/src/components/portfolio/Footer";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <HeroSection />
      <GallerySection />
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
