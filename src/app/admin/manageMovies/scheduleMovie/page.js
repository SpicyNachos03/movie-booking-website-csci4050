'use client'

import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScheduleMovieForm from '@/components/ScheduleMovieForm';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../../signup/signup.css';
import { useRouter } from 'next/navigation'; 

function ScheduleMovie() {
    return(
        <div>
            <Header></Header>
            <ScheduleMovieForm></ScheduleMovieForm>
            <Footer></Footer>
        </div>
    );
}

export default ScheduleMovie;