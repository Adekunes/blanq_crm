import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevated">
          <Icon name="Zap" size={32} color="white" />
        </div>
      </div>

      {/* Welcome Text */}
      <h1 className="text-3xl font-semibold text-foreground mb-2">
        Welcome to BLANQ CRM
      </h1>
      <p className="text-muted-foreground text-lg">
        Sign in to manage your digital agency operations
      </p>
    </div>
  );
};

export default LoginHeader;