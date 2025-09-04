import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DemoCredentials = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: 'Administrator',
      email: 'admin@blanqcrm.com',
      password: 'admin123',
      description: 'Full system access',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      role: 'Project Manager',
      email: 'manager@blanqcrm.com',
      password: 'manager123',
      description: 'Project management access',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      role: 'Team Member',
      email: 'user@blanqcrm.com',
      password: 'user123',
      description: 'Limited project access',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-50/80 backdrop-blur-sm hover:bg-slate-100/80 rounded-2xl transition-all duration-300 group"
      >
        <Icon 
          name="TestTube" 
          size={16} 
          className="text-slate-600 group-hover:text-slate-700" 
        />
        <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-700">
          Demo Credentials
        </span>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-slate-400 group-hover:text-slate-500 transition-transform duration-200" 
        />
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
          <p className="text-xs text-slate-600 text-center font-medium mb-4">
            Click any credential to copy
          </p>
          
          {credentials?.map((cred, index) => (
            <div key={index} className="relative group">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${cred?.color} opacity-10 rounded-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative p-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl hover:bg-white/80 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-800">{cred?.role}</h4>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cred?.color}`}></div>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={() => copyToClipboard(cred?.email)}
                    className="w-full flex items-center justify-between p-2 bg-slate-50/50 hover:bg-slate-100/50 rounded-xl transition-colors duration-200"
                    title="Click to copy email"
                  >
                    <span className="text-xs text-slate-500 font-medium">Email</span>
                    <span className="text-xs text-slate-700 font-mono font-semibold">
                      {cred?.email}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(cred?.password)}
                    className="w-full flex items-center justify-between p-2 bg-slate-50/50 hover:bg-slate-100/50 rounded-xl transition-colors duration-200"
                    title="Click to copy password"
                  >
                    <span className="text-xs text-slate-500 font-medium">Password</span>
                    <span className="text-xs text-slate-700 font-mono font-semibold">
                      {cred?.password}
                    </span>
                  </button>
                </div>
                
                <p className="text-xs text-slate-500 mt-3 italic">
                  {cred?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;