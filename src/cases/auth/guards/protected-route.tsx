import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (!user?.token) {
        return (
        <Navigate
            to='/login'
            replace
        />
        );
    }

    return <>{children}</>;
}
