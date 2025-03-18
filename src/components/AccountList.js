"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/accounts/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(response.data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
        setError("Failed to load accounts.");
      }
      setLoading(false);
    };

    fetchAccounts();
  }, []);

  if (loading) return <p className="text-gray-600">Loading accounts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {accounts.length === 0 ? (
        <p className="text-gray-600">No accounts found.</p>
      ) : (
        <ul>
          {accounts.map((account) => (
            <li key={account.id} className="border-b last:border-0 py-2">
              <div>
              <strong>{account.customer_email}</strong> | <strong>{account.account_type}</strong> - ${account.balance ? account.balance : '0.00'}
                <br />
                <br />
                <small>Account ID: {account.id}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
