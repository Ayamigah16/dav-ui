"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from './Button';

export default function AccountsPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8000/auth/user/');
        setUser(userResponse.data);

        const response = await axios.get('http://localhost:8000/accounts/');
        setAccounts(response.data);
      } catch (err) {
        setError('Failed to load accounts');
      }
    };
    fetchAccounts();
  }, []);

  return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Accounts</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        {user?.role !== 'Customer' && (
        <Button onClick={() => router.push('/accounts/create')} text="Create New Account" color="blue" />
          

        )}
        
        <ul className="mt-4">
          {accounts.length > 0 ? (
            accounts
              .filter(account => user?.role !== 'Customer' || account.customer_id === user.id)
              .map((account) => (
                <li key={account.id} className="border-b py-2">
                  <span className="font-bold">{account.account_type}</span>: ${account.balance}
                </li>
              ))
          ) : (
            <p>No accounts available</p>
          )}
        </ul>
      </div>
  );
}