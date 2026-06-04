import styles from './Header.module.css';
import logoExpensesControl from '../../assets/images/logo-expenses-control.svg';

function Header({ valorTotal }) {
    return (
        <header className={styles.headerContent}>
            <img src={logoExpensesControl} alt="logo" />
            <div className={styles.totalValueContainer}>
                <p>Total Gasto</p>
                <h2 className={styles.totalValue}>R${valorTotal.toFixed(2).replace('.', ',')}</h2>
            </div>
        </header>
    )
}

export default Header;