import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 🔹 MODIFIED: real API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }
      

      navigate('/detect');
    } catch (error) {
      alert('Signup failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2">
          <Leaf className="h-10 w-10 text-green-600" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">RiceGuard AI</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-2"
                  placeholder="John Doe"
                  value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-2"
                  placeholder="you@example.com"
                  value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-2"
                  placeholder="••••••••"
                   value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account <ArrowRight size={16} />
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              By signing up, you agree to our{' '}
              <a href="#" className="font-medium text-green-600 hover:text-green-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-green-600 hover:text-green-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
