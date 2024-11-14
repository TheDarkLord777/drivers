"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle forgot password (e.g., send reset link to email)
    console.log(`Password reset link sent to ${email}`);
    router.push('/login'); // Navigate to login page after submitting
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Parolni unutdim</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700">Pochta / Tel </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Pochta manzili yoki tel raqami"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
            Parolni tiklash
          </button>
        </form>
        <div className="text-center mt-4">
          <p>Parolni eslaysizmi? <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => router.push('/login')}>Bu yerga kiring</span></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;