import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const MainSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Business overview and metrics'
    },
    {
      label: 'Clients',
      path: '/client-management',
      icon: 'Users',
      tooltip: 'Client relationship management'
    },
    {
      label: 'Projects',
      path: '/project-management',
      icon: 'FolderOpen',
      tooltip: 'Project coordination and tracking'
    },
    {
      label: 'Finance',
      path: '/finance',
      icon: 'Receipt',
      tooltip: 'Invoices and receipts'
    },
    {
      label: 'Testimonials',
      path: '/testimonials-section',
      icon: 'MessageSquare',
      tooltip: 'Client feedback management'
    },
    {
      label: 'Templates',
      path: '/templates-library',
      icon: 'Layout',
      tooltip: 'Templates and SOPs'
    },
    {
      label: 'Legal & Docs',
      path: '/legal-quebec-docs',
      icon: 'FileText',
      tooltip: 'Quebec compliance documentation'
    },
    {
      label: 'Search',
      path: '/search',
      icon: 'Search',
      tooltip: 'Global search'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-[1030] p-2 bg-card rounded-md shadow-subtle border"
        aria-label="Toggle navigation menu"
      >
        <Icon name="Menu" size={20} />
      </button>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[1020]"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-[1000]
          transition-transform duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-semibold text-foreground">BLANQ</h1>
                  <p className="text-xs text-muted-foreground">CRM</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <li key={item?.path}>
                    <button
                      onClick={() => handleNavigation(item?.path)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                        transition-smooth hover:bg-muted group relative
                        ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground'}
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                      title={isCollapsed ? item?.tooltip : ''}
                    >
                      <Icon
                        name={item?.icon}
                        size={20}
                        className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}
                      />
                      {!isCollapsed && (
                        <span className="font-medium">{item?.label}</span>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[1010]">
                          {item?.label}
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                  <p className="text-xs text-muted-foreground truncate">admin@blanqcrm.com</p>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <button
                className="w-full mt-3 flex items-center justify-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
                onClick={() => navigate('/login')}
              >
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            )}
          </div>

          {/* Collapse Toggle (Desktop Only) */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full items-center justify-center hover:bg-muted transition-smooth"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon
                name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
                size={14}
                className="text-muted-foreground"
              />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default MainSidebar;