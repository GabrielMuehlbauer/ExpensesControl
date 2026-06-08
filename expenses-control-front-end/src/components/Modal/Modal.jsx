import styles from './Modal.module.css';

function Modal({ isOpen, onClose, children }) {
  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
  );
}

export default Modal;