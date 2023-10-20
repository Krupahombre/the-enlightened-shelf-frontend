import { useState, useEffect } from "react";
import CarouselCard from "./CarouselCard";

export default function Carousel() {
  const images = [
    "src/assets/pexels-tiana-2898170.jpg",
    "src/assets/pexels-pixabay-256424.jpg",
    "src/assets/pexels-pixabay-207730.jpg",
    "src/assets/pexels-ksenia-chernaya-3952071.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const autoPlay = true;
  const interval = 2500; // 2.5 sekundy

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (autoPlay) {
      timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    }

    return () => {
      if (autoPlay) {
        clearInterval(timer);
      }
    };
  }, [autoPlay, interval, images]);

  return (
    <div className="carousel">
      <CarouselCard imagePath={images[currentImageIndex]} />

      {images.length > 1 && (
        <div className="indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`indicator ${
                index === currentImageIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
