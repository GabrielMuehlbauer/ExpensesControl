import styles from './ExpenseDetails.module.css';
import loading from '../../assets/images/loading-blocks.gif';
import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/delete.svg';
import api from '../../services/api';

function ExpenseDetails({ expense, onClose, onExpenseDeleted, onEdit }) {
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

  // 1. Lógica de cores do status (igual ao ExpenseRow)
  const isPaga = expense.status === 'PAGA';
  const statusColor = isPaga ? '#abd035' : '#993f3f'; 
  const statusBg = isPaga ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 183, 77, 0.1)';

  return (
    <div className={styles.container}>

      {/* Cabeçalho com o botão de fechar e a Categoria estilo "tag" */}
      <div className={styles.header}>
        <h2 className={styles.title}>{expense.title}</h2>

        {/* Agrupamos a Data e o Status para ficarem alinhados lado a lado */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <p className={styles.date} style={{ margin: 0 }}>
            {new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(expense.date))}
          </p>

          {/* Etiqueta de Status */}
          <span style={{
            fontSize: '0.75rem',
            padding: '4px 10px',
            borderRadius: '8px',
            backgroundColor: statusBg,
            color: statusColor,
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {expense.status || 'PENDENTE'}
          </span>
        </div>
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
        <button className={styles.editButton} onClick={() => onEdit(expense)}>
          {/* Certifique-se de que a variável 'edit' está importada no topo do ficheiro */}
          <img src={edit} alt="Editar" />
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          {/* Certifique-se de que a variável 'trash' está importada no topo do ficheiro */}
          <img src={trash} alt="Excluir" />
        </button>
      </div>

    </div>
  );
}

export default ExpenseDetails;