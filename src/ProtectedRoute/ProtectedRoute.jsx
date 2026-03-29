import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../Store/userStore';

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading,user } = useUserStore();
        console.log(isAuthenticated)
        console.log(user)
    if (isLoading) {
        return <div>Loading...</div>; 
    }

    // 4. Redirect if NOT authenticated
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoute;