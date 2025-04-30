import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ aboutRef, projectRef, contactRef }) {
  const [isOpen, setIsOpen] = useState(false);

  // Scroll function to scroll to the referenced section
  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 h-[80px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center w-full">
        <span className="text-3xl font-extrabold text-black font-letme md:text-5xl">
          ABHILASH
        </span>

        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className="hidden md:flex space-x-8 text-gray-800 font-large font-extrabold">
          <li
            className="hover:text-black cursor-pointer"
            onClick={() => scrollToSection(aboutRef)}
          >
            About
          </li>
          <li
            className="hover:text-black cursor-pointer"
            onClick={() => scrollToSection(projectRef)}
          >
            Project
          </li>
          <li
            className="hover:text-black cursor-pointer"
            onClick={() => scrollToSection(contactRef)}
          >
            Contact
          </li>
        </ul>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white w-full px-4 py-4 absolute top-[80px] left-0 shadow-md">
          <ul className="flex flex-col space-y-3 text-gray-900 font-medium">
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => scrollToSection(aboutRef)}
            >
              About
            </li>
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => scrollToSection(projectRef)}
            >
              Project
            </li>
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => scrollToSection(contactRef)}
            >
              Contact
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
