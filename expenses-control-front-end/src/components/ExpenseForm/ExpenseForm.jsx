import { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./ExpenseForm.module.css";
import Input from "../Input/Input";
import WideButton from "../WideButton/WideButton";
import Select from "../Select/Select";

// Adicionamos a prop 'expenseToEdit'
function ExpenseForm({ onClose, onExpenseAdded, expenseToEdit }) {
    // 1. Estados dos inputs (Se tiver expenseToEdit, preenche com os dados, senão, fica vazio)
    const [title, setTitle] = useState(expenseToEdit ? expenseToEdit.title : "");
    const [amount, setAmount] = useState(expenseToEdit ? expenseToEdit.amount : "");
    // Ajuste da data para o formato aceito pelo input type="date"
    const [date, setDate] = useState(expenseToEdit ? expenseToEdit.date.substring(0, 10) : "");
    const [description, setDescription] = useState(expenseToEdit ? expenseToEdit.description : "");
    const [category, setCategory] = useState(expenseToEdit ? expenseToEdit.categoryId : ""); 
    
    // NOVO: Estado para o Status (Padrão inicial é PENDENTE na criação)
    const [status, setStatus] = useState(expenseToEdit ? expenseToEdit.status : "PENDENTE");

    // 2. Estados para a API e opções estáticas
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Opções para o novo campo de Status
    const statusOptions = [
        { value: "PENDENTE", label: "Pendente" },
        { value: "PAGA", label: "Paga" }
    ];

    // 3. Busca as categorias assim que o modal abre
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await api.get('/categories');
                const formatOptions = response.data.map(cat => ({
                    value: cat.id, 
                    label: cat.name 
                }));
                setCategoriesOptions(formatOptions);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        fetchCategories();
    }, []);

    // 4. Envia os dados para a API (Criar ou Editar)
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Monta o objeto para o Back-End com o Status incluído
            const expenseData = {
                title: title,
                amount: Number(amount),
                date: date,
                description: description,
                categoryId: category,
                status: status 
            };

            // Se existe expenseToEdit, fazemos um PUT (Atualizar). Se não, fazemos um POST (Criar)
            if (expenseToEdit) {
                await api.put(`/expenses/${expenseToEdit.id}`, expenseData);
            } else {
                await api.post('/expenses', expenseData);
            }
            
            // Avisa o Dashboard para recarregar a lista (Excelente prática!)
            if (onExpenseAdded) {
                onExpenseAdded();
            }

            if (onClose) {
                onClose(); 
            }

        } catch (error) {
            const apiError = error.response?.data?.error;
            console.error("Erro ao salvar despesa:", apiError || error);
            alert(apiError || "Erro ao salvar despesa. Verifique os campos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
                {/* O título muda dependendo se é criação ou edição */}
                <h2 className={styles.title}><i>{expenseToEdit ? "Editar" : "Criar"}</i> Despesa</h2>
            </div>
            <div className={styles.inputGroup}>
                <Input label="Título da Despesa:" type="text" placeholder="Ex: Compras do mês de maio" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <Input label="Data da Despesa:" type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                <Input label="Descrição da Despesa:" type="text" placeholder="Digite a descrição da despesa" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                
                <Select 
                    label="Categoria:" 
                    id="category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    options={categoriesOptions.length > 0 ? categoriesOptions : [{ value: "", label: "Carregando..." }]} 
                    required 
                />

                {/* NOVO: Select de Status usando as suas props padronizadas */}
                <Select 
                    label="Status:" 
                    id="status" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    options={statusOptions} 
                    required 
                />
                
                {/* Dica extra: Coloquei step="0.01" para permitir centavos */}
                <Input label="Valor da Despesa:" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
            </div>
            
            {/* O texto do botão também muda dinamicamente */}
            <WideButton 
                type="submit" 
                text={loading ? "A processar..." : (expenseToEdit ? "Salvar Alterações" : "Adicionar Despesa")} 
                disabled={loading}
            />
        </form>
    )
}

export default ExpenseForm;