'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, userType, setUserType } = useContext(AuthContext);

  useEffect(() => {
    const savedUserType = localStorage.getItem('userType') || 'user';
    setFormData(prev => ({ ...prev, userType: savedUserType }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Barcha maydonlarni to\'ldiring');
      }

      const user = {
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        token: 'exampleToken' // Replace with actual token from API
      };

      await login(user);
      
      // Update global userType
      setUserType(formData.userType);
      
      // Redirect based on user type
      if (formData.userType === 'taxi') {
        router.push('/taxi-dashboard');
      } else {
        router.push('/');
      }
    } catch (error) {
      setError(error.message || 'Tizimga kirishda xatolik yuz berdi');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToForgotPassword = () => {
    router.push('/forgot-password');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Kirish</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Type Selection */}
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">Foydalanuvchi turi</label>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: 'user' })}
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
                onClick={() => setFormData({ ...formData, userType: 'taxi' })}
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

          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              {formData.userType === 'taxi' ? 'Haydovchi ID / Email' : 'Pochta manzili / Ism'}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={formData.userType === 'taxi' ? 
                "Haydovchi ID yoki emailni kiriting" : 
                "Pochta manzili yoki ismingizni kiriting"
              }
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium">Parol</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Parolingizni kiriting"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-lg font-semibold bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {formData.userType === 'taxi' ? 'Haydovchi sifatida kirish' : 'Kirish'}
          </button>

          <button
            type="button"
            onClick={navigateToForgotPassword}
            className="w-full py-2 px-4 mt-2 text-lg font-semibold bg-red-500 text-white rounded-md transition-all hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
          >
            Parolni unutdim
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {formData.userType === 'taxi' ? "Haydovchi sifatida ro'yxatdan o'tmaganmisiz?" : "Hali akkauntingiz yo'qmi?"}{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={navigateToRegister}
            >
              {formData.userType === 'taxi' ? 
                "Haydovchi sifatida ro'yxatdan o'ting" : 
                "Bu yerda ro'yxatdan o'ting"
              }
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;