import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function PublicRoute({ children, redirectTo = '/products' }: PublicRouteProps) {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user?.token) {
        return (
        <Navigate
            to={redirectTo}
            replace
        />
        );
    }

    return <>{children}</>;
}
