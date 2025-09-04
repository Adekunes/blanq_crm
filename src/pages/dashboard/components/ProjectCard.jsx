import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, onUpdateStatus }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'on hold':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyColor = (daysUntilDeadline) => {
    if (daysUntilDeadline < 0) return 'text-error';
    if (daysUntilDeadline <= 3) return 'text-warning';
    if (daysUntilDeadline <= 7) return 'text-accent';
    return 'text-muted-foreground';
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `${diffDays} days remaining`;
    }
  };

  const daysUntilDeadline = Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{project?.name}</h3>
          <p className="text-sm text-muted-foreground">{project?.client}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
          {project?.status}
        </span>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">
            Deadline: {new Date(project.deadline)?.toLocaleDateString('en-CA')}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className={`text-sm font-medium ${getUrgencyColor(daysUntilDeadline)}`}>
            {formatDeadline(project?.deadline)}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="User" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">Assigned to: {project?.assignedTo}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {project?.completedMilestones}/{project?.totalMilestones} milestones
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(project)}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => onUpdateStatus(project)}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;