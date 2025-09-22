import React, { useEffect, useRef, forwardRef } from "react";

// Enhanced Skills component with forwardRef for proper section referencing
const Skills = forwardRef(function Skills(props, ref) {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Check if gsap and ScrollTrigger are available
    if (typeof window !== "undefined" && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;

      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Cards animation with improved staggering
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    } else {
      // Fallback animation using CSS transitions for demo
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
      );

      if (titleRef.current) observer.observe(titleRef.current);
      cardsRef.current.forEach((card) => {
        if (card) observer.observe(card);
      });

      return () => observer.disconnect();
    }
  }, [ref]);

  // Enhanced skill data with more realistic proficiency levels
  const skills = [
    {
      name: "JavaScript",
      level: "Advanced",
      proficiency: 95,
      icon: "JS",
      color: "text-yellow-400",
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      name: "React.js",
      level: "Advanced",
      proficiency: 90,
      icon: "React",
      color: "text-cyan-400",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      name: "Tailwind CSS",
      level: "Advanced",
      proficiency: 88,
      icon: "TW",
      color: "text-cyan-400",
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      name: "Node.js",
      level: "Advanced",
      proficiency: 85,
      icon: "Node",
      color: "text-green-500",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      name: "Express.js",
      level: "Advanced",
      proficiency: 82,
      icon: "Exp",
      color: "text-gray-300",
      gradient: "from-gray-600 to-slate-700",
    },
    {
      name: "Next.js",
      level: "Intermediate",
      proficiency: 75,
      icon: "Next",
      color: "text-white",
      gradient: "from-slate-700 to-gray-800",
    },
    {
      name: "MongoDB",
      level: "Intermediate",
      proficiency: 78,
      icon: "Mongo",
      color: "text-green-400",
      gradient: "from-emerald-500 to-green-600",
    },
    {
      name: "PostgreSQL",
      level: "Intermediate",
      proficiency: 70,
      icon: "PG",
      color: "text-blue-400",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      name: "Docker",
      level: "Intermediate",
      proficiency: 68,
      icon: "Docker",
      color: "text-blue-500",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      name: "Firebase",
      level: "Intermediate",
      proficiency: 72,
      icon: "FB",
      color: "text-orange-400",
      gradient: "from-orange-500 to-amber-600",
    },
    {
      name: "Python",
      level: "Intermediate",
      proficiency: 65,
      icon: "Py",
      color: "text-blue-300",
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      name: "AI Tools",
      level: "Beginner",
      proficiency: 50,
      icon: "AI",
      color: "text-purple-400",
      gradient: "from-purple-500 to-violet-600",
    },
  ];

  // Enhanced icon component with better styling
  const getIcon = (iconName, colorClass) => {
    const iconMap = {
      JS: "JS",
      React: "⚛️",
      TW: "TW",
      Node: "⬢",
      Exp: "E",
      Next: "▲",
      Mongo: "🍃",
      PG: "🐘",
      Docker: "🐳",
      FB: "🔥",
      Py: "🐍",
      AI: "🤖",
    };

    return (
      <span
        className={`${colorClass} font-bold text-lg flex items-center justify-center`}
      >
        {iconMap[iconName] || "●"}
      </span>
    );
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Advanced":
        return "text-green-400 bg-green-900/30 border-green-700/30";
      case "Intermediate":
        return "text-yellow-400 bg-yellow-900/30 border-yellow-700/30";
      case "Beginner":
        return "text-blue-400 bg-blue-900/30 border-blue-700/30";
      default:
        return "text-gray-400 bg-gray-900/30 border-gray-700/30";
    }
  };

  return (
    <section
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-20 px-6 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div
          ref={titleRef}
          className="mb-16 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          style={{ transitionDelay: "200ms" }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Technical <span className="text-indigo-400">Skills</span>
          </h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies I use to build
            scalable, performant web applications and deliver exceptional user
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg rounded-2xl p-8 border border-indigo-500/20 
                         hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/20
                         transform hover:-translate-y-2 transition-all duration-500 ease-out
                         opacity-0 translate-y-8 relative"
              style={{
                transitionDelay: `${index * 100 + 400}ms`,
              }}
            >
              {/* Skill header */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.gradient} 
                               flex items-center justify-center border border-indigo-400/30 
                               group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {getIcon(skill.icon, "text-white")}
                </div>
                <span
                  className={`text-xs px-4 py-2 rounded-full font-medium border ${getLevelColor(
                    skill.level
                  )}`}
                >
                  {skill.level}
                </span>
              </div>

              {/* Skill name */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-200 transition-colors">
                {skill.name}
              </h3>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Proficiency</span>
                  <span className="text-indigo-300 font-medium">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full 
                               transform transition-all duration-1000 ease-out group-hover:scale-x-105`}
                    style={{
                      width: `${skill.proficiency}%`,
                      transitionDelay: `${index * 50 + 800}ms`,
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-50"></div>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              ></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <p className="text-lg text-indigo-200 mb-8">
            Always learning and exploring new technologies to stay at the
            forefront of web development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-600/30 to-indigo-800/30 rounded-full text-indigo-300 text-sm border border-indigo-400/30">
              Currently Learning: Nestjs and Kubernetes
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-purple-800/30 rounded-full text-purple-300 text-sm border border-purple-400/30">
              Next Goal: Python and its framework
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;
