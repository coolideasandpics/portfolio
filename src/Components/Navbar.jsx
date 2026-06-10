import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Navbar.css";

const Navbar = ({ isLoaded }) => {
  const container = useRef(null);
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleNavClick = (e, path) => {
    const isSamePage = location.pathname === path;

    if (isSamePage) {
      e.preventDefault();

      requestAnimationFrame(() => {
        scrollToTop();
      });
    }
  };

  useGSAP(
    () => {
      if (!isLoaded || !container.current) return;

      gsap.fromTo(
        container.current,
        {
          y: -40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1.55,
          ease: "power3.out",
        }
      );
    },
    { scope: container, dependencies: [isLoaded] }
  );

  if (!isLoaded) return null;

  return (
    <nav ref={container}>
      <div>
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={(e) => handleNavClick(e, "/")}
        >
          <p>SD</p>
        </Link>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className={`nav-link nav-link-${link.id}`}
                onClick={(e) => handleNavClick(e, link.path)}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
