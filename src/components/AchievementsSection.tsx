import { ArrowUpRight, Award, BadgeCheck, Trophy } from "lucide-react";
import { achievements } from "@/data/achievements";
import { certifications } from "@/data/certifications";

export default function AchievementsSection() {
  return (
    <section id="proof" className="section proof-section section-anchor">
      <div className="site-container">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">04 / PROOF OF PRACTICE</p>
            <h2 className="section-title">Progress worth <em>keeping.</em></h2>
          </div>
          <p className="section-lede">A few milestones that reflect the work behind the curiosity.</p>
        </div>

        <div className="proof-layout">
          <article className="achievement-panel">
            <div className="panel-heading"><span className="proof-icon"><Trophy size={19} /></span><div><span className="card-overline">MILESTONE</span><h3>Academic achievement</h3></div></div>
            <div className="achievement-list">
              {achievements.map((achievement) => (
                <div className="achievement-item" key={achievement.id}>
                  <span className="achievement-year">{achievement.date}</span>
                  <div><h4>{achievement.title}</h4><p>{achievement.description}</p></div>
                </div>
              ))}
            </div>
            <div className="achievement-foot"><span>Keep learning, keep moving.</span><span className="asterisk">✳</span></div>
          </article>

          <div className="certification-panel">
            <div className="panel-heading"><span className="proof-icon proof-icon-light"><Award size={19} /></span><div><span className="card-overline">CREDENTIALS</span><h3>Certifications</h3></div><span className="credential-count">{String(certifications.length).padStart(2, "0")}</span></div>
            <div className="certification-list">
              {certifications.map((certification) => (
                <article className="certification-item" key={certification.id}>
                  <span className="certification-check"><BadgeCheck size={17} /></span>
                  <div className="certification-copy"><h4>{certification.name}</h4><p>{certification.issuer} <span>·</span> {certification.date}</p></div>
                  {certification.credentialUrl && (
                    <a href={certification.credentialUrl} target="_blank" rel="noreferrer" aria-label={`View ${certification.name} credential`}><ArrowUpRight size={16} /></a>
                  )}
                </article>
              ))}
            </div>
            <p className="credentials-note">Verified credentials · View each badge for details</p>
          </div>
        </div>
      </div>
    </section>
  );
}
