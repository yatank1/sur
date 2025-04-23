import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SpecialMessage = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullMessage, setShowFullMessage] = useState(false);

  useEffect(() => {
    // Fetch the special message from the backend
    const fetchMessage = async () => {
      try {
        const response = await fetch('/api/special-message');
        const data = await response.json();
        setMessage(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching message:', error);
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  useEffect(() => {
    if (message && !showFullMessage) {
      if (currentIndex < message.message.length) {
        const timeout = setTimeout(() => {
          setTypedText(prev => prev + message.message[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, 50); // Adjust typing speed here

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, message, showFullMessage]);

  const handleSkip = () => {
    if (message) {
      setTypedText(message.message);
      setCurrentIndex(message.message.length);
      setShowFullMessage(true);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <p>Loading your special message...</p>
      </LoadingContainer>
    );
  }

  return (
    <MessageContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeartIcon>❤️</HeartIcon>
      <Title>{message?.title || 'Special Message'}</Title>

      <MessageContent>
        {typedText}
        <Cursor blink={currentIndex >= (message?.message.length || 0)} />
      </MessageContent>

      <ButtonContainer>
        {!showFullMessage && currentIndex < (message?.message.length || 0) && (
          <Button className="btn secondary" onClick={handleSkip}>
            Skip Typing
          </Button>
        )}
        <Link to="/" className="btn primary">
          Back to Gallery
        </Link>
      </ButtonContainer>

      <FloatingHearts>
        {[...Array(10)].map((_, index) => (
          <Heart
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`
            }}
          >
            ❤️
          </Heart>
        ))}
      </FloatingHearts>
    </MessageContainer>
  );
};

const MessageContainer = styled(motion.div)`
  width: 90%;
  max-width: 600px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeartIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #ff6b6b;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const MessageContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 30px;
  text-align: center;
  min-height: 150px;
  position: relative;

  @media (max-width: 768px) {
    font-size: 1rem;
    min-height: 120px;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #ff6b6b;
  margin-left: 2px;
  vertical-align: middle;
  animation: ${props => props.blink ? 'blink 1s infinite' : 'none'};

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  // Button styles are in App.css
`;

const FloatingHearts = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
`;

const Heart = styled.div`
  position: absolute;
  animation: float linear infinite;
  bottom: -20px;
  opacity: 0.7;

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
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

export default SpecialMessage;
