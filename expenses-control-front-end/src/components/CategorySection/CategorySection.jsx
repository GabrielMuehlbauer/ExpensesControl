import { useState, useEffect } from 'react';
import api from '../../services/api';
import styles from './CategorySection.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';

function CategorySection() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await api.get('/dashboard/expenses-by-category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className={styles.categorySection}>
            <div className={styles.categorySectionContent}>
                <h2>Total por categoria</h2>
                <div className={styles.containerCards}>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : categories.length > 0 ? (
                        categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                nome={category.categoria}
                                valor={category.total}
                            />
                        ))
                    ) : (
                        <p>Nenhuma categoria registrada.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CategorySection;