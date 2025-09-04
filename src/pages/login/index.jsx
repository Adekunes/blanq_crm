import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import DemoCredentials from './components/DemoCredentials';
import QuebecCompliance from './components/QuebecCompliance';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Floating card with glass effect */}
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl"></div>
          
          {/* Main content */}
          <div className="relative bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl p-10">
            {/* Header Section */}
            <LoginHeader />

            {/* Login Form */}
            <LoginForm />

            {/* Demo Credentials */}
            <DemoCredentials />

            {/* Quebec Compliance Footer */}
            <QuebecCompliance />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600/80 font-medium">
            Secure access to your workspace
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;