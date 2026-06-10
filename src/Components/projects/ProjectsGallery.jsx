import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./ProjectsGallery.css";
import ProjectsGalleryCard from "./ProjectsGalleryCard";
import { projects } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const ProjectsGallery = ({ showTitle = false, enableStack = false }) => {
  const container = useRef(null);
  const tlRef = useRef(null);
  const triggerRef = useRef(null);

  const displayedProjects = enableStack ? projects.slice(0, 3) : projects;

  const scrollToCard = (targetIndex) => {
    if (!enableStack) return;

    const trigger = triggerRef.current;
    const tl = tlRef.current;

    if (!trigger || !tl) return;

    const totalDuration = tl.duration();
    const targetTimes = [0, 1, 2.45];

    const targetTime = targetTimes[targetIndex] ?? 0;
    const progress = targetTime / totalDuration;

    const targetScroll =
      trigger.start + (trigger.end - trigger.start) * progress;

    const scrollProxy = { y: window.scrollY };

    gsap.to(scrollProxy, {
      y: targetScroll,
      duration: 0.75,
      ease: "power2.inOut",
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y);
      },
    });
  };

  useGSAP(
    () => {
      if (!enableStack) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        const stack = container.current.querySelector(
          ".projects-gallery-stack"
        );

        const cards = gsap.utils.toArray(
          ".feature-project-link",
          container.current
        );

        gsap.set(cards, {
          position: "absolute",
          inset: 0,
          zIndex: (i) => i + 1,
        });

        gsap.set(cards[1], {
          y: "106%",
        });

        gsap.set(cards[2], {
          y: "106%",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stack,
            start: "center 60%",
            end: `+=${cards.length * 900}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.slice(1).forEach((card, index) => {
          tl.to(card, {
            y: (index + 1) * 1,
            ease: "none",
            duration: index === 0 ? 1 : 1.45,
          });
        });

        tl.to({}, { duration: 0.25 });

        tlRef.current = tl;
        triggerRef.current = tl.scrollTrigger;

        return () => {
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [enableStack] }
  );

  return (
    <section ref={container} className="projects-gallery">
      {showTitle && (
        <div className="projects-gallery-title-block">
          <div className="projects-gallery-marquee">
            <div className="projects-gallery-marquee-track">
              <div className="projects-gallery-marquee-group">
                <span>SELECTED PROJECTS</span>
                <span>SELECTED PROJECTS</span>
                <span>SELECTED PROJECTS</span>
              </div>

              <div
                className="projects-gallery-marquee-group"
                aria-hidden="true"
              >
                <span>SELECTED PROJECTS</span>
                <span>SELECTED PROJECTS</span>
                <span>SELECTED PROJECTS</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`projects-gallery-stack ${
          enableStack ? "is-stacked" : "is-list"
        }`}
      >
        {displayedProjects.map((project, index) => (
          <ProjectsGalleryCard
            key={project.id}
            project={project}
            index={index}
            showNumber={enableStack}
            onNumberClick={scrollToCard}
          />
        ))}
      </div>

      {enableStack && (
        <div className="more-projects-wrap">
          <Link
            to="/projects"
            className="more-projects-block"
            aria-label="View all work"
          >
            <span className="more-text more-text-default">view all work</span>
            <span className="more-text more-text-hover">yes, there’s more</span>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProjectsGallery;
