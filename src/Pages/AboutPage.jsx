import "./AboutPage.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import PageFooter from "../Components/page-footer/PageFooter.jsx";
import "../Components/page-footer/PageFooter.css";

import macIcon from "../assets/AboutPage/mac.png";
import xm5Icon from "../assets/AboutPage/xm5.png";
import camIcon from "../assets/AboutPage/cam.png";
import hatIcon from "../assets/AboutPage/hat.png";
import bootsIcon from "../assets/AboutPage/boots.png";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const animatedIcons = document.querySelector(".animated-icons");
      const iconElements = gsap.utils.toArray(".animated-icon");
      const textSegments = gsap.utils.toArray(".text-segment");
      const placeholders = gsap.utils.toArray(".placeholder-icon");
      const heroHeader = document.querySelector(".hero-header");
      const heroSection = document.querySelector(".about-page-hero");

      if (!animatedIcons || !iconElements.length) return;

      const textAnimationOrder = [];

      textSegments.forEach((segment, index) => {
        textAnimationOrder.push({ segment, originalIndex: index });
      });

      for (let i = textAnimationOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [textAnimationOrder[i], textAnimationOrder[j]] = [
          textAnimationOrder[j],
          textAnimationOrder[i],
        ];
      }

      const isMobile = window.innerWidth <= 1000;
      const headerIconSize = isMobile ? 30 : 60;
      const currentIconSize = iconElements[0].getBoundingClientRect().width;
      const exactScale = headerIconSize / currentIconSize;

      gsap.set([".title-question", ".title-name", ".about-title-subcopy"], {
        opacity: 0,
      });

      gsap.set(".title-question", { y: 24 });
      gsap.set(".title-name", { y: 24 });
      gsap.set(".about-title-subcopy", { y: 16 });

      gsap.set(iconElements, {
        opacity: 0,
        y: 36,
      });

      const createBringSectionAnimation = () => {
        const bringSection = document.querySelector(".about-belief-section");
        const bringIndex = document.querySelector(".about-section-index");
        const bringTitle = document.querySelector(".about-section-title");
        const bringCards = gsap.utils.toArray(".about-belief-card");

        if (!bringSection || !bringIndex || !bringTitle || !bringCards.length)
          return;

        gsap.fromTo(
          bringIndex,
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              id: "about-bring-index",
              trigger: bringSection,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          bringTitle,
          {
            opacity: 0,
            x: 140,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              id: "about-bring-title",
              trigger: bringSection,
              start: "top 68%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          bringCards,
          {
            opacity: 0,
            y: 120,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              id: "about-bring-cards",
              trigger: bringSection,
              start: "top 55%",
              toggleActions: "play none none reverse",
            },
          }
        );
      };

      const createWorkflowSectionAnimation = () => {
        const workflowSection = document.querySelector(
          ".about-workflow-section"
        );

        const rolesLayer = document.querySelector(".roles-layer");
        const rolesIndex = document.querySelector(".roles-index");
        const rolesTitle = document.querySelector(".roles-title");
        const rolesTrack = document.querySelector(".roles-track");
        const rolePanels = gsap.utils.toArray(".role-panel");

        const noticeLayer = document.querySelector(".notice-layer");
        const noticeIndex = document.querySelector(".notice-index");
        const noticeTitle = document.querySelector(".notice-main-title");
        const detailPieces = gsap.utils.toArray(".detail-piece");

        if (
          !workflowSection ||
          !rolesLayer ||
          !rolesIndex ||
          !rolesTitle ||
          !rolesTrack ||
          !rolePanels.length ||
          !noticeLayer ||
          !noticeIndex ||
          !noticeTitle ||
          !detailPieces.length
        )
          return;

        ScrollTrigger.getById("workflow-intro")?.kill();
        ScrollTrigger.getById("workflow-pinned")?.kill();

        gsap.set([rolesIndex, rolesTitle], {
          opacity: 0,
          y: 18,
        });

        gsap.set(rolePanels, {
          opacity: 0,
          y: 80,
        });

        gsap.set(rolesLayer, {
          autoAlpha: 1,
        });

        gsap.set(rolesTrack, {
          x: 0,
        });

        gsap.set(noticeLayer, {
          autoAlpha: 0,
          pointerEvents: "none",
        });

        gsap.set(noticeIndex, {
          opacity: 0,
          y: 16,
        });

        gsap.set(noticeTitle, {
          opacity: 0,
          y: 32,
          scale: 0.96,
        });

        gsap.set(detailPieces, {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.78,
          rotate: 0,
        });

        const workflowIntroTl = gsap.timeline({
          scrollTrigger: {
            id: "workflow-intro",
            trigger: workflowSection,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        workflowIntroTl
          .to(rolesIndex, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          })
          .to(
            rolesTitle,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.25"
          )
          .to(
            rolePanels,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.3"
          );

        const getScrollDistance = () => {
          const travel = rolesTrack.scrollWidth - window.innerWidth;
          return Math.max(travel, window.innerHeight * 3.4);
        };

        const getTrackTravel = () => {
          const travel = rolesTrack.scrollWidth - window.innerWidth;
          return -Math.max(travel, 0);
        };

        const workflowTl = gsap.timeline({
          scrollTrigger: {
            id: "workflow-pinned",
            trigger: workflowSection,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        workflowTl
          .to(rolesTrack, {
            x: getTrackTravel,
            duration: 1.3,
            ease: "none",
          })
          .to(
            rolePanels,
            {
              opacity: 0,
              y: -25,
              duration: 0.22,
              stagger: 0.02,
              ease: "power2.out",
            },
            1.12
          )
          .to(
            [rolesIndex, rolesTitle],
            {
              opacity: 0,
              y: -14,
              duration: 0.22,
              ease: "power2.out",
            },
            1.14
          )
          .to(
            rolesLayer,
            {
              autoAlpha: 0,
              duration: 0.2,
              ease: "power2.out",
            },
            1.18
          )
          .to(
            noticeLayer,
            {
              autoAlpha: 1,
              duration: 0.35,
              ease: "power2.out",
              onStart: () => {
                noticeLayer.style.pointerEvents = "auto";
              },
              onReverseComplete: () => {
                noticeLayer.style.pointerEvents = "none";
              },
            },
            1.2
          )
          .to(
            noticeIndex,
            {
              opacity: 1,
              y: 0,
              duration: 0.25,
              ease: "power3.out",
            },
            1.24
          )
          .to(
            noticeTitle,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              ease: "power3.out",
            },
            1.26
          )
          .to(
            detailPieces,
            {
              opacity: 1,
              x: (index, piece) => piece.getAttribute("data-x"),
              y: (index, piece) => piece.getAttribute("data-y"),
              rotate: (index, piece) =>
                Number(piece.getAttribute("data-rotate")),
              scale: 1,
              duration: 0.95,
              stagger: 0.08,
              ease: "power3.out",
            },
            1.34
          )
          .to(
            noticeTitle,
            {
              scale: 0.92,
              opacity: 0.9,
              duration: 0.8,
              ease: "none",
            },
            1.08
          );
      };

      const createHeroScroll = () => {
        ScrollTrigger.create({
          id: "about-hero-scroll",
          trigger: ".about-page-hero",
          start: "top top",
          end: `+=${window.innerHeight * 8}px`,
          pin: true,
          pinSpacing: true,
          scrub: 1,

          onUpdate: (self) => {
            const progress = self.progress;

            textSegments.forEach((segment) => {
              gsap.set(segment, { opacity: 0 });
            });

            if (progress <= 0.3) {
              const moveProgress = progress / 0.3;
              const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

              if (progress <= 0.15) {
                const headerProgress = progress / 0.15;
                const headerMoveY = -50 * headerProgress;
                const headerOpacity = 1 - headerProgress;

                gsap.set(heroHeader, {
                  transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
                  opacity: headerOpacity,
                });
              } else {
                gsap.set(heroHeader, {
                  transform: "translate(-50%, calc(-50% + -50px))",
                  opacity: 0,
                });
              }

              if (window.aboutDuplicateIcons) {
                window.aboutDuplicateIcons.forEach((duplicate) => {
                  if (duplicate.parentNode) {
                    duplicate.parentNode.removeChild(duplicate);
                  }
                });

                window.aboutDuplicateIcons = null;
              }

              gsap.set(animatedIcons, {
                x: 0,
                y: containerMoveY,
                scale: 1,
                opacity: 1,
              });

              iconElements.forEach((icon, index) => {
                const staggerDelay = index * 0.1;
                const iconStart = staggerDelay;
                const iconEnd = staggerDelay + 0.5;

                const iconProgress = gsap.utils.mapRange(
                  iconStart,
                  iconEnd,
                  0,
                  1,
                  moveProgress
                );

                const clampedProgress = Math.max(0, Math.min(1, iconProgress));
                const startOffset = -containerMoveY;
                const individualY = startOffset * (1 - clampedProgress);

                gsap.set(icon, {
                  x: 0,
                  y: individualY,
                  opacity: 1,
                });
              });
            } else if (progress <= 0.6) {
              const scaleProgress = (progress - 0.3) / 0.3;

              gsap.set(heroHeader, {
                transform: "translate(-50%, calc(-50% + -50px))",
                opacity: 0,
              });

              if (scaleProgress >= 0.5) {
                heroSection.style.backgroundColor = "#efefef";
              } else {
                heroSection.style.backgroundColor = "#141414";
              }

              if (window.aboutDuplicateIcons) {
                window.aboutDuplicateIcons.forEach((duplicate) => {
                  if (duplicate.parentNode) {
                    duplicate.parentNode.removeChild(duplicate);
                  }
                });

                window.aboutDuplicateIcons = null;
              }

              const targetCenterY = window.innerHeight / 2;
              const targetCenterX = window.innerWidth / 2;
              const containerRect = animatedIcons.getBoundingClientRect();
              const currentCenterX =
                containerRect.left + containerRect.width / 2;
              const currentCenterY =
                containerRect.top + containerRect.height / 2;
              const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
              const deltaY = (targetCenterY - currentCenterY) * scaleProgress;
              const baseY = -window.innerHeight * 0.3;
              const currentScale = 1 + (exactScale - 1) * scaleProgress;

              gsap.set(animatedIcons, {
                x: deltaX,
                y: baseY + deltaY,
                scale: currentScale,
                opacity: 1,
              });

              iconElements.forEach((icon) => {
                gsap.set(icon, {
                  x: 0,
                  y: 0,
                  opacity: 1,
                });
              });
            } else if (progress <= 0.75) {
              const moveProgress = (progress - 0.6) / 0.15;

              gsap.set(heroHeader, {
                transform: "translate(-50%, calc(-50% + -50px))",
                opacity: 0,
              });

              heroSection.style.backgroundColor = "#efefef";

              gsap.set(animatedIcons, {
                opacity: 0,
              });

              iconElements.forEach((icon) => {
                gsap.set(icon, {
                  x: 0,
                  y: 0,
                  opacity: 1,
                });
              });

              if (!window.aboutDuplicateIcons) {
                window.aboutDuplicateIcons = [];

                iconElements.forEach((icon) => {
                  const duplicate = icon.cloneNode(true);
                  duplicate.className = "animated-icon duplicate-icon";
                  duplicate.style.position = "absolute";
                  duplicate.style.width = headerIconSize + "px";
                  duplicate.style.height = headerIconSize + "px";

                  document.body.appendChild(duplicate);
                  window.aboutDuplicateIcons.push(duplicate);
                });
              }

              if (window.aboutDuplicateIcons) {
                window.aboutDuplicateIcons.forEach((duplicate, index) => {
                  if (index < placeholders.length) {
                    const iconRect =
                      iconElements[index].getBoundingClientRect();
                    const startCenterX = iconRect.left + iconRect.width / 2;
                    const startCenterY = iconRect.top + iconRect.height / 2;
                    const startPageX = startCenterX + window.pageXOffset;
                    const startPageY = startCenterY + window.pageYOffset;

                    const targetRect =
                      placeholders[index].getBoundingClientRect();
                    const targetCenterX =
                      targetRect.left + targetRect.width / 2;
                    const targetCenterY =
                      targetRect.top + targetRect.height / 2;
                    const targetPageX = targetCenterX + window.pageXOffset;
                    const targetPageY = targetCenterY + window.pageYOffset;

                    const moveX = targetPageX - startPageX;
                    const moveY = targetPageY - startPageY;

                    let currentX = 0;
                    let currentY = 0;

                    if (moveProgress <= 0.5) {
                      const verticalProgress = moveProgress / 0.5;
                      currentY = moveY * verticalProgress;
                    } else {
                      const horizontalProgress = (moveProgress - 0.5) / 0.5;
                      currentY = moveY;
                      currentX = moveX * horizontalProgress;
                    }

                    const finalPageX = startPageX + currentX;
                    const finalPageY = startPageY + currentY;

                    duplicate.style.left =
                      finalPageX - headerIconSize / 2 + "px";
                    duplicate.style.top =
                      finalPageY - headerIconSize / 2 + "px";
                    duplicate.style.opacity = "1";
                    duplicate.style.display = "flex";
                  }
                });
              }
            } else {
              gsap.set(heroHeader, {
                transform: `translate(-50%, calc(-50% + -100px))`,
                opacity: 0,
              });

              heroSection.style.backgroundColor = "#efefef";

              gsap.set(animatedIcons, { opacity: 0 });

              if (window.aboutDuplicateIcons) {
                window.aboutDuplicateIcons.forEach((duplicate, index) => {
                  if (index < placeholders.length) {
                    const targetRect =
                      placeholders[index].getBoundingClientRect();
                    const targetCenterX =
                      targetRect.left + targetRect.width / 2;
                    const targetCenterY =
                      targetRect.top + targetRect.height / 2;
                    const targetPageX = targetCenterX + window.pageXOffset;
                    const targetPageY = targetCenterY + window.pageYOffset;

                    duplicate.style.left =
                      targetPageX - headerIconSize / 2 + "px";
                    duplicate.style.top =
                      targetPageY - headerIconSize / 2 + "px";
                    duplicate.style.opacity = "1";
                    duplicate.style.display = "flex";
                  }
                });
              }

              textAnimationOrder.forEach((item, randomIndex) => {
                const segmentStart = 0.75 + randomIndex * 0.03;
                const segmentEnd = segmentStart + 0.015;

                const segmentProgress = gsap.utils.mapRange(
                  segmentStart,
                  segmentEnd,
                  0,
                  1,
                  progress
                );

                const clampedProgress = Math.max(
                  0,
                  Math.min(1, segmentProgress)
                );

                gsap.set(item.segment, {
                  opacity: clampedProgress,
                });
              });
            }
          },
        });

        ScrollTrigger.refresh();

        createBringSectionAnimation();

        ScrollTrigger.refresh();

        createWorkflowSectionAnimation();

        ScrollTrigger.refresh();
      };

      gsap
        .timeline({
          delay: 0.2,
          onComplete: createHeroScroll,
        })
        .to(".title-question", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .to(
          ".title-name",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "+=0.15"
        )
        .to(
          ".about-title-subcopy",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          iconElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.15"
        );

      return () => {
        if (window.aboutDuplicateIcons) {
          window.aboutDuplicateIcons.forEach((duplicate) => {
            duplicate.remove();
          });

          window.aboutDuplicateIcons = null;
        }

        ScrollTrigger.getById("about-hero-scroll")?.kill();
        ScrollTrigger.getById("about-bring-index")?.kill();
        ScrollTrigger.getById("about-bring-title")?.kill();
        ScrollTrigger.getById("about-bring-cards")?.kill();
        ScrollTrigger.getById("workflow-intro")?.kill();
        ScrollTrigger.getById("workflow-pinned")?.kill();
      };
    },
    { scope: container }
  );

  return (
    <main ref={container}>
      <div className="about-root">
        <section className="about-page-hero">
          <div className="hero-header">
            <h1 className="about-title">
              <span className="title-question">So, who's</span>{" "}
              <span className="title-name">Sanchit?</span>
            </h1>

            <p className="about-title-subcopy">
              Scroll with the objects. The rest follows.
            </p>
          </div>

          <div className="animated-icons">
            <div className="animated-icon icon-1">
              <img src={macIcon} alt="" />
            </div>

            <div className="animated-icon icon-2">
              <img src={xm5Icon} alt="" />
            </div>

            <div className="animated-icon icon-3">
              <img src={camIcon} alt="" />
            </div>

            <div className="animated-icon icon-4">
              <img src={hatIcon} alt="" />
            </div>

            <div className="animated-icon icon-5">
              <img src={bootsIcon} alt="" />
            </div>
          </div>

          <h1 className="animated-text">
            <div className="placeholder-icon"></div>
            <span className="text-segment">PART ENGINEER,</span>

            <div className="placeholder-icon"></div>
            <span className="text-segment">PART VISUAL THINKER, BUILDING</span>

            <span className="text-segment"> INTERFACES WITH</span>

            <div className="placeholder-icon"></div>
            <span className="text-segment"> STRUCTURE, M</span>

            <div className="placeholder-icon"></div>
            <span className="text-segment">TION, RHYTHM, AND</span>

            <div className="placeholder-icon"></div>
            <span className="text-segment">PERSONAL TASTE.</span>
          </h1>
        </section>

        <section className="about-belief-section">
          <div className="about-section-title-wrap">
            <p className="about-section-index">01 /</p>

            <h2 className="about-section-title">
              WHAT I bring <br /> to the screen
            </h2>
          </div>

          <div className="about-belief-grid">
            <article className="about-belief-card">
              <h2>Code that keeps up.</h2>

              <div className="about-belief-card-bottom">
                <p>
                  I build responsive front-end interfaces with clean structure,
                  reusable components, and enough flexibility to support the
                  visual direction. Layout, interaction, and behavior should
                  feel like they belong to the same system.
                </p>

                <span className="card-cue">↗</span>
              </div>
            </article>

            <article className="about-belief-card">
              <h2>Motion with purpose.</h2>

              <div className="about-belief-card-bottom">
                <p>
                  I use animation to guide attention, create pacing, and make a
                  page feel alive without turning it into noise. The goal is not
                  more movement — it’s better timing.
                </p>

                <span className="card-cue">↗</span>
              </div>
            </article>

            <article className="about-belief-card">
              <h2>Taste you can feel.</h2>

              <div className="about-belief-card-bottom">
                <p>
                  My visual references come from photography, music, fashion,
                  type, and the small details people remember. I design
                  interfaces that stay clear, but still have a point of view.
                </p>

                <span className="card-cue">↗</span>
              </div>
            </article>
          </div>
        </section>

        <section className="about-workflow-section">
          <div className="roles-layer">
            <div className="roles-heading">
              <p className="roles-index">02 /</p>

              <h2 className="roles-title">
                Where it <br />
                shows up
              </h2>
            </div>

            <div className="roles-horizontal">
              <div className="roles-track">
                <article className="role-panel">
                  <div className="role-panel-top">
                    <div className="role-panel-copy">
                      <h3>Frontend Development</h3>

                      <p>
                        I build responsive interfaces where layout, motion, and
                        structure work together.
                      </p>

                      <ul>
                        <li>React</li>
                        <li>JavaScript</li>
                        <li>HTML / CSS</li>
                        <li>GSAP</li>
                        <li>Material UI</li>
                        <li>SQL</li>
                      </ul>
                    </div>
                  </div>
                </article>

                <article className="role-panel">
                  <div className="role-panel-top">
                    <div className="role-panel-copy">
                      <h3>Visuals & Creative</h3>

                      <p>
                        I shape the visual layer through type, image, spacing,
                        and a point of view.
                      </p>

                      <ul>
                        <li>Graphic design</li>
                        <li>Figma</li>
                        <li>Canva</li>
                        <li>Adobe Creative Suite</li>
                        <li>Photography</li>
                        <li>Visual direction</li>
                      </ul>
                    </div>
                  </div>
                </article>

                <article className="role-panel role-panel-experience">
                  <div className="role-panel-top">
                    <div className="role-panel-copy">
                      <h3>Project Experience</h3>

                      <p>
                        A mix of front-end work, design internships, freelance
                        creative work, and software engineering.
                      </p>

                      <ul>
                        <li>Frontend Project - OOCAA, 2025</li>
                        <li>
                          Graphic Design Intern - Green Career Centre, 2024
                        </li>
                        <li>Freelance Creative Work - Present</li>
                        <li>
                          B.Eng. Software Engineering — York University, 2025
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="notice-layer">
            <p className="notice-index">03 /</p>

            <h2 className="notice-main-title">
              The <br />
              details <br />
              people feel <br />
              before <br />
              they can <br />
              name.
            </h2>

            <div className="detail-pieces">
              <article
                className="detail-piece piece-spacing"
                data-x="-40vw"
                data-y="-36vh"
                data-rotate="-5"
              >
                <div className="detail-piece-inner">
                  <h3>Spacing</h3>
                  <p>How close something sits to the next thing.</p>
                </div>
              </article>

              <article
                className="detail-piece piece-timing"
                data-x="24vw"
                data-y="20vh"
                data-rotate="0"
              >
                <div className="detail-piece-inner">
                  <h3>Timing</h3>
                  <p>When an animation enters, exits, waits, or interrupts.</p>
                </div>
              </article>

              <article
                className="detail-piece piece-hierarchy"
                data-x="-46vw"
                data-y="-6vh"
                data-rotate="-5"
              >
                <div className="detail-piece-inner">
                  <h3>Hierarchy</h3>
                  <p>
                    What the eye understands before the brain starts reading.
                  </p>
                </div>
              </article>

              <article
                className="detail-piece piece-responsive"
                data-x="23vw"
                data-y="-35vh"
                data-rotate="4"
              >
                <div className="detail-piece-inner">
                  <h3>Responsiveness</h3>
                  <p>How the idea survives when the screen changes.</p>
                </div>
              </article>

              <article
                className="detail-piece piece-texture"
                data-x="-37vw"
                data-y="20vh"
                data-rotate="0"
              >
                <div className="detail-piece-inner">
                  <h3>Texture</h3>
                  <p>The visual details that make a page feel less default.</p>
                </div>
              </article>

              <article
                className="detail-piece piece-clarity"
                data-x="30vw"
                data-y="-6vh"
                data-rotate="7"
              >
                <div className="detail-piece-inner">
                  <h3>Clarity</h3>
                  <p>The thing I come back to when the design gets too loud.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>

      <PageFooter />
    </main>
  );
};

export default AboutPage;
