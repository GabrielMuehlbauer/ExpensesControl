import styles from './CategoryCard.module.css';

function CategoryCard({ nome, valor }) {
    return (
        <div className={styles.categoryCard}>
            <p>{nome}</p>
            <div className={styles.valueContainer}>
                <h3>R${valor.toFixed(2).replace('.', ',')}</h3>
            </div>
        </div>
    )
}

export default CategoryCard;