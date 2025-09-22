import React, { useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Skills from "./components/Skills";

const App = () => {
  // Create refs for each section
  const aboutRef = useRef(null);
  const projectRef = useRef(null);
  const contactRef = useRef(null);
  const skillsRef = useRef(null);

  return (
    <div className="scroll-smooth bg-gradient-to-b from-gray-900 to-indigo-900">
      <Navbar
        aboutRef={aboutRef}
        projectRef={projectRef}
        contactRef={contactRef}
        skillsRef={skillsRef}
      />
      <main>
        <div ref={aboutRef}>
          <Hero />
        </div>
        <div ref={skillsRef}>
          <Skills />
        </div>
        <div ref={projectRef}>
          <Projects />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default App;
