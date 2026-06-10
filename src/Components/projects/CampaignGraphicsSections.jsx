import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import affordableHousingFront from "../../assets/campaign-graphics/affordable-housing-front.png";
import affordableHousingBack from "../../assets/campaign-graphics/affordable-housing-back.png";
import regenesisGrocery from "../../assets/campaign-graphics/regenesis-grocery-coop.png";
import regenesisItemLibrary from "../../assets/campaign-graphics/regenesis-item-library.png";
import regenesisFarmersMarket from "../../assets/campaign-graphics/regenesis-farmers-market.png";
import regenesisFreeStore from "../../assets/campaign-graphics/regenesis-free-store.png";
import regenesisBikeCentre from "../../assets/campaign-graphics/regenesis-bike-centre.png";

gsap.registerPlugin(ScrollTrigger);

const CampaignGraphicsSections = ({ project }) => {
  const container = useRef(null);

  const housingMaterials = [
    {
      title: "Front Poster",
      image: affordableHousingFront,
      caption:
        "A direct voting poster built around urgency, housing imagery, referendum dates, and a clear call-to-action.",
    },
    {
      title: "Information Side",
      image: affordableHousingBack,
      caption:
        "A text-heavy leaflet side structured to explain the campaign, eligibility, voting action, and student impact.",
    },
  ];

  const regenesisPosters = [
    {
      number: "01",
      title: "Grocery Co-op",
      image: regenesisGrocery,
      caption:
        "A referendum poster promoting a non-profit grocery co-op and food affordability initiative.",
    },
    {
      number: "02",
      title: "Item Library",
      image: regenesisItemLibrary,
      caption:
        "A campaign poster communicating free borrowing services through playful object-based illustration.",
    },
    {
      number: "03",
      title: "Farmers Market",
      image: regenesisFarmersMarket,
      caption:
        "A student-facing visual promoting access to fresh, community-driven produce on campus.",
    },
    {
      number: "04",
      title: "Free Store",
      image: regenesisFreeStore,
      caption:
        "A bold campaign asset highlighting free clothing and household goods through accessible visual language.",
    },
    {
      number: "05",
      title: "Bike Centre",
      image: regenesisBikeCentre,
      caption:
        "A poster designed to promote low-cost bicycle services and sustainability-centered campus mobility.",
    },
  ];

  const designDecisions = [
    {
      title: "Make the ask immediate",
      text: "The posters lead with large voting language so students can understand the action before reading the supporting details.",
    },
    {
      title: "Build recognition through repetition",
      text: "Repeated poster structure, dates, URLs, and contact details helped the campaign feel like one connected system.",
    },
    {
      title: "Use illustration as the hook",
      text: "Each poster used a subject-specific visual to make the initiative easier to recognize at a glance.",
    },
  ];

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const chapterBlocks = gsap.utils.toArray(".campaign-animate-chapter");

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

      gsap.utils.toArray(".campaign-copy-animate").forEach((block) => {
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
        ".campaign-housing-card",
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
            trigger: ".campaign-housing-grid",
            start: "top 78%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".campaign-poster-card",
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
            trigger: ".campaign-poster-grid",
            start: "top 76%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".campaign-poster-image img",
        {
          scale: 1.045,
        },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".campaign-poster-grid",
            start: "top 76%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".campaign-decision-card",
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
            trigger: ".campaign-decisions-list",
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
    <div ref={container} className="campaign-case-study">
      <section className="project-detail-section" id="overview">
        <div className="project-detail-container project-detail-two-col campaign-copy-animate">
          <p className="section-label">Overview</p>

          <div>
            <p className="section-body">
              Campus Campaign Graphics is a visual communication project built
              around student advocacy, sustainability initiatives, and
              referendum participation.
            </p>

            <p className="section-support">
              During my graphic design internship, I created student-facing
              posters, leaflets, and digital campaign assets that translated
              dense campaign goals into clear, urgent, and recognizable visual
              materials.
            </p>
          </div>
        </div>
      </section>

      <section className="case-study-chapter campaign-chapter-opening campaign-animate-chapter">
        <div className="project-detail-container">
          <span className="chapter-number">(01)</span>
          <h2>Designing for the student who only looks for three seconds.</h2>
        </div>
      </section>

      <section className="project-detail-section campaign-problem-section">
        <div className="project-detail-container project-detail-two-col campaign-copy-animate">
          <p className="section-label">Campaign Problem</p>

          <div>
            <p className="section-body">
              The challenge was to make referendum information feel immediate
              without losing the context students needed to trust the message.
            </p>

            <p className="section-support">
              These materials had to work in busy campus environments where
              attention is short, messaging needs to be direct, and visuals have
              to carry the campaign before a student reads the details.
            </p>
          </div>
        </div>
      </section>

      <section className="project-detail-visual campaign-housing-section">
        <div className="project-detail-container">
          <div className="project-section-heading campaign-copy-animate">
            <p className="section-label">Advocacy Material</p>

            <h2>
              The affordable housing piece balanced a direct voting prompt with
              a more detailed explanation of why the issue mattered.
            </h2>
          </div>

          <div className="campaign-housing-grid">
            {housingMaterials.map((item) => (
              <article className="campaign-housing-card" key={item.title}>
                <div className="campaign-housing-image">
                  <img
                    src={item.image}
                    alt={`Affordable housing ${item.title}`}
                  />
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

      <section className="case-study-chapter is-right campaign-chapter-right campaign-animate-chapter">
        <div className="project-detail-container case-study-chapter-inner">
          <span className="chapter-number">(02)</span>

          <h2 className="chapter-heading chapter-heading-02">
            <span>One system,</span>
            <span>multiple campus</span>
            <span>initiatives.</span>
          </h2>
        </div>
      </section>

      <section
        className="project-screens-section campaign-posters-section"
        id="poster-system"
      >
        <div className="project-detail-container">
          <div className="project-section-heading campaign-copy-animate">
            <p className="section-label">Campaign System</p>

            <h2>
              The Regenesis poster set used repeated campaign architecture:
              oversized voting language, initiative-specific illustration,
              referendum dates, voting URL, and organization details.
            </h2>
          </div>

          <div className="campaign-poster-grid">
            {regenesisPosters.map((poster) => (
              <article
                className={`campaign-poster-card campaign-poster-card-${poster.number}`}
                key={poster.title}
              >
                <div className="campaign-poster-image">
                  <img src={poster.image} alt={poster.title} />
                </div>

                <div className="project-screen-copy">
                  <span>{poster.number}</span>
                  <h3>{poster.title}</h3>
                  <p>{poster.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study-chapter campaign-animate-chapter">
        <div className="project-detail-container">
          <span className="chapter-number">(03)</span>
          <h2>Good campaign design makes the next action obvious.</h2>
        </div>
      </section>

      <section className="project-detail-section" id="outcome">
        <div className="project-detail-container project-detail-two-col campaign-copy-animate">
          <p className="section-label">Outcome</p>

          <div>
            <p className="section-body">
              The final campaign materials created a consistent student-facing
              visual system across housing, sustainability, food access,
              borrowing services, free stores, farmers markets, and bike centre
              initiatives.
            </p>

            <p className="section-support">
              This project adds a visual communication layer to my portfolio:
              showing layout, hierarchy, typography, illustration direction, and
              campaign thinking alongside my product and frontend work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignGraphicsSections;
