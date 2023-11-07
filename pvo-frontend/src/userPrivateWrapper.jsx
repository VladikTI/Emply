import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { authContext, AuthStatus } from "./contexts/authContext";

export default function UserPrivateWrapper (props){
    const authStatus = useContext(authContext).authStatus;

    if (authStatus == AuthStatus.PENDING_AUTH || 
        authStatus == AuthStatus.PENDING_REFRESH) {
        return <div>Checking auth...</div>;
    }
    if (authStatus == AuthStatus.AUTHORIZED) {
        return <Outlet/>
    } else {
        return <Navigate to="/login" />;
    }
};