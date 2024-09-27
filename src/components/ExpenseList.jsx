import React from 'react';

const ExpenseList = ({ expenses, deleteExpense, totalIncome, totalExpense, netBalance }) => {
  return (
    <div>
      <h2>Transaction History</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.description}</td>
              <td>₹{expense.amount}</td>
              <td>{expense.type}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteExpense(expense._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totals">
        <h3>Total Income:  ₹{totalIncome}</h3>
        <h3>Total Expense:  ₹{totalExpense}</h3>
        <h3>Net Balance:  ₹{netBalance}</h3>
      </div>
    </div>
  );
};

export default ExpenseList;



