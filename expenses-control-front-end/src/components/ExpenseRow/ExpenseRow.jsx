import styles from './ExpenseRow.module.css';

function ExpenseRow({ title, category, date, amount, description, onClick, onExpenseClick }) {
    return (
        <div className={styles.expenseRow} onClick={onClick}>
            <div className={styles.expenseRowContent}>
                <h2>{title}</h2>
                <p>{date}</p>
                <div>
                    <p className={styles.categoryTag}>{category}</p>
                    <p className={styles.expenseValue}>R${Number(amount || 0).toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
        </div>
    )
}

export default ExpenseRow;