import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [netBalance, setNetBalance] = useState(0);

 
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await axios.get('http://localhost:8082/api/expenses');
      setExpenses(response.data);
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const income = expenses
      .filter(expense => expense.type === 'Income')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = expenses
      .filter(expense => expense.type === 'Expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    setTotalIncome(income);
    setTotalExpense(expense);
    setNetBalance(income - expense);
  }, [expenses]);

 
  const addExpense = async (expense) => {
    const response = await axios.post('http://localhost:8082/api/expenses', expense);
    setExpenses([response.data, ...expenses]);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:8082/api/expenses/${id}`);
    setExpenses(expenses.filter((expense) => expense._id !== id));
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList 
        expenses={expenses} 
        deleteExpense={deleteExpense} 
        totalIncome={totalIncome} 
        totalExpense={totalExpense} 
        netBalance={netBalance} 
      />
    </div>
  );
};

export default App;
