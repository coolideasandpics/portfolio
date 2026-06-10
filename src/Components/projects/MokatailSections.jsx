import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import mokatailHero from "../../assets/mokatail/mokatail-hero.png";
import mokatailMenu from "../../assets/mokatail/mokatail-menu.png";
import mokatailContact from "../../assets/mokatail/mokatail-contact.png";
import mokatailCocktailDetail from "../../assets/mokatail/mokatail-cocktail-detail.png";
import mokatailBarGallery from "../../assets/mokatail/mokatail-bar-gallery.png";
import mokatailMotionLoop from "../../assets/mokatail/mokatail-motion-loop.mp4";

gsap.registerPlugin(ScrollTrigger);

const MokatailSections = ({ project }) => {
  const container = useRef(null);

  const motionDecisions = [
    {
      title: "Lead with atmosphere",
      text: "The site opens with a dark, textured visual language, oversized cocktail imagery, and bold display type to establish mood before the user reaches the content.",
    },
    {
      title: "Make scroll feel intentional",
      text: "Transitions, pinned visual moments, and staged entrances are used to guide attention instead of adding motion as surface decoration.",
    },
    {
      title: "Keep the interface readable",
      text: "Even with heavy styling, the navigation, menu structure, contact information, and cocktail details stay clear and easy to scan.",
    },
  ];

  const mokatailScreens = [
    {
      number: "01",
      title: "Hero Atmosphere",
      image: mokatailHero,
      caption:
        "The opening screen establishes the brand mood through large expressive typography, a central drink image, layered leaf assets, and a textured black background.",
    },
    {
      number: "02",
      title: "Menu System",
      image: mokatailMenu,
      caption:
        "The menu screen organizes cocktails and mocktails into two readable columns while keeping the dark visual language consistent with the rest of the site.",
    },
    {
      number: "03",
      title: "Cocktail Detail",
      image: mokatailCocktailDetail,
      caption:
        "The detail view gives the selected cocktail more focus through a central product image, large recipe type, and supporting descriptive copy.",
    },
    {
      number: "04",
      title: "Brand Gallery",
      image: mokatailBarGallery,
      caption:
        "The gallery section uses bar photography, ratings, and editorial spacing to make the fictional venue feel more lived-in and credible.",
    },
    {
      number: "05",
      title: "Contact Section",
      image: mokatailContact,
      caption:
        "The contact page keeps practical information centered and simple while preserving the same visual world through leaves, type, and dark spacing.",
    },
  ];

  const buildDecisions = [
    {
      title: "GSAP sequencing",
      text: "The experience uses scroll-triggered entrances, staggered reveals, and image movement to give the site a more cinematic rhythm.",
    },
    {
      title: "Reusable section logic",
      text: "The case study uses the same structure as the other portfolio projects while letting Mokatail’s visuals carry the mood.",
    },
    {
      title: "Responsive restraint",
      text: "The layout keeps large visuals and motion moments, but avoids making the interface feel hard to use on smaller screens.",
    },
  ];

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const chapterBlocks = gsap.utils.toArray(".mokatail-animate-chapter");

      chapterBlocks.forEach((chapter) => {
        const isRight = chapter.classList.contains("is-right");

        gsap.fromTo(
          chapter.querySelectorAll(".chapter-number, h2"),
          {
            x: isRight ? 64 : -64,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.05,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: chapter,
              start: "top 78%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".mokatail-copy-animate").forEach((block) => {
        gsap.fromTo(
          block.children,
          {
            y: 28,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: block,
              start: "top 82%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      gsap.fromTo(
        ".mokatail-motion-card",
        {
          y: 56,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mokatail-motion-preview",
            start: "top 78%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".mokatail-decision-card",
        {
          y: 32,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".mokatail-decisions-list",
            start: "top 82%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".mokatail-screen-card",
        {
          y: 64,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: {
            amount: 0.5,
            from: "start",
          },
          scrollTrigger: {
            trigger: ".mokatail-screen-grid",
            start: "top 76%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".mokatail-screen-image img",
        {
          scale: 1.055,
        },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".mokatail-screen-grid",
            start: "top 76%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".mokatail-build-row",
        {
          y: 36,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".mokatail-build-list",
            start: "top 82%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      ScrollTrigger.refresh();
    },
    { scope: container }
  );

  return (
    <div ref={container} className="mokatail-case-study">
      <section className="project-detail-section" id="overview">
        <div className="project-detail-container project-detail-two-col mokatail-copy-animate">
          <p className="section-label">Overview</p>

          <div>
            <p className="section-body">
              Mokatail is a motion-driven cocktail showcase built around branded
              storytelling, immersive interaction, and frontend animation.
            </p>

            <p className="section-support">
              The project explores how a fictional bar experience can feel more
              atmospheric through scroll-triggered transitions, expressive type,
              dark visual styling, image-led sections, and carefully paced
              motion.
            </p>
          </div>
        </div>
      </section>

      <section className="case-study-chapter mokatail-chapter-opening mokatail-animate-chapter">
        <div className="project-detail-container">
          <span className="chapter-number">(01)</span>
          <h2>
            Building a bar experience <br />
            that feels like
            <br /> a story.
          </h2>
        </div>
      </section>

      <section className="project-detail-section mokatail-problem-section">
        <div className="project-detail-container project-detail-two-col mokatail-copy-animate">
          <p className="section-label">Creative Problem</p>

          <div>
            <p className="section-body">
              The challenge was to make a cocktail website feel less like a menu
              and more like a branded digital experience.
            </p>

            <p className="section-support">
              Instead of relying only on static sections, the site uses motion
              as the main storytelling layer. The goal was to guide attention,
              create atmosphere, and make each transition feel deliberate.
            </p>
          </div>
        </div>
      </section>

      <section className="project-detail-visual mokatail-motion-preview">
        <div className="project-detail-container">
          <div className="project-section-heading mokatail-copy-animate">
            <p className="section-label">Motion Preview</p>

            <h2>
              The loop shows the site’s intended rhythm: atmospheric,
              image-heavy, and driven by staged scroll movement.
            </h2>
          </div>

          <div className="mokatail-motion-card">
            <video
              src={mokatailMotionLoop}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>

      <section className="project-detail-section" id="motion-decisions">
        <div className="project-detail-container project-detail-two-col">
          <p className="section-label">Motion Direction</p>

          <div className="approach-list mokatail-decisions-list">
            {motionDecisions.map((decision) => (
              <div className="mokatail-decision-card" key={decision.title}>
                <h3>{decision.title}</h3>
                <p>{decision.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study-chapter is-right mokatail-chapter-right mokatail-animate-chapter">
        <div className="project-detail-container case-study-chapter-inner">
          <span className="chapter-number">(02)</span>

          <h2 className="chapter-heading chapter-heading-02">
            <span>Motion as</span>
            <span>the interface,</span>
            <span>not decoration.</span>
          </h2>
        </div>
      </section>

      <section
        className="project-screens-section mokatail-screens-section"
        id="screens"
      >
        <div className="project-detail-container">
          <div className="project-section-heading mokatail-copy-animate">
            <p className="section-label">Interface Screens</p>

            <h2>
              The interface moves between atmosphere, menu clarity, cocktail
              detail, brand texture, and practical contact information.
            </h2>
          </div>

          <div className="mokatail-screen-grid">
            {mokatailScreens.map((screen) => (
              <article
                className={`mokatail-screen-card mokatail-screen-card-${screen.number}`}
                key={screen.title}
              >
                <div className="mokatail-screen-image">
                  <img src={screen.image} alt={screen.title} />
                </div>

                <div className="project-screen-copy">
                  <span>{screen.number}</span>
                  <h3>{screen.title}</h3>
                  <p>{screen.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-detail-section mokatail-build-section">
        <div className="project-detail-container project-detail-two-col">
          <p className="section-label">Frontend Build</p>

          <div>
            <p className="section-body mokatail-copy-animate">
              The technical focus was sequencing motion in a way that felt
              polished without making the experience hard to navigate.
            </p>

            <div className="mokatail-build-list">
              {buildDecisions.map((item, index) => (
                <article className="mokatail-build-row" key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-chapter mokatail-animate-chapter">
        <div className="project-detail-container">
          <span className="chapter-number">(03)</span>
          <h2>Interaction should make the brand easier to feel.</h2>
        </div>
      </section>

      <section className="project-detail-section" id="outcome">
        <div className="project-detail-container project-detail-two-col mokatail-copy-animate">
          <p className="section-label">Outcome</p>

          <div>
            <p className="section-body">
              Mokatail became a frontend playground for motion design, scroll
              behavior, and immersive visual storytelling.
            </p>

            <p className="section-support">
              It shows the expressive side of my frontend work: combining React,
              GSAP, layout, timing, and interaction details to create a digital
              experience with a stronger sense of mood and identity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MokatailSections;
