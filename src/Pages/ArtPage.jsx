import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./ArtPage.css";

gsap.registerPlugin(useGSAP);

const photos = [
  "src/assets/ArtPage/img-01.png",
  "src/assets/ArtPage/img-02.png",
  "src/assets/ArtPage/img-03.png",
  "src/assets/ArtPage/img-04.png",
  "src/assets/ArtPage/img-05.png",
  "src/assets/ArtPage/img-06.png",
  "src/assets/ArtPage/img-07.png",
  "src/assets/ArtPage/img-08.png",
  "src/assets/ArtPage/img-09.png",
  "src/assets/ArtPage/img-10.png",
  "src/assets/ArtPage/img-11.png",
];

const introPhotos = [
  "src/assets/ArtPage/img-01.png",
  "src/assets/ArtPage/img-02.png",
  "src/assets/ArtPage/img-03.png",
  "src/assets/ArtPage/img-04.png",
  "src/assets/ArtPage/img-05.png",
  "src/assets/ArtPage/img-06.png",
  "src/assets/ArtPage/img-07.png",
  "src/assets/ArtPage/img-08.png",
  "src/assets/ArtPage/img-09.png",
  "src/assets/ArtPage/img-10.png",
  "src/assets/ArtPage/img-11.png",
  "src/assets/ArtPage/img-01.png",
  "src/assets/ArtPage/img-02.png",
  "src/assets/ArtPage/img-03.png",
];

const horizontalSize = {
  width: "120px",
  height: "80px",
};

const verticalSize = {
  width: "80px",
  height: "120px",
};

