import AboutMe from "../components/Modules/Home/AboutMe";
import Contact from "../components/Modules/Home/Contact";
import Experience from "../components/Modules/Home/Experience";
import HeroSection from "../components/Modules/Home/HeroSection";
import Projects from "../components/Modules/Home/Projects";
import Skills from "../components/Modules/Home/Skills";




export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutMe />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
}
