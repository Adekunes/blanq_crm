import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectStatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          icon: 'Play',
          className: 'bg-success/10 text-success border-success/20'
        };
      case 'on-hold':
        return {
          label: 'On Hold',
          icon: 'Pause',
          className: 'bg-warning/10 text-warning border-warning/20'
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: 'CheckCircle',
          className: 'bg-primary/10 text-primary border-primary/20'
        };
      default:
        return {
          label: 'Unknown',
          icon: 'HelpCircle',
          className: 'bg-muted text-muted-foreground border-border'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span className={`
      inline-flex items-center space-x-1 rounded-full border font-medium
      ${config?.className} ${sizeClasses}
    `}>
      <Icon name={config?.icon} size={size === 'sm' ? 12 : 14} />
      <span>{config?.label}</span>
    </span>
  );
};

export default ProjectStatusBadge;