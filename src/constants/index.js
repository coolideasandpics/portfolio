import studentYuThumbnail from "../assets/studentyu/studentyu-hero.png";
import oocaaThumbnail from "../assets/oocaa/oocaa-hero.png";
import campaignThumbnail from "../assets/campaign-graphics/campaign-hero.png";
import mokatailThumbnail from "../assets/mokatail/mokatail-thumbnail.png";

const navLinks = [
  { id: "home", title: "Home", path: "/" },
  { id: "about", title: "About", path: "/about" },
  { id: "projects", title: "Projects", path: "/projects" },
  { id: "art", title: "Art", path: "/art" },
];

const projects = [
  {
    id: "oocaa",
    number: "01",
    title: " On Orbit Collision Avoidance Assistant",
    category: "Web Application",
    year: "2025",
    featured: true,
    stack: ["React", "JavaScript", "Node", "SQL"],
    discipline: "Systems UI, Frontend Development",
    thumbnail: oocaaThumbnail,
    shortDescription:
      "A system-focused interface made for CSA to help manage and analyze orbital collision risks.",
    role: "Frontend Developer",
  },
  {
    id: "studentyu",
    number: "02",
    title: "StudentYU",
    category: "UX / Product Design",
    year: "2024",
    featured: true,
    stack: ["Figma", "Canva"],
    discipline: "UX Strategy, Product Design",
    thumbnail: studentYuThumbnail,
    shortDescription:
      "An interactive social platform prototype designed to help students reconnect and navigate the transition back to campus life.",
    role: "UX / Product Designer",
  },
  {
    id: "mokatail",
    number: "03",
    title: "Mokatail",
    category: "Creative Development",
    year: "2025",
    featured: true,
    stack: ["React", "GSAP", "JavaScript"],
    discipline: "Motion Design, Interactive Frontend",
    thumbnail: mokatailThumbnail,
    shortDescription:
      "A motion-led cocktail showcase built to explore immersive storytelling through frontend interaction.",
    role: "Frontend Developer",
  },
  {
    id: "campaign-graphics",
    number: "04",
    title: "Campus Campaign Graphics",
    category: "Graphic Design",
    year: "2024",
    featured: true,
    stack: ["Canva", "Adobe Creative Suite", "Typography", "Layout Design"],
    discipline: "Visual Communication, Campaign Design",
    thumbnail: campaignThumbnail,
    shortDescription:
      "A visual campaign system for student sustainability and advocacy initiatives, translating referendum goals into bold, accessible campus-facing posters and digital assets.",
    role: "Graphic Design Intern",
  },
];

export { navLinks, projects };
