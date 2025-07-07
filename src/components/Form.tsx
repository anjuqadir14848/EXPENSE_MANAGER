import React, { useState } from 'react';

function InputForm({ formTitle, buttonText="submit", endPoint, onDataSubmit, category }) {
  const [formData, setFormData] = useState({
    date: "",
    category: category,
    amount: "",

    
  });
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://expenses-aea2b-default-rtdb.firebaseio.com/${endPoint}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          setFormData({
            date: "",
            category: category,
            amount: "",
          });
          if (onDataSubmit) onDataSubmit();
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg space-y-4 mb-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {formTitle}
        </h2>

        <div>
          <label className="text-gray-600 mb-1 block" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
            placeholder="Enter category"
            required
            readOnly
            className="w-full border p-2 rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1" htmlFor="amount">
            Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Rs.00"
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default InputForm;
