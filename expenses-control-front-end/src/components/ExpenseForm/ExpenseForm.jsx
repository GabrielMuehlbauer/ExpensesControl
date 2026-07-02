import { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./ExpenseForm.module.css";
import Input from "../Input/Input";
import WideButton from "../WideButton/WideButton";
import Select from "../Select/Select";

function ExpenseForm({ onClose }) {
    // 1. Estados dos inputs
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(""); // Guardará o ID da categoria

    // 2. Estados para a API (Categorias reais e Loading)
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    // 3. Busca as categorias assim que o modal abre
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await api.get('/categories');
                
                // Transforma o array que vem do banco [{ id: 1, name: 'Lazer' }] 
                // para o formato que o SEU componente <Select> espera [{ value: 1, label: 'Lazer' }]
                const formatOptions = response.data.map(cat => ({
                    value: cat.id, 
                    label: cat.name // Adapte dependendo do que sua API retorna
                }));
                
                setCategoriesOptions(formatOptions);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        fetchCategories();
    }, []);

    // 4. Envia os dados para a API
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Monta o objeto para o Back-End
            const newExpense = {
                title: title,
                amount: Number(amount), // Garante que envia como número e não como texto
                date: date,
                description: description,
                categoryId: category // Envia o ID da categoria escolhida
            };

            // Dispara para a API
            await api.post('/expenses', newExpense);
            
            if (onClose) {
                onClose(); 
            }
            
            // O "Truque" do MVP: Recarrega a página para o Dashboard puxar a nova despesa
            window.location.reload(); 

        } catch (error) {
            console.error("Erro ao salvar despesa:", error);
            alert("Erro ao adicionar despesa. Verifique os dados.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
                <h2 className={styles.title}><i>Criar</i> Despesa</h2>
            </div>
            <div className={styles.inputGroup}>
                <Input label="Título da Despesa:" type="text" placeholder="Ex: Compras do mês de maio" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <Input label="Data da Despesa:" type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                <Input label="Descrição da Despesa:" type="text" placeholder="Digite a descrição da despesa" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                
                {/* O Select agora recebe as opções do Banco de Dados */}
                <Select 
                    label="Categoria:" 
                    id="category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    options={categoriesOptions.length > 0 ? categoriesOptions : [{ value: "", label: "Carregando..." }]} 
                    required 
                />
                
                <Input label="Valor da Despesa:" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
            </div>
            
            {/* O texto do botão muda se estiver processando a requisição */}
            <WideButton type="submit" text={loading ? "A adicionar..." : "Adicionar Despesa"} disabled={loading}/>
        </form>
    )
}

export default ExpenseForm;