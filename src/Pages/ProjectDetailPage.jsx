import { useParams, Link } from "react-router-dom";
import { projects } from "../constants/index.js";
import ProjectHero from "../Components/projects/ProjectHero.jsx";
import ProjectFacts from "../Components/projects/ProjectFacts.jsx";
import OocaaSections from "../Components/projects/OocaaSections.jsx";
import StudentYuSections from "../Components/projects/StudentYuSections.jsx";
import MokatailSections from "../Components/projects/MokatailSections.jsx";
import CampaignGraphicsSections from "../Components/projects/CampaignGraphicsSections.jsx";
import "./ProjectDetailPage.css";
import PageFooter from "../Components/page-footer/PageFooter.jsx";
import "../Components/page-footer/PageFooter.css";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const projectIndex = projects.findIndex((item) => item.id === projectId);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <main className="project-detail-page">
        <div className="project-detail-container">
          <h1>Project not found.</h1>
          <Link to="/projects">Back to Projects</Link>
        </div>
      </main>
    );
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  const renderProjectSections = () => {
    switch (project.id) {
      case "oocaa":
        return <OocaaSections project={project} />;
      case "studentyu":
        return <StudentYuSections project={project} />;
      case "mokatail":
        return <MokatailSections project={project} />;
      case "campaign-graphics":
        return <CampaignGraphicsSections project={project} />;
      default:
        return null;
    }
  };

  return (
    <main className={`project-detail-page project-${project.id}`}>
      <ProjectHero project={project} />

      <ProjectFacts project={project} />

      {renderProjectSections()}

      <section className="project-detail-next-section">
        <div className="project-detail-container project-detail-next-content">
          <Link
            to={`/projects/${nextProject.id}`}
            className="project-detail-next-text"
            aria-label={`View next project: ${nextProject.title}`}
          >
            next / {nextProject.title}
          </Link>

          <Link
            to={`/projects/${nextProject.id}`}
            className="project-detail-next-arrow"
            aria-label={`View next project: ${nextProject.title}`}
          >
            ↗
          </Link>
        </div>
      </section>

      <PageFooter />
    </main>
  );
};

export default ProjectDetailPage;
