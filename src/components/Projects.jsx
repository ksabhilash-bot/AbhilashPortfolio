import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectRefs = useRef([]);

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Portfolio",
      description: "A full-featured Portfoio.",
      technologies: ["HTML" ,"React JS", "Gsap","Tailwindcss"],
      image:project1,
      link: "https://its-saran02.github.io/UiUx/",
    },
    {
      id: 2,
      title: "EMS",
      description: "An employee Management System.",
      technologies: ["HTML", "React JS", "Tailwind CSS"],
      image: project2,
      link: "https://ksabhilash-bot.github.io/EMS/",
    },
    {
      id: 3,
      title: "E-commerce",
      description: "Just an frontend based E-commerce website",
      technologies: ["HTML","React JS", "Typescript", "Tailwindcss", "Redux ToolKit","Framer Motion"],
      image: project3,
      link: "https://ksabhilash-bot.github.io/E-Shop/",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title when section comes into view
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -30,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate each project card as it comes into view
    projectRefs.current.forEach((project, index) => {
      gsap.from(project, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: project,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-gray-50 py-16 px-6 bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center text-white-800 mb-16 font-letme mt-3.5"
        >
          My Projects
        </h2>

        {/* Scrollable container */}
        <div className="flex overflow-x-auto p-4 snap-x snap-mandatory hide-scrollbar border-1 border-gray-300 rounded-lg bg-white/10 backdrop-blur-md shadow-lg items-center flex-col sm:flex-row">
  <div className="flex gap-6 px-4 md:px-0 flex-col sm:flex-row">
    {projects.map((project, index) => (
      <div
        key={project.id}
        ref={(el) => (projectRefs.current[index] = el)}
        className="flex-shrink-0 w-full max-w-sm md:max-w-md snap-center bg-white rounded-xl shadow-lg overflow-hidden flex flex-col justify-between border border-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-2 mb-6 sm:mb-0"
      >
        <div className="h-48 overflow-hidden relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="bg-indigo-500/10 border border-indigo-400 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-auto">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-indigo-400/30 mb-2.5"
            >
              🚀 View Project
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
