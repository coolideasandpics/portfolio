import { useLayoutEffect, useRef, useState } from "react";
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
  const [canStack, setCanStack] = useState(false);

  const displayedProjects = enableStack ? projects.slice(0, 3) : projects;

  const scrollToCard = (targetIndex) => {
    if (!enableStack) return;

    const trigger = triggerRef.current;
    const tl = tlRef.current;

    let targetScroll;
    if (trigger && tl) {
      const targetTimes = [0, 1, 2.45];
      const progress = (targetTimes[targetIndex] ?? 0) / tl.duration();
      targetScroll = trigger.start + (trigger.end - trigger.start) * progress;
    } else {
      const card = container.current.querySelectorAll(".feature-project-link")[targetIndex];
      if (!card) return;
      const clearance = (document.querySelector("nav")?.offsetHeight || 0) + 16;
      targetScroll = card.getBoundingClientRect().top + window.scrollY - clearance;
    }

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

  useLayoutEffect(() => {
    if (!enableStack) return;
    let frame;
    const panels = [...container.current.querySelectorAll(".feature-project-left")];
    const measure = () => {
      const requiredHeight = Math.max(...panels.map((panel) => {
        const style = getComputedStyle(panel);
        return parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) +
          [...panel.children].reduce((height, child) => {
            const childStyle = getComputedStyle(child);
            return height + child.getBoundingClientRect().height +
              parseFloat(childStyle.marginTop) + parseFloat(childStyle.marginBottom);
          }, 0);
      }));
      // Allow border and fractional flex rounding without changing the reference pin.
      setCanStack(window.innerWidth > 1100 && requiredHeight <= window.innerHeight * 0.78 + 2);
    };
    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(scheduleMeasure);
    panels.forEach((panel) => [...panel.children].forEach((child) => observer.observe(child)));
    window.addEventListener("resize", scheduleMeasure);
    document.fonts.addEventListener("loadingdone", scheduleMeasure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      document.fonts.removeEventListener("loadingdone", scheduleMeasure);
    };
  }, [enableStack]);

  useGSAP(
    () => {
      if (!enableStack || !canStack) {
        ScrollTrigger.refresh();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1101px)", () => {
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
            refreshPriority: 1,
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
          tlRef.current = null;
          triggerRef.current = null;
        };
      });

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: container, dependencies: [enableStack, canStack], revertOnUpdate: true }
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
          enableStack ? `is-stacked ${canStack ? "is-pinnable" : "is-flowing"}` : "is-list"
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
