import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectsGalleryCard = ({
  project,
  index,
  showNumber = true,
  onNumberClick,
}) => {
  const [isRightHovered, setIsRightHovered] = useState(false);

  return (
    <Link
      to={`/projects/${project.id}`}
      className="feature-project-link"
      style={{ "--number-offset": `${index * 4.25}rem` }}
    >
      <article
        className={`feature-project-card ${
          isRightHovered ? "is-right-hovered" : ""
        }`}
      >
        <div className="feature-project-left">
          <div className="feature-project-copy">
            <h2 className="feature-project-title">{project.title}</h2>

            <p className="feature-project-description">
              {project.shortDescription}
            </p>
          </div>

          <div className="feature-project-meta">
            <div className="meta-row">
              <span className="meta-label">Role</span>
              <p className="meta-value">{project.role}</p>
            </div>

            <div className="meta-row">
              <span className="meta-label">Discipline</span>
              <p className="meta-value">{project.discipline}</p>
            </div>
          </div>

          <div className="feature-project-tags">
            {project.stack.map((item) => (
              <span key={item} className="stack-pill">
                {item}
              </span>
            ))}
          </div>

          <span className="feature-project-cta">View Project</span>
        </div>

        <div
          className="feature-project-right"
          onMouseEnter={() => setIsRightHovered(true)}
          onMouseLeave={() => setIsRightHovered(false)}
          onFocus={() => setIsRightHovered(true)}
          onBlur={() => setIsRightHovered(false)}
        >
          {showNumber && (
            <span
              className="feature-project-number"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNumberClick(index);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onNumberClick(index);
                }
              }}
            >
              {project.number}
            </span>
          )}

          <div className="feature-project-image-wrap">
            <img src={project.thumbnail} alt={project.title} />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProjectsGalleryCard;
