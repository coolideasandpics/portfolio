const ProjectFacts = ({ project }) => {
  return (
    <section className="project-detail-facts">
      <div className="project-detail-container project-detail-facts-grid">
        <div>
          <span>Role</span>
          <p>{project.role}</p>
        </div>

        <div>
          <span>Discipline</span>
          <p>{project.discipline}</p>
        </div>

        <div>
          <span>Stack</span>
          <p>{project.stack.join(", ")}</p>
        </div>

        <div>
          <span>Type</span>
          <p>{project.category}</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectFacts;
