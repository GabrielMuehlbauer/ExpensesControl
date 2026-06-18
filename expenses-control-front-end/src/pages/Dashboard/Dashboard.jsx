import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import CategorySection from '../../components/CategorySection/CategorySection';
import ExpenseSection from '../../components/ExpenseSection/ExpenseSection';
import WideButton from '../../components/WideButton/WideButton';
import Input from '../../components/Input/Input';
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm';
import ExpenseDetails from '../../components/ExpenseDetails/ExpenseDetails';

function Dashboard() {

    const [totalGasto, setTotalGasto] = useState(427.85);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedExpense, setSelectedExpense] = useState(null);

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    // (Mantenha o seu const [selectedExpense, setSelectedExpense] = useState(null);)

    // Função atualizada para simular a API
    function handleOpenDetails(expense) {
        setIsDetailsModalOpen(true); // 1. Abre o modal imediatamente
        setSelectedExpense(null);    // 2. Limpa os dados antigos (o que ativa o seu Loading!)

        // 3. Simula que o Back-End demorou 1.5 segundos para responder
        setTimeout(() => {
            setSelectedExpense(expense); // 4. Os dados chegam, o Loading some e a despesa aparece!
        }, 3500);
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