import { useState } from 'react';
import api from '../../services/api';
import styles from './CategoryDetails.module.css';
import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/delete.svg';

function CategoryDetails({ category, onClose, onDeleteSuccess, onEdit }) {
  const [loading, setLoading] = useState(false);

  if (!category) return null;

  async function handleDelete() {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`);
    if (!confirmDelete) return;

    setLoading(true);
    try {
      // Dispara a rota DELETE /categories/:id exigida pelo professor
      await api.delete(`/categories/${category.id}`);
      
      if (onDeleteSuccess) onDeleteSuccess();
      if (onClose) onClose();
    } catch (error) {
      const apiError = error.response?.data?.error;
      console.error("Erro ao deletar categoria:", apiError || error);
      // Mensagem de erro genérica para o usuário.
      alert("Ocorreu um erro ao deletar a categoria. Verifique se não existem despesas associadas a ela e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{category.name}</h2>
      </div>

      <div className={styles.content}>
        {/* Mostra a descrição que você planejou! */}
        <p className={styles.description}>
          {category.description || "Nenhuma descrição informada para esta categoria."}
        </p>
      </div>

      {/* Botões de Ação para o CRUD de Categorias (Excluir) */}
      <div className={styles.actions}>
        <button
            className={styles.editButton}
            onClick={() => onEdit(category)}
        >
          <img src={edit} alt="Editar" />
        </button>
        <button 
          className={styles.deleteButton}
          onClick={handleDelete} 
          disabled={loading}
        >
          <img src={trash} alt="Excluir" />
        </button>
      </div>
    </div>
  );
}

export default CategoryDetails;