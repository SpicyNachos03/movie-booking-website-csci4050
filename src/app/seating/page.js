// 'use client'

// import React, { useState, useEffect } from 'react';
// import './seating.css';

// function SeatingPage({ movieId }) {
//   const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
//   const [childCount, setChildCount] = useState(0);
//   const [adultCount, setAdultCount] = useState(0);
//   const [seniorCount, setSeniorCount] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [movieData, setMovieData] = useState(null);
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(movieId); // For dynamically changing movie

//   // Default ticket prices
//   const ticketPrices = movieData?.ticketPrices || { children: 10, adults: 12, seniors: 10 };

//   // Generate a 6x10 seating array
//   const generateSeatingArray = () => {
//     const rows = [];
//     for (let row = 1; row <= 6; row++) {
//       const seats = [];
//       for (let seatNumber = 1; seatNumber <= 10; seatNumber++) {
//         seats.push({
//           seatNumber,
//           status: 'available', // Default status can be 'available'
//         });
//       }
//       rows.push({ row, seats });
//     }
//     return rows;
//   };

//   // Fetch movies on initial load
//   useEffect(() => {
//     fetch('/api/movies')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Failed to fetch movies: ${response.statusText}`);
//         }
//         return response.json();
//       })
//       .then((data) => setMovies(data))  // Set the fetched movies in state
//       .catch((error) => console.error('Error fetching movies:', error));
//   }, []);
  
//   // Fetch specific movie data when movieId or selectedMovie changes
//   useEffect(() => {
//     if (selectedMovie) {
//       fetch(`/api/movies/${selectedMovie}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`Failed to fetch movie data: ${response.statusText}`);
//           }
//           return response.json();
//         })
//         .then((data) => setMovieData(data))  // Set movie data for seating
//         .catch((error) => console.error('Error fetching movie data:', error));
//     }
//   }, [selectedMovie]);

//   // Handle seat click: toggle selected seat and update state
//   const handleSeatClick = (row, seatNumber) => {
//     const selectedSeat = document.querySelector(`#seat-${row}-${seatNumber}`);
//     if (!selectedSeat.classList.contains('occupied')) {
//       selectedSeat.classList.toggle('selected');
//       const newSelectedCount = document.querySelectorAll('.row .seat.selected').length;
//       setSelectedSeatsCount(newSelectedCount);
//       updateSeatStatus(row, seatNumber, selectedSeat.classList.contains('selected') ? 'selected' : 'available');
//       updateTotal();
//     }
//   };

//   // Update seat status in the database
//   const updateSeatStatus = (row, seatNumber, status) => {
//     fetch(`/api/movies/${selectedMovie}/seating`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ row, seatNumber, status }),
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error('Error updating seat status:', error));
//   };

//   // Handle changes to age group counters (children, adults, seniors)
//   const handleCountChange = (type, operation) => {
//     if (type === 'child') setChildCount((prev) => Math.max(0, operation === 'add' ? prev + 1 : prev - 1));
//     if (type === 'adult') setAdultCount((prev) => Math.max(0, operation === 'add' ? prev + 1 : prev - 1));
//     if (type === 'senior') setSeniorCount((prev) => Math.max(0, operation === 'add' ? prev + 1 : prev - 1));
//     updateTotal();
//   };

//   // Update the total price based on selected tickets
//   const updateTotal = () => {
//     const total = childCount * ticketPrices.children + adultCount * ticketPrices.adults + seniorCount * ticketPrices.seniors;
//     setTotalPrice(total);
//   };

//   // Check if selected seats match the ticket count
//   const checkSeatsMatchTickets = () => {
//     return selectedSeatsCount === (childCount + adultCount + seniorCount);
//   };

//   // Handle next button click: ensure selected seats match the ticket count
//   const handleNextClick = () => {
//     if (!checkSeatsMatchTickets()) {
//       alert('The number of selected seats must match the total number of tickets!');
//     } else {
//       console.log('Proceeding to the next step...');
//     }
//   };

//   // Generate seating for the selected movie or use a sample 6x10 seating layout
//   const seatingData = movieData?.seating || generateSeatingArray();

//   return (
//     <div className="seating-page">
//       <div className="movie-container">
//         <label>Pick a movie:</label>
//         <select
//           id="movie"
//           value={selectedMovie} // Controlled component for movie selection
//           onChange={(e) => setSelectedMovie(e.target.value)} // Update selected movie
//         >
//           {movies.map((movie) => (
//             <option key={movie._id} value={movie._id}>
//               {movie.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Showcase for seat status */}
//       <ul className="showcase">
//         <li>
//           <div className="seat"></div>
//           <small>Available</small>
//         </li>
//         <li>
//           <div className="seat selected"></div>
//           <small>Selected</small>
//         </li>
//         <li>
//           <div className="seat occupied"></div>
//           <small>Occupied</small>
//         </li>
//       </ul>

//       <div className="container">
//         <div className="screen"></div>

//         {/* Render seating based on movie data or generate 6x10 layout */}
//         {seatingData.map((row, rowIndex) => (
//           <div className="row" key={rowIndex}>
//             {row.seats.map((seat, seatIndex) => (
//               <div
//                 id={`seat-${row.row}-${seat.seatNumber}`}
//                 key={seatIndex}
//                 className={`seat ${seat.status}`} // Dynamically set the seat status
//                 onClick={() => handleSeatClick(row.row, seat.seatNumber)} // Handle seat click
//               >
//                 {seat.seatNumber}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       <p>You have selected {selectedSeatsCount} seats</p>

//       {/* Ticket counter for different age groups */}
//       <div className="age-counters">
//         <div className="counter">
//           <label>Children (2-12): ${ticketPrices.children}</label>
//           <button onClick={() => handleCountChange('child', 'subtract')}>-</button>
//           <span>{childCount}</span>
//           <button onClick={() => handleCountChange('child', 'add')}>+</button>
//         </div>
//         <div className="counter">
//           <label>Adults (13-59): ${ticketPrices.adults}</label>
//           <button onClick={() => handleCountChange('adult', 'subtract')}>-</button>
//           <span>{adultCount}</span>
//           <button onClick={() => handleCountChange('adult', 'add')}>+</button>
//         </div>
//         <div className="counter">
//           <label>Seniors (60+): ${ticketPrices.seniors}</label>
//           <button onClick={() => handleCountChange('senior', 'subtract')}>-</button>
//           <span>{seniorCount}</span>
//           <button onClick={() => handleCountChange('senior', 'add')}>+</button>
//         </div>
//       </div>

//       <p>Total Price: ${totalPrice}</p>

//       {/* Proceed to next step */}
//       <button onClick={handleNextClick}>Next</button>
//     </div>
//   );
// }

// export default SeatingPage;
