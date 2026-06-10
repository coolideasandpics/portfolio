const ProjectHero = ({ project }) => {
  const heroImage = project.heroImage || project.thumbnail;

  return (
    <section className="project-detail-hero">
      <div className="project-detail-container">
        <p className="project-detail-kicker">
          {project.category} / {project.year}
        </p>

        <h1 className="project-detail-title">{project.title}</h1>

        <p className="project-detail-summary">{project.shortDescription}</p>

        {heroImage && (
          <div className="project-detail-media">
            <img src={heroImage} alt={project.title} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectHero;
