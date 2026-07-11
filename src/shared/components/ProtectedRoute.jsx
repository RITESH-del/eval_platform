import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchCurrentUser } from '../../features/auth/models/authThunks.js';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ role, children }) {
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    
    useEffect(() => {
        if (token) {
            dispatch(fetchCurrentUser());
        }
    }, []);

    const user = useSelector(
        state => state.auth.user
    );

    if (!token) {
        return <Navigate to="/login" />;
    }

    // if (user.role !== role) {
    //     return <Navigate to="/unauthorized" />;
    // }

    return children;
}