'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

/* 
    Don't need to touch until Sprint 3
*/

function Admin(){
    return(
        <div>
            <Header></Header>
            <h1>This is the admin page</h1>
            <p>We need options to manage:
                -movies
                -users
                -promotions
            </p>
            <p>Add links to access the manage movies, manage users, and manage promotions screens</p>
            <div>
                <Link href="/admin/manageMovies" className="text-white hover:text-lightCyan">Manage Movies</Link>
            </div>
            <div>
                <Link href="/admin/manageUsers" className="text-white hover:text-lightCyan">Manage Users</Link>
            </div>
            <div>
                <Link href="/admin/managePromotions" className="text-white hover:text-lightCyan">Manage Promotions</Link>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Admin;