"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/auth/users/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-gray-600">Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border-b last:border-0 py-2">
              <div>
                <strong>{user.email}</strong> - {user.role}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}