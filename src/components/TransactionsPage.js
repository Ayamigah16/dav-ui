"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from './Button';

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/transactions/');
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to load transactions');
      }
    };
    fetchTransactions();
  }, []);

  return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>
        <div className="flex space-x-4 mb-4">
          <Button onClick={() => router.push('/transactions/deposit')} text="Deposit Money" color="blue" />
          <Button onClick={() => router.push('/transactions/withdraw')} text="Withdraw Money" color="blue" />
          <Button onClick={() => router.push('/transactions/transfer')} text="Transfer Money" color="blue" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="mt-4">
          {transactions.length > 0 ? (
            transactions.map((txn) => (
              <li key={txn.id} className="border-b py-2">
                <span className="font-bold">{txn.transaction_type}</span>: ${txn.amount}
              </li>
            ))
          ) : (
            <p>No transactions available</p>
          )}
        </ul>
      </div>
  );
}