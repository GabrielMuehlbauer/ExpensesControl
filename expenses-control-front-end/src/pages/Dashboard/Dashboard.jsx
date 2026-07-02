import { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import CategorySection from '../../components/CategorySection/CategorySection';
import ExpenseSection from '../../components/ExpenseSection/ExpenseSection';
import WideButton from '../../components/WideButton/WideButton';
import Input from '../../components/Input/Input';
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm';
import ExpenseDetails from '../../components/ExpenseDetails/ExpenseDetails';
import api from '../../services/api';

function Dashboard() {

    const [totalGasto, setTotalGasto] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    
    // useEffect dispara assim que a tela abre
    useEffect(() => {
        async function fetchDashboardData() {
            try {
                // Substitua pelas rotas corretas que você criou no Node.js
                const response = await api.get('/dashboard/total-expenses');
                setTotalGasto(response.data.total); // Ajuste de acordo com o retorno da sua API
            } catch (error) {
                console.error("Erro ao buscar dados do dashboard:", error);
            }
        }
        fetchDashboardData();
    }, []);

    // Função atualizada para simular a API
    function handleOpenDetails(expense) {
        setIsDetailsModalOpen(true);
        setSelectedExpense(expense);   
    }

    function handleCloseDetails() {
        setIsDetailsModalOpen(false); // Fecha o modal
    }

    return (
        <>
            <main className={styles.dashboardContent}>
                <Header valorTotal={totalGasto} />
                <div className={styles.dashboardSections}>
                    <CategorySection />
                    <ExpenseSection onExpenseClick={handleOpenDetails} />
                </div>
                <WideButton text='Criar Despesa +' onClick={() => setIsModalOpen(true)} />
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ExpenseForm onClose={() => setIsModalOpen(false)} />
                </Modal>

                <Modal isOpen={isDetailsModalOpen} onClose={handleCloseDetails}>
                    {/* Injetamos a despesa selecionada para dentro do seu componente */}
                    <ExpenseDetails
                        expense={selectedExpense}
                        onClose={handleCloseDetails}
                    />
                </Modal>
            </main>
        </>
    )
}

export default Dashboard;