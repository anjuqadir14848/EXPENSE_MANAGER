import React, { useEffect, useState } from 'react'

type TransactionItem = {
  date: string;
  category: string;
  amount: number;
};

function TransactionList() {
  const [ExpenseList, setExpenseList] = useState<TransactionItem[]>([]);
  const [incomeList, setIncomeList] = useState<TransactionItem[]>([]);

  console.log("ExpenseList", ExpenseList);
  console.log("incomeList", incomeList);
  


  const fetchexpenseData = async () => {
     const response= await fetch("https://expenses-aea2b-default-rtdb.firebaseio.com/expenses.json/")
     const data = await response.json();  
     
       const loadedData = [];
          for (const key in data) {
            loadedData.push({
              id: key,
              ...data[key],
            });
          }
    
       
          setExpenseList(loadedData);
        }
  
  
    useEffect(() => {
        fetchexpenseData();
      }, []);


 const fetchIncomeData = async () => {
   const response= await fetch("https://expenses-aea2b-default-rtdb.firebaseio.com/incomes.json/")
   const data = await response.json();  
   
     const loadedData = [];
        for (const key in data) { console.log(key,"data[key]");
        
          loadedData.push({
            id: key,
            ...data[key],
          });
        }
  
        setIncomeList(loadedData);
      }

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const handleDelete = async (id: string) => {
    try { 
      const response = await fetch(`https://expenses-aea2b-default-rtdb.firebaseio.com/incomes/${id}.json`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setIncomeList((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error('Failed to delete income item');
      }
    }
    catch (error) {
      console.error('Error deleting income item:', error);
    }
  }
  return (
    <>
<div>
        {incomeList.length > 0 && (
          <div className="w-full max-w-3xl bg-white p-4 rounded-2xl shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Income List</h3>
            <table className="w-full table-auto border-collapse text-left">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Amount (₹)</th>
                  <th className='p-2 border'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomeList.map((item) => (
                  <tr className='text-center' key={item.id}>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.category}</td>
                    <td className="border px-4 py-2">₹{item.amount}</td>
              <td className='border px-4 py-2'> 
                <button className=' rounded-full bg-blue-300 ms-4 p-2' >Edit</button>
            <button className=' rounded-full bg-red-300 ms-4 p-2' onClick={()=>handleDelete(item.id)} >Delete</button>
              </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        {ExpenseList.length > 0 && (
          <div className="w-full max-w-3xl bg-white p-4 rounded-2xl shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Expense List</h3>
            <table className="w-full table-auto border-collapse text-left">
              <thead>
                <tr className="bg-gray-200 text-center ">
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Amount (₹)</th>
                  <th className='p-2 border'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ExpenseList.map((item) => (
                  <tr className='text-center' key={item.id}>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.category}</td>
                    <td className="border px-4 py-2">₹{item.amount}</td>
                    <td className='border px-4 py-2'>
                      <button className=' rounded-full bg-blue-300 ms-4 p-2' >Edit</button>
                  <button className=' rounded-full bg-red-300 ms-4 p-2'  onClick={()=>handleDelete(item.id)} >Delete</button>
              </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      
      
    </>
  )
}
    
export default TransactionList;
