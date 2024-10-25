import React, { useState } from 'react';
import Image from 'next/image';

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      src: '/coco.png',
      alt: 'Coco',
      title: 'Coco',
      description: 'A story of family and memories.',
    },
    {
      id: 2,
      src: '/captain.jpg',
      alt: 'Captain America',
      title: 'Captain America',
      description: 'The first Avenger fights for freedom.',
    },
    {
      id: 3,
      src: '/wicked.jpg',
      alt: 'Wicked',
      title: 'Wicked',
      description: 'A different take on the Wizard of Oz.',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-carousel" style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className="carousel-slides"
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="hero-slide" style={{ minWidth: '100%', height: 'px', position: 'relative' }}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              priority
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop
                e.target.src = '/fallback-image.jpg'; // Ensure this path is correct
              }}
            />
            <div className="carousel-overlay">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              {/* Added red button */}
              <button className="carousel-button red-button">Watch Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button onClick={handlePrev} className="carousel-button left" style={{ position: 'absolute', left: '10px', top: '50%' }}>
        ◀
      </button>
      <button onClick={handleNext} className="carousel-button right" style={{ position: 'absolute', right: '10px', top: '50%' }}>
        ▶
      </button>
    </div>
  );
};

export default HeroCarousel;
