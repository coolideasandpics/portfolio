import Hero from "../Components/Hero.jsx";
import About from "../Components/About.jsx";
import Projects from "../Components/FeaturedProjects.jsx";
import Process from "../Components/Process.jsx";
import PageFooter from "../Components/page-footer/PageFooter.jsx";
import "../Components/page-footer/PageFooter.css";

const Home = ({ isLoaded }) => {
  return (
    <>
      <Hero isLoaded={isLoaded} />
      <About />
      <Projects />
      <Process />
      <PageFooter />
    </>
  );
};

export default Home;
