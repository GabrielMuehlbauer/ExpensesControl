import styles from './ExpenseRow.module.css';

function ExpenseRow({ title, category, date, amount, status, description, onClick, onExpenseClick }) {
    
    // Define as cores com base no status (Verde para PAGA, Vermelho para PENDENTE)
    const isPaga = status === 'PAGA';
    const statusColor = isPaga ? '#abd035' : '#993f3f'; 
    const statusBg = isPaga ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 183, 77, 0.1)';

    return (
        <div className={styles.expenseRow} onClick={onClick}>
            <div className={styles.expenseRowContent}>
                <h2>{title}</h2>
                
                {/* Data e Status agrupados para ficarem lado a lado harmonicamente */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p style={{ margin: 0 }}>{date}</p>
                    <span style={{ 
                        fontSize: '0.7rem', 
                        padding: '2px 8px', 
                        borderRadius: '7px', 
                        backgroundColor: statusBg, 
                        color: statusColor,
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                    }}>
                        {status || 'PENDENTE'}
                    </span>
                </div>

                <div>
                    <p className={styles.categoryTag}>{category?.name || category}</p>
                    <p className={styles.expenseValue}>R${Number(amount || 0).toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
        </div>
    )
}

export default ExpenseRow;