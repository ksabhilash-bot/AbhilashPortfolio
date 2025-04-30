import React from 'react'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';    

const But = () => {
    const ButRef = useRef(null);
    useEffect(() => {
        gsap.from(ButRef.current, {
            opacity: 0,
            x: -20,
            delay:1,
            duration: 2,
            ease: "slow(0.7,0.7,false)",
        });
    }, []);
  return (
    <div className='mt-4' ref={ButRef}>
        <button 
  class="cursor-pointer flex justify-between bg-white px-3 py-2 rounded-full text-black tracking-wider shadow-xl hover:text-amber-50 hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-mono w-[150px]"
>
  Resume
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    class="w-5 h-5 animate-bounce"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
    ></path>
  </svg>
</button>

    </div>
  )
}

export default But