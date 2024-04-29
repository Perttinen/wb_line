import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    if (!localStorage.getItem('token')) {
        return <Navigate to='/login' />
    }
    return children
}