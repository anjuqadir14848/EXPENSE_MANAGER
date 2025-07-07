import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const INCOME_URL = "https://expenses-aea2b-default-rtdb.firebaseio.com/incomes.json/";
const EXPENSE_URL = "https://expenses-aea2b-default-rtdb.firebaseio.com/expenses.json/";

 function IncomeExpenseChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([
    ['Type', 'Amount'],
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await fetch("https://expenses-aea2b-default-rtdb.firebaseio.com/incomes.json/");
        const incomeData = await incomeRes.json();

        const expenseRes = await fetch("https://expenses-aea2b-default-rtdb.firebaseio.com/expenses.json/");
        const expenseData = await expenseRes.json();

        let totalIncome = 0;
        for (const key in incomeData) {
          totalIncome += parseFloat(incomeData[key].amount || 0);
        }

        let totalExpense = 0;
        for (const key in expenseData) {
          totalExpense += parseFloat(expenseData[key].amount || 0);
        }

        setData([
          ['Type', 'Amount'],
          ['Income', totalIncome],
          ['Expenses', totalExpense],
        ]);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

 if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;}

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">EXPENSE MANAGER</h1>
      <div className="text-center mb-4">
        <p className="text-gray-600 font-bold text-xl">A visual representation of your financial data</p>
        </div>


      <Chart
        chartType="PieChart"
        width="100%"
        height="450px"
        data={data}
      />
    </div>
    
  );
}
export default IncomeExpenseChart;