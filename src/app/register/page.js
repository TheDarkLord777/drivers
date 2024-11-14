"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example logic to handle registration
    const user = { email: formData.email, name: formData.name, token: 'exampleToken' }; // Replace with real registration logic
    localStorage.setItem('user', JSON.stringify(user)); // Save user info to local storage
    console.log(formData);
    router.push('/login'); // Navigate to login page after registration
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ro`yhatdan o`tish</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700">Ism</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Pochta manzili</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Pochta manzilingizni kiriting"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Parol</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Parolingizni kiriting"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p>Akkautingiz allaqachon bormi? <span className="text-blue-400 cursor-pointer hover:underline" onClick={navigateToLogin}>Bu yerdan kirish</span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;