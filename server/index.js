const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

// Sample data for the images
const images = [
  {
    id: 1,
    url: '/images/image1.jpg',
    caption: 'Our first date ❤️'
  },
  {
    id: 2,
    url: '/images/image2.jpg',
    caption: 'Remember this beautiful sunset?'
  },
  {
    id: 3,
    url: '/images/image3.jpg',
    caption: 'That time we went hiking together'
  },
  {
    id: 4,
    url: '/images/image4.jpg',
    caption: 'Our favorite coffee shop'
  },
  {
    id: 5,
    url: '/images/image5.jpg',
    caption: 'You make me so happy!'
  }
];

// Special message
const specialMessage = {
  title: "My Love",
  message: "Every moment with you is a treasure. You make my heart smile in ways I never thought possible. I love you more than words can express. Thank you for being the most amazing person in my life. loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee uuuuuuuuuuuuuuuuuuuuu a lotttttttttttttttttttttttttttttt my cutieeeeee pieeeeee❤️"
};

// API Routes
app.get('/api/images', (req, res) => {
  res.json(images);
});

app.get('/api/special-message', (req, res) => {
  res.json(specialMessage);
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
