import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { useGSAP } from "@gsap/react";
import "./Loader.css";

gsap.registerPlugin(CustomEase, useGSAP);

const Loader = ({ onComplete }) => {
  const container = useRef(null);

  const isFirefox =
    typeof navigator !== "undefined" &&
    navigator.userAgent.toLowerCase().includes("firefox");

  useEffect(() => {
    if (isFirefox && onComplete) {
      onComplete();
    }
  }, [isFirefox, onComplete]);

  useGSAP(
    () => {
      if (isFirefox || !container.current) return;

      CustomEase.create("hop", "0.9,0,0.1,1");

      const textPaths = container.current.querySelectorAll("svg textPath");

      const startTextLengths = Array.from(textPaths).map((tp) =>
        parseFloat(tp.getAttribute("textLength"))
      );

      const startTextOffset = Array.from(textPaths).map((tp) =>
        parseFloat(tp.getAttribute("startOffset"))
      );

      const targetTextLengths = [
        4000, 3500, 3250, 3000, 2500, 2000, 1500, 1250,
      ];

      const orbitRadii = [775, 700, 625, 550, 475, 400, 325, 250];

      const maxOrbitRadius = orbitRadii[0];
      const maxAnimDuration = 1.25;
      const minAnimDuration = 1;

      textPaths.forEach((textPath, index) => {
        const animationDelay = (textPaths.length - 1 - index) * 0.1;
        const currentOrbitRadius = orbitRadii[index];

        const currentDuration =
          minAnimDuration +
          (currentOrbitRadius / maxOrbitRadius) *
            (maxAnimDuration - minAnimDuration);

        const pathLength = 2 * Math.PI * currentOrbitRadius * 3;

        const textLengthIncrease =
          targetTextLengths[index] - startTextLengths[index];

        const offsetAdjustment = (textLengthIncrease / 2 / pathLength) * 100;
        const targetOffset = startTextOffset[index] - offsetAdjustment;

        gsap.to(textPath, {
          attr: {
            textLength: targetTextLengths[index],
            startOffset: targetOffset + "%",
          },
          duration: currentDuration,
          delay: animationDelay,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      let loaderRotation = 0;

      function animateRotation() {
        const spinDirection = Math.random() < 0.5 ? 1 : -1;
        loaderRotation += 25 * spinDirection;

        const svg = container.current?.querySelector("svg");

        if (!svg) return;

        gsap.to(svg, {
          rotation: loaderRotation,
          duration: 2,
          ease: "power2.inOut",
          onComplete: animateRotation,
        });
      }

      animateRotation();

      const counterText = container.current.querySelector(".counter p");
      const count = { value: 0 };

      gsap.to(count, {
        value: 100,
        duration: 4,
        delay: 1,
        ease: "power1.out",
        onUpdate: () => {
          if (counterText) {
            counterText.textContent = Math.floor(count.value);
          }
        },
        onComplete: () => {
          gsap.to(container.current.querySelector(".counter"), {
            opacity: 0,
            duration: 0.5,
            delay: 1,
          });
        },
      });

      const orbitTextElements =
        container.current.querySelectorAll(".orbit-text");

      gsap.set(orbitTextElements, { opacity: 0 });

      const orbitTextsReversed = Array.from(orbitTextElements).reverse();

      gsap.to(orbitTextsReversed, {
        opacity: 1,
        duration: 0.75,
        stagger: 0.125,
        ease: "power1.out",
      });

      gsap.to(orbitTextsReversed, {
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        delay: 6,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(container.current, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        },
      });
    },
    { scope: container, dependencies: [isFirefox] }
  );

  if (isFirefox) return null;

  return (
    <div className="loader" ref={container}>
      <svg viewBox="-425 -425 1850 1850" xmlns="http://www.w3.org/2000/svg">
        <path
          id="loader-orbit-1"
          d="M 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 499.99,-275"
        />
        <path
          id="loader-orbit-2"
          d="M 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 499.99,-200"
        />
        <path
          id="loader-orbit-3"
          d="M 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 499.99,-125"
        />
        <path
          id="loader-orbit-4"
          d="M 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 499.99,-50"
        />
        <path
          id="loader-orbit-5"
          d="M 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 499.99,25"
        />
        <path
          id="loader-orbit-6"
          d="M 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 499.99,100"
        />
        <path
          id="loader-orbit-7"
          d="M 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 499.99,175"
        />
        <path
          id="loader-orbit-8"
          d="M 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 499.99,250"
        />

        <text className="orbit-text">
          <textPath href="#loader-orbit-1" startOffset="30%" textLength="430">
            Creative
          </textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-2" startOffset="31%" textLength="430">
            Designer
          </textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-3" startOffset="33%" textLength="390">
            Systems
          </textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-4" startOffset="32%" textLength="540">
            Interactive
          </textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-5" startOffset="30%" textLength="620">
            User Interface
          </textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-6" startOffset="31%" textLength="420">
            Engineer
          </textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-7" startOffset="33%" textLength="440">
            Frontend
          </textPath>
        </text>
        <text className="orbit-text">
          <textPath href="#loader-orbit-8" startOffset="32%" textLength="470">
            Developer
          </textPath>
        </text>
      </svg>

      <div className="counter">
        <p className="uppercase font-medium">0</p>
      </div>
    </div>
  );
};

export default Loader;
