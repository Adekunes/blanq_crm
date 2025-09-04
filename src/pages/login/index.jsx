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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elevated border border-border p-8">
          {/* Header Section */}
          <LoginHeader />

          {/* Login Form */}
          <LoginForm />

          {/* Demo Credentials */}
          <DemoCredentials />

          {/* Quebec Compliance Footer */}
          <QuebecCompliance />
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Secure access to your digital agency management system
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;