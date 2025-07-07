import React, { useEffect, useState } from 'react';
import InputForm from '../components/Form';

function IncomeList({ formTitle, buttonText }) {
  const [incomeList, setIncomeList] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const fetchIncomeData = async () => {
   const response= await fetch("https://expenses-aea2b-default-rtdb.firebaseio.com/incomes.json/")
   const data = await response.json();  
   
     const loadedData = [];
        for (const key in data) {
          loadedData.push({
            id: key,
            ...data[key],
          });
        }
  
        setIncomeList(loadedData);
         const total = loadedData.reduce((sum, income) => sum + parseFloat(income.amount), 0);
        setTotalIncome(total);
      }

  useEffect(() => {
    fetchIncomeData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <InputForm
        endPoint={"incomes"}
        formTitle={"Income List"}
        buttonText={"Submit"}
        onDataSubmit={fetchIncomeData}
        category="Income"
      />

      {incomeList.length > 0 && (
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
              {incomeList.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

           <div className="mt-6 text-lg font-semibold">
        Total Income: ₹{totalIncome.toFixed(2)}
      </div>

        </div>
      )}
    </div>
  );
}

export default IncomeList;
