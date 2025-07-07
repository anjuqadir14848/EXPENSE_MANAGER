import React, { useEffect, useState } from 'react';
import InputForm from '../components/Form';

function ExpenseList({ formTitle, buttonText }) {
  const [expenseList, setExpenseList] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const fetchexpenseData = async () => {
    const response = await fetch("https://expenses-aea2b-default-rtdb.firebaseio.com/expenses.json/");
    const data = await response.json();

    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        ...data[key],
      });
      console.log(data);
      
    }

    setExpenseList(loadedData);

       const total = loadedData.reduce((sum,expenses) => sum + parseFloat(expenses.amount), 0);
        setTotalExpense(total);
      }

  useEffect(() => {
    fetchexpenseData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <InputForm
        endPoint={"expenses"}
        formTitle={"Expense List"}
        buttonText={"Submit"}
        onDataSubmit={fetchexpenseData}
        category="Expense"
      />

      {expenseList.length > 0 && (
        <div className="w-full max-w-3xl bg-white p-4 rounded-xl shadow-md">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {expenseList.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 text-lg font-semibold">
            Total Expense: ₹{totalExpense.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
