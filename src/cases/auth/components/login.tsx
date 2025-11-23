import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase-client';

/**
 * Componente de autenticação de usuários.
 * Permite login via e-mail e senha usando Supabase Auth.
 */
export function Login() {
    // Estados do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    /**
     * Processa o login do usuário.
     * Fluxo: autentica via Supabase -> salva token no localStorage -> redireciona
     */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Autentica usuário no Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                toast.error('Credenciais inválidas. Verifique seu e-mail e senha.');
                return;
            }

            // Armazena informações do usuário e token no localStorage
            localStorage.setItem('user', JSON.stringify({
                id: data.user?.id, 
                token: data.session?.access_token
            }) || '');

            toast.success('Login realizado com sucesso!');
            navigate('/products');
        } catch (err) {
            toast.error('Ocorreu um erro ao fazer login.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[400px]">
                {/* Cabeçalho do card */}
                <CardHeader>
                    <CardTitle className="text-center text-lg">Login</CardTitle>
                    <CardDescription className="text-center">
                        Insira seu e-mail e senha abaixo para entrar
                    </CardDescription>
                </CardHeader>

                {/* Formulário de login */}
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                            {/* Campo de e-mail */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Campo de senha */}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input 
                                    id="password"
                                    type="password"
                                    value={password}
                                    placeholder="************"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Botões de ação */}
                        <CardFooter className="flex-col gap-2 mt-10">
                            {/* Botão de submit */}
                            <Button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full cursor-pointer"
                            >
                                {isLoading ? 'Entrando...' : 'Login'}
                            </Button>

                            {/* Link para registro */}
                            <a 
                                href='/register'
                                className='self-center mt-3 text-sm text-primary hover:underline'
                            >
                                Não possui uma conta? Registre-se
                            </a>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;