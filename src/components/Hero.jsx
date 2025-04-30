import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import abhi from '../assets/abhi.jpg';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import But from './But'
const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const mottoRef = useRef(null);
  const imageRef = useRef(null);
  

  useEffect(() => {
    
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out',
    });
    
    gsap.from(subtitleRef.current, {
      opacity: 0,
      x: -30,
      delay: 0.5,
      duration: 1,
      ease: 'power3.out',
    });
    
    gsap.from(mottoRef.current, {
      opacity: 0,
      y: 20,
      delay: 1,
      duration: 1,
      ease: 'power3.out',
    });
    
    
    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 0.9,
      delay: 1.2,
      duration: 1,
      ease: 'power3.out',
    });
    
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-white py-8 px-6 bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          <div className="text-center md:text-left md:w-1/2 w-full">
            <h1 ref={titleRef} className="text-5xl md:text-6xl font-bold text-white-800">
              Abhilash K S
            </h1>
            <h2 ref={subtitleRef} className="text-3xl md:text-3xl text-indigo-300 mt-4 font-bold">
              I am a Web Developer
            </h2>
            <p
              ref={mottoRef}
              className="text-white-400 mt-6 text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              I am driven by curiosity and the desire to continuously grow. I embrace upcoming technologies and keep learning to build impactful web experiences.
            </p>
            <But/>
          </div>

          
          <div ref={imageRef} className="md:w-1/2 w-full flex justify-center md:justify-end mb-8 md:mb-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-indigo-600 rounded-full opacity-75 blur"></div>
              <img
                src={abhi}
                alt="Abhilash K S"
                className="relative w-48 h-48 md:w-72 md:h-72 object-cover rounded-full shadow-lg border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;