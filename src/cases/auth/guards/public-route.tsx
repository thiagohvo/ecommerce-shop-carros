import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Props do componente PublicRoute
 */
interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Componente de proteção para rotas públicas (login, registro).
 * Previne que usuários autenticados acessem páginas públicas.
 * Se o usuário já estiver logado, redireciona para a rota especificada.
 * 
 * Uso:
 * <PublicRoute redirectTo="/dashboard">
 *   <Login />
 * </PublicRoute>
 */
export function PublicRoute({ children, redirectTo = '/products' }: PublicRouteProps) {
    // Recupera dados do usuário do localStorage
    const user = JSON.parse(localStorage.getItem("user")!);
    
    // Se usuário já está autenticado, redireciona para área protegida
    if (user?.token) {
        return (
            <Navigate
                to={redirectTo}
                replace
            />
        );
    }

    // Usuário não autenticado, permite acesso à rota pública
    return <>{children}</>;
}