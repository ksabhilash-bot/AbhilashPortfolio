import React from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const But = () => {
  const butRef = useRef(null);
  
  useEffect(() => {
    gsap.from(butRef.current, {
      opacity: 0,
      x: -20,
      delay: 1,
      duration: 2,
      ease: "slow(0.7,0.7,false)",
    });
  }, []);

  const handleDownload = () => {
    try {
      console.log("Starting resume download process");
      
      
      try {
        
        import.meta.env.DEV && console.log("Trying import approach...");
        
        import('/src/assets/AbhilashKSResume1.pdf')
          .then(module => {
            const pdfUrl = module.default || module;
            console.log("Successfully imported PDF from assets:", pdfUrl);
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'AbhilashKSResume1.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log("Download initiated via import method");
          })
          .catch(importError => {
            console.error("Import failed:", importError);
            
          });
      } catch (importError) {
        console.error("Import approach not supported:", importError);
        
      }
      
      
      
    } catch (error) {
      console.error("Overall error in download process:", error);
    }
  };

  return (
    <div className="mt-4" ref={butRef}>
      <button
        onClick={handleDownload}
        className="cursor-pointer flex justify-between bg-white px-3 py-2 rounded-full text-black tracking-wider shadow-xl hover:text-amber-50 hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-mono w-[150px]"
      >
        Resume
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5 animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </button>
    </div>
  );
};

export default But;