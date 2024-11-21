import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [netBalance, setNetBalance] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          "https://expense-backend-5nql.onrender.com/api/expenses"
        );
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error.message);
        alert("Failed to fetch expenses. Please try again later.");
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const income = expenses
      .filter((expense) => expense.type === "Income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = expenses
      .filter((expense) => expense.type === "Expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    setTotalIncome(income);
    setTotalExpense(expense);
    setNetBalance(income - expense);
  }, [expenses]);

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(
        "https://expense-backend-5nql.onrender.com/api/expenses",
        expense
      );
      setExpenses([response.data, ...expenses]);
    } catch (error) {
      console.error("Error adding expense:", error.message);
      alert("Failed to add expense. Please try again.");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(
        `https://expense-backend-5nql.onrender.com/api/expenses/${id}`
      );
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error.message);
      alert("Failed to delete expense. Please try again.");
    }
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
