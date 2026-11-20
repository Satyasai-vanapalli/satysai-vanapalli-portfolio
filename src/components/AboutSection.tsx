import { GraduationCap, MapPin, MoveUpRight, Target } from "lucide-react";
import { profile } from "@/data/profile";

export default function AboutSection() {
  return (
    <section id="about" className="section about-section section-anchor">
      <div className="site-container">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">01 / A LITTLE ABOUT ME</p>
            <h2 className="section-title">Curious by default.<br /><em>Practical by design.</em></h2>
          </div>
          <p className="section-lede">
            I enjoy the space where clear thinking meets useful software. I’m learning by building, solving, and refining the details that make products dependable.
          </p>
        </div>

        <div className="about-layout">
          <article className="about-story">
            <span className="card-overline">MY APPROACH</span>
            <p>
              {profile.tagline}. I’m building depth in data structures and system design while practicing problem solving through coding contests.
            </p>
            <div className="interest-list">
              {profile.interests.map((interest) => <span key={interest}>{interest}</span>)}
            </div>
            <a className="text-link" href="#toolkit">A look at my toolkit <MoveUpRight size={15} /></a>
          </article>

          <div className="about-details">
            <article className="detail-card">
              <span className="detail-icon"><GraduationCap size={19} /></span>
              <div><span className="card-overline">EDUCATION</span><h3>{profile.education.degree}</h3><p>{profile.education.college} · Class of {profile.education.graduationYear}</p></div>
            </article>
            <article className="detail-card">
              <span className="detail-icon"><MapPin size={19} /></span>
              <div><span className="card-overline">LOCATION</span><h3>{profile.contact.location}</h3><p>Available for remote work and relocation</p></div>
            </article>
            <article className="detail-card detail-card-focus">
              <span className="detail-icon"><Target size={19} /></span>
              <div><span className="card-overline">CURRENT FOCUS</span><div className="focus-list">{profile.currentFocus.map((focus) => <span key={focus}>{focus}</span>)}</div></div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
