'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../../signup/signup.css';
//copy and paste this skeleton page if you want to create a new page
//within Header.js copy the same <Link></Link> list item and rename is accordingly to access it through the header


function addMovie() {
    const [movieTitle, setMovieTitle] = useState('');
    const [status, setStatus] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [cast, setCast] = useState('');
    const [director, setDirector] = useState('');
    const [producer, setProducer] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [reviews, setReviews] = useState('');
    const [trailerPicture, setTrailerPicture] = useState('');
    const [trailerVideo, setTrailerVideo] = useState('');
    const [mpaaRating, setMpaaRating] = useState('');

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            movieTitle,
            status,
            posterUrl,
            cast,
            director,
            producer,
            synopsis,
            reviews,
            trailerPicture,
            trailerVideo,
            mpaaRating,
        };
        console.log('Form Data:', formData);
        // Submit the form data to the backend or perform another action
    };
    return (
        <div>
            <Header></Header>
            <div className="formWrapper">
                <h1>To add a new movie, fill out this form:</h1>
                <form className="formBox" onSubmit={handleSubmit}>
                    <div className="inputWrapper">
                        <label className="label">Movie Title</label>
                        <input
                            onChange={handleInputChange(setMovieTitle)}
                            className="input"
                            value={movieTitle}
                            type="text"
                            placeholder="Movie Title"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Status</label>
                        <input
                            onChange={handleInputChange(setStatus)}
                            className="input"
                            value={status}
                            type="text"
                            placeholder="Status"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Poster URL</label>
                        <input
                            onChange={handleInputChange(setPosterUrl)}
                            className="input"
                            value={posterUrl}
                            type="text"
                            placeholder="Poster URL"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Cast</label>
                        <input
                            onChange={handleInputChange(setCast)}
                            className="input"
                            value={cast}
                            type="text"
                            placeholder="Cast"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Director</label>
                        <input
                            onChange={handleInputChange(setDirector)}
                            className="input"
                            value={director}
                            type="text"
                            placeholder="Director"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Producer</label>
                        <input
                            onChange={handleInputChange(setProducer)}
                            className="input"
                            value={producer}
                            type="text"
                            placeholder="Producer"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Synopsis</label>
                        <input
                            onChange={handleInputChange(setSynopsis)}
                            className="input"
                            value={synopsis}
                            type="text"
                            placeholder="Synopsis"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Reviews</label>
                        <input
                            onChange={handleInputChange(setReviews)}
                            className="input"
                            value={reviews}
                            type="text"
                            placeholder="Reviews"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Trailer Picture</label>
                        <input
                            onChange={handleInputChange(setTrailerPicture)}
                            className="input"
                            value={trailerPicture}
                            type="text"
                            placeholder="Trailer Picture"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Trailer Video</label>
                        <input
                            onChange={handleInputChange(setTrailerVideo)}
                            className="input"
                            value={trailerVideo}
                            type="text"
                            placeholder="Trailer Video"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">MPAA Rating</label>
                        <input
                            onChange={handleInputChange(setMpaaRating)}
                            className="input"
                            value={mpaaRating}
                            type="text"
                            placeholder="MPAA Rating"
                        />
                    </div>

                    <button type="submit" className="submitButton">
                        Submit
                    </button>
                </form>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default addMovie;