"use client";

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-blue-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">NextBank</div>
                <ul className="flex space-x-4 mr-10 text-xl">
                    <li><Link href="/"><p className="hover:underline">Home</p></Link></li>
                    {/* <li><Link href="/auth/register"><p className="hover:underline">Register</p></Link></li> */}
                    <li><Link href="/auth/login"><p className="hover:underline">Login</p></Link></li>
                    {/* <li><Link href="/accounts"><p className="hover:underline">Accounts</p></Link></li>
                    <li><Link href="/transactions"><p className="hover:underline">Transactions</p></Link></li>
                    <li><Link href="/logs"><p className="hover:underline">Audit Logs</p></Link></li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;