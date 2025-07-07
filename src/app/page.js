"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ImageSequence from "./components/ImageSequence";

// Custom hook for scroll tracking
const useScrollProgress = (containerRef) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop =
        containerRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollY = window.scrollY;
      // Calculate progress based on scroll position
      const progress = Math.max(
        0,
        Math.min(1, (scrollY - containerTop) / (height - windowHeight))
      );
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => setScrollProgress(progress));
    }
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scrollProgress;
};

export default function Home() {
  const containerRef = useRef(null);
  const scrollProgress = useScrollProgress(containerRef);

  return (
    <div ref={containerRef} className="bg-black h-[800vh] w-screen">
      <ImageSequence scrollProgress={scrollProgress} />
    </div>
  );
}
