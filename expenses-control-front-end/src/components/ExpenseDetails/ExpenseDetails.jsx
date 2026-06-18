import styles from './ExpenseDetails.module.css';
import loading from '../../assets/images/loading-blocks.gif';

function ExpenseDetails({ expense, onClose }) {
  // Proteção: Se por algum motivo o componente abrir sem uma despesa, não deixa o app crashar
  if (!expense) return (
    <>
    <div className={styles.loadingDisplay}>
        <div className={styles.loadingContent}>
            <img src={loading} alt="loading" />
            Carregando...
        </div>
    </div>
    </>
  );

  return (
    <div className={styles.container}>
      
      {/* Cabeçalho com o botão de fechar e a Categoria estilo "tag" */}
      <div className={styles.header}>
        <h2 className={styles.title}>{expense.title}</h2>
        <p className={styles.date}>{expense.date}</p>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>{expense.description}</p>
      </div>

      {/* Bloco de destaque para o Valor da Despesa (bem grande, igual ao protótipo) */}
      <div className={styles.amountContainer}>
        <p className={styles.amountLabel}>Valor da Despesa</p>
        <h3 className={styles.amountValue}>R$ {expense.amount}</h3>
      </div>
    
    <div className={styles.categoryTag}>
        <h4>{expense.category}</h4>
    </div>

      {/* Botões de Ação para o CRUD completo (Editar e Eliminar) */}
      <div className={styles.actions}>
        <button className={styles.editButton}>Editar despesa</button>
        <button className={styles.deleteButton}>Excluir despesa</button>
      </div>

    </div>
  );
}

export default ExpenseDetails;