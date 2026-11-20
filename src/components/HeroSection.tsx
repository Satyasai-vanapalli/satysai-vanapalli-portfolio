import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/data/profile";

export default function HeroSection() {
  return (
    <section id="home" className="hero-section section-anchor">
      <div className="hero-glow" aria-hidden="true" />
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="status-dot" /> Portfolio · 2026</p>
          <h1>Curious by nature.<br />Focused on hard<br /><em>problems.</em></h1>
          <p className="hero-intro">
            I’m <strong>Satya Sai</strong> — a computer science student and competitive programmer interested in algorithms and system design.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href={profile.links.resume} download="Satya-Sai-Resume.pdf">
              <Download size={17} /> Download résumé <ArrowUpRight size={15} />
            </a>
            <a className="button button-quiet" href="#work">
              Explore my work <ArrowDownRight size={17} />
            </a>
          </div>

          <div className="hero-socials" aria-label="Social links">
            <span className="social-label">Find me on</span>
            <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={17} /></a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={17} /></a>
            <a href={`mailto:${profile.contact.email}`} aria-label="Email"><Mail size={17} /></a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="portrait-frame">
            <Image
              src={profile.links.photo}
              alt="Portrait of Satya Sai"
              fill
              priority
              sizes="(max-width: 800px) 82vw, 42vw"
              className="portrait-image"
            />
            <div className="portrait-shade" />
            <div className="portrait-caption">
              <div>
                <span className="caption-label">01 / CURRENT CHAPTER</span>
                <strong>Learning. Building. Improving.</strong>
              </div>
              <span className="portrait-year">’27</span>
            </div>
          </div>
          <div className="hero-note hero-note-top"><span className="note-index">01</span><span>Competitive<br />Programming</span></div>
          <div className="hero-note hero-note-bottom"><span className="note-spark">✳</span><span>KL University<br />Vijayawada, India</span></div>
          <div className="hero-orbit" aria-hidden="true"><span>CODE · CRAFT · CURIOSITY ·</span></div>
        </div>
      </div>

      <div className="hero-bottom site-container">
        <span>Computer Science · Class of 2027</span>
        <a href="#about">Scroll to explore <ArrowDown size={15} /></a>
        <span className="hero-bottom-right">Based in India · Open to opportunities</span>
      </div>
    </section>
  );
}
