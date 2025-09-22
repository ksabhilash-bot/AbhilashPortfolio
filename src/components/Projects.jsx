import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Import your project images
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import nameforge from "../../public/nameforge.png";
import hostelfinder from "../../public/hostelfinder.png";

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "HostelFinder",
      description:
        "A Nextjs FullStack Application to find or register Hostels with advanced filtering and booking system.",
      technologies: [
        "HTML",
        "Next JS",
        "Javascript",
        "Tailwindcss",
        "Zustand",
        "Shadcn UI",
        "MongoDB Atlas",
        "Firebase Auth",
        "Docker",
        "Github",
        "Framer Motion",
      ],
      image: hostelfinder,
      link: "https://hostelfinder-xi.vercel.app/",
      accentColor: "from-cyan-500 to-blue-600",
    },
    {
      id: 2,
      title: "NameForge",
      description:
        "A Nextjs FullStack Application to generate creative business names using AI-powered suggestions.",
      technologies: [
        "HTML",
        "Next JS",
        "Javascript",
        "Tailwindcss",
        "Zustand",
        "Shadcn UI",
        "MongoDB Atlas",
        "Firebase Auth",
        "Docker",
        "Github",
        "Framer Motion",
      ],
      image: nameforge,
      link: "https://business-name-eight.vercel.app/",
      accentColor: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "Portfolio",
      description:
        "A modern, responsive portfolio website with smooth animations and interactive elements.",
      technologies: ["HTML", "React JS", "Framer Motion", "Tailwindcss"],
      image: project1,
      link: "https://its-saran02.github.io/UiUx/",
      accentColor: "from-amber-500 to-orange-600",
    },
    {
      id: 4,
      title: "EMS",
      description:
        "An employee Management System with CRUD operations, attendance tracking, and reporting.",
      technologies: ["HTML", "React JS", "Tailwind CSS", "Redux"],
      image: project2,
      link: "https://ksabhilash-bot.github.io/EMS/",
      accentColor: "from-emerald-500 to-green-600",
    },
    {
      id: 5,
      title: "E-commerce",
      description:
        "A modern e-commerce frontend with product filtering, cart functionality, and smooth animations.",
      technologies: [
        "HTML",
        "React JS",
        "Typescript",
        "Tailwindcss",
        "Redux ToolKit",
        "Framer Motion",
      ],
      image: project3,
      link: "https://ksabhilash-bot.github.io/E-Shop/",
      accentColor: "from-rose-500 to-red-600",
    },
  ];

  // Animation variants for title
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for project cards
  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: index * 0.2 },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          variants={titleVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          My <span className="text-indigo-400">Projects</span>
        </motion.h2>
        <p className="text-xl text-indigo-200 text-center mb-16 max-w-3xl mx-auto">
          Here are some of the projects I've worked on, showcasing my skills and
          experience.
        </p>

        {/* Projects grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isSectionInView ? "visible" : "hidden"}
              className="group h-full transform transition-all duration-500 hover:-translate-y-2"
            >
              <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all duration-500 flex flex-col shadow-lg hover:shadow-xl hover:shadow-indigo-500/10">
                {/* Card header with accent color */}
                <div
                  className={`h-2 bg-gradient-to-r ${project.accentColor}`}
                ></div>

                <div className="h-48 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  {/* Floating tag */}
                  <div
                    className={`absolute top-4 right-4 bg-gradient-to-r ${project.accentColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
                  >
                    Project {index + 1}
                  </div>
                </div>

                <div className="p-6 flex-grow">
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded-md text-xs border border-gray-700">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full block text-center bg-gradient-to-r ${project.accentColor} text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                  >
                    <span>View Project</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </section>
  );
};

export default Projects;
