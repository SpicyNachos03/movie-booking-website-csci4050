'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Admin(){
    return(
        <div>
            <h1>This is the admin page</h1>
            <p>We need options to manage:
                -movies
                -users
                -promotions
            </p>
        </div>
    )
}

export default Admin;