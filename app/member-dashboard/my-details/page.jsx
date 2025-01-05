"use client";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditMyDetailsDialog from "@/app/components/EditMyDetailsDialog"
import Link from 'next/link';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import React from 'react';

const MyDetailsPage = () => {
    const [member, setMember] = useState([]);
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [userProfile, setUserProfile] = useState({ email: '', member:{} });
    const userDetails = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA'
    };

    return (
        <div>
            <h1>My Details</h1>
            <div>
                <strong>Name:</strong> {userDetails.name}
            </div>
            <div>
                <strong>Email:</strong> {userDetails.email}
            </div>
            <div>
                <strong>Phone:</strong> {userDetails.phone}
            </div>
            <div>
                <strong>Address:</strong> {userDetails.address}
            </div>
        </div>
    );
};

export default MyDetailsPage;