import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext({ role: 'admin', setRole: () => {} });

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    const stored = localStorage.getItem('blanq_crm_role');
    return stored || 'admin';
  });

  const value = useMemo(() => ({
    role,
    setRole: (next) => {
      localStorage.setItem('blanq_crm_role', next);
      setRole(next);
    }
  }), [role]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



