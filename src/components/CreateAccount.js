import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateAccount() {
  const router = useRouter();
  const [formData, setFormData] = useState({ customerId: '', accountType: 'Savings' });
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
      await axios.post('/accounts/', formData);
      alert('Account Created Successfully');
      router.push('/accounts');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    }
    setLoading(false);
  };

  return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="text" name="customerId" placeholder="Customer ID" onChange={handleChange} className="p-2 mb-3 border rounded" required />
          <select name="accountType" onChange={handleChange} className="p-2 mb-3 border rounded">
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>
      </div>
  );
}
