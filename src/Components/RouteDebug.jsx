import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RouteDebug = () => {
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const triggers = ScrollTrigger.getAll();

      console.group(`Route debug: ${location.pathname}`);

      console.log("Active ScrollTriggers:", triggers.length);

      console.log(
        "ScrollTrigger IDs:",
        triggers.map((trigger) => trigger.vars?.id || "(no id)")
      );

      console.log(
        "ScrollTrigger triggers:",
        triggers.map((trigger) => trigger.trigger)
      );

      console.log("About duplicate icons:", window.aboutDuplicateIcons);

      console.groupEnd();
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return null;
};

export default RouteDebug;
