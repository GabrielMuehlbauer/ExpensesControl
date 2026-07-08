import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Footer.module.css';
import logoExpensesControl from '../../assets/images/logo-expenses-control.svg';
import logout from '../../assets/images/logout.svg';

function Footer() {

    return (
        <footer className={styles.footerBackground}>
            <div className={styles.footerContent}>
                <h1>Expenses <i>Control</i></h1>
                <p>Uma aplicação criada por Gabriel Müehlbauer</p>
            </div>
        </footer>
    )
}

export default Footer;