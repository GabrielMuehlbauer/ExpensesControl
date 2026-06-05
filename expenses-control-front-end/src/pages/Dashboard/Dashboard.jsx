import { useState } from 'react';
import styles from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import CategorySection from '../../components/CategorySection/CategorySection';
import ExpenseSection from '../../components/ExpenseSection/ExpenseSection';
import WideButton from '../../components/WideButton/WideButton';

function Dashboard() {

    const [totalGasto, setTotalGasto] = useState(427.85);

    return (
        <>
            <main className={styles.dashboardContent}>
                <Header valorTotal={totalGasto} />
                <div className={styles.dashboardSections}>
                    <CategorySection />
                    <ExpenseSection />
                </div>
                <WideButton text='Criar Despesa +' />
            </main>
        </>
    )
}

export default Dashboard;