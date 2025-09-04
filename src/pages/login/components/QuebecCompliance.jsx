import React from 'react';
import Icon from '../../../components/AppIcon';

const QuebecCompliance = () => {
  const complianceItems = [
    {
      icon: 'Shield',
      text: 'Quebec Compliant',
      color: 'text-emerald-600'
    },
    {
      icon: 'Lock',
      text: 'PIPEDA Secure',
      color: 'text-blue-600'
    },
    {
      icon: 'CheckCircle',
      text: 'Encrypted',
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="mt-10 pt-6 border-t border-slate-200/50">
      <div className="flex items-center justify-center space-x-6 mb-4">
        {complianceItems?.map((item, index) => (
          <div key={index} className="flex items-center space-x-1.5 group">
            <div className="relative">
              <div className={`absolute inset-0 ${item?.color?.replace('text-', 'bg-')?.replace('600', '200')} rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              <Icon 
                name={item?.icon} 
                size={14} 
                className={`relative ${item?.color}`} 
              />
            </div>
            <span className="text-xs text-slate-600 font-medium">
              {item?.text}
            </span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-400 font-medium">
          © {new Date()?.getFullYear()} BLANQ Digital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default QuebecCompliance;