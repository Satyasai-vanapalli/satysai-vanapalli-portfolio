import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import CodingProfilesSection from "@/components/CodingProfilesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="site-main">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <CodingProfilesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
