import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import ProjectStatusBadge from './ProjectStatusBadge';

const ProjectTableRow = ({
  project,
  isSelected,
  onSelect,
  onEdit,
  onView,
  onDelete
}) => {
  const isOverdue = new Date(project.deadline) < new Date() && project?.status !== 'completed';
  const isUrgent = new Date(project.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && project?.status !== 'completed';

  return (
    <tr className={`hover:bg-muted/50 transition-colors ${isOverdue ? 'bg-error/5' : ''}`}>
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e?.target?.checked)}
          className="rounded border-border"
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <div>
            <div className="font-medium text-foreground">{project?.name}</div>
            {project?.projectType && (
              <div className="text-xs text-muted-foreground capitalize">{project?.projectType}</div>
            )}
          </div>
          {isOverdue && (
            <Icon name="AlertTriangle" size={16} className="text-error" title="Overdue" />
          )}
          {isUrgent && !isOverdue && (
            <Icon name="Clock" size={16} className="text-warning" title="Due Soon" />
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-foreground">{project?.client}</div>
      </td>
      <td className="px-4 py-3">
        <div className="text-foreground">{project?.startDate}</div>
      </td>
      <td className="px-4 py-3">
        <div className={`text-foreground ${isOverdue ? 'text-error font-medium' : isUrgent ? 'text-warning font-medium' : ''}`}>
          {project?.deadline}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={12} color="white" />
          </div>
          <span className="text-foreground">{project?.assignedTo}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <ProjectStatusBadge status={project?.status} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${project?.progress}%` }}
            />
          </div>
          <span className="text-sm text-foreground min-w-[3rem]">{project?.progress}%</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onView}
            iconName="Eye"
            title="View Details"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            iconName="Edit"
            title="Edit Project"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            iconName="Trash2"
            className="text-error hover:text-error"
            title="Delete Project"
          />
        </div>
      </td>
    </tr>
  );
};

export default ProjectTableRow;