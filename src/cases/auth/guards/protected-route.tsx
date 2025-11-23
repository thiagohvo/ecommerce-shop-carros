import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Props do componente ProtectedRoute
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Componente de proteção de rotas que requer autenticação.
 * Verifica se o usuário possui token válido no localStorage.
 * Se não estiver autenticado, redireciona para a página de login.
 * 
 * Uso:
 * <ProtectedRoute>
 *   <MinhaRota />
 * </ProtectedRoute>
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
    // Recupera dados do usuário do localStorage
    const user = JSON.parse(localStorage.getItem("user")!);
    
    // Se não houver token, redireciona para login
    if (!user?.token) {
        return (
            <Navigate
                to='/login'
                replace
            />
        );
    }

    // Usuário autenticado, renderiza o conteúdo protegido
    return <>{children}</>;
}