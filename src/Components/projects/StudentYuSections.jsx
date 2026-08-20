import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import storyboardOverview from "../../assets/studentyu/storyboard-overview.png";
import wireframeOverview from "../../assets/studentyu/wireframe-overview.png";
import loginOne from "../../assets/studentyu/login-1.png";
import registrationOne from "../../assets/studentyu/registration-1.png";
import homeFeed from "../../assets/studentyu/home.png";
import clubPage from "../../assets/studentyu/club-1.png";
import eventPage from "../../assets/studentyu/event-1.png";
import profilePage from "../../assets/studentyu/profile.png";

gsap.registerPlugin(ScrollTrigger);

const StudentYuSections = ({ project }) => {
  const container = useRef(null);

  const processImages = [
    {
      title: "Storyboard",
      image: storyboardOverview,
      caption:
        "The early storyboard framed the project around a student who wants to meet people but needs a clearer, lower-pressure path into campus communities.",
    },
    {
      title: "Wireframe",
      image: wireframeOverview,
      caption:
        "The wireframe helped translate the social journey into a clearer app structure before moving into high-fidelity screens.",
    },
  ];

  const prototypeScreens = [
    {
      number: "01",
      title: "Campus Onboarding",
      image: loginOne,
      caption:
        "A York-focused entry point using Passport York and profile setup to make the experience feel familiar and trusted.",
    },
    {
      number: "02",
      title: "Interest Setup",
      image: registrationOne,
      caption:
        "Students share interests early so the product can make discovery feel personal instead of random.",
    },
    {
      number: "03",
      title: "Interest-Based Home",
      image: homeFeed,
      caption:
        "A discovery feed that recommends clubs, events, and people based on the student's interests and campus context.",
    },
    {
      number: "04",
      title: "Club Discovery",
      image: clubPage,
      caption:
        "Club pages give students a clearer reason to join by showing details, meeting times, members, and shared connections.",
    },
    {
      number: "05",
      title: "Event Interaction",
      image: eventPage,
      caption:
        "Event screens support small social actions like RSVPing and inviting friends before a student commits to showing up.",
    },
    {
      number: "06",
      title: "Student Profiles",
      image: profilePage,
      caption:
        "Profiles surface hobbies, courses, clubs, and social handles to make reaching out feel more grounded.",
    },
  ];

  const uxDecisions = [
    {
      title: "Lower the social barrier",
      text: "The experience avoids forcing direct interaction too early. Students can browse, RSVP, join, or view mutual context before reaching out.",
    },
    {
      title: "Use interest as the bridge",
      text: "Recommendations are based on clubs, hobbies, courses, events, and student profiles so connection begins from shared context.",
    },
    {
      title: "Make campus feel navigable",
      text: "Familiar mobile patterns, bottom navigation, and recognizable icons help students understand where they are and what action comes next.",
    },
  ];

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const chapterBlocks = gsap.utils.toArray(".studentyu-animate-chapter");

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
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray(".studentyu-copy-animate").forEach((block) => {
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
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        ".studentyu-process-card",
        {
          y: 48,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".studentyu-process-grid",
            start: "top 78%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".studentyu-phone-card",
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
            amount: 0.45,
            from: "start",
          },
          scrollTrigger: {
            trigger: ".studentyu-phone-grid",
            start: "top 76%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".studentyu-phone-image img",
        {
          scale: 1.06,
        },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".studentyu-phone-grid",
            start: "top 76%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".studentyu-decision-card",
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
            trigger: ".studentyu-decisions-list",
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      ScrollTrigger.refresh();
    },
    { scope: container }
  );

  return (
    <div ref={container} className="studentyu-case-study">
      <section className="project-detail-section" id="overview">
        <div className="project-detail-container project-detail-two-col studentyu-copy-animate">
          <p className="section-label">Overview</p>

          <div>
            <p className="section-body">
              StudentYU is a mobile-first UX concept designed to help students
              rediscover campus life through clubs, events, profiles, and
              interest-based recommendations.
            </p>

            <p className="section-support">
              Rather than treating social connection as a single action, the
              experience focuses on smaller steps: discovering shared interests,
              seeing familiar context, joining communities, and reaching out
              when the interaction feels less intimidating.
            </p>
          </div>
        </div>
      </section>

      <section className="case-study-chapter studentyu-chapter-opening studentyu-animate-chapter">
        <div className="project-detail-container">
          <span className="chapter-number">(01)</span>
          <h2>Designing for the first step, not the final friendship.</h2>
        </div>
      </section>

      <section className="project-detail-section studentyu-problem-section">
        <div className="project-detail-container studentyu-problem-layout studentyu-copy-animate">
          <p className="section-label">Social Gap</p>

          <div>
            <p className="section-body">
              After a period of remote learning, returning to campus did not
              automatically make connection easier. Students needed a softer way
              to find communities, events, and people they could approach with
              confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="project-detail-visual studentyu-process-section">
        <div className="project-detail-container">
          <div className="project-section-heading studentyu-copy-animate">
            <p className="section-label">Early Thinking</p>

            <h2>
              The project started by mapping the emotional journey before moving
              into structure and screens.
            </h2>
          </div>

          <div className="studentyu-process-grid">
            {processImages.map((item) => (
              <article className="studentyu-process-card" key={item.title}>
                <div className="studentyu-process-image">
                  <img src={item.image} alt={`StudentYU ${item.title}`} />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study-chapter is-right studentyu-chapter-right studentyu-animate-chapter">
        <div className="project-detail-container case-study-chapter-inner">
          <span className="chapter-number">(02)</span>

          <h2 className="chapter-heading chapter-heading-02">
            <span>From interest</span>
            <span>signals to social</span>
            <span>discovery.</span>
          </h2>
        </div>
      </section>

      <section
        className="project-screens-section studentyu-prototype-section"
        id="prototype"
      >
        <div className="project-detail-container">
          <div className="project-section-heading studentyu-copy-animate">
            <p className="section-label">Prototype Path</p>

            <h2>
              The app moves students from onboarding into discovery, community,
              and connection.
            </h2>
          </div>

          <div className="studentyu-phone-grid">
            {prototypeScreens.map((screen) => (
              <article
                className={`studentyu-phone-card studentyu-phone-card-${screen.number}`}
                key={screen.title}
              >
                <div className="studentyu-phone-image">
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

      <section className="case-study-chapter studentyu-animate-chapter">
        <div className="project-detail-container">
          <span className="chapter-number">(03)</span>
          <h2>Connection works better when the next step feels small.</h2>
        </div>
      </section>

      <section className="project-detail-section" id="decisions">
        <div className="project-detail-container project-detail-two-col">
          <p className="section-label">UX Decisions</p>

          <div className="approach-list studentyu-decisions-list">
            {uxDecisions.map((decision) => (
              <div className="studentyu-decision-card" key={decision.title}>
                <h3>{decision.title}</h3>
                <p>{decision.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="project-detail-section" id="outcome">
        <div className="project-detail-container project-detail-two-col studentyu-copy-animate">
          <p className="section-label">Outcome</p>

          <div>
            <p className="section-body">
              The final prototype turned campus discovery into a guided social
              experience: students could sign in, share interests, explore
              recommended clubs and events, view student profiles, search across
              categories, and take smaller steps toward connection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentYuSections;
