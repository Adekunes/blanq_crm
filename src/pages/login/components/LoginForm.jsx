import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    admin: { email: 'admin@blanqcrm.com', password: 'admin123' },
    manager: { email: 'manager@blanqcrm.com', password: 'manager123' },
    user: { email: 'user@blanqcrm.com', password: 'user123' }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredentials) {
        // Store authentication token
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userEmail', formData?.email);
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to password reset
    alert('Password reset functionality would be implemented here. For demo purposes, use the provided mock credentials.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Icon name="AlertCircle" size={16} className="text-red-500" />
                </div>
              </div>
              <p className="text-sm text-red-700 font-medium">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData?.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-slate-800 placeholder-slate-400"
              required
            />
            {errors?.email && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors?.email}</p>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-slate-800 placeholder-slate-400"
              required
            />
            {errors?.password && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors?.password}</p>
            )}
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full relative group overflow-hidden"
        >
          {/* Button background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-700"></div>
          
          {/* Button content */}
          <div className="relative flex items-center justify-center px-6 py-4 text-white font-semibold">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Icon name="LogIn" size={18} />
                <span>Sign In</span>
              </div>
            )}
          </div>
        </button>

        {/* Forgot Password Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            disabled={isLoading}
          >
            Forgot your password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;