'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";

const ScheduleMovie = () => {
  const [movies, setMovies] = useState([]); // List of movies fetched from the database
  const [rooms, setRooms] = useState([]); // List of rooms fetched from the database
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [scheduledShows, setScheduledShows] = useState([]); // Existing shows for duplicate checks
  const [loading, setLoading] = useState(true);

  // Fetch movies, rooms, and scheduled shows on component mount
  useEffect(() => {
    fetchMovies();
    fetchRooms();
    fetchScheduledShows();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/movies"); // Adjust URL as needed
      setMovies(response.data); // Assuming the API returns a list of movie objects with `title` property
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/rooms"); // Adjust URL as needed
      setRooms(response.data); // Assuming the API returns a list of room objects with `name` or `number` property
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchScheduledShows = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/shows"); // Adjust URL as needed
      setScheduledShows(response.data); // Assuming the API returns a list of scheduled shows
    } catch (error) {
      console.error("Error fetching scheduled shows:", error.message);
    }
  };

  const isDuplicateShow = () => {
    return scheduledShows.some(
      (show) =>
        show.movieName === selectedMovie &&
        show.dateTime === dateTime &&
        show.roomName === selectedRoom
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedMovie || !dateTime || !selectedRoom) {
      alert("Please fill in all fields.");
      return;
    }
    console.log(selectedRoom);

    if (isDuplicateShow()) {
      alert("Duplicate show detected! Please adjust the schedule.");
      return;
    }

    const newShow = { movieName: selectedMovie, dateTime, roomName: selectedRoom };

    try {
      const response = await axios.post("http://localhost:8000/api/shows", newShow, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setScheduledShows((prev) => [...prev, newShow]);
        alert("Movie scheduled successfully!");
        resetForm();
      } else {
        alert("Failed to schedule the movie. Please try again.");
      }
    } catch (error) {
      console.error("Error scheduling show:", error.message);
      alert("An error occurred while scheduling the show.");
    }
  };

  const resetForm = () => {
    setSelectedMovie("");
    setDateTime("");
    setSelectedRoom("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Schedule Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Movie:
          <select
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            style = {{ color: "black "}}
            required
          >
            <option value="" disabled color="black">
              -- Select a Movie --
            </option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie.title}>
                {movie.title}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          DateTime (YYYY-MM-DDTHH:mm:ss.sssZ):
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            style = {{ color: "black "}}
            required
          />
        </label>
        <br />
        <label>
          Select Room:
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            style = {{ color: "black "}}
            required
          >
            <option value="" disabled color="black">
              -- Select a Room --
            </option>
            {rooms.map((room) => (
              <option key={room._id} value={room.roomName}>
                {room.roomName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Schedule</button>
      </form>

      <h2>Scheduled Shows</h2>
      <ul>
        {scheduledShows.map((show, index) => (
          <li key={index}>
            {show.movieName} | {show.dateTime} | Room: {show.roomName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleMovie;
