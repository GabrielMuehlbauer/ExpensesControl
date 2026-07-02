import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Header.module.css';
import logoExpensesControl from '../../assets/images/logo-expenses-control.svg';
import logout from '../../assets/images/logout.svg';

function Header({ valorTotal }) {

    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContent}>
            <img src={logoExpensesControl} alt="logo" />
            <button
                onClick={signOut}
                title="Sair do sistema"
                className={styles.logoutButton}
            >
                <img src={logout} alt="Sair" />
            </button>
            <div className={styles.totalValueContainer}>
                <p>Total Gasto</p>
                <h2 className={styles.totalValue}>R${valorTotal.toFixed(2).replace('.', ',')}</h2>
            </div>
        </header>
    )
}

export default Header;