import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import "./Process.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Process = () => {
  const container = useRef();

  useGSAP(
    () => {
      gsap.fromTo(
        ".process-intro h1",
        {
          scale: 0.62,
          y: 80,
          opacity: 0.35,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-intro",
            start: "top bottom",
            end: "center center",
            scrub: 1.4,
          },
        }
      );

      const titleHeadings = gsap.utils.toArray(".process-title h1");
      const splits = [];

      titleHeadings.forEach((heading) => {
        const split = SplitText.create(heading, {
          type: "chars",
          charsClass: "chars",
        });

        splits.push(split);

        split.chars.forEach((char, i) => {
          const charInitialY = i % 2 === 0 ? -150 : 150;
          gsap.set(char, { y: charInitialY });
        });
      });

      const titles = gsap.utils.toArray(".process-title");

      titles.forEach((title, index) => {
        const titleContainer = title.querySelector(".process-title-container");
        const titleCopy = title.querySelector(".process-title-copy");

        const titleContainerInitialX = index % 2 === 0 ? -100 : 100;
        const split = splits[index];
        const charCount = split.chars.length;

        gsap.set(titleCopy, {
          opacity: 0,
          y: 24,
        });

        ScrollTrigger.create({
          trigger: title,
          start: "top bottom",
          end: "center center ",
          scrub: 2,
          onUpdate: (self) => {
            const titleContainerX =
              titleContainerInitialX - self.progress * titleContainerInitialX;

            gsap.set(titleContainer, {
              x: `${titleContainerX}%`,
            });

            split.chars.forEach((char, i) => {
              let charStaggerIndex;

              if (index % 2 !== 0) {
                charStaggerIndex = charCount - 1 - i;
              } else {
                charStaggerIndex = i;
              }

              const charStartDelay = 0.1;
              const charTimelineSpan = 1 - charStartDelay;
              const staggerFactor = Math.min(0.75, charTimelineSpan * 0.75);

              const delay =
                charStartDelay + (charStaggerIndex / charCount) * staggerFactor;

              const duration =
                charTimelineSpan -
                (staggerFactor * (charCount - 1)) / charCount;

              const start = delay;

              let charProgress = 0;

              if (self.progress >= start) {
                charProgress = Math.min(1, (self.progress - start) / duration);
              }

              const charInitialY = i % 2 === 0 ? -150 : 150;
              const charY = charInitialY - charProgress * charInitialY;

              gsap.set(char, {
                y: charY,
              });
            });

            const copyProgress = gsap.utils.clamp(
              0,
              1,
              (self.progress - 0.82) / 0.18
            );

            gsap.set(titleCopy, {
              opacity: copyProgress,
              y: 24 - copyProgress * 24,
            });
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <main ref={container}>
      <section className="process">
        <section className="process-intro">
          <h1>BUILDING THE EXPERIENCE</h1>
        </section>

        <section className="process-animated-titles">
          <section className="process-number-break number-right">
            <span className="process-big-number number-01">01</span>
          </section>

          <div className="process-title">
            <div className="process-title-container">
              <h1>FLOW</h1>

              <div className="process-title-copy">
                <p className="process-eyebrow">Discovery & Direction</p>
                <p>
                  I start by understanding the user, the goal, and the
                  interaction feeling the experience needs to create.
                </p>
              </div>
            </div>
          </div>

          <section className="process-number-break number-left">
            <span className="process-big-number number-02">02</span>
          </section>

          <div className="process-title">
            <div className="process-title-container">
              <h1>STRUCTURE</h1>

              <div className="process-title-copy">
                <p className="process-eyebrow">Layout & Flow</p>
                <p>
                  I turn ideas into hierarchy, user flows, layouts, and
                  interaction patterns that make the experience easier to
                  navigate.
                </p>
              </div>
            </div>
          </div>

          <section className="process-number-break number-right">
            <span className="process-big-number number-03">03</span>
          </section>

          <div className="process-title">
            <div className="process-title-container">
              <h1>BUILD</h1>

              <div className="process-title-copy">
                <p className="process-eyebrow">Frontend Execution</p>
                <p>
                  I translate the structure into responsive components,
                  animation logic, and working interface behavior.
                </p>
              </div>
            </div>
          </div>

          <section className="process-number-break number-left">
            <span className="process-big-number number-04">04</span>
          </section>

          <div className="process-title">
            <div className="process-title-container">
              <h1>REFINE</h1>

              <div className="process-title-copy">
                <p className="process-eyebrow">Testing & Polish</p>
                <p>
                  I tune spacing, motion timing, responsiveness, and edge cases
                  until the interface feels intentional and stable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Process;
