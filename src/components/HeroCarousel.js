'use client'

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
      description: 'A young boy named Miguel who journeys to the Land of the Dead',
      trailerLink: 'https://www.youtube.com/watch?v=Ga6RYejo6Hk',
    },
    {
      id: 2,
      src: '/captain.jpg',
      alt: 'Captain America',
      title: 'Captain America: New Brave World',
      description: 'Sam Wilson finds himself at the center of an international incident',
      trailerLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 3,
      src: '/wicked.jpg',
      alt: 'Wicked (2024)',
      title: 'Wicked',
      description: 'A vivid reimagining of the classic The Wizard of Oz.',
      trailerLink: 'https://www.youtube.com/watch?v=O5yfgk6DsrQ',
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
          <div key={slide.id} className="hero-slide" style={{ minWidth: '100%', position: 'relative' }}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              priority
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback-image.jpg';
              }}
            />
            <div className="carousel-overlay">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <a
                href={slide.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="carousel-button red-button"
                style={{ marginTop: '10px', display: 'inline-block' }} // Add spacing above the button
              >
                Watch Now
              </a>
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
