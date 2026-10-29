import React from "react";
import ProjectsGallery from "./projects/ProjectsGallery";

const Projects = () => {
  return (
    <main className="home-projects">
      <ProjectsGallery showTitle enableStack />
    </main>
  );
};

export default Projects;