const zones = [
  { top: 8, left: 8 },
  { top: 8, left: 24 },
  { top: 8, left: 52 },
  { top: 8, left: 72 },

  { top: 24, left: 14 },
  { top: 24, left: 38 },
  { top: 24, left: 62 },
  { top: 24, left: 80 },

  { top: 43, left: 8 },
  { top: 43, left: 32 },
  { top: 43, left: 58 },
  { top: 43, left: 78 },

  { top: 64, left: 18 },
  { top: 64, left: 48 },
  { top: 64, left: 72 },
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function generatePositions() {
  const shuffledZones = shuffleArray(zones).slice(0, 14);

  return shuffledZones.map((zone, index) => {
    const jitterTop = randomBetween(-4, 4);
    const jitterLeft = randomBetween(-5, 5);

    const isVerticalPhoto = index === 7;

    return {
      top: `${zone.top + jitterTop}%`,
      left: `${zone.left + jitterLeft}%`,
      width: isVerticalPhoto ? verticalSize.width : horizontalSize.width,
      height: isVerticalPhoto ? verticalSize.height : horizontalSize.height,
    };
  });
}

const IntroScatterGallery = ({ onOpenViewer, showIntroText = true }) => {
  const container = useRef(null);
  const isTransitioning = useRef(false);

  useGSAP(
    () => {
      const positions = generatePositions();

      gsap.set(".art-scatter-img", {
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(0)",
      });

      if (showIntroText) {
        gsap.from(".art-header p", {
          y: 40,
          ease: "power4.inOut",
          duration: 1,
          stagger: {
            amount: 0.15,
          },
          delay: 0.25,
        });
      }

      gsap.to(".art-scatter-img", {
        scale: 1,
        width: "300px",
        height: "400px",
        stagger: 0.15,
        duration: 0.75,
        ease: "power2.out",
        delay: 0.25,
        onComplete: scatterAndShrink,
      });

      if (showIntroText) {
        gsap.to(".art-header p", {
          top: "40px",
          ease: "power4.inOut",
          duration: 1,
          stagger: {
            amount: 0.15,
          },
          delay: 2.5,
          onComplete: () => {
            const header = container.current?.querySelector(".art-header");
            if (header) header.remove();
          },
        });
      }

      function scatterAndShrink() {
        gsap.to(".art-scatter-img", {
          top: (i) => positions[i].top,
          left: (i) => positions[i].left,
          transform: "none",
          width: (i) => positions[i].width,
          height: (i) => positions[i].height,
          stagger: 0.075,
          duration: 0.75,
          ease: "power2.out",
          onComplete: () => {
            const gallery = container.current?.querySelector(".art-gallery");
            gallery?.classList.add("is-ready");
          },
        });
      }
    },
    { scope: container }
  );

  function handleImageClick(index, event) {
    const gallery = container.current?.querySelector(".art-gallery");
    const artContainer = container.current?.querySelector(".art-container");

    if (!gallery?.classList.contains("is-ready")) return;
    if (isTransitioning.current) return;

    isTransitioning.current = true;

    const clickedImage = event.currentTarget;
    const clickedImg = clickedImage.querySelector("img");
    const allImages = container.current.querySelectorAll(".art-scatter-img");

    const selectedIndex = index % photos.length;
    const rect = clickedImage.getBoundingClientRect();

    const transitionLayer = document.createElement("div");
    transitionLayer.className = "art-transition-image-layer";

    const transitionImg = document.createElement("img");
    transitionImg.src = clickedImg.src;
    transitionImg.alt = "";

    transitionLayer.appendChild(transitionImg);
    document.body.appendChild(transitionLayer);

    gsap.set(transitionLayer, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 999,
      overflow: "visible",
      pointerEvents: "none",
    });

    gsap.set(transitionImg, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    });

    gsap.set(clickedImage, {
      opacity: 0,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.inOut",
      },
      onComplete: () => {
        onOpenViewer(selectedIndex);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            gsap.to(transitionLayer, {
              opacity: 0,
              duration: 0.45,
              delay: 0.08,
              ease: "power2.out",
              onComplete: () => {
                transitionLayer.remove();
              },
            });
          });
        });
      },
    });

    tl.set(gallery, {
      pointerEvents: "none",
    });

    tl.to(
      allImages,
      {
        opacity: 0,
        scale: 0.85,
        duration: 0.45,
        stagger: {
          amount: 0.08,
          from: index,
        },
      },
      0
    );

    tl.to(
      artContainer,
      {
        backgroundColor: "#f1efe7",
        duration: 0.6,
      },
      0
    );

    tl.to(
      transitionLayer,
      {
        top: "50%",
        left: "47%",
        xPercent: -50,
        yPercent: -50,
        width: "72vw",
        height: "76vh",
        duration: 0.9,
      },
      0.1
    );

    tl.to(
      transitionImg,
      {
        objectFit: "contain",
        duration: 0.9,
      },
      0.1
    );
  }

  return (
    <main className="art-root art-intro-root" ref={container}>
      <div className="art-container">
        {showIntroText && (
          <div className="art-header">
            <div className="art-text">
              <p>OUTSIDE THE SCREEN</p>
            </div>

            <div className="art-text art-text-2">
              <p>STILL COMPOSING</p>
            </div>
          </div>
        )}

        <div className="art-gallery">
          {introPhotos.map((photo, index) => (
            <div
              className="art-scatter-img"
              key={`${photo}-${index}`}
              onClick={(event) => handleImageClick(index, event)}
            >
              <img src={photo} alt="" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

const MinimapViewer = ({ initialIndex = 0, onBack }) => {
  const mainRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const items = container.querySelector(".art-items");
    const indicator = container.querySelector(".art-indicator");
    const itemElements = Array.from(container.querySelectorAll(".art-item"));
    const minimap = container.querySelector(".art-minimap");
    const viewerControls = container.querySelector(".art-viewer-controls");

    if (!items || !indicator || itemElements.length === 0) return;

    let isHorizontal = window.innerWidth <= 900;

    let dimensions = {
      itemSize: 0,
      containerSize: 0,
      indicatorSize: 0,
    };

    let targetTranslate = 0;
    let minTranslate = 0;
    let maxTranslate = 0;
    let currentActiveIndex = initialIndex;

    const clickHandlers = [];

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function getIndicatorOffset() {
      return initialIndex > 0 ? 65 : 0;
    }

    function getCenterOffset() {
      return (dimensions.indicatorSize - dimensions.itemSize) / 2;
    }

    function getMaxPositiveTranslate() {
      return getIndicatorOffset() + getCenterOffset();
    }

    function getMinNegativeTranslate() {
      const lastIndex = itemElements.length - 1;

      return (
        -lastIndex * dimensions.itemSize +
        getIndicatorOffset() +
        getCenterOffset()
      );
    }

    function updateDimensions() {
      isHorizontal = window.innerWidth <= 900;

      const firstItem = itemElements[0];
      if (!firstItem) return;

      if (isHorizontal) {
        dimensions = {
          itemSize: firstItem.getBoundingClientRect().width,
          containerSize: items.scrollWidth,
          indicatorSize: indicator.getBoundingClientRect().width,
        };
      } else {
        dimensions = {
          itemSize: firstItem.getBoundingClientRect().height,
          containerSize: items.scrollHeight,
          indicatorSize: indicator.getBoundingClientRect().height,
        };
      }

      minTranslate = getMinNegativeTranslate();
      maxTranslate = getMaxPositiveTranslate();

      targetTranslate = clamp(targetTranslate, minTranslate, maxTranslate);
    }

    function getActiveIndexFromTranslate() {
      const indicatorOffset = getIndicatorOffset();

      const indicatorCenter =
        -targetTranslate + indicatorOffset + dimensions.indicatorSize / 2;

      const index = Math.round(
        (indicatorCenter - dimensions.itemSize / 2) / dimensions.itemSize
      );

      return clamp(index, 0, itemElements.length - 1);
    }

    function updateActiveIndex() {
      const nextIndex = getActiveIndexFromTranslate();

      if (nextIndex !== currentActiveIndex) {
        itemElements[currentActiveIndex]?.classList.remove("active");
        itemElements[nextIndex]?.classList.add("active");

        currentActiveIndex = nextIndex;
        setActiveIndex(nextIndex);
      }
    }

    const quickY = gsap.quickTo(items, "y", {
      duration: 0.7,
      ease: "power3.out",
      onUpdate: updateActiveIndex,
    });

    const quickX = gsap.quickTo(items, "x", {
      duration: 0.7,
      ease: "power3.out",
      onUpdate: updateActiveIndex,
    });

    function moveTo(value) {
      targetTranslate = clamp(value, minTranslate, maxTranslate);

      if (isHorizontal) {
        quickX(targetTranslate);
      } else {
        quickY(targetTranslate);
      }
    }

    function moveToIndex(index, immediate = false) {
      const indicatorOffset = getIndicatorOffset();

      const centeredPosition =
        -index * dimensions.itemSize + indicatorOffset + getCenterOffset();

      targetTranslate = clamp(centeredPosition, minTranslate, maxTranslate);

      if (immediate) {
        gsap.set(items, {
          x: isHorizontal ? targetTranslate : 0,
          y: isHorizontal ? 0 : targetTranslate,
          force3D: true,
        });

        itemElements[currentActiveIndex]?.classList.remove("active");
        itemElements[index]?.classList.add("active");

        currentActiveIndex = index;
        setActiveIndex(index);
      } else {
        moveTo(centeredPosition);
      }
    }

    function handleWheel(e) {
      e.preventDefault();

      const scrollSpeed = 0.75;
      const delta = e.deltaY * scrollSpeed;

      moveTo(targetTranslate - delta);
    }

    function handleItemClick(index) {
      moveToIndex(index);
    }

    function handleResize() {
      updateDimensions();
      moveToIndex(currentActiveIndex, true);
      updateActiveIndex();
    }

    function init() {
      updateDimensions();

      itemElements.forEach((item) => item.classList.remove("active"));
      itemElements[initialIndex]?.classList.add("active");

      setActiveIndex(initialIndex);
      currentActiveIndex = initialIndex;

      moveToIndex(initialIndex, true);

      container.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("resize", handleResize);

      itemElements.forEach((item, index) => {
        const clickHandler = () => handleItemClick(index);
        clickHandlers[index] = clickHandler;
        item.addEventListener("click", clickHandler);
      });
    }

    const preloadImages = photos.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;

        if (img.decode) {
          img.decode().then(resolve).catch(resolve);
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });
    });

    Promise.all(preloadImages).then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(init);
      });
    });

    gsap.fromTo(
      minimap,
      {
        opacity: 0,
        x: 20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      viewerControls,
      {
        opacity: 0,
        x: -12,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 0.25,
        ease: "power3.out",
      }
    );

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);

      itemElements.forEach((item, index) => {
        if (clickHandlers[index]) {
          item.removeEventListener("click", clickHandlers[index]);
        }
      });

      gsap.killTweensOf(items);
      gsap.killTweensOf([minimap, viewerControls]);
    };
  }, [initialIndex]);

  function handleBackClick() {
    const container = mainRef.current;
    if (!container) return;

    gsap.to(container, {
      opacity: 0,
      scale: 0.985,
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: onBack,
    });
  }

  return (
    <main className="art-root art-viewer-root" ref={mainRef}>
      <div className="art-map-container">
        <div className="art-viewer-controls">
          <button
            className="art-reshuffle-button"
            type="button"
            onClick={handleBackClick}
          >
            Reshuffle
          </button>
        </div>

        <div className="art-img-preview">
          {photos.map((photo, index) => (
            <img
              key={photo}
              className={`art-preview-img ${
                activeIndex === index ? "active" : ""
              }`}
              src={photo}
              alt=""
            />
          ))}
        </div>

        <div
          className={`art-minimap ${initialIndex > 0 ? "has-previous" : ""}`}
        >
          <div className="art-indicator"></div>

          <div className="art-items">
            {photos.map((photo) => (
              <button className="art-item" key={photo} type="button">
                <img src={photo} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

const ArtPage = () => {
  const [mode, setMode] = useState("intro");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showIntroText, setShowIntroText] = useState(true);

  function openViewer(index) {
    setSelectedIndex(index);
    setShowIntroText(false);
    setMode("viewer");
  }

  function backToScatter() {
    setMode("intro");
  }

  return (
    <>
      {mode === "intro" && (
        <IntroScatterGallery
          onOpenViewer={openViewer}
          showIntroText={showIntroText}
        />
      )}

      {mode === "viewer" && (
        <MinimapViewer initialIndex={selectedIndex} onBack={backToScatter} />
      )}
    </>
  );
};

export default ArtPage;
