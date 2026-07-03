import { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import CategorySection from '../../components/CategorySection/CategorySection';
import ExpenseSection from '../../components/ExpenseSection/ExpenseSection';
import WideButton from '../../components/WideButton/WideButton';
import Input from '../../components/Input/Input';
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm';
import ExpenseDetails from '../../components/ExpenseDetails/ExpenseDetails';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import api from '../../services/api';

function Dashboard() {

    const [totalGasto, setTotalGasto] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expenseToEdit, setExpenseToEdit] = useState(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    // Função para editar uma despesa
    function handleEdit(expense) {
        setExpenseToEdit(expense); // Dizemos ao React: "Guarde essa despesa!"
        setIsDetailsModalOpen(false);   // Fechamos o modal de Detalhes
        setIsModalOpen(true);       // Abrimos o Formulário (usando o seu state real)
    }

    // useEffect dispara assim que a tela abre
    useEffect(() => {
        async function fetchDashboardData() {
            setLoading(true);
            try {
                // Usamos Promise.all para buscar os dados em paralelo, melhorando a performance
                const [totalResponse, categoriesResponse, categoryTotalsResponse, expensesResponse] = await Promise.all([
                    api.get('/dashboard/total-expenses'), // Rota para o total de gastos, como você confirmou
                    api.get('/categories'),                // Rota para a lista de todas as categorias
                    api.get('/dashboard/expenses-by-category'), // Rota para os totais
                    api.get('/expenses')
                ]);

                setTotalGasto(totalResponse.data.total);
                setAllCategories(categoriesResponse.data);
                // Ajuste para ser mais robusto: aceita tanto um objeto {categorias: []} quanto um array [] diretamente.
                // Se .categorias existir, usa ele. Senão, tenta usar o .data inteiro. Se nada funcionar, usa um array vazio.
                setCategoryTotals(categoryTotalsResponse.data.categorias || categoryTotalsResponse.data || []);
                setExpenses(expensesResponse.data);

            } catch (error) {
                console.error("Erro ao buscar dados do dashboard:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardData();
    }, []);

    // Função para ser chamada quando uma nova despesa for adicionada
    function handleExpenseAdded() {
        setIsModalOpen(false); // Fecha o modal
        // Atualiza os dados do dashboard (isso pode ser otimizado no futuro)
        // Por enquanto, vamos simular a atualização buscando tudo de novo
        window.location.reload(); // Temporário até o estado global ser implementado
        // Idealmente: fetchDashboardData(); e uma função para recarregar as despesas em ExpenseSection
    }

    function handleExpenseDeleted() {
        setIsDetailsModalOpen(false);
        // A mesma lógica de recarga se aplica aqui
        window.location.reload();
    }

    // Função atualizada para simular a API
    function handleOpenDetails(expense) {
        // O objeto 'expense' que vem do ExpenseSection só tem o 'categoryId'.
        // Precisamos encontrar o objeto da categoria completo na nossa lista de 'categories'.
        const category = allCategories.find(cat => cat.id === expense.categoryId);

        // Criamos um novo objeto de despesa que inclui os detalhes da categoria.
        const expenseWithCategoryDetails = {
            ...expense,
            category: category || { name: 'Não encontrada' } // Adiciona um fallback caso a categoria não seja encontrada
        };
        setIsDetailsModalOpen(true);
        setSelectedExpense(expenseWithCategoryDetails);
        setExpenseToEdit(null); // Reseta a despesa a ser editada, caso o usuário tenha vindo de um estado de edição anterior
    }

    function handleCloseDetails() {
        setIsDetailsModalOpen(false); // Fecha o modal
    }

    return (
        <>
            <main className={styles.dashboardContent}>
                <Header valorTotal={totalGasto} />
                <div className={styles.dashboardSections}>
                    <CategorySection allCategories={allCategories} categoryTotals={categoryTotals} loading={loading} onAddClick={() => setIsCategoryModalOpen(true)} />
                    <ExpenseSection onExpenseClick={handleOpenDetails} categories={allCategories} expenses={expenses} loading={loading} />
                </div>
                <WideButton text='Criar Despesa +' onClick={() => setIsModalOpen(true)} />
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ExpenseForm
                        onClose={() => setIsModalOpen(false)}
                        onExpenseAdded={handleExpenseAdded}
                        expenseToEdit={expenseToEdit}
                    />
                </Modal>

                <Modal isOpen={isDetailsModalOpen} onClose={handleCloseDetails}>
                    {/* Injetamos a despesa selecionada para dentro do seu componente */}
                    <ExpenseDetails
                        expense={selectedExpense}
                        onClose={handleCloseDetails}
                        onExpenseDeleted={handleExpenseDeleted}
                        onEdit={handleEdit}
                    />
                </Modal>

                {isCategoryModalOpen && (
                    <Modal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)}>
                        <CategoryForm
                            onClose={() => setIsCategoryModalOpen(false)}
                            onCategoryAdded={handleExpenseAdded} /* Chama a mesma função que atualiza o dashboard para re-renderizar a lista de categorias atualizada! */
                        />
                    </Modal>
                )}
            </main>
        </>
    )
}

export default Dashboard;