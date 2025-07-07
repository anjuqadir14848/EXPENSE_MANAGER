import React, { useState, useEffect } from "react";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { id: string; date: string; category: string; amount: number }) => void;
  initialData: { id: string; date: string; category: string; amount: number };
};

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Entry</h2>
        <input
          type="date"
          name="date"
          className="w-full mb-3 p-2 border rounded"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
