import { useState } from 'react';
import styles from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import CategorySection from '../../components/CategorySection/CategorySection';
import ExpenseSection from '../../components/ExpenseSection/ExpenseSection';

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
            </main>
        </>
    )
}

export default Dashboard;