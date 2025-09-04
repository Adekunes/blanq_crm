import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationItem = ({
  label,
  path,
  icon,
  tooltip,
  isCollapsed = false,
  onClick,
  className = '',
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location?.pathname === path;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
        transition-smooth hover:bg-muted group relative
        ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground'}
        ${isCollapsed ? 'justify-center' : ''}
        ${className}
      `}
      title={isCollapsed ? tooltip || label : ''}
    >
      {icon && (
        <Icon
          name={icon}
          size={20}
          className={`flex-shrink-0 ${
            isActive 
              ? 'text-primary-foreground' 
              : 'text-muted-foreground group-hover:text-foreground'
          }`}
        />
      )}
      
      {!isCollapsed && (
        <span className="font-medium flex-1 text-left">{label}</span>
      )}
      
      {children && !isCollapsed && children}
      
      {/* Tooltip for collapsed state */}
      {isCollapsed && (tooltip || label) && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[1010]">
          {tooltip || label}
        </div>
      )}
    </button>
  );
};

export default NavigationItem;