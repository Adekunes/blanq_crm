import React from 'react';
import Icon from '../../../components/AppIcon';

const ClientStats = ({ clients }) => {
  const stats = {
    total: clients?.length,
    active: clients?.filter(c => c?.status === 'Active')?.length,
    inactive: clients?.filter(c => c?.status === 'Inactive')?.length,
    pending: clients?.filter(c => c?.status === 'Pending')?.length,
    onHold: clients?.filter(c => c?.status === 'On Hold')?.length
  };

  const statCards = [
    {
      label: 'Total Clients',
      value: stats?.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active',
      value: stats?.active,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Pending',
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'On Hold',
      value: stats?.onHold,
      icon: 'Pause',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat?.label}</p>
              <p className="text-2xl font-semibold text-foreground">{stat?.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientStats;