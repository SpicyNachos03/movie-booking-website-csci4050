'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import './managePromotions.css';


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