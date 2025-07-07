import React, { useEffect, useState } from 'react';
import EditModal from '../components/EditModal';

type TransactionItem = {
  id: string;
  date: string;
  category: string;
  amount: number;
};

function TransactionList() {
  const [ExpenseList, setExpenseList] = useState<TransactionItem[]>([]);
  const [incomeList, setIncomeList] = useState<TransactionItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editType, setEditType] = useState<'income' | 'expense' | null>(null);
  const [currentItem, setCurrentItem] = useState<TransactionItem>({
    id: '', date: '', category: '', amount: 0,
  });

  const openEditModal = (item: TransactionItem, type: 'income' | 'expense') => {
    setCurrentItem(item);
    setEditType(type);
    setIsModalOpen(true);
  };

  const handleEditSave = async (updated: TransactionItem) => {
    const url = `https://expenses-aea2b-default-rtdb.firebaseio.com/${editType === 'income' ? 'incomes' : 'expenses'}/${updated.id}.json`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (response.ok) {
      if (editType === 'income') {
        setIncomeList((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
      } else {
        setExpenseList((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
      }
    } else {
      console.error("Failed to update item");
    }
  };

  const fetchexpenseData = async () => {
    const response = await fetch("https://expenses-aea2b-default-rtdb.firebaseio.com/expenses.json");
    const data = await response.json();
    const loadedData = Object.entries(data || {}).map(([key, value]: any) => ({ id: key, ...value }));
    setExpenseList(loadedData);
  };

  const fetchIncomeData = async () => {
    const response = await fetch("https://expenses-aea2b-default-rtdb.firebaseio.com/incomes.json");
    const data = await response.json();
    const loadedData = Object.entries(data || {}).map(([key, value]: any) => ({ id: key, ...value }));
    setIncomeList(loadedData);
  };

  useEffect(() => {
    fetchexpenseData();
    fetchIncomeData();
  }, []);

  const handleDelete = async (id: string) => {
    const url = `https://expenses-aea2b-default-rtdb.firebaseio.com/incomes/${id}.json`;
    const response = await fetch(url, { method: 'DELETE' });
    if (response.ok) {
      setIncomeList(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <>
      {/* Income Table */}
      {incomeList.length > 0 && (
        <div className="w-full max-w-3xl bg-white p-4 rounded-2xl shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Income List</h3>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Amount (₹)</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomeList.map((item) => (
                <tr className="text-center" key={item.id}>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">₹{item.amount}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-300 p-2 rounded-full ms-2" onClick={() => openEditModal(item, 'income')}>Edit</button>
                    <button className="bg-red-300 p-2 rounded-full ms-2" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Expense Table */}
      {ExpenseList.length > 0 && (
        <div className="w-full max-w-3xl bg-white p-4 rounded-2xl shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Expense List</h3>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Amount (₹)</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ExpenseList.map((item) => (
                <tr className="text-center" key={item.id}>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">₹{item.amount}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-300 p-2 rounded-full ms-2" onClick={() => openEditModal(item, 'expense')}>Edit</button>
                    <button className="bg-red-300 p-2 rounded-full ms-2" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleEditSave}
        initialData={currentItem}
      />
    </>
  );
}

export default TransactionList;
