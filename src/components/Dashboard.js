"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const userResponse = await axios.get('http://localhost:8000/auth/user/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRole(userResponse.data.role);

        const accountResponse = await axios.get('http://localhost:8000/accounts/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(accountResponse.data);

        const transactionResponse = await axios.get('http://localhost:8000/transactions/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(transactionResponse.data);

        if (userResponse.data.role === 'Admin') {
          const usersResponse = await axios.get('http://localhost:8000/users/', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(usersResponse.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      }
      setLoading(false);
    };

    fetchData();
  }, [router]);

  const filteredTransactions = selectedCategory === "All"
    ? transactions
    : transactions.filter(transaction => transaction.transaction_type === selectedCategory);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{userRole} Dashboard</h2>
      
      {userRole === 'Admin' && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Users</h3>
          {users.length === 0 ? (
            <p className="text-gray-600">No users found.</p>
          ) : (
            <ul className="border rounded-lg p-4">
              {users.map((user) => (
                <li key={user.id} className="border-b last:border-0 py-2">
                  <strong>{user.email}</strong> - {user.role}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Accounts</h3>
        {accounts.length === 0 ? (
          <p className="text-gray-600">No accounts found.</p>
        ) : (
          <ul className="border rounded-lg p-4">
            {accounts.map((account) => (
              <li key={account.id} className="border-b last:border-0 py-2">
                <strong>{account.account_type}</strong> - ${account.balance.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        <div className="mb-4">
          <label className="font-semibold">Filter by Category: </label>
          <select className="p-2 border rounded" onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Deposit">Deposit</option>
            <option value="Withdrawal">Withdrawal</option>
            <option value="Transfer">Transfer</option>
            <option value="Bill Payment">Bill Payment</option>
          </select>
        </div>
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-600">No transactions found.</p>
        ) : (
          <ul className="border rounded-lg p-4">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id} className="border-b last:border-0 py-2">
                <span className="font-semibold">{transaction.transaction_type}</span>: ${transaction.amount.toFixed(2)}
                <br />
                <small>{new Date(transaction.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
