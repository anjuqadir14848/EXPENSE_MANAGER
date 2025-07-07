import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import IncomeList from "./pages/IncomeList"
import ExpenseList from "./pages/ExpenseList"
import Sidebar from "./components/Sidebar"
import TransactionList from "./pages/TransactionList"


function App() {
  

  return (
  
    <>
    <BrowserRouter>
    <div className="flex min-h-screen">
      <div className="w-64"> 
        {<Sidebar/>}
      </div>
    
     <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/income" element={<IncomeList/>} />
        <Route path="/expense" element={<ExpenseList/>} />
        <Route path="/transaction" element={<TransactionList/>} />
      </Routes>
     </div>
</div>
     </BrowserRouter>
    </>
  )
}

export default App
