import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UserProfile = ({ 
  isCollapsed = false,
  user = {
    name: 'Admin User',
    email: 'admin@blanqcrm.com',
    avatar: null,
    role: 'Administrator'
  },
  showDropdown = true
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleDropdown = () => {
    if (!isCollapsed && showDropdown) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'Settings',
      onClick: () => {
        setIsDropdownOpen(false);
        // Navigate to profile settings when implemented
      }
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      onClick: () => {
        setIsDropdownOpen(false);
        // Navigate to help when implemented
      }
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      onClick: handleSignOut,
      className: 'text-error hover:text-error hover:bg-error/10'
    }
  ];

  return (
    <div className="relative">
      <div
        className={`
          flex items-center space-x-3 p-3 rounded-lg cursor-pointer
          transition-smooth hover:bg-muted
          ${isCollapsed ? 'justify-center' : ''}
          ${showDropdown && !isCollapsed ? 'hover:bg-muted' : ''}
        `}
        onClick={toggleDropdown}
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="white" />
          )}
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        )}

        {/* Dropdown Arrow */}
        {!isCollapsed && showDropdown && (
          <Icon
            name={isDropdownOpen ? 'ChevronUp' : 'ChevronDown'}
            size={16}
            className="text-muted-foreground flex-shrink-0"
          />
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[1010]">
            {user?.name}
          </div>
        )}
      </div>
      {/* Dropdown Menu */}
      {isDropdownOpen && !isCollapsed && showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[1015]"
            onClick={() => setIsDropdownOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-popover border border-border rounded-lg shadow-elevated z-[1020]">
            <div className="p-2">
              {menuItems?.map((item, index) => (
                <button
                  key={index}
                  onClick={item?.onClick}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-md
                    text-sm transition-smooth hover:bg-muted
                    ${item?.className || 'text-foreground hover:text-foreground'}
                  `}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {/* Quick Sign Out for Collapsed State */}
      {isCollapsed && (
        <button
          onClick={handleSignOut}
          className="absolute left-full ml-2 p-2 bg-popover border border-border rounded-lg shadow-elevated opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[1010]"
          title="Sign Out"
        >
          <Icon name="LogOut" size={16} className="text-error" />
        </button>
      )}
    </div>
  );
};

export default UserProfile;