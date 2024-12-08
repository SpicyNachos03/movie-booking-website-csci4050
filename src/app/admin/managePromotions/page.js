'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import '../admin.css';

function ManagePromotions() {
    const router = useRouter();
    const [promotions, setPromotions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/promotions');
                setPromotions(response.data);
            } catch (err) {
                console.error('Error fetching promotions:', err);
                setError('Failed to fetch promotions. Please try again later.');
            }
        };

        fetchPromotions();
    }, []);

    const handleAddPromotion = () => {
        router.push('/admin/managePromotions/addPromotions');
    };

    const handleReturnToAdmin = () => {
        router.push('/admin');
    };

    return (
        <div className="admin-container">
            <Header />
            <div className="main-content">
                <div className="adminBox">
                    <h1>Manage Promotions</h1>
                    <p>View and manage all promotions in the system.</p>
                    <div className="button-group">
                        <a onClick={handleAddPromotion} className="button">
                            Add Promotion
                        </a>
                        <a onClick={handleReturnToAdmin} className="button">
                            Return to Admin Page
                        </a>
                    </div>
                    {error && <p>{error}</p>}
                    <div className="user-list">
                        {promotions.length > 0 ? (
                            promotions.map((promotion) => (
                                <div key={promotion._id} className="user-card">
                                    <div className="user-info">
                                        <h2>{promotion.promotionName}</h2>
                                        <p>Discount Rate: {promotion.promotionRate}%</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No promotions found.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ManagePromotions;