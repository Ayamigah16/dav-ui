"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DepositMoney() {
  const router = useRouter();
  const [formData, setFormData] = useState({ account_id: '', amount: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post('http://localhost:8000/transactions/deposit/', formData);
      alert('Deposit Successful');
      router.push('/transactions');
    } catch (err) {
      setError(err.response?.data?.message || 'Deposit failed');
    }
    setLoading(false);
  };

  return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Deposit Money</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="text" name="account_id" placeholder="Account ID" onChange={handleChange} className="p-2 mb-3 border rounded" required />
          <input type="number" name="amount" placeholder="Amount" onChange={handleChange} className="p-2 mb-3 border rounded" required />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
            {loading ? 'Processing...' : 'Deposit Money'}
          </button>
        </form>
      </div>
  );
}