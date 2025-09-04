import React from 'react';
import Icon from '../../../components/AppIcon';

const QuebecCompliance = () => {
  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        {/* Quebec Business Compliance */}
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-success" />
          <span>Quebec Business Compliant</span>
        </div>

        {/* Privacy Compliance */}
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} className="text-success" />
          <span>PIPEDA Compliant</span>
        </div>

        {/* Secure Connection */}
        <div className="flex items-center space-x-1">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>Secure Connection</span>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} BLANQ Digital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default QuebecCompliance;