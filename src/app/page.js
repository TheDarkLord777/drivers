"use client"
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

const HomePage = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    // Simulate fetching authentication status
    setAuthStatus(isAuthenticated);
  }, [isAuthenticated]);

  const navigateToRegister = () => {
    router.push('/register');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  if (authStatus === null) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white">
      {!authStatus ? (
        <>
          <h1 className="text-4xl font-bold mb-4">Welcome to My Next.js App</h1>
          <p className="text-lg mb-8">This is a sample application built with Next.js.</p>
          <div className="flex space-x-4">
            <button
              onClick={navigateToRegister}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Register
            </button>
            <button
              onClick={navigateToLogin}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Login
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
          <p className="text-lg mb-8">You are logged in. Enjoy using the application.</p>
        </div>
      )}
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-4">About This Project</h2>
        <p>This project uses Next.js to create a modern web application.</p>
        <p>Check out the documentation for more information:</p>
        <ul className="list-disc list-inside mt-2">
          <li>
            <a href="https://nextjs.org/docs" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Next.js Documentation</a>
          </li>
          <li>
            <a href="https://nextjs.org/learn" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Learn Next.js</a>
          </li>
        </ul>
      </div>
      <footer className="mt-8">
        <p>Deploy your Next.js app on <a href="https://vercel.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Vercel</a>.</p>
        <p>Visit the <a href="https://github.com/vercel/next.js" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Next.js GitHub repository</a> for more details.</p>
      </footer>
    </div>
  );
};

export default HomePage;