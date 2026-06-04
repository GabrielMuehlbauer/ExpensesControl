import { useState } from 'react';
import styles from './ExpenseSection.module.css';
import ExpenseRow from '../ExpenseRow/ExpenseRow';

function ExpenseSection({ expenses }) {

    const [despesas, setDespesas] = useState([
        {
            id: 1,
            titulo: "Compras para o churras de sábado",
            categoria: "Supermercado",
            data: "06/04/2026",
            valor: 114.30
        },
        {
            id: 2,
            titulo: "Cinema com os amigos",
            categoria: "Lazer",
            data: "10/04/2026",
            valor: 45.00
        },
        {
            id: 3,
            titulo: "Conta de luz - Abril",
            categoria: "Conta de Luz",
            data: "15/04/2026",
            valor: 89.55
        },
    ]);

    return (
        <section className={styles.expenseSection}>
            <div className={styles.expenseSectionContent}>
                <h2>Minhas despesas</h2>
                <div className={styles.containerRows}>
                    {despesas.map((despesa) => (
                        <ExpenseRow
                            key={despesa.id}
                            titulo={despesa.titulo}
                            categoria={despesa.categoria}
                            data={despesa.data}
                            valor={despesa.valor}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ExpenseSection;