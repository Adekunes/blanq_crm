import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { format, isAfter, isBefore, parseISO } from 'date-fns';

const TaskCard = ({ task, onEdit, onView, onDelete, isDragging }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const isOverdue = () => {
    if (task?.status === 'completed') return false;
    return isBefore(parseISO(task?.dueDate), new Date());
  };

  const isDueSoon = () => {
    if (task?.status === 'completed') return false;
    const dueDate = parseISO(task?.dueDate);
    const threeDaysFromNow = new Date();
    threeDaysFromNow?.setDate(threeDaysFromNow?.getDate() + 3);
    return isBefore(dueDate, threeDaysFromNow) && isAfter(dueDate, new Date());
  };

  const getAssignmentColor = (assignedTo) => {
    return assignedTo === 'You' ? 'bg-purple-500' : 'bg-indigo-500';
  };

  const getAssignmentIcon = (assignedTo) => {
    return assignedTo === 'You' ? 'User' : 'Users';
  };

  return (
    <div 
      className={`bg-background border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group ${
        isDragging ? 'shadow-lg ring-2 ring-primary' : ''
      }`}
      onClick={onView}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 flex-1">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task?.priority)}`} />
          <h4 className="font-medium text-foreground text-sm line-clamp-2 flex-1">
            {task?.title}
          </h4>
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onEdit();
            }}
            iconName="Edit"
            className="h-7 w-7 p-1"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onDelete();
            }}
            iconName="Trash2"
            className="h-7 w-7 p-1 text-red-500 hover:text-red-700"
          />
        </div>
      </div>

      {/* Task Description */}
      {task?.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {task?.description}
        </p>
      )}

      {/* Tags */}
      {task?.tags && task?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task?.tags?.slice(0, 3)?.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {task?.tags?.length > 3 && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
              +{task?.tags?.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Progress Bar for In Progress tasks */}
      {task?.status === 'inProgress' && task?.progress !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs text-muted-foreground">{task?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${task?.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Task Meta Information */}
      <div className="space-y-2">
        {/* Assignment and Priority */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full ${getAssignmentColor(task?.assignedTo)} flex items-center justify-center`}>
              <Icon name={getAssignmentIcon(task?.assignedTo)} size={10} className="text-white" />
            </div>
            <span className="text-xs text-muted-foreground">{task?.assignedTo}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name={getPriorityIcon(task?.priority)} size={12} className={`text-${task?.priority === 'high' ? 'red' : task?.priority === 'medium' ? 'yellow' : 'green'}-500`} />
            <span className="text-xs text-muted-foreground capitalize">{task?.priority}</span>
          </div>
        </div>

        {/* Due Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name="Calendar" 
              size={12} 
              className={`${
                isOverdue() ? 'text-red-500' : isDueSoon() ?'text-yellow-500': 'text-muted-foreground'
              }`} 
            />
            <span 
              className={`text-xs ${
                isOverdue() ? 'text-red-500 font-medium' : isDueSoon() ?'text-yellow-500 font-medium': 'text-muted-foreground'
              }`}
            >
              {format(parseISO(task?.dueDate), 'MMM dd, yyyy')}
            </span>
          </div>

          {/* Status indicators */}
          <div className="flex items-center space-x-1">
            {isOverdue() && (
              <Icon name="AlertTriangle" size={12} className="text-red-500" />
            )}
            {isDueSoon() && !isOverdue() && (
              <Icon name="Clock" size={12} className="text-yellow-500" />
            )}
            {task?.dependencies && task?.dependencies?.length > 0 && (
              <Icon name="Link" size={12} className="text-muted-foreground" />
            )}
            {task?.comments && task?.comments?.length > 0 && (
              <div className="flex items-center space-x-1">
                <Icon name="MessageSquare" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{task?.comments?.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Estimated Hours */}
        {task?.estimatedHours && (
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {task?.status === 'completed' && task?.actualHours 
                ? `${task?.actualHours}h actual (est. ${task?.estimatedHours}h)`
                : `${task?.estimatedHours}h estimated`
              }
            </span>
          </div>
        )}
      </div>

      {/* Completion Badge for completed tasks */}
      {task?.status === 'completed' && task?.completedAt && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-green-500" />
            <span className="text-xs text-muted-foreground">
              Completed {format(parseISO(task?.completedAt), 'MMM dd, HH:mm')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;