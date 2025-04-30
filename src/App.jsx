import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App = () => {
  // Create refs for each section
  const aboutRef = useRef(null);
  const projectRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className='scroll-smooth'>
      <Navbar
        aboutRef={aboutRef}
        projectRef={projectRef}
        contactRef={contactRef}
      />
      <main className='mt-5'>
        <div ref={aboutRef}>
          <Hero />
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
