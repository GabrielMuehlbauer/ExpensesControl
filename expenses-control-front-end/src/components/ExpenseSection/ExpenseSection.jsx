import { useState } from 'react';
import styles from './ExpenseSection.module.css';
import ExpenseRow from '../ExpenseRow/ExpenseRow';

function ExpenseSection({ expenses, onExpenseClick }) {

    const [despesas, setDespesas] = useState([
        {
            id: 1,
            title: "Compras para o churras de sábado",
            category: "Supermercado",
            date: "06/04/2026",
            amount: 114.30,
            description: "Comprei churrasco, carvão, sal de parrilha e pão de alho para o churrasco dos amigos no sábado."
        },
        {
            id: 2,
            title: "Cinema com os amigos",
            category: "Lazer",
            date: "10/04/2026",
            amount: 45.00
        },
        {
            id: 3,
            title: "Conta de luz - Abril",
            category: "Conta de Luz",
            date: "15/04/2026",
            amount: 89.55
        },
    ]);

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
                    {despesas.map((despesa) => (
                        <ExpenseRow
                            key={despesa.id}
                            title={despesa.title}
                            category={despesa.category}
                            date={despesa.date}
                            description={despesa.description}
                            amount={despesa.amount}
                            onClick={() => onExpenseClick(despesa)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ExpenseSection;