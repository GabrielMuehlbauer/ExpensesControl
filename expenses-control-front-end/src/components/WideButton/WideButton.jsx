import styles from './WideButton.module.css';

function WideButton({ text, onClick }) {
    return (
        <button className={styles.wideButton} onClick={onClick}>
            {text}
        </button>
    );
}

export default WideButton;