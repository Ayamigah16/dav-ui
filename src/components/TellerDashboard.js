"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionList from './TransactionList';
import { useRouter } from 'next/navigation';

export default function TellerDashboard() {
    const router = useRouter();
  
      useEffect(() => {
          const token = localStorage.getItem('access_token');
          if (!token) {
              router.push('/auth/login');
          }
      }, [router]);

  const [formData, setFormData] = useState({
    account_id: '',
    amount: '',
    from_account_id: '',
    to_account_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8000/transactions/deposit/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Deposit successful');
    } catch (err) {
      console.error("Error depositing money:", err);
      setError("Failed to deposit money.");
    }
    setLoading(false);
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8000/transactions/withdraw/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Withdrawal successful');
    } catch (err) {
      console.error("Error withdrawing money:", err);
      setError("Failed to withdraw money.");
    }
    setLoading(false);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8000/transactions/transfer/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Transfer successful');
    } catch (err) {
      console.error("Error transferring funds:", err);
      setError("Failed to transfer funds.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Teller Dashboard</h2>
      <hr className="mb-8"/>

      <section className="mb-10 mt-4">
        <h3 className="text-3xl font-semibold mb-6 text-center text-gray-700">Recent Transactions</h3>
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <TransactionList />
        </div>
      </section>

      <section className="mb-10 mt-4">
        <h3 className="text-3xl font-semibold mb-6 text-center text-gray-700">Deposit Money</h3>
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <form onSubmit={handleDeposit} className="flex flex-col">
            <input type="text" name="account_id" placeholder="Account ID" onChange={handleChange} className="p-2 mb-3 border rounded" required />
            <input type="number" name="amount" placeholder="Amount" onChange={handleChange} className="p-2 mb-3 border rounded" required />
            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
              {loading ? 'Processing...' : 'Deposit'}
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">{success}</p>}
        </div>
      </section>

      <section className="mb-10 mt-4">
        <h3 className="text-3xl font-semibold mb-6 text-center text-gray-700">Withdraw Money</h3>
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <form onSubmit={handleWithdraw} className="flex flex-col">
            <input type="text" name="account_id" placeholder="Account ID" onChange={handleChange} className="p-2 mb-3 border rounded" required />
            <input type="number" name="amount" placeholder="Amount" onChange={handleChange} className="p-2 mb-3 border rounded" required />
            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
              {loading ? 'Processing...' : 'Withdraw'}
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">{success}</p>}
        </div>
      </section>

      <section className="mb-10 mt-4">
        <h3 className="text-3xl font-semibold mb-6 text-center text-gray-700">Transfer Funds</h3>
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <form onSubmit={handleTransfer} className="flex flex-col">
            <input type="text" name="from_account_id" placeholder="From Account ID" onChange={handleChange} className="p-2 mb-3 border rounded" required />
            <input type="text" name="to_account_id" placeholder="To Account ID" onChange={handleChange} className="p-2 mb-3 border rounded" required />
            <input type="number" name="amount" placeholder="Amount" onChange={handleChange} className="p-2 mb-3 border rounded" required />
            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
              {loading ? 'Processing...' : 'Transfer'}
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">{success}</p>}
        </div>
      </section>
    </div>
  );
}