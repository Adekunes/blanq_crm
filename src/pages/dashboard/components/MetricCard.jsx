import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, icon, trend, trendValue, color = "primary" }) => {
  const getColorClasses = (colorType) => {
    switch (colorType) {
      case 'success':
        return 'bg-success/10 border-success/20 text-success';
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'error':
        return 'bg-error/10 border-error/20 text-error';
      case 'accent':
        return 'bg-accent/10 border-accent/20 text-accent';
      case 'secondary':
        return 'bg-secondary/10 border-secondary/20 text-secondary';
      default:
        return 'bg-primary/10 border-primary/20 text-primary';
    }
  };

  const getTrendIcon = (trendType) => {
    switch (trendType) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trendType) => {
    switch (trendType) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={20} />
        </div>
        
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
            <Icon name={getTrendIcon(trend)} size={16} />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;