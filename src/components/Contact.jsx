import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
  
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
  }, []);

  return (
    <section className="h-auto bg-gradient-to-b from-gray-900 to-indigo-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-12">
          Get In <span className="text-indigo-400">Touch</span>
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">I'm always excited to collaborate on new projects.Feel free to reach out through any of these channels.</h2>

        
        <div className="bg-white/10 text-indigo-200 rounded-xl p-6 mb-12 backdrop-blur-md shadow-lg inline-block">
          <p className="text-lg font-medium">
            <span className='font-bold text-amber-50'>Mail me at:</span> <a href="mailto:ksabhilash11111@gmail.com" className="text-indigo-400 hover:text-indigo-100">ksabhilash11111@gmail.com</a>
          </p>
        </div>

        
        <div className="flex flex-wrap justify-center gap-6">
          
          <a
            href="https://github.com/ksabhilash-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition transform hover:scale-110 hover:rotate-6 shadow-lg"
          >
            <svg width="24" height="24" fill="currentColor" className="fill-white group-hover:fill-[#181717]" viewBox="0 0 24 24">
              <path d="M12 0.297C5.37 0.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 6 0c2.295-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.11.81 2.24 0 1.615-.015 2.915-.015 3.315 0 .315.21.694.825.575C20.565 22.095 24 17.595 24 12.297 24 5.67 18.627 0.297 12 0.297Z" />
            </svg>
          </a>

          
          <a
            href="https://instagram.com/abhiiiii_lash"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition transform hover:scale-110 hover:rotate-6 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white group-hover:text-pink-500" viewBox="0 0 448 512" fill="currentColor">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm146.4-48.7c0 14.9-12 26.8-26.8 26.8s-26.8-12-26.8-26.8 12-26.8 26.8-26.8 26.8 12 26.8 26.8zM224.1 338c-45.4 0-82.1-36.7-82.1-82.1s36.7-82.1 82.1-82.1 82.1 36.7 82.1 82.1-36.7 82.1-82.1 82.1zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.6 102.7-9 132.1z" />
            </svg>
          </a>

          
          <a
            href="https://wa.me/+919991066996"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition transform hover:scale-110 hover:rotate-6 shadow-lg"
          >
            <svg className="w-8 h-8 text-white group-hover:text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
          </a>

          
          <a
            href="https://www.linkedin.com/in/abhilash-ks-a761a362/"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-16 h-16 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition transform hover:scale-110 hover:rotate-6 shadow-lg"
          >
            <svg className="w-6 h-6 text-white group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6 1.11 6 0 4.88 0 3.5S1.11 1 2.49 1C3.87 1 4.98 2.12 4.98 3.5zM.2 8h4.59v12H.2zM7.98 8h4.39v1.64h.06c.61-1.15 2.12-2.36 4.37-2.36 4.68 0 5.54 3.08 5.54 7.08V20H17V15.25c0-1.13-.02-2.59-1.58-2.59-1.58 0-1.83 1.23-1.83 2.5V20h-4.61z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
