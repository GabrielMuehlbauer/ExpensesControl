import { useState, useEffect } from 'react'; 
import api from '../../services/api';
import styles from './ExpenseSection.module.css';
import ExpenseRow from '../ExpenseRow/ExpenseRow';

function ExpenseSection({ onExpenseClick, categories, expenses, loading }) {

    return (
        <section className={styles.expenseSection}>
            <div className={styles.expenseSectionContent}>
                <div className={styles.expenseSectionHeader}>
                    <h2>Minhas despesas</h2>
                    <span className={styles.expenseCount}>
                            Total: {expenses.length}
                        </span>
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
                        expenses.map((expense) => {
                            // Para cada despesa, encontramos o objeto da categoria correspondente
                            const categoryObject = categories.find(cat => cat.id === expense.categoryId);

                            return (
                                <ExpenseRow
                                key={expense.id}
                                title={expense.title}
                                // Passamos o objeto da categoria encontrado. Se não encontrar, passa um fallback.
                                category={categoryObject || { name: 'Sem Categoria' }}
                                date={new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(expense.date))}
                                description={expense.description}
                                amount={expense.amount}
                                onClick={() => onExpenseClick(expense)}
                            />
                        )})
                    ) : (
                        <p style={{ color: '#888' }}>Nenhuma despesa registrada.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ExpenseSection;