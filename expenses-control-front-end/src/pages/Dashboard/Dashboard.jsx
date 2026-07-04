import { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './Dashboard.module.css';
import Header from '../../components/Header/Header';
import CategorySection from '../../components/CategorySection/CategorySection';
import ExpenseSection from '../../components/ExpenseSection/ExpenseSection';
import WideButton from '../../components/WideButton/WideButton';
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm';
import ExpenseDetails from '../../components/ExpenseDetails/ExpenseDetails';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import CategoryDetails from '../../components/CategoryDetails/CategoryDetails';
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
    
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCategoryDetailsOpen, setIsCategoryDetailsOpen] = useState(false);

    // 1. SOLUÇÃO DO BUG DE ESCOPO: Retiramos a função de dentro do useEffect!
    // Agora ela é pública e está acessível para todos os modais e botões.
    async function fetchDashboardData() {
        setLoading(true);
        try {
            const [totalResponse, categoriesResponse, categoryTotalsResponse, expensesResponse] = await Promise.all([
                api.get('/dashboard/total-expenses'),
                api.get('/categories'),
                api.get('/dashboard/expenses-by-category'),
                api.get('/expenses')
            ]);

            setTotalGasto(totalResponse.data.total);
            setAllCategories(categoriesResponse.data);
            setCategoryTotals(categoryTotalsResponse.data.categorias || categoryTotalsResponse.data || []);
            setExpenses(expensesResponse.data);
        } catch (error) {
            console.error("Erro ao buscar dados do dashboard:", error);
        } finally {
            setLoading(false);
        }
    }

    // O useEffect agora apenas chama a nossa função livre ao montar a página
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // 2. CONTROLE DE DESPESAS (Comportamentos reativos sem reload)
    function handleEdit(expense) {
        setExpenseToEdit(expense); 
        setIsDetailsModalOpen(false);   
        setIsModalOpen(true);       
    }

    function handleExpenseAdded() {
        setIsModalOpen(false); 
        fetchDashboardData(); // Recarrega os dados limpamente via Axios
    }

    function handleExpenseDeleted() {
        setIsDetailsModalOpen(false);
        fetchDashboardData(); // Recarrega os dados limpamente via Axios
    }

    function handleOpenDetails(expense) {
        const category = allCategories.find(cat => cat.id === expense.categoryId);
        const expenseWithCategoryDetails = {
            ...expense,
            category: category || { name: 'Não encontrada' }
        };
        setIsDetailsModalOpen(true);
        setSelectedExpense(expenseWithCategoryDetails);
        setExpenseToEdit(null); 
    }

    function handleCloseDetails() {
        setIsDetailsModalOpen(false); 
    }

    // 3. CONTROLE DE CATEGORIAS
    function handleCategoryEdit(category) {
        setCategoryToEdit(category);
        setIsCategoryDetailsOpen(false); // Fecha detalhes
        setIsCategoryModalOpen(true); // Abre form
    }

    function handleCategorySaved() {
        setIsCategoryModalOpen(false);
        setCategoryToEdit(null);
        fetchDashboardData();
    }

    return (
        <>
            <main className={styles.dashboardContent}>
                <Header valorTotal={totalGasto} />
                <div className={styles.dashboardSections}>
                    <CategorySection
                        allCategories={allCategories}
                        // Ajustado para receber a propriedade correta conforme seu CategoriesState
                        categoryTotals={categoryTotals} 
                        loading={loading}
                        onAddClick={() => {
                            setCategoryToEdit(null);
                            setIsCategoryModalOpen(true);
                        }}
                        onCategoryClick={(category) => {
                            setSelectedCategory(category);
                            setIsCategoryDetailsOpen(true);
                        }}
                    />
                    <ExpenseSection 
                        onExpenseClick={handleOpenDetails} 
                        categories={allCategories} 
                        expenses={expenses} 
                        loading={loading} 
                    />
                </div>
                
                {/* Garante que ao abrir um formulário novo, limpa estados de edição anteriores */}
                <WideButton text='Criar Despesa +' onClick={() => { setExpenseToEdit(null); setIsModalOpen(true); }} />
                
                {/* MODAL: Criar/Editar Despesa */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ExpenseForm
                        onClose={() => setIsModalOpen(false)}
                        onExpenseAdded={handleExpenseAdded}
                        expenseToEdit={expenseToEdit}
                    />
                </Modal>

                {/* MODAL: Detalhes da Despesa */}
                <Modal isOpen={isDetailsModalOpen} onClose={handleCloseDetails}>
                    <ExpenseDetails
                        expense={selectedExpense}
                        onClose={handleCloseDetails}
                        onExpenseDeleted={handleExpenseDeleted}
                        onEdit={handleEdit}
                    />
                </Modal>

                {/* MODAL: Criar Categoria */}
                <Modal isOpen={isCategoryModalOpen} onClose={() => {
                    setIsCategoryModalOpen(false);
                    setCategoryToEdit(null);
                }}>
                    <CategoryForm
                        onClose={() => { setIsCategoryModalOpen(false); setCategoryToEdit(null); }}
                        onCategoryAdded={handleCategorySaved} 
                        categoryToEdit={categoryToEdit}
                    />
                </Modal>

                {/* MODAL: Detalhes/Exclusão de Categoria */}
                {isCategoryDetailsOpen && (
                    <Modal isOpen={isCategoryDetailsOpen} onClose={() => setIsCategoryDetailsOpen(false)}>
                        <CategoryDetails
                            category={selectedCategory}
                            onEdit={handleCategoryEdit}
                            onClose={() => setIsCategoryDetailsOpen(false)}
                            onDeleteSuccess={fetchDashboardData} 
                        />
                    </Modal>
                )}
            </main>
        </>
    )
}

export default Dashboard;