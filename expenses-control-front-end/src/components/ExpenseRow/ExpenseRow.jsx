import styles from './ExpenseRow.module.css';

function ExpenseRow({ titulo, categoria, data, valor, onClick }) {
    return (
        <div className={styles.expenseRow} onClick={onClick}>
            <div className={styles.expenseRowContent}>
                <h2>{titulo}</h2>
                <p>{data}</p>
                <div>
                    <p className={styles.categoryTag}>{categoria}</p>
                    <p className={styles.expenseValue}>R${valor.toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
        </div>
    )
}

export default ExpenseRow;