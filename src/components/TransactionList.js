"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/transactions/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions.");
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  if (loading) return <p className="text-gray-600">Loading transactions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="border-b last:border-0 py-2">
              <div>
                <strong>{transaction.transaction_type}</strong> - ${transaction.amount}
                <br />
                <small>Transaction ID: {transaction.id}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}