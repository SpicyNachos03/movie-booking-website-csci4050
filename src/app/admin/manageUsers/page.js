'use client'

import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './manageUsers.css';

//copy and paste this skeleton page if you want to create a new page
//within Header.js copy the same <Link></Link> list item and rename is accordingly to access it through the header

function ManageUsers(){
    const router = useRouter();

    const handleCreateUser = () => {
        router.push('../../signup');
    }

    return(
        <div>
            <Header></Header>

            <h1>This is the manage users page</h1>

            <button onClick={handleCreateUser}>Add User</button>

            <div class="card">
                <p>User 1</p>
                <p>ID: 1</p>
                <p>Name: Deadpool</p>
                <p>Email: deadpool@gmail.com</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <div class="card">
                <p>User 2</p>
                <p>ID: 2</p>
                <p>Name: John</p>
                <p>Email: john@yahoo.com</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <div class="card">
                <p>User 3</p>
                <p>ID: 3</p>
                <p>Name: Bob</p>
                <p>Email: bob@gmail.com</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <button>Add User</button>

            <Footer></Footer>
        </div>
    )
}

export default ManageUsers;