import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Persistência de sessão: Verifica se há um token e um usuário armazenados no localStorage
    const token = localStorage.getItem('@ExpensesControl:token');
    const storedUser = localStorage.getItem('@ExpensesControl:user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  async function signIn(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      
      // Vamos capturar toda a resposta para garantir
      const data = response.data;
      
      // Pega o token de onde ele vier (seja data.token ou apenas data)
      const token = data.token;

      const loggedUser = data.user || data.usuario || { email: email };

      // Salva no LocalStorage
      localStorage.setItem('@ExpensesControl:token', token);
      localStorage.setItem('@ExpensesControl:user', JSON.stringify(loggedUser));
      
      setUser(loggedUser);
      
    } catch (error) {
      console.error("Erro no Login:", error);
      alert("Erro ao fazer login. Verifique as credenciais.");
    }
  }

  function signOut() {
    localStorage.removeItem('@ExpensesControl:token');
    localStorage.removeItem('@ExpensesControl:user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signed: !!user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}