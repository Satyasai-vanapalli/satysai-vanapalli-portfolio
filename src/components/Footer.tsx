import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <a className="brand footer-brand" href="#home" aria-label="Satya Sai, back to top"><span className="brand-mark">S<span>.</span></span><span className="brand-name">Satya Sai</span></a>
        <p>Building scalable applications<br />and solving complex problems.</p>
        <div className="footer-links">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={17} /></a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={17} /></a>
          <a href={`mailto:${profile.contact.email}`} aria-label="Email"><Mail size={17} /></a>
          <a className="back-top" href="#home">Back to top <ArrowUpRight size={14} /></a>
        </div>
      </div>
      <div className="site-container footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><span>Designed with intention · Built with Next.js</span></div>
    </footer>
  );
}
