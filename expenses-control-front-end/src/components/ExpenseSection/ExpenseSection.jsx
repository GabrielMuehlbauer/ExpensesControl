import { useState, useEffect } from 'react'; 
import api from '../../services/api';
import styles from './ExpenseSection.module.css';
import ExpenseRow from '../ExpenseRow/ExpenseRow';

// 2. Removido o 'expenses' das props, pois agora o componente busca na API
function ExpenseSection({ onExpenseClick }) {

    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExpenses() {
            try {
                // Chama a rota que lista as despesas do Back-End
                const response = await api.get('/expenses');
                setExpenses(response.data); 
            } catch (error) {
                console.error("Erro ao buscar despesas:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchExpenses();
    }, []);

    return (
        <section className={styles.expenseSection}>
            <div className={styles.expenseSectionContent}>
                <div className={styles.expenseSectionHeader}>
                    <h2>Minhas despesas</h2>
                    <div className={styles.filterButton}>
                        <span className="material-symbols-outlined">
                            tune
                        </span>
                    </div>
                </div>
                <div className={styles.containerRows}>
                    {/* 3. Ajustado para exibir algo enquanto carrega e corrigido 'despesas' para 'expenses' */}
                    {loading ? (
                        <p>Carregando...</p>
                    ) : expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <ExpenseRow
                                key={expense.id}
                                title={expense.title}
                                category={expense.category} 
                                date={new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(expense.date))}
                                description={expense.description}
                                amount={expense.amount}
                                onClick={() => onExpenseClick(expense)}
                            />
                        ))
                    ) : (
                        <p style={{ color: '#888' }}>Nenhuma despesa registrada.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ExpenseSection;