'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

function Admin(){
    return(
        <div>
            <h1>This is the admin page</h1>
            <p>We need options to manage:
                -movies
                -users
                -promotions
            </p>
            <p>Add links to access the manage movies, manage users, and manage promotions screens</p>
            <div>
                <Link href="/manageMovies" className="text-white hover:text-lightCyan">Manage Movies</Link>
            </div>
            <div>
                <Link href="/manageUsers" className="text-white hover:text-lightCyan">Manage Users</Link>
            </div>
            <div>
                <Link href="/managePromotions" className="text-white hover:text-lightCyan">Manage Promotions</Link>
            </div>
        </div>
    )
}

export default Admin;