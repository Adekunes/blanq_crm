import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoCredentials = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: 'Administrator',
      email: 'admin@blanqcrm.com',
      password: 'admin123',
      description: 'Full system access with all permissions'
    },
    {
      role: 'Project Manager',
      email: 'manager@blanqcrm.com',
      password: 'manager123',
      description: 'Project and client management access'
    },
    {
      role: 'Team Member',
      email: 'user@blanqcrm.com',
      password: 'user123',
      description: 'Limited access to assigned projects'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="mt-6">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
        iconPosition="right"
        className="w-full justify-center text-sm text-muted-foreground hover:text-foreground"
      >
        Demo Credentials
      </Button>
      {isExpanded && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-3 text-center">
            Use these credentials to explore different user roles
          </p>
          
          <div className="space-y-3">
            {credentials?.map((cred, index) => (
              <div key={index} className="p-3 bg-card rounded-md border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">{cred?.role}</h4>
                  <Icon name="User" size={14} className="text-muted-foreground" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Email:</span>
                    <button
                      onClick={() => copyToClipboard(cred?.email)}
                      className="text-xs text-primary hover:text-primary/80 font-mono"
                      title="Click to copy"
                    >
                      {cred?.email}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Password:</span>
                    <button
                      onClick={() => copyToClipboard(cred?.password)}
                      className="text-xs text-primary hover:text-primary/80 font-mono"
                      title="Click to copy"
                    >
                      {cred?.password}
                    </button>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2 italic">
                  {cred?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;