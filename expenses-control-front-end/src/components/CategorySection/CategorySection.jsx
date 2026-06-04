import { useState } from 'react';
import styles from './CategorySection.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';

function CategorySection() {

    const [categorias, setCategorias] = useState([
        { id: 1, nome: "Supermercado", total: 143.00 },
        { id: 2, nome: "Lazer", total: 201.54 },
        { id: 3, nome: "Conta de Luz", total: 304.57 },
        { id: 4, nome: "Viagem", total: 6847.45 }
    ]);

    return (
        <section className={styles.categorySection}>
            <div className={styles.categorySectionContent}>
                <h2>Total por categoria</h2>
                <div className={styles.containerCards}>
                    {categorias.map((categoria) => (
                        <CategoryCard
                            key={categoria.id}
                            nome={categoria.nome}
                            valor={categoria.total}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategorySection;