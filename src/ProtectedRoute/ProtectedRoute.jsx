import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../Store/userStore';

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading,user } = useUserStore();
    if (isLoading) {
        return <div>Loading...</div>; 
    }
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoute;