import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import CategorySection from '../../components/CategorySection/CategorySection';
import ExpenseSection from '../../components/ExpenseSection/ExpenseSection';
import WideButton from '../../components/WideButton/WideButton';
import Input from '../../components/Input/Input';
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm';

function Dashboard() {

    const [totalGasto, setTotalGasto] = useState(427.85);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <main className={styles.dashboardContent}>
                <Header valorTotal={totalGasto} />
                <div className={styles.dashboardSections}>
                    <CategorySection />
                    <ExpenseSection />
                </div>
                <WideButton text='Criar Despesa +' onClick={() => setIsModalOpen(true)} />
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ExpenseForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            </main>
        </>
    )
}

export default Dashboard;