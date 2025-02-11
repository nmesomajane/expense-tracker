import { useEffect, useState } from "react";
import { FaHome, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";


const Welcome = () => {
  const name = (localStorage.getItem("username") || "Guest")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

  const [transactions, setTransactions] = useState<
    { id: number; amount: number; category: string; description: string; date: string }[]
  >([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Income");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [editId, setEditId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // Calculate total income & expense dynamically
  const income = transactions
    .filter((t) => t.category === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.category === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  
  const handleAddTransaction = () => {
    if (!amount || !description || !category || !date) return;

    const transaction = {
      id: editId ?? Date.now(),
      amount: Number(amount),
      category,
      description,
      date,
    };

    if (editId !== null) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editId ? transaction : t))
      );
      setEditId(null);
    } else {
      setTransactions((prev) => [...prev, transaction]);
    }

    setAmount("");
    setDescription("");
    setCategory("Income");
    setOpenModal(false);
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleEditTransaction = (id: number) => {
    const transaction = transactions.find((t) => t.id === id);
    if (!transaction) return;

    setAmount(transaction.amount.toString());
    setDescription(transaction.description);
    setCategory(transaction.category);
    setDate(transaction.date);
    setEditId(id);
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <header className="fixed top-0 w-full h-16 bg-opacity-75 z-50 pl-4 flex items-center bg-white shadow-md">
        <h2 className="flex items-center gap-2 text-2xl">
          <FaHome className="text-2xl text-yellow ml-2 cursor-pointer"/> <Link to="/">HOME EXPENSES</Link>
        </h2>
      </header>

      <div className="h-screen m-20">
        <h1 className="pt-[40px] text-2xl">
          Hello, <span className="text-blue-500 text-3xl">{name}</span>
        </h1>
       <div className="flex justify-center w-full">
         <p className="text-center text-lg mt-5 mb-8 max-w-[500px] text-2xl">
          Welcome to <span className="font-bold">Expense Tracker</span>, the smart way to manage your finances! Whether you're tracking daily expenses, planning a budget, or analyzing spending habits, 
          our app helps you stay on top of your money with ease.
        </p>
       </div>

        {/* Summary Section */}
        <div className="grid grid-cols-3 gap-8 text-center mt-10">
          <div className=" px-10  py-6 rounded-2xl text-2xl text-green-600 bg-white shadow-lg">
            <h2>Income</h2>
            <p>${income.toFixed(2)}</p>
          </div>
          <div className=" px-10 rounded-2xl py-6 text-2xl text-red-600 bg-white shadow-lg">
            <h2>Expense</h2>
            <p>${expense.toFixed(2)}</p>
          </div>
          <div className=" px-10 rounded-2xl py-6 text-2xl text-blue-700 bg-white shadow-lg">
            <h2>Balance</h2>
            <p>${balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Input Section */}
      {openModal && (
         <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900/50 z-50">
         <div className="pb-8 pt-2 px-6 rounded-xl  bg-white shadow-md">
          <div className="flex justify-end mb-4">
            <button onClick={() => setOpenModal(false)} className="text-red-500 uppercase text-xl font-medium underline underline-offset-4">Close</button>
          </div>
          <h2 className="text-3xl ">Add Transaction</h2>
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 m-2 w-[500px]"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded p-2 m-2 w-[150px]"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded p-2 m-2 w-[130px]"
          />
          
       
          <div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2 m-2">
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <button
              onClick={handleAddTransaction}
              className="bg-blue-500 text-white px-4 py-2 m-2 rounded cursor-pointer"
            >
              {editId ? "Update Transaction" : "Add Transaction"}
            </button>
          </div>
        </div>
       </div>
      )}

        {/* Transaction History */}
        <div className="gap-8 mt-16">
          
           <button
              onClick={()=>setOpenModal(true)}
              className="bg-blue-500 text-white px-4 py-2 mb-6 m-2 rounded cursor-pointer"
            >
              Record Transactions
            </button>
        <div className="flex justify-between">
            {/* Transaction History */}
          <div className="w-3/3">
            <h2 className="text-3xl">Transaction History</h2>
            <div className="mt-4 border border-gray-400 rounded-lg overflow-x-auto">
              {transactions.length === 0 ? (
                <p className="text-center text-gray-500 p-4">No transactions yet.</p>
              ) : (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2">Description</th>
                      <th className="border px-4 py-2">Category</th>
                      <th className="border px-4 py-2">Amount</th>
                      <th className="border px-4 py-2">Date</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(({ id, amount, category, description, date }) => (
                      <tr key={id} className="text-center">
                        <td className="border px-4 py-2">{description}</td>
                        <td className={`border px-4 py-2 ${category === "Income" ? "text-green-600" : "text-red-600"}`}>
                          {category}
                        </td>
                        <td className="border px-4 py-2">${amount.toFixed(2)}</td>
                        <td className="border px-4 py-2">{date}</td>
                        <td className="border px-4 py-2">
                          <button onClick={() => handleEditTransaction(id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 cursor-pointer"><FaEdit /></button>
                          <button onClick={() => handleDeleteTransaction(id)} className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
