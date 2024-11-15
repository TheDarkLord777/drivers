'use client';
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

const Register = () => {
  const { userType, setUserType } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    userType: userType,
    phone: '',
    carModel: '',
    carYear: '',
    licenseNumber: '',
    carNumber: '',
  });

  const router = useRouter();

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      userType: userType
    }));
  }, [userType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData(prev => ({
      ...prev,
      userType: type
    }));
    localStorage.setItem('userType', type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: formData.email,
      name: formData.name,
      userType: formData.userType,
      ...(formData.userType === 'taxi' && {
        phone: formData.phone,
        carModel: formData.carModel,
        carYear: formData.carYear,
        licenseNumber: formData.licenseNumber,
        carNumber: formData.carNumber,
      }),
      token: 'exampleToken'
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', formData.userType);
    router.push('/login');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ro'yxatdan o'tish</h2>
        </div>

        {/* User Type Selection Buttons */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium mb-2">Foydalanuvchi turi</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleUserTypeChange('user')}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                formData.userType === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Foydalanuvchi
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeChange('taxi')}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                formData.userType === 'taxi'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Taxi Haydovchi
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700">Ism</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ismingizni kiriting"
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

          {formData.userType === 'taxi' && (
            <>
              <div className="form-group">
                <label className="block text-gray-700">Telefon raqam</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon raqamingizni kiriting"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700">Mashina modeli</label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  placeholder="Mashina modelini kiriting"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700">Mashina yili</label>
                <input
                  type="number"
                  name="carYear"
                  value={formData.carYear}
                  onChange={handleChange}
                  placeholder="Mashina yilini kiriting"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700">Haydovchilik guvohnomasi raqami</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Guvohnoma raqamini kiriting"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700">Mashina raqami</label>
                <input
                  type="text"
                  name="carNumber"
                  value={formData.carNumber}
                  onChange={handleChange}
                  placeholder="Mashina raqamini kiriting"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </>
          )}

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

          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
          >
            {formData.userType === 'taxi' ? 'Haydovchi sifatida ro`yxatdan o`tish' : 'Ro`yxatdan o`tish'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Akkautingiz allaqachon bormi?{" "}
            <span 
              className="text-blue-600 cursor-pointer hover:underline" 
              onClick={navigateToLogin}
            >
              Bu yerdan kiring
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;