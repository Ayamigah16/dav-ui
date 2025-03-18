"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserList from './UserList';
import AccountList from './AccountList';
import TransactionList from './TransactionList';
import AuthPage from './AuthPage';

export default function AdminDashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/auth/login');
        }
    }, [router]);

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Admin Dashboard</h2>
            <hr className="mb-8"/>

            <section className="mb-10 mt-4">
                <h3 className="text-3xl font-semibold mb-6 text-center text-gray-700">User Management</h3>
                <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                    <UserList />
                </div>
            </section>

            <section className="mb-10 mt-4">
                <h3 className="text-3xl font-semibold mb-6 text-center text-gray-700">Manage Accounts</h3>
                <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                    <AccountList />
                </div>
            </section>

            <section className="mb-10 mt-4">
                <h3 className="text-3xl font-semibold mb-6 text-center text-gray-700">Recent Transactions</h3>
                <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                    <TransactionList />
                </div>
            </section>

            <section className="mb-10 mt-4">
                <h3 className="text-3xl font-semibold mb-6 text-center text-gray-700">Register New User</h3>
                <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                    <AuthPage type={"register"} />
                </div>
            </section>
        </div>
    );
}