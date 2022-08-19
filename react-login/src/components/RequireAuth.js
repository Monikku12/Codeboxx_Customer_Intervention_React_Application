import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import React from "react";
// import { useNavigate } from "react-router-dom";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    // let navigate = useNavigate();

    return (
        auth?.user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
            // : navigate("/login", { replace: true, from: location })
    );
}

export default RequireAuth;