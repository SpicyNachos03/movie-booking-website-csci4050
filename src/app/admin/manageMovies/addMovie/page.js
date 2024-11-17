'use client'

import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../../signup/signup.css';
import { useRouter } from 'next/navigation'; 

//copy and paste this skeleton page if you want to create a new page
//within Header.js copy the same <Link></Link> list item and rename is accordingly to access it through the header


function addMovie() {
    const [title, setMovieTitle] = useState('');
    const [category, setCategory] = useState('');
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



    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();


    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title === '' || category ==='' || status === '' || posterUrl === '' || cast === '' || director === '' || producer === '' || synopsis === '' || reviews === '' || trailerPicture === '' || trailerVideo === '' || mpaaRating === '') {
            setError(true);
        }
        const movieData = {
            title,
            category,
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
        try {
            const response = await axios.post("http://localhost:8000/api/movies", movieData);

            if (response.status === 201) {
                setSubmitted(true)
                setError(false);
            } else {
                setError(true);
            } 
        } catch (error) {
            console.log("Error Adding User:", error);
            setError(true);
        }
    };


    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>Movie {title} has been successfully added!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    const returnManageMovies = () => {
        router.push('/admin/manageMovies');
    }

    return (
        <div>
            <Header></Header>
            <div className="formWrapper">
                <button onClick={returnManageMovies}> Go Back to Manage Movies </button>
                <h1>To add a new movie, fill out this form:</h1>
                {/* Calling to the methods */}
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>
                <form className="formBox">
                    <div className="inputWrapper">
                        <label className="label">Movie Title</label>
                        <input
                            onChange={handleInputChange(setMovieTitle)}
                            className="input"
                            value={title}
                            type="text"
                            placeholder="Movie Title"
                        />
                    </div>

                    <div className="inputWrapper">
                        <label className="label">Category</label>
                        <input
                            onChange={handleInputChange(setCategory)}
                            className="input"
                            value={category}
                            type="text"
                            placeholder="Category"
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

                    <button onClick={handleSubmit} className="button" type="submit">
                        Submit
                    </button>
                </form>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default addMovie;