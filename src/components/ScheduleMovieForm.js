'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScheduleMovieForm.css";

const ScheduleMovie = () => {
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [scheduledShows, setScheduledShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
    fetchRooms();
    fetchScheduledShows();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchScheduledShows = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/shows");
      setScheduledShows(response.data);
    } catch (error) {
      console.error("Error fetching scheduled shows:", error.message);
    }
  };

  const isDuplicateShow = () => {
    return scheduledShows.some(
      (show) =>
        show.dateTime === dateTime && show.roomName === selectedRoom
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedMovie || !dateTime || !selectedRoom) {
      alert("Please fill in all fields.");
      return;
    }

    if (isDuplicateShow()) {
      alert("Duplicate show during the same time and room detected! Please adjust the schedule.");
      return;
    }

    const newShow = { movieName: selectedMovie, dateTime, roomName: selectedRoom };

    try {
      const response = await axios.post("http://localhost:8000/api/shows", newShow, {
        headers: { "Content-Type": "application/json" },
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="schedule-movie-container">
      <h1 className="schedule-movie-header">Schedule Movie</h1>
      <form onSubmit={handleSubmit} className="schedule-movie-form">
        <label className="schedule-movie-label">
          Select Movie:
          <select
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            className="schedule-movie-select"
            required
          >
            <option value="" disabled>
              -- Select a Movie --
            </option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie.title}>
                {movie.title}
              </option>
            ))}
          </select>
        </label>
        <label className="schedule-movie-label">
          DateTime (YYYY-MM-DDTHH:mm:ss.sssZ):
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="schedule-movie-input"
            required
          />
        </label>
        <label className="schedule-movie-label">
          Select Room:
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="schedule-movie-select"
            required
          >
            <option value="" disabled>
              -- Select a Room --
            </option>
            {rooms.map((room) => (
              <option key={room._id} value={room.roomName}>
                {room.roomName}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="schedule-movie-submit-btn">
          Schedule
        </button>
      </form>

      <h2 className="schedule-movie-subheader">Scheduled Shows</h2>
      <ul className="schedule-movie-shows-list">
        {scheduledShows.map((show, index) => (
          <li key={index} className="schedule-movie-shows-item">
            {show.movieName} | {show.dateTime} | Room: {show.roomName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleMovie;
