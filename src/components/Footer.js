"use client";

import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Your Bank. All rights reserved.</p>
                <ul className="flex justify-center space-x-4 mt-2">
                    <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                    <li><Link href="/terms-of-service" className="hover:underline">Terms of Service</Link></li>
                    <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;