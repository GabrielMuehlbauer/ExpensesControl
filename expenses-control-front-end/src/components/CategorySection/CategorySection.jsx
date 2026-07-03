import { useState, useEffect } from 'react';
import api from '../../services/api';
import styles from './CategorySection.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';

function CategorySection({ allCategories = [], categoryTotals = [], loading }) {
    return (
        <section className={styles.categorySection}>
            <div className={styles.categorySectionContent}>
                <h2>Total por categoria</h2>
                <div className={styles.containerCards}>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : allCategories.length > 0 ? (
                        allCategories.map((category) => {
                            // Para cada categoria da lista completa, procuramos seu total correspondente.
                            const totalInfo = categoryTotals.find(
                                (total) => {
                                    // Lógica de comparação mais robusta para evitar erros se as propriedades não existirem.
                                    // Compara os nomes ignorando maiúsculas/minúsculas e acentos.
                                    if (!total?.categoria || !category?.name) return false;

                                    const normalizedTotalCategoria = total.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                                    const normalizedCategoryName = category.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

                                    return normalizedTotalCategoria === normalizedCategoryName;
                                }
                            );

                            // Garante que o valor seja um número, mesmo que a propriedade 'total' não venha ou não seja um número.
                            const valor = (totalInfo && typeof totalInfo.total === 'number') ? totalInfo.total : 0;

                            return (
                                <CategoryCard
                                    key={category.id}
                                    nome={category.name}
                                    valor={valor}
                                />
                            );
                        })
                    ) : (
                        <p>Nenhuma categoria registrada.</p>
                    )}

                    <button className={styles.categoryCardAddButton} onClick={() => alert('Função de adicionar categoria ainda não implementada.')}>
                                +
                            </button>
                </div>
            </div>
        </section>
    )
}

export default CategorySection;