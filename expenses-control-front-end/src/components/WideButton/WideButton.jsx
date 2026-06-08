import styles from './WideButton.module.css';

function WideButton({ text, onClick, ...props }) {
    return (
        <button className={styles.wideButton} onClick={onClick} {...props}>
            {text}
        </button>
    );
}

export default WideButton;