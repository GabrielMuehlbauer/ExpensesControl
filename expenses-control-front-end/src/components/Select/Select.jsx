import styles from './Select.module.css';

function Select({ label, id, options, ...props }) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      
      <select id={id} className={styles.select} {...props}>
        {/* Opção padrão desativada para forçar o utilizador a escolher */}
        <option value="" disabled>
          Selecione uma opção...
        </option>
        
        {/* Aqui fazemos um loop pelas opções que o componente receber */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;