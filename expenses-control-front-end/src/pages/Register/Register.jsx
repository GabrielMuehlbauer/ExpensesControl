import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Input from '../../components/Input/Input';
import WideButton from '../../components/WideButton/WideButton';
import styles from './Register.module.css';

function Register() {
    const navigate = useNavigate();
    
    // Estados do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Estados de controle
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Validação
    function validateForm() {
        if (name.trim().length < 3) {
            setError('O nome deve ter pelo menos 3 letras.');
            return false;
        }
        if (!email.includes('@') || email.length < 5) {
            setError('Por favor, insira um e-mail válido.');
            return false;
        }
        if (password.length < 4) {
            setError('A senha deve conter pelo menos 4 caracteres.');
            return false;
        }
        return true;
    }

    async function handleRegister(e) {
        e.preventDefault();
        setError(''); 
        
        if (!validateForm()) return;

        setLoading(true); 

        try {
            // Rota exigida pelo Back-End para criar utilizador
            await api.post('/users', { name, email, password });

            // Se der certo, avisa o utilizador e manda ele para o Login!
            alert('Conta criada com sucesso! Faça login para entrar.');
            navigate('/login'); 
        } catch (err) {
            const apiError = err.response?.data?.error;
            setError(apiError || 'Erro ao criar conta. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false); 
        }
    }

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <h1 className={styles.logoTitle}>
                    Expenses <i>Control</i>
                </h1>
                <p className={styles.subtitle}>Crie sua conta e comece a organizar-se</p>

                {error && <div className={styles.errorAlert}>{error}</div>}

                <form onSubmit={handleRegister} className={styles.registerForm}>
                    <Input
                        label="Nome"
                        type="text"
                        id="name"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={loading}
                        required
                    />
                    <Input
                        label="E-mail"
                        type="email"
                        id="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={loading}
                        required
                    />
                    <Input
                        label="Senha"
                        type="password"
                        id="password"
                        placeholder="Crie uma senha segura"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={loading}
                        required
                    />

                    <WideButton
                        type="submit"
                        disabled={loading}
                        text={loading ? 'A criar conta...' : 'Cadastrar'}
                    />
                </form>

                {/* Botão para voltar ao Login */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ color: '#888', fontSize: '0.9rem', fontFamily: 'var(--font-family-accent)' }}>
                        Já tem uma conta?{' '}
                        <span 
                            style={{ color: 'var(--yellowish-green)', cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={() => navigate('/login')}
                        >
                            Faça Login aqui
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;