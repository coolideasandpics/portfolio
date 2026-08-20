import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import PhysicsFooter from "../footer/footer";
import eventsTable from "../../assets/oocaa/events-table.png";
import cdmVisualization from "../../assets/oocaa/cdm-visualization.png";
import cdmTable from "../../assets/oocaa/cdm-table.png";
import trendGraphs from "../../assets/oocaa/trend-graphs.png";
import watchlist from "../../assets/oocaa/watchlist.png";
import alertSystem from "../../assets/oocaa/alert-system.png";

gsap.registerPlugin(ScrollTrigger);

const OocaaSections = ({ project }) => {
  const container = useRef(null);

  const featuredScreens = [
    {
      number: "01",
      title: "Collision Event Search",
      image: eventsTable,
      caption:
        "Operators can search and filter collision events by object metadata, TCA range, miss distance, collision probability, and organization.",
    },
    {
      number: "02",
      title: "CDM Drilldown",
      image: cdmTable,
      caption:
        "Selecting an event reveals the CDMs connected to that collision scenario, moving users from overview to detailed inspection.",
    },
    {
      number: "03",
      title: "Orbit Visualization",
      image: cdmVisualization,
      caption:
        "Cesium visualizes the objects’ spatial positions, giving operators context beyond raw tabular CDM data.",
    },
    {
      number: "04",
      title: "Risk Trend Graphs",
      image: trendGraphs,
      caption:
        "Trend graphs show how TCA, miss distance, and collision probability evolve across related CDMs.",
    },
  ];

  useGSAP(
    () => {
      const chapters = gsap.utils.toArray(".case-study-chapter");
      const visuals = gsap.utils.toArray(".project-detail-visual");
      const textSections = gsap.utils.toArray(".project-detail-section");
      const screenCards = gsap.utils.toArray(".project-screen-card");
      const approachCards = gsap.utils.toArray(".approach-list > div");
      const flowSteps = gsap.utils.toArray(".flow-step");
      const decisionRows = gsap.utils.toArray(".oocaa-decision-row");

      chapters.forEach((chapter) => {
        const number = chapter.querySelector(".chapter-number");
        const heading = chapter.querySelector("h2");

        gsap.fromTo(
          [number, heading],
          {
            y: 90,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: chapter,
              start: "top 82%",
              end: "bottom 18%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      textSections.forEach((section) => {
        const children = section.querySelectorAll(
          ".section-label, .section-body, .section-support"
        );

        gsap.fromTo(
          children,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "bottom 18%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      visuals.forEach((visual) => {
        const frame = visual.querySelector(".project-detail-visual-frame");
        const caption = visual.querySelector(".visual-caption");

        gsap.fromTo(
          frame,
          {
            y: 80,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visual,
              start: "top 82%",
              end: "bottom 18%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );

        gsap.fromTo(
          caption,
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            delay: 0.12,
            scrollTrigger: {
              trigger: visual,
              start: "top 78%",
              end: "bottom 18%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        ".project-section-heading > *",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".project-screens-section",
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        screenCards,
        {
          y: 80,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".project-screen-grid",
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        approachCards,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".approach-list",
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        flowSteps,
        {
          y: 36,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: ".flow-steps",
            start: "top 78%",
            end: "bottom 20%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        decisionRows,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".oocaa-decision-list",
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="oocaa-case-study">
      <section className="project-detail-section" id="context">
        <div className="project-detail-container project-detail-two-col">
          <p className="section-label">Context</p>

          <div>
            <p className="section-body">
              OOCAA is a web-based aerospace platform developed for the Canadian
              Space Agency over an eight-month engagement. The platform helps
              satellite operators search, inspect, visualize, and monitor
              potential orbital collision events through a more navigable
              frontend experience.
            </p>

            <p className="section-support">
              Working under stakeholder supervision, the core challenge was
              translating dense CDM data into an interface that supported fast
              scanning, deep inspection, saved monitoring, and role-based access
              without overwhelming the user.
            </p>
          </div>
        </div>
      </section>

      <section className="case-study-chapter">
        <div className="project-detail-container">
          <span className="chapter-number">(01)</span>
          <h2>Dense orbital data, made navigable.</h2>
        </div>
      </section>

      <section className="project-detail-visual" id="demo">
        <div className="project-detail-container">
          <div className="project-detail-visual-frame is-dark">
            <img src={eventsTable} alt="OOCAA collision event search table" />
          </div>

          <p className="visual-caption">
            Operators begin by filtering collision events through object
            metadata, TCA range, miss distance, collision probability, and
            operator organization.
          </p>
        </div>
      </section>

      <section className="project-detail-visual">
        <div className="project-detail-container">
          <div className="project-detail-visual-frame is-dark">
            <img
              src={cdmVisualization}
              alt="OOCAA CDM orbit visualization using Cesium"
            />
          </div>

          <p className="visual-caption">
            Selecting a CDM reveals the orbital context behind the data, using
            Cesium to show object positions at the predicted moment of closest
            approach.
          </p>
        </div>
      </section>

      <section className="project-detail-section" id="system">
        <div className="project-detail-container project-detail-two-col">
          <p className="section-label">System</p>

          <div className="approach-list approach-list-six">
            <div>
              <h3>Visualization</h3>
              <p>
                Use orbit visualization and trend graphs to make collision-risk
                variables easier to interpret.
              </p>
            </div>

            <div>
              <h3>Collision Search</h3>
              <p>
                Search and filter events by object metadata, TCA range, miss
                distance, probability of collision, and operator organization.
              </p>
            </div>

            <div>
              <h3>CDM Drilldown</h3>
              <p>
                Move from high-level event records into the individual CDMs
                associated with a selected collision event.
              </p>
            </div>

            <div>
              <h3>Watchlist</h3>
              <p>
                Save search criteria as reusable monitoring subscriptions for
                high-priority events.
              </p>
            </div>

            <div>
              <h3>Alerts</h3>
              <p>
                Surface future matching events through alert-driven user
                workflows.
              </p>
            </div>

            <div>
              <h3>Role-Based UI</h3>
              <p>
                Support different access levels for admins, Level 1 operators,
                and Level 2 operators.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-chapter is-right">
        <div className="project-detail-container case-study-chapter-inner">
          <span className="chapter-number chapter-number-02">(02)</span>

          <h2 className="chapter-heading chapter-heading-02">
            <span>From event</span>
            <span>search to CDM</span>
            <span>insight.</span>
          </h2>
        </div>
      </section>

      <section className="project-screens-section" id="screens">
        <div className="project-detail-container">
          <div className="project-section-heading">
            <p className="section-label">Featured Screens</p>

            <h2>
              The interface turns a technical workflow into a readable frontend
              sequence.
            </h2>
          </div>

          <div className="project-screen-grid">
            {featuredScreens.map((screen) => (
              <article className="project-screen-card" key={screen.title}>
                <div className="project-screen-image">
                  <img src={screen.image} alt={screen.title} />
                </div>

                <div className="project-screen-copy">
                  <span>{screen.number}</span>
                  <h3>{screen.title}</h3>
                  <p>{screen.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study-chapter">
        <div className="project-detail-container">
          <span className="chapter-number">(03)</span>
          <h2>Saved criteria becomes a monitoring workflow.</h2>
        </div>
      </section>

      <section className="project-detail-section">
        <div className="project-detail-container project-detail-two-col">
          <p className="section-label">Core Flow</p>

          <div>
            <p className="section-body">
              The watchlist flow lets operators turn repeated search and filter
              behavior into saved monitoring subscriptions, reducing the need to
              rebuild the same query every time new collision data is reviewed.
            </p>

            <div className="flow-steps">
              <div className="flow-step">
                <span>01</span>
                <p>Search and filter collision events</p>
              </div>

              <div className="flow-step">
                <span>02</span>
                <p>Review matching CDMs and risk variables</p>
              </div>

              <div className="flow-step">
                <span>03</span>
                <p>Save high-priority criteria</p>
              </div>

              <div className="flow-step">
                <span>04</span>
                <p>Monitor future matches through watchlist and alerts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail-visual">
        <div className="project-detail-container">
          <div className="project-detail-visual-frame is-dark">
            <img src={watchlist} alt="OOCAA watchlist page" />
          </div>

          <p className="visual-caption">
            The watchlist gives operators a centralized place to manage saved
            criteria and revisit monitoring priorities.
          </p>
        </div>
      </section>

      <section className="case-study-chapter">
        <div className="project-detail-container">
          <span className="chapter-number">(04)</span>
          <h2>The interface had to reveal complexity without dumping it.</h2>
        </div>
      </section>

      <section
        className="project-detail-section oocaa-decisions-section"
        id="decisions"
      >
        <div className="project-detail-container">
          <p className="section-label">Design Decisions</p>

          <div className="oocaa-decision-list">
            <div className="oocaa-decision-row">
              <span>01</span>
              <h3>Progressive Disclosure</h3>
              <p>
                Operators begin with event summaries, then move deeper into CDM
                records, object details, visualizations, and full CDM views only
                when the task requires more detail.
              </p>
            </div>

            <div className="oocaa-decision-row">
              <span>02</span>
              <h3>Data-First Hierarchy</h3>
              <p>
                Tables, filters, and graph views were structured around
                scanning, comparing, and interpreting technical collision-risk
                variables.
              </p>
            </div>

            <div className="oocaa-decision-row">
              <span>03</span>
              <h3>Feedback-Aware Monitoring</h3>
              <p>
                Saved criteria, duplicate criteria, no-match states, watchlist
                updates, and alerts were treated as part of the monitoring
                workflow instead of isolated UI messages.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail-visual">
        <div className="project-detail-container">
          <div className="project-detail-visual-frame is-dark">
            <img src={alertSystem} alt="OOCAA alert system page" />
          </div>

          <p className="visual-caption">
            The alert-system screen connects the monitoring workflow to a
            visible product feature instead of leaving alerts as an abstract
            backend concept.
          </p>
        </div>
      </section>

      <section className="project-detail-section" id="outcome">
        <div className="project-detail-container project-detail-two-col">
          <p className="section-label">Outcome</p>

          <div>
            <p className="section-body">
              The final frontend helped transform a highly technical
              collision-analysis workflow into a navigable web interface. Users
              could search events, inspect CDMs, view risk trends, visualize
              object positions, save high-priority criteria, and monitor future
              updates through watchlist and alert systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OocaaSections;
