'use client'

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { CarTaxiFront } from 'lucide-react'; // Importing the taxi icon

const regions = [
  { name: "Andijan", image: "Andijan.jpg" },
  { name: "Bukhara", image: "Bukhara.jpg" },
  { name: "Fergana", image: "Fergana.jpg" },
  { name: "Jizzakh", image: "Jizzakh.jpg" },
  { name: "Kashkadarya", image: "Kashkadarya.jpg" },
  { name: "Khorezm", image: "Khorezm.jpg" },
  { name: "Namangan", image: "Namangan.jpg" },
  { name: "Navoiy", image: "Navoiy.jpg" },
  { name: "Samarkand", image: "Samarkand.jpg" },
  { name: "Sirdarya", image: "Sirdarya.jpg" },
  { name: "Surkhandarya", image: "Surkhandarya.jpg" },
  { name: "Tashkent", image: "Tashkent.jpg" },
];

const HomePage = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    if (authStatus !== isAuthenticated) {
      setAuthStatus(isAuthenticated);
    }
  }, [isAuthenticated, authStatus]);

  const navigateToRegister = () => {
    router.push('/register');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      setAuthStatus(false);
      
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (authStatus === null) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-2xl flex items-center cursor-pointer">
          <CarTaxiFront className="mr-2" /> My Drivers
        </h1>
        {authStatus && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        )}
      </header>
      <main className="flex flex-col items-center justify-center flex-1 p-4">
        {!authStatus ? (
          <>
            <h1 className="text-4xl font-bold mb-4">Welcome to My Next.js App</h1>
            <p className="text-lg mb-8">This is a sample application built with Next.js.</p>
            <div className="flex space-x-4">
              <button
                onClick={navigateToRegister}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                Register
              </button>
              <button
                onClick={navigateToLogin}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
              >
                Login
              </button>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {regions.map((region, index) => (
              <div key={index} className="text-center cursor-pointer">
                <img src={`/images/${region.image}`} alt={region.name} className="w-full h-48 object-cover rounded" />
                <p className="mt-2">{region.name}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="text-center p-4 bg-gray-800">
        <p>Visit the <a href="https://github.com/TheDarkLord777/drivers" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Next.js GitHub repository</a> for more details.</p>
      </footer>
    </div>
  );
};

export default HomePage;