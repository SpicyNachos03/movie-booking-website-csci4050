'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import './managePromotions.css';


//copy and paste this skeleton page if you want to create a new page
//within Header.js copy the same <Link></Link> list item and rename is accordingly to access it through the header

function ManagePromotions() {
    const handleNotifyPromotion = async () => {
      try {
        const response = await axios.post('/api/emails/notify-promotion');
        alert(response.data.message);
      } catch (error) {
        console.error('Error notifying promotion:', error);
        alert('Failed to send promotion notifications. Please try again later.');
      }
    };
  
    return (
      <div>
        <h1>This is the manage promotions page</h1>
        <div className="card">
          <p>Promotion 1</p>
          <p>ID: 1</p>
          <p>Code: 5OFF</p>
          <p>Discount: 5%</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="card">
          <p>Promotion 2</p>
          <p>ID: 2</p>
          <p>Code: employee</p>
          <p>Discount: 15%</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="card">
          <p>Promotion 3</p>
          <p>ID: 3</p>
          <p>Code: friendsandfamily</p>
          <p>Discount: 20%</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <button onClick={handleNotifyPromotion}>Notify Users</button>
      </div>
    );
  }
  
  export default ManagePromotions;
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