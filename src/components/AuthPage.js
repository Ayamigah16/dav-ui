"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';

export default function AuthPage({ type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    role: 'Customer',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // if (!formData.first_name.trim()) return 'First name is required';
    // if (!formData.last_name.trim()) return 'Last name is required';
    if (!formData.email.includes('@')) return 'Invalid email address';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    setLoading(true);
    try {
      const endpoint = type === 'login' ? '/auth/login/' : '/auth/register/';
          // Retrieve the stored access token
      const token = localStorage.getItem('access_token');
  
      const response = await axios.post(
        `http://localhost:8000${endpoint}`,
        formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // Attach JWT token if available
        }
      );
  
      if (type === 'login') {
        const token = response.data.access; // Extract access token

        // Store token in localStorage
        localStorage.setItem('access_token', token);

        const userResponse = await axios.get('http://localhost:8000/auth/user/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = userResponse.data;
        if (user.role === 'Admin'){
          router.push('/dashboard/admin');
        } else if (user.role === 'Teller') {
          router.push('/dashboard/teller');
        } else {
          router.push('/dashboard/customer')
        }
        // return <AdminDashboard />;
        // router.push('/dashboard');
      } else {
        alert('User registered successfully');
        setSuccess('User registered successfully');
      }
    } catch (err) {
      console.log(err)
      console.error("Full Error Object:", err);
      console.error("Error Response:", err.response?.data || "No response data");
      console.error("Error Message:", err.message);
      console.error("Registration Error:", err.response?.data || err.message); // Log exact error
      setError(err.response?.data?.message || err.message); // Display error message
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{type === 'login' ? 'Login' : 'Register'}</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col">
        {type === 'register' && (
          <>
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} className="p-2 mb-3 border rounded" required />
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} className="p-2 mb-3 border rounded" required />
            {/* <input type="text" name="username" placeholder="Username" onChange={handleChange} className="p-2 mb-3 border rounded" required /> */}
          </>
        )}
        {/* <input type="text" name="username" placeholder="Username" onChange={handleChange} className="p-2 mb-3 border rounded" required /> */}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 mb-3 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 mb-3 border rounded" required />
        {type === 'register' && (
          <select name="role" onChange={handleChange} className="p-2 mb-3 border rounded">
            <option value="Customer">Customer</option>
            <option value="Teller">Teller</option>
            {/* <option value="Admin">Admin</option> */}
          </select>
        )}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Processing...' : type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}