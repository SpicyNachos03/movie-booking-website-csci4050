'use client'

import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScheduleMovieForm from '@/components/ScheduleMovieForm';



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