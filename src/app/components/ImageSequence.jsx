import React, { useState, useEffect, useMemo } from "react";

const totalImages = 298;

const ImageSequence = ({ scrollProgress }) => {
  const [loadedImages, setLoadedImages] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  // Generate array of image URLs
  const images = useMemo(() => {
    const baseUrl =
      "https://web-images.credcdn.in/v2/_next/assets/images/money/desktop/features/feature_";
    return Array.from(
      { length: totalImages },
      (_, i) => `${baseUrl}${(i + 1).toString()}.jpg`
    );
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setLoadedImages(loadedCount);
      };
      img.onerror = () => {
        loadedCount++;
        setLoadedImages(loadedCount);
      };
    });
  }, [images]);

  // Update current image based on scroll progress
  useEffect(() => {
    const imageIndex = Math.round(scrollProgress * (totalImages - 1));
    setCurrentImage(imageIndex);
  }, [scrollProgress]);

  // Calculate text scale and opacity
  const textScale = scrollProgress <= 0.5 ? 1.5 + scrollProgress * 0.5 : 2; // Scale from 1.5x to 2x at 50%
  const textOpacity =
    scrollProgress <= 0.5 ? 1 : 1 - (scrollProgress - 0.5) * 2; // Fade out from 50% to 100%

  const progressPercentage = Math.round((loadedImages / totalImages) * 100);

  return (
    <div className="fixed top-0 h-screen w-full bg-black flex items-center justify-center">
      {loadedImages === totalImages ? (
        <>
          <img
            src={images[currentImage]}
            alt="AirPods Pro animation"
            className="w-screen h-screen z-10 transition-opacity duration-150 ease-out"
          />
          <h1
            className="fixed left-1/2 top-1/2 text-[#fff] font-bold text-[120px] z-1 -translate-x-1/2 translate-y-full"
            style={{
              fontFamily:
                "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
              lineHeight: 0.7,
              letterSpacing: "-0.0210526316em",
              margin: 0,
              transform: `scale(${textScale})`,
              opacity: textOpacity,
              transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
            }}
            tabIndex="-1"
          >
            AirPods Pro
          </h1>
        </>
      ) : (
        <div className="w-full max-w-md">
          {/* Loading Bar */}
          <div className="w-1/2 bg-[#161616] rounded-full h-[8px] mx-auto">
            <div
              className="bg-[#fff] h-[8px] rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {/* Loading Text */}
          <p className="text-[#fff] text-center mt-4">
            Loading: {loadedImages} / {totalImages} images ({progressPercentage}
            %)
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageSequence;
