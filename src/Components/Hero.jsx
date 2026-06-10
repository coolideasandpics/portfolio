import React, { useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { useGSAP } from "@gsap/react";
import LiquidGradientBackground from "./LiquidGradientBackground.jsx";
import "./Hero.css";

gsap.registerPlugin(CustomEase, useGSAP);

const Hero = ({ isLoaded }) => {
  const container = useRef(null);

  useGSAP(
    () => {
      if (!isLoaded || !container.current) return;

      CustomEase.create("hop", "0.9,0,0.1,1");

      const words = {
        shaping: ".word-shaping",
        feeling: ".word-feeling",
        into: ".word-into",
        function: ".word-function",
      };

      gsap.set(".hero-tagline", {
        visibility: "visible",
      });

      gsap.set(words.shaping, {
        opacity: 0,
        xPercent: -18,
        yPercent: -80,
        rotate: -3,
        filter: "blur(16px)",
      });

      gsap.set(words.feeling, {
        opacity: 0,
        xPercent: 18,
        yPercent: -80,
        rotate: 3,
        filter: "blur(16px)",
      });

      gsap.set(words.into, {
        opacity: 0,
        xPercent: -18,
        yPercent: 80,
        rotate: 3,
        filter: "blur(14px)",
      });

      gsap.set(words.function, {
        opacity: 0,
        xPercent: 18,
        yPercent: 80,
        rotate: -3,
        filter: "blur(16px)",
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "hop",
        },
      });

      tl.to(words.shaping, {
        opacity: 1,
        xPercent: 0,
        yPercent: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.05,
      });

      tl.to(
        words.feeling,
        {
          opacity: 1,
          xPercent: 0,
          yPercent: 0,
          rotate: 0,
          filter: "blur(0px)",
          duration: 1.05,
        },
        "-=0.72"
      );

      tl.to(
        words.into,
        {
          opacity: 1,
          xPercent: 0,
          yPercent: 0,
          rotate: 0,
          filter: "blur(0px)",
          duration: 1,
        },
        "-=0.68"
      );

      tl.to(
        words.function,
        {
          opacity: 1,
          xPercent: 0,
          yPercent: 0,
          rotate: 0,
          filter: "blur(0px)",
          duration: 1.1,
        },
        "-=0.72"
      );

      return () => {
        tl.kill();
      };
    },
    { scope: container, dependencies: [isLoaded] }
  );

  return (
    <section className="hero" ref={container}>
      <div className="hero-bg">
        <LiquidGradientBackground />
      </div>

      <div className="hero-copy">
        <p className="hero-tagline" aria-label="shaping feeling into function">
          <span className="tag-word word-shaping">shaping</span>
          <span className="tag-word word-feeling">feeling</span>
          <br />
          <span className="tag-word word-into">into</span>
          <span className="tag-word word-function">function</span>
        </p>
      </div>
    </section>
  );
};

export default Hero;
