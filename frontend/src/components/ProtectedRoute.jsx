import React from 'react';
import { Navigate } from 'react-router-dom';
import useCheckAuthorized from '../CheckAuthorized'; // Ensure correct import path

function ProtectedRoute({ children }) {
    const isAuthorized = useCheckAuthorized(); // Use the custom hook

    if (isAuthorized === null) {
        return <div>Loading...</div>; // Show a loading indicator while checking authorization
    }

    if (isAuthorized) {
        return children; // Render children if authorized
    }

    return <Navigate to="/login" />; // Redirect to login if not authorized
}

export default ProtectedRoute;
