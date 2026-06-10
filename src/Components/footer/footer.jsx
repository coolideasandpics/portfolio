import { useEffect, useRef } from "react";
import Matter from "matter-js";
import "./footer.css";

const footerData = {
  oocaa: {
    eyebrow: "Project Interaction",
    title: "The project, in motion.",
    text: "Drag the pieces around. Each one represents a tool, decision, or system layer behind this case study.",
    themeClass: "oocaa",
    items: [
      "Orbit Risk",
      "React",
      "SQL",
      "Dashboard",
      "Collision Data",
      "Frontend",
      "Aerospace",
      "Node.js",
      "Analysis",
    ],
  },

  studentyu: {
    eyebrow: "Project Interaction",
    title: "Move through the pieces.",
    text: "A small interactive summary of the research, design choices, and campus-life ideas behind StudentYU.",
    themeClass: "studentyu",
    items: [
      "Campus Life",
      "Figma",
      "Personas",
      "Surveys",
      "Wireframes",
      "Prototype",
      "Social UX",
      "Research",
      "Student Flow",
    ],
  },

  mokatail: {
    eyebrow: "Project Interaction",
    title: "Shake up the pieces.",
    text: "A small interactive summary of the motion, atmosphere, and scroll-led decisions behind MOKATAIL.",
    themeClass: "mokatail",
    items: [
      "GSAP",
      "ScrollTrigger",
      "Motion",
      "Cocktails",
      "Toronto Bar",
      "Visual Rhythm",
      "React",
      "Atmosphere",
      "Scroll Flow",
    ],
  },
};

const PhysicsFooter = ({ projectKey = "oocaa" }) => {
  const sceneRef = useRef(null);
  const itemRefs = useRef([]);
  const animationRef = useRef(null);
  const hasStartedRef = useRef(false);

  const data = footerData[projectKey];

  useEffect(() => {
    const container = sceneRef.current;
    const elements = itemRefs.current;

    if (!container || !elements.length) return;

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Body } =
      Matter;

    const engine = Engine.create();
    const runner = Runner.create();

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    engine.gravity.y = 1;

    const wallThickness = 80;

    const ground = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width,
      wallThickness,
      { isStatic: true }
    );

    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      { isStatic: true }
    );

    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      { isStatic: true }
    );

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    const bodies = elements.map((element, index) => {
      const rect = element.getBoundingClientRect();

      const body = Bodies.rectangle(
        width / 2 + (Math.random() - 0.5) * 300,
        -120 - index * 55,
        rect.width,
        rect.height,
        {
          restitution: 0.55,
          friction: 0.25,
          frictionAir: 0.025,
          density: 0.002,
        }
      );

      Composite.add(engine.world, body);
      return body;
    });

    const mouse = Mouse.create(container);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    const update = () => {
      bodies.forEach((body, index) => {
        const element = elements[index];

        if (!element) return;

        element.style.transform = `
          translate(
            ${body.position.x - element.offsetWidth / 2}px,
            ${body.position.y - element.offsetHeight / 2}px
          )
          rotate(${body.angle}rad)
        `;
      });

      animationRef.current = requestAnimationFrame(update);
    };

    const startPhysics = () => {
      if (hasStartedRef.current) return;

      hasStartedRef.current = true;
      Runner.run(runner, engine);
      update();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startPhysics();
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(container);

    const handleResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;

      Body.setPosition(ground, {
        x: newWidth / 2,
        y: newHeight + wallThickness / 2,
      });

      Body.setPosition(leftWall, {
        x: -wallThickness / 2,
        y: newHeight / 2,
      });

      Body.setPosition(rightWall, {
        x: newWidth + wallThickness / 2,
        y: newHeight / 2,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);

      hasStartedRef.current = false;
    };
  }, [projectKey]);

  if (!data) return null;

  return (
    <section className={`project-physics-footer ${data.themeClass}`}>
      <div className="project-physics-copy">
        <p className="project-physics-eyebrow">{data.eyebrow}</p>
        <h2>{data.title}</h2>
        <p>{data.text}</p>
      </div>

      <div className="project-physics-scene" ref={sceneRef}>
        {data.items.map((item, index) => (
          <span
            className="physics-item"
            key={item}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default PhysicsFooter;
