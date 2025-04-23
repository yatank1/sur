import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import Gallery from './components/Gallery';
import SpecialMessage from './components/SpecialMessage';

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/special-message" element={<SpecialMessage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(#ff9a9e 1px, transparent 1px), radial-gradient(#fad0c4 1px, transparent 1px);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    opacity: 0.1;
    z-index: 0;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(255, 154, 158, 0.5) 100%);
    z-index: 1;
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default App;
