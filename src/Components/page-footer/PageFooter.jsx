import { useRef } from "react";
import { ArrowDownToLine } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PageFooter = () => {
  const pageFooterRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(pageFooterRef);

      const resumeButton = q(".page-footer-resume-button");
      const kicker = q(".page-footer-kicker");
      const titleSpans = q(".page-footer-title span");
      const note = q(".page-footer-note");
      const arrowPaths = q(".page-footer-arrow path");
      const footerLinks = q(".page-footer-links a");
      const copy = q(".page-footer-copy");

      gsap.set(resumeButton, {
        autoAlpha: 0,
        y: -12,
      });

      gsap.set(kicker, {
        autoAlpha: 0,
        y: 18,
      });

      gsap.set(titleSpans, {
        autoAlpha: 0,
        y: 90,
      });

      gsap.set(note, {
        autoAlpha: 0,
        x: 24,
      });

      gsap.set(arrowPaths, {
        strokeDasharray: 300,
        strokeDashoffset: 300,
      });

      gsap.set(footerLinks, {
        autoAlpha: 0,
        y: 14,
      });

      gsap.set(copy, {
        autoAlpha: 0,
        y: 10,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pageFooterRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(resumeButton, {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
      })
        .to(
          kicker,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.2"
        )
        .to(
          titleSpans,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.15"
        )

        /*
          Grouped entrance:
          note, arrow, and links all begin right after the title.
        */
        .to(
          note,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.45,
          },
          "-=0.2"
        )
        .to(
          arrowPaths,
          {
            strokeDashoffset: 0,
            duration: 0.5,
          },
          "<"
        )
        .to(
          footerLinks,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.035,
          },
          "<"
        )

        /*
          Copyright comes in almost immediately after that group starts settling.
        */
        .to(
          copy,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
          },
          "-=0.15"
        );

      return () => {
        tl.kill();
      };
    },
    { scope: pageFooterRef }
  );

  return (
    <footer className="page-footer" ref={pageFooterRef}>
      <div className="page-footer-inner">
        <a
          className="page-footer-resume-button"
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          View Resume
          <ArrowDownToLine size={22} strokeWidth={1.8} />
        </a>

        <div className="page-footer-main">
          <p className="page-footer-kicker">Still here?</p>

          <div className="page-footer-title-wrap">
            <h2 className="page-footer-title">
              <span>Work with</span>
              <span className="page-footer-title-italic">me.</span>
            </h2>

            <div className="page-footer-annotation">
              <svg
                className="page-footer-arrow"
                width="98"
                height="76"
                viewBox="0 0 98 76"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M84 11C55 4 27 18 19 47"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M18 47L9 33"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M18 47L34 40"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>

              <p className="page-footer-note">Let’s make something</p>
            </div>
          </div>

          <div className="page-footer-links" aria-label="Footer links">
            <a href="mailto:sanchitd.mail@gmail.com">Email</a>

            <a
              href="https://www.linkedin.com/in/sanchit-d/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>

            <a
              href="https://www.instagram.com/sanartchit"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        <p className="page-footer-copy">
          © 2026 | Definitely not my first draft.
        </p>
      </div>
    </footer>
  );
};

export default PageFooter;
