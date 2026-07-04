import styles from './CategoryCard.module.css';

function CategoryCard({ nome, valor, onClick }) {
    return (
        <div className={styles.categoryCard} onClick={onClick}>
            <p>{nome}</p>
            <div className={styles.valueContainer}>
                {/* Lógica de formatação mais segura para evitar quebras se o valor não for um número */}
                <h3>
                    R${(typeof valor === 'number' ? valor : 0).toFixed(2).replace('.', ',')}
                </h3>
            </div>
        </div>
    )
}

export default CategoryCard;