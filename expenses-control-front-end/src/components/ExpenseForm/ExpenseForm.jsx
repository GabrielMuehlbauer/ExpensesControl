import { useState } from "react";
import styles from "./ExpenseForm.module.css";
import Input from "../Input/Input";
import WideButton from "../WideButton/WideButton";
import Select from "../Select/Select";

function ExpenseForm({ onClose }) {
    const mockCategories = [
    { value: "supermercado", label: "Supermercado" },
    { value: "lazer", label: "Lazer" },
    { value: "transporte", label: "Transporte" },
    { value: "saude", label: "Saúde" }
];

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Dados do formulário:", { title, amount, date, description, category });
        
        if (onClose) {
            onClose(); 
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
                <Select 
                    label="Categoria:" 
                    id="category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    options={mockCategories} 
                    required 
                />
                <Input label="Valor da Despesa:" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
            </div>
            <WideButton type="submit" text="Adicionar Despesa"/>
        </form>
    )
}

export default ExpenseForm;