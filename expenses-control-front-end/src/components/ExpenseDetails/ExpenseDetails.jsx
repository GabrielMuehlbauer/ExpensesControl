import styles from './ExpenseDetails.module.css';
import loading from '../../assets/images/loading-blocks.gif';
import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/delete.svg';
import api from '../../services/api';

function ExpenseDetails({ expense, onClose, onExpenseDeleted }) {
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

  async function handleDelete() {
    // Confirmação antes de deletar
    const isConfirmed = window.confirm(`Tem certeza que deseja excluir a despesa "${expense.title}"?`);

    if (isConfirmed) {
      try {
        // Adicionando o prefixo /api para a chamada
        await api.delete(`/expenses/${expense.id}`);
        alert('Despesa excluída com sucesso!');
        if (onExpenseDeleted) {
          onExpenseDeleted(); // Avisa o Dashboard que a despesa foi removida
        }
        onClose(); // Fecha o modal
      } catch (error) {
        console.error("Erro ao excluir despesa:", error);
        alert("Não foi possível excluir a despesa.");
      }
    }
  }

  return (
    <div className={styles.container}>

      {/* Cabeçalho com o botão de fechar e a Categoria estilo "tag" */}
      <div className={styles.header}>
        <h2 className={styles.title}>{expense.title}</h2>
        <p className={styles.date}>{new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(expense.date))}</p>
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
        {/* A API retorna um objeto, então acessamos a propriedade 'name' */}
        <h4>{expense.category?.name}</h4>
      </div>

      {/* Botões de Ação para o CRUD completo (Editar e Eliminar) */}
      <div className={styles.actions}>
        <button className={styles.editButton}>
          <img src={edit} alt="" />
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <img src={trash} alt="" />
        </button>
      </div>

    </div>
  );
}

export default ExpenseDetails;