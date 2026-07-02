import axios from 'axios';

const api = axios.create({
  // URL da API BACKEND - Expenseses Control
  baseURL: 'http://localhost:3000/api' 
});

// Interceptor para injetar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@ExpensesControl:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;