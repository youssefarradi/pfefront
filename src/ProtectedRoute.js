import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!token || !user) {
                setIsAuthenticated(false);
                return;
            }

            if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
                setIsAuthenticated(false);
                return;
            }

            setIsAuthenticated(true);
        };

        checkAuth();
    }, [allowedRoles]);

    if (isAuthenticated === null) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;