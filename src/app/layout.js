// "use client";
import "./globals.css";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default function Layout({ children }) {

  return (
    <html lang="en">
          <body>
            <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-4">{children}</main>
            <Footer />
          </div>
    </body>
    </html>

  );
}