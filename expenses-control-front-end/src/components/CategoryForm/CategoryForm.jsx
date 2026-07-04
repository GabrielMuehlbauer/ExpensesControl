import { useState } from "react";
import api from "../../services/api";
import styles from "./CategoryForm.module.css";
import Input from "../Input/Input";
import WideButton from "../WideButton/WideButton";

function CategoryForm({ onClose, onCategoryAdded, categoryToEdit }) {
    const [name, setName] = useState(categoryToEdit ? categoryToEdit.name : "");
    const [description, setDescription] = useState(categoryToEdit ? categoryToEdit.description : "");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const categoryData = { 
            name: name,
            description: description
        };

        try {
            if (categoryToEdit) {
                await api.put(`/categories/${categoryToEdit.id}`, categoryData);
            } else {
                // Rota POST /categories
                await api.post("/categories", categoryData);
            }
            
            // Avisa o dashboard para atualizar as categorias na tela
            if (onCategoryAdded) {
                onCategoryAdded();
            }
 
            if (onClose) {
                onClose();
            }
        } catch (error) {
            const apiError = error.response?.data?.error;
            const action = categoryToEdit ? "salvar" : "criar";
            console.error(`Erro ao ${action} categoria:`, apiError || error);
            // Mostra uma mensagem amigável para o usuário, sem expor detalhes técnicos do erro.
            alert(`Ocorreu um erro ao tentar ${action} a categoria. Por favor, tente novamente mais tarde.`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
                <h2 className={styles.title}><i>{categoryToEdit ? "Editar" : "Nova"}</i> Categoria</h2>
            </div>
            <div className={styles.inputGroup}>
                <Input 
                    label="Nome da Categoria:" 
                    type="text" 
                    placeholder="Ex: Investimentos, Viagens..." 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
                <Input 
                    label="Descrição da Categoria:" 
                    type="text" 
                    placeholder="Ex: Gastos com passagens, hotéis..." 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                />
            </div>
            <WideButton 
                type="submit" 
                text={loading ? "Processando..." : (categoryToEdit ? "Salvar Alterações" : "Adicionar Categoria")} 
                disabled={loading}
            />
        </form>
    );
}

export default CategoryForm;