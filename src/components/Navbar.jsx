import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Mail,
  Code,
  Sparkles,
} from "lucide-react";

export default function Navbar({
  aboutRef,
  skillsRef,
  projectRef,
  contactRef,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-80px 0px -80px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId =
            entry.target.getAttribute("data-section") || "about";
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    // Observe sections
    if (aboutRef?.current) {
      aboutRef.current.setAttribute("data-section", "about");
      observer.observe(aboutRef.current);
    }
    if (skillsRef?.current) {
      skillsRef.current.setAttribute("data-section", "skills");
      observer.observe(skillsRef.current);
    }
    if (projectRef?.current) {
      projectRef.current.setAttribute("data-section", "projects");
      observer.observe(projectRef.current);
    }
    if (contactRef?.current) {
      contactRef.current.setAttribute("data-section", "contact");
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, [aboutRef, skillsRef, projectRef, contactRef]);

  // Scroll function with smooth animation
  const scrollToSection = (sectionRef, sectionName) => {
    setActiveSection(sectionName);
    setIsOpen(false);
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigationItems = [
    {
      name: "About",
      ref: aboutRef,
      key: "about",
      icon: Home,
      description: "Learn about me",
    },
    {
      name: "Skills",
      ref: skillsRef,
      key: "skills",
      icon: Code,
      description: "Technical expertise",
    },
    {
      name: "Projects",
      ref: projectRef,
      key: "projects",
      icon: Briefcase,
      description: "My work portfolio",
    },
    {
      name: "Contact",
      ref: contactRef,
      key: "contact",
      icon: Mail,
      description: "Get in touch",
    },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg border-b border-indigo-100/50 shadow-lg shadow-indigo-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ABHILASH
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  Web Developer
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.key;

                return (
                  <Button
                    key={item.key}
                    variant="ghost"
                    onClick={() => scrollToSection(item.ref, item.key)}
                    className={`relative px-6 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50 shadow-md"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    )}

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                );
              })}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection(contactRef, "contact")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-4 h-4 mr-2" />
                Let's Talk
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-10 h-10 rounded-xl hover:bg-indigo-50"
                  >
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <div
                        className={`w-4 h-0.5 bg-gray-600 transition-all duration-300 ${
                          isOpen ? "rotate-45 translate-y-1.5" : ""
                        }`}
                      ></div>
                      <div
                        className={`w-4 h-0.5 bg-gray-600 transition-all duration-300 ${
                          isOpen ? "opacity-0" : ""
                        }`}
                      ></div>
                      <div
                        className={`w-4 h-0.5 bg-gray-600 transition-all duration-300 ${
                          isOpen ? "-rotate-45 -translate-y-1.5" : ""
                        }`}
                      ></div>
                    </div>
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-80 bg-white/95 backdrop-blur-lg border-l border-indigo-100/50"
                >
                  <div className="flex flex-col h-full pt-8">
                    {/* Mobile Header */}
                    <div className="flex items-center space-x-3 mb-8 pb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          ABHILASH
                        </h2>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-indigo-50 text-indigo-600"
                        >
                          Web Developer
                        </Badge>
                      </div>
                    </div>

                    <Separator className="mb-6" />

                    {/* Mobile Navigation */}
                    <div className="flex-1 space-y-2">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.key;

                        return (
                          <Button
                            key={item.key}
                            variant="ghost"
                            onClick={() => scrollToSection(item.ref, item.key)}
                            className={`w-full justify-start px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive
                                ? "bg-indigo-50 text-indigo-600 border-l-2 border-indigo-600"
                                : "text-gray-600 hover:bg-indigo-50/50 hover:text-indigo-600"
                            }`}
                          >
                            <Icon className="w-5 h-5 mr-3" />
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-xs text-gray-400">
                                {item.description}
                              </span>
                            </div>
                            {isActive && (
                              <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"></div>
                            )}
                          </Button>
                        );
                      })}
                    </div>

                    <Separator className="my-6" />

                    {/* Mobile CTA */}
                    <Button
                      onClick={() => scrollToSection(contactRef, "contact")}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Start a Conversation
                    </Button>

                    {/* Footer */}
                    <div className="mt-6 text-center text-xs text-gray-400">
                      Always excited to collaborate ✨
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out"
          style={{
            width: `${Math.min(
              100,
              (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
                100
            )}%`,
          }}
        ></div>
      </div>
    </>
  );
}
