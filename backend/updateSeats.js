const mongoose = require('mongoose');
const Show = require('./models/showModel'); 

mongoose.connect('mongodb+srv://julianphan12:Missions2023!@cluster0.s5aej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    // Fetch all shows that do not have a seatArray field
    const shows = await Show.find({ seatArray: { $exists: false } });

    console.log(`Found ${shows.length} shows without seat data.`);

    // Define rows (A to F) and seats per row (1 to 10)
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 10; // A1 to A10, B1 to B10, etc.

    // Loop through each show to add seat availability
    for (let show of shows) {
      console.log(`Updating show: ${show.movieName} - ${show.dateTime}`);

      // Initialize an empty seat array
      const seatArray = [];

      // Generate seats from A1 to F10
      for (let row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
          const seatName = `${row}${i}`;
          const seatAvailability = true;

          seatArray.push({
            seatName,             // Seat name, e.g., "A1", "B2", etc.
            seatAvailability      // Set the seat as available initially
          });

          // Log each seat for debugging
          console.log(`Seat: ${seatName}, Availability: ${seatAvailability}`);
        }
      }

      // Update the show with the new seat array
      show.seatArray = seatArray;

      // Save the updated show back to the database
      try {
        await show.save();
        console.log(`Updated show: ${show.movieName} - ${show.dateTime}`);
      } catch (error) {
        console.error(`Error updating show: ${show.movieName} - ${show.dateTime}`, error);
      }
    }

    console.log('Seat availability updated for all shows.');
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    mongoose.disconnect();
  });
