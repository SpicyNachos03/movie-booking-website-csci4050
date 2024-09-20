const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes.js'); 

const app = express();

app.use(cors());
app.use(express.json()); // middleware

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Not Connected', err));

// Use movie routes
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});