'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import './manageMovies.css';

//copy and paste this skeleton page if you want to create a new page
//within Header.js copy the same <Link></Link> list item and rename is accordingly to access it through the header

function ManageMovies(){
    return(
        <div>
            <Header></Header>
            <Link href="/admin/manageMovies/addMovie" className="text-white hover:text-lightCyan"> Add New Movie </Link>
            <h1>This is the manage movies page</h1>
            <div className="card">
                <p>Movie 1</p>
                <p>Name: Deadpool & Wolverine</p>
                <p>Poster: <img src="https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_.jpg" width="200"></img></p>
                <p>Status: Now Showing</p>
                <p>Showing Times: 12:00PM, 3:00PM, 7:00PM, 10:00PM</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <div className="card">
                <p>Movie 2</p>
                <p>Name: Avengers: Endgame</p>
                <p>Poster: <img src="https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg" width="200"></img></p>
                <p>Status: Not Playing</p>
                <p>Showing Times: N/A</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <div className="card">
                <p>Movie 3</p>
                <p>Name: The Wolf of Wall Street</p>
                <p>Poster: <img src="https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg" width="200"></img></p>
                <p>Status: Not Playing</p>
                <p>Showing Times: N/A</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default ManageMovies;