import { ArrowRight, ArrowUpRight, Code2, Layers3 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export default function ProjectsSection() {
  return (
    <section id="work" className="section work-section section-anchor">
      <div className="site-container">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">02 / SELECTED WORK</p>
            <h2 className="section-title">Ideas, made <em>real.</em></h2>
          </div>
          <a className="text-link" href={profile.links.github} target="_blank" rel="noreferrer">
            Browse GitHub <ArrowUpRight size={15} />
          </a>
        </div>

        {projects.length === 0 ? (
          <article className="work-feature">
            <div className="work-copy">
              <span className="work-status"><span className="status-dot" /> PROJECT LOG · IN PROGRESS</span>
              <h3>A thoughtful project<br /><em>is taking shape.</em></h3>
              <p>I’m working on a few things I’m excited to share. Full case studies will land here as they’re ready; for now, explore the code and experiments on GitHub.</p>
              <a className="button button-lime" href={profile.links.github} target="_blank" rel="noreferrer">
                <FaGithub size={17} /> Explore my repositories <ArrowRight size={16} />
              </a>
            </div>
            <div className="work-art" aria-hidden="true">
              <div className="terminal-card">
                <div className="terminal-top"><span /><span /><span /><b>build-notes.java</b></div>
                <div className="terminal-code">
                  <span><i>01</i> <b>class</b> NextChapter {'{'}</span>
                  <span><i>02</i> &nbsp;  String focus = <em>"build"</em>;</span>
                  <span><i>03</i> &nbsp;  void explore() {'{'}</span>
                  <span><i>04</i> &nbsp;  &nbsp;  learn();</span>
                  <span><i>05</i> &nbsp;  {'}'}</span>
                  <span><i>06</i> {'}'}</span>
                </div>
                <div className="terminal-footer"><Code2 size={14} /> A work in progress <span>↗</span></div>
              </div>
              <span className="work-art-orb" />
              <span className="work-art-label">BUILD<br />IN PUBLIC</span>
            </div>
          </article>
        ) : (
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.id}>
                <div className={`project-image project-image-art project-image-art-${project.visual}`} aria-hidden="true">
                  {project.visual === "system-design" ? <Layers3 size={48} strokeWidth={1.4} /> : <Code2 size={48} strokeWidth={1.4} />}
                  <span className="project-art-label">{project.coverLabel}</span>
                  <span className="project-index">0{index + 1}</span>
                </div>
                <div className="project-content">
                  <span className="card-overline">{project.techStack.join(" · ")}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-links">
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source <ArrowUpRight size={14} /></a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={14} /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
