
import React from 'react';
import { Home, Info, Settings } from 'lucide-react';
import IncomeList from '../pages/IncomeList';
import ExpenseList from '../pages/ExpenseList';
import TransationList from '../pages/TransactionList';
import {  useNavigate} from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6 pt-3">Expense Manager</h2>
      <hr></hr>


      <nav className="flex flex-col gap-4 pt-4">
        <div onClick={() => navigate("/")} className="flex text-xl font-bold items-center gap-2 hover:bg-gray-700 p-2 rounded">
          Home
        </div>
        <div onClick={() => navigate("/income")}className="flex text-xl font-bold  items-center gap-2 hover:bg-gray-700 p-2 rounded">
          Income List
        </div>
        <div onClick={() => navigate("/expense")} className="flex text-xl font-bold  items-center gap-2 hover:bg-gray-700 p-2 rounded">
          Expense List
        </div> 
        <div onClick={() => navigate("/transaction")} className="flex text-xl font-bold  items-center gap-2 hover:bg-gray-700 p-2 rounded">
          Transaction List
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
