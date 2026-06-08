import styles from './Input.module.css';

function Input({ label, id, ...props }) {
  return (
    <div className={styles.container}>
      {/* Só renderiza a label se a prop 'label' for enviada */}
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      
      {/* O ...props espalha todos os outros atributos (type, placeholder, onChange) aqui */}
      <input 
        id={id} 
        className={styles.input} 
        {...props} 
      />
    </div>
  );
}

export default Input;