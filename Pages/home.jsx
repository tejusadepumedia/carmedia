import Navigation from "/components/portfolio/Navigation";
import HeroSection from "/components/portfolio/HeroSection";
import GallerySection from "/components/portfolio/GallerySection";
import AboutSection from "/components/portfolio/AboutSection";
import SocialLinks from "/components/portfolio/SocialLinks";
import Footer from "/components/portfolio/Footer";

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
