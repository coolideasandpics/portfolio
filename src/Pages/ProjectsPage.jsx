import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import ProjectsGallery from "../Components/projects/ProjectsGallery.jsx";
import "./ProjectsPage.css";

gsap.registerPlugin(useGSAP);

const ProjectsPage = () => {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      gsap.set(
        [
          ".projects-count-left",
          ".projects-count-right",
          ".projects-title",
          ".projects-faded-word span",
          ".projects-opener-label",
          ".projects-opener-copy",
        ],
        {
          opacity: 0,
        }
      );

      gsap.set(".projects-count-left", {
        x: -40,
        y: 20,
      });

      gsap.set(".projects-count-right", {
        x: 40,
        y: 20,
      });

      gsap.set([".projects-title", ".projects-faded-word span"], {
        scale: 0.98,
      });

      gsap.set(".projects-opener-label", {
        x: -24,
      });

      gsap.set(".projects-opener-copy", {
        x: 32,
      });

      tl.to(".projects-count-left", {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.9,
      })
        .to(
          ".projects-count-right",
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
          },
          "<"
        )
        .to(
          [".projects-title", ".projects-faded-word span"],
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
          },
          "-=0.45"
        )
        .to(
          ".projects-opener-label",
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
          },
          "-=0.35"
        )
        .to(
          ".projects-opener-copy",
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
          },
          "-=0.6"
        );
    },
    { scope: pageRef }
  );

  return (
    <main className="projects-page" ref={pageRef}>
      <section className="projects-opener">
        <div className="projects-opener-inner">
          <div className="projects-opener-top">
            <span className="projects-count-left">01/</span>

            <h1 className="projects-title">PROJECTS</h1>

            <span className="projects-count-right">05</span>
          </div>

          <div className="projects-faded-word">
            <span>archive</span>
          </div>

          <div className="projects-opener-bottom">
            <p className="projects-opener-label">OVERVIEW</p>
            <p className="projects-opener-copy">
              A curated selection of projects exploring frontend development,
              interaction design, and digital product thinking through clear
              systems and thoughtful execution.
            </p>
          </div>
        </div>
      </section>
      <ProjectsGallery />
    </main>
  );
};

export default ProjectsPage;
