import { useState } from "react";
import api from "../../services/api";
import styles from "./CategoryForm.module.css";
import Input from "../Input/Input";
import WideButton from "../WideButton/WideButton";

function CategoryForm({ onClose, onCategoryAdded }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Rota POST /categories exigida pelo professor
            await api.post("/categories", { name: name });
            
            // Avisa o dashboard para atualizar as categorias na tela
            if (onCategoryAdded) {
                onCategoryAdded();
            }

            if (onClose) {
                onClose();
            }
        } catch (error) {
            const apiError = error.response?.data?.error;
            console.error("Erro ao criar categoria:", apiError || error);
            alert(apiError || "Erro ao adicionar categoria. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
                <h2 className={styles.title}><i>Nova</i> Categoria</h2>
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
            </div>
            <WideButton 
                type="submit" 
                text={loading ? "Adicionando..." : "Adicionar Categoria"} 
                disabled={loading}
            />
        </form>
    );
}

export default CategoryForm;