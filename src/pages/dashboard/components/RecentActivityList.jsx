import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityList = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'project_created':
        return 'Plus';
      case 'project_completed':
        return 'CheckCircle';
      case 'invoice_sent':
        return 'Send';
      case 'invoice_paid':
        return 'DollarSign';
      case 'client_added':
        return 'UserPlus';
      case 'document_uploaded':
        return 'Upload';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'project_completed':
      case 'invoice_paid':
        return 'text-success';
      case 'project_created': case'client_added':
        return 'text-primary';
      case 'invoice_sent':
        return 'text-accent';
      case 'document_uploaded':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityTime?.toLocaleDateString('en-CA');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity?.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimeAgo(activity?.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivityList;