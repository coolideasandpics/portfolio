import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(container);

      const aboutSection = q(".about")[0];
      const heroReveal = q(".about-hero-reveal")[0];
      const heroParts = q(".about-hero-part");

      gsap.set(heroParts, {
        y: 36,
        opacity: 0,
        filter: "blur(14px)",
      });

      gsap.set(heroReveal, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSection,
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
          once: false,
        },
        defaults: {
          ease: "none",
        },
      });

      heroTl
        .to(heroReveal, {
          scaleX: 1,
          duration: 0.35,
        })
        .to(heroReveal, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.35,
        })
        .to(
          heroParts,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.035,
          },
          0.25
        );

      const headers = q(".services-header");
      const services = q(".services")[0];
      const servicesCopy = q(".services-copy")[0];
      const paragraph = q(".animate-text")[0];
      const headingRange = document.createRange();
      headingRange.selectNodeContents(headers[1]);
      let paragraphTop = 0;
      let headingBottomOffset = 0;
      let headingGap = 0;

      const measurePlacement = () => {
        // Pin refreshes can re-parent the section, invalidating a live text range.
        headingRange.selectNodeContents(headers[1]);
        const scale = Number(gsap.getProperty(headers[1], "scaleY")) || 1;
        const textRect = headingRange.getClientRects()[0] || headingRange.getBoundingClientRect();
        const headerRect = headers[1].getBoundingClientRect();
        const lineHeight = parseFloat(getComputedStyle(headers[1]).lineHeight);
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        headingGap = 1.5 * rem;
        headingBottomOffset = (textRect.bottom - headerRect.top) / scale -
          lineHeight / 2;

        if (window.innerWidth <= 1000) {
          const navHeight = document.querySelector("nav")?.offsetHeight || 0;
          const padding = parseFloat(getComputedStyle(servicesCopy).paddingTop);
          const clearance = navHeight + rem + textRect.height / scale * 0.3 +
            headingGap - padding;
          servicesCopy.style.setProperty("--services-copy-clearance", `${clearance}px`);
        } else {
          servicesCopy.style.removeProperty("--services-copy-clearance");
        }
        paragraphTop = paragraph.getBoundingClientRect().top + window.scrollY;
      };

      measurePlacement();
      const textElements = gsap.utils.toArray(".animate-text");

      textElements.forEach((textElement) => {
        textElement.setAttribute("data-text", textElement.textContent.trim());

        ScrollTrigger.create({
          trigger: textElement,
          start: "top 80%",
          end: "bottom 85%",
          scrub: 1,
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            textElement.style.setProperty("--clip-value", `${clipValue}%`);
          },
        });
      });

      gsap.set(headers[0], { xPercent: 100 });
      gsap.set(headers[1], { xPercent: -100 });
      gsap.set(headers[2], { xPercent: 100 });

      ScrollTrigger.create({
        trigger: ".services",
        start: "top bottom",
        end: "top top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(headers[0], {
            xPercent: 100 - self.progress * 100,
          });

          gsap.set(headers[1], {
            xPercent: -100 + self.progress * 100,
          });

          gsap.set(headers[2], {
            xPercent: 100 - self.progress * 100,
          });
        },
      });

      const updateServices = (self) => {
        if (self.progress <= 0.5) {
          const yProgress = self.progress / 0.5;

          gsap.set(headers, { scale: 1, y: 0 });

          gsap.set(headers[0], {
            yPercent: yProgress * 100,
          });

          gsap.set(headers[2], {
            yPercent: yProgress * -100,
          });
        } else {
          gsap.set(headers[0], {
            yPercent: 100,
          });

          gsap.set(headers[2], {
            yPercent: -100,
          });

          const scaleProgress = (self.progress - 0.5) / 0.5;
          const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
          const scale = 1 - scaleProgress * (1 - minScale);
          const scroll = self.start + self.progress * (self.end - self.start);
          const bottom = services.offsetHeight / 2 + headingBottomOffset * scale;
          const y = window.innerWidth <= 1000
            ? Math.min(0, paragraphTop - scroll - headingGap - bottom)
            : 0;

          headers.forEach((header) => {
            gsap.set(header, { scale, y });
          });
        }
      };

      ScrollTrigger.addEventListener("refreshInit", measurePlacement);
      ScrollTrigger.create({
        trigger: services,
        start: "top top",
        end: () => `+=${window.innerHeight * 2}`,
        pin: true,
        scrub: 1,
        pinSpacing: false,
        onUpdate: updateServices,
        onRefresh: () => {
          paragraphTop = paragraph.getBoundingClientRect().top + window.scrollY;
        },
      });

      const refreshFonts = () => ScrollTrigger.refresh();
      document.fonts.addEventListener("loadingdone", refreshFonts);
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", measurePlacement);
        document.fonts.removeEventListener("loadingdone", refreshFonts);
        servicesCopy.style.removeProperty("--services-copy-clearance");
      };
    },
    { scope: container }
  );

  return (
    <main ref={container} className="home-introduction">
      <section className="about">
        <div className="about-hero-reveal"></div>

        <h1 className="about-hero-title">
          <span className="about-hero-part">Sanchit is a</span>{" "}
          <span className="about-hero-part about-highlight">
            front-end developer
          </span>{" "}
          <span className="about-hero-part">and</span>{" "}
          <span className="about-hero-part about-highlight">
            multidisciplinary creative
          </span>{" "}
          <span className="about-hero-part">who blends</span>{" "}
          <span className="about-hero-part about-highlight">code</span>
          <span className="about-hero-part">,</span>{" "}
          <span className="about-hero-part about-highlight">design</span>
          <span className="about-hero-part">,</span>{" "}
          <span className="about-hero-part about-highlight">motion</span>
          <span className="about-hero-part">, and</span>{" "}
          <span className="about-hero-part about-highlight">
            visual storytelling
          </span>{" "}
          <span className="about-hero-part">
            into digital experiences that feel intentional, immersive, and real.
          </span>
        </h1>
      </section>

      <section className="services">
        <div className="services-header">WHAT I DO</div>
        <div className="services-header">WHAT I DO</div>
        <div className="services-header">WHAT I DO</div>
      </section>

      <section className="services-copy">
        <h1 className="animate-text">
          I turn visual ideas into responsive web experiences. Using React,
          JavaScript, CSS, Tailwind, and GSAP, I build interfaces that balance
          motion, clarity, usability, and performance.
        </h1>
      </section>
    </main>
  );
};

export default About;
