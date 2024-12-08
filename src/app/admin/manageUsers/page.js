'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../admin.css'

function ManageUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users. Please try again later.');
            }
        };

        fetchUsers();
    }, []);

    const handleCreateUser = () => {
        router.push('/admin/manageUsers/createUser');
    };

    const handleReturnToAdmin = () => {
        router.push('/admin');
    };

    return (
        <div className="admin-container">
            <Header></Header>
            <div className="main-content">
                <div className="adminBox">
                    <h1>Manage Users</h1>
                    <p>View and manage all users in the system.</p>
                    <div className="button-group">
                        <a onClick={handleCreateUser} className="button">
                            Add User
                        </a>
                        <a onClick={handleReturnToAdmin} className="button">
                            Return to Admin Page
                        </a>
                    </div>
                    {error && <p>{error}</p>}
                    <div className="user-list">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <div key={user._id} className="user-card">
                                    <div className="user-info">
                                        <h2>{user.firstName} {user.lastName}</h2>
                                        <p>Email: {user.email}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ManageUsers;