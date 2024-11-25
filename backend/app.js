const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Import cookie-parser
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes'); 
const userRoutes = require('./routes/userRoutes'); // Import user routes
const seatingRoutes = require('./routes/seatingRoutes'); // Import seating routes

const app = express();

// CORS configuration with credentials
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow credentials (cookies)
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Not Connected', err));

// Use movie routes
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes); // Add user routes
app.use('/api/seating', seatingRoutes); // Add seating routes

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
