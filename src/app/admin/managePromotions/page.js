'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import './managePromotions.css';


//copy and paste this skeleton page if you want to create a new page
//within Header.js copy the same <Link></Link> list item and rename is accordingly to access it through the header

function ManagePromotions(){
    
    return(
        <div>
            <Header></Header>
            <h1>This is the manage promotions page</h1>
            <Link href="/admin/managePromotions/addPromotions">Add Promotion</Link>
            <Footer></Footer>
        </div>
    )
}

export default ManagePromotions;