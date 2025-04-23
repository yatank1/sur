import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Fetch images from the backend
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0));
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (translateX > 100) {
      prevImage();
    } else if (translateX < -100) {
      nextImage();
    }
    setTranslateX(0);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <p>Loading our special moments...</p>
      </LoadingContainer>
    );
  }

  return (
    <GalleryContainer>
      <Title>Our Special Moments</Title>
      <Subtitle>Swipe through our memories together</Subtitle>

      <CarouselContainer>
        <SliderButton onClick={prevImage}>❮</SliderButton>

        <CarouselWrapper
          ref={carouselRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <CarouselTrack
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
              transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
            }}
          >
            {images.map((image, index) => (
              <CarouselSlide key={image.id}>
                <Image
                  src={image.url || 'https://via.placeholder.com/400x300?text=Add+Your+Photos'}
                  alt={image.caption || 'Our moment'}
                />
                <Caption>{image.caption || 'Our special moment'}</Caption>
              </CarouselSlide>
            ))}
          </CarouselTrack>
        </CarouselWrapper>

        <SliderButton onClick={nextImage}>❯</SliderButton>
      </CarouselContainer>

      <Pagination>
        {images.map((image, index) => (
          <PaginationDot
            key={image.id}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Pagination>

      <ButtonContainer>
        <Link to="/special-message" className="btn primary">
          Click For A Special Message ❤️
        </Link>
      </ButtonContainer>
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin: 20px;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff6b6b;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 500px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const CarouselSlide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #000;
`;

const SliderButton = styled.button`
  background: rgba(255, 107, 107, 0.8);
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  padding: 15px;
  transition: all 0.3s ease;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:first-child {
    left: 10px;
  }

  &:last-child {
    right: 10px;
  }

  &:hover {
    background: rgba(255, 82, 82, 1);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    width: 45px;
    height: 45px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #000;
`;

const Caption = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
  font-weight: 500;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const PaginationDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#ff6b6b' : '#ddd'};
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    background-color: ${props => props.active ? '#ff6b6b' : '#ffb8b8'};
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  p {
    margin-top: 20px;
    color: #ff6b6b;
    font-size: 1.2rem;
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 107, 107, 0.3);
  border-radius: 50%;
  border-top-color: #ff6b6b;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Gallery;
