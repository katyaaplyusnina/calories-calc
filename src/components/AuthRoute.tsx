import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from "../services/auth.service";

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuth = isAuthenticated();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default AuthRoute;
