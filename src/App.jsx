import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";

import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

import Loader from "./Components/Loader.jsx";
import Navbar from "./Components/Navbar.jsx";

import Home from "./Pages/Home.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ProjectsPage from "./Pages/ProjectsPage.jsx";
import ArtPage from "./Pages/ArtPage.jsx";
import ProjectDetailPage from "./Pages/ProjectDetailPage.jsx";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
//import RouteDebug from "./Components/RouteDebug";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      stopInertiaOnNavigate: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;

    lenisRef.current.scrollTo(0, {
      immediate: true,
      force: true,
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [location.pathname]);

  return (
    <main>
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      <Navbar isLoaded={isLoaded} />

      <Routes>
        <Route path="/" element={<Home isLoaded={isLoaded} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/art" element={<ArtPage />} />
      </Routes>

      <Analytics />
      <SpeedInsights />
    </main>
  );
};

export default App;
