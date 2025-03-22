"use client";

import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!token || !refreshToken) {
            // console.error("Tokens are missing");
            router.push('/auth/login');
            return;
          }
        
        await axios.post('http://localhost:8000/auth/logout/', { refresh: refreshToken },
            {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/auth/login');
      } catch (err) {
        console.error("Error logging out:", err);
      }
    };

    logout();
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Logging out...</h2>
    </div>
  );
}