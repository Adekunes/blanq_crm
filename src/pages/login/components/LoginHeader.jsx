import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-10">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
          
          {/* Logo container */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <Icon name="Zap" size={36} color="white" />
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Welcome back
        </h1>
        <p className="text-slate-600 text-base font-medium">
          Sign in to your workspace
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;