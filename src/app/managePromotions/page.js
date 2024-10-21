'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './managePromotions.css';


//copy and paste this skeleton page if you want to create a new page
//within Header.js copy the same <Link></Link> list item and rename is accordingly to access it through the header

function ManagePromotions(){
    return(
        <div>
            <h1>This is the manage promotions page</h1>
            <div class="card">
                <p>Promotion 1</p>
                <p>ID: 1</p>
                <p>Code: 5OFF</p>
                <p>Discount: 5%</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <div class="card">
                <p>Promotion 2</p>
                <p>ID: 2</p>
                <p>Code: employee</p>
                <p>Discount: 15%</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <div class="card">
                <p>Promotion 3</p>
                <p>ID: 3</p>
                <p>Code: friendsandfamily</p>
                <p>Discount: 20%</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <button>Add Promotion</button>
        </div>
    )
}

export default ManagePromotions;