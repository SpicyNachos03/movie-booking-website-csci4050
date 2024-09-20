const express = require('express');
require('dotenv').config();
const app = express();
const {mongoose} = require('mongoose');

// Middleware to parse JSON bodies
app.use(express.json());

//database
mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log('DB Connected'))
.catch((err) => console.log('DB Not Connected', err))


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});