import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectTableRow from './ProjectTableRow';

const ProjectTable = ({
  projects,
  onEditProject,
  onViewProject,
  onDeleteProject,
  onBulkStatusUpdate,
  sortConfig,
  onSort
}) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const columns = [
    { key: 'name', label: 'Project Name', sortable: true },
    { key: 'client', label: 'Client', sortable: true },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'deadline', label: 'Deadline', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'progress', label: 'Progress', sortable: false },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProjects(projects?.map(p => p?.id));
    } else {
      setSelectedProjects([]);
    }
  };

  const handleSelectProject = (projectId, checked) => {
    if (checked) {
      setSelectedProjects([...selectedProjects, projectId]);
    } else {
      setSelectedProjects(selectedProjects?.filter(id => id !== projectId));
    }
  };

  const handleBulkStatusUpdate = (newStatus) => {
    onBulkStatusUpdate(selectedProjects, newStatus);
    setSelectedProjects([]);
    setShowBulkActions(false);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  const isAllSelected = selectedProjects?.length === projects?.length && projects?.length > 0;
  const isIndeterminate = selectedProjects?.length > 0 && selectedProjects?.length < projects?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedProjects?.length > 0 && (
        <div className="bg-muted border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedProjects?.length} project{selectedProjects?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('active')}
                iconName="Play"
                iconPosition="left"
              >
                Mark Active
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('on-hold')}
                iconName="Pause"
                iconPosition="left"
              >
                Put On Hold
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('completed')}
                iconName="CheckCircle"
                iconPosition="left"
              >
                Mark Complete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProjects([])}
                iconName="X"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className="px-4 py-3 text-left text-sm font-medium text-foreground"
                >
                  {column?.sortable ? (
                    <button
                      onClick={() => onSort(column?.key)}
                      className="flex items-center space-x-1 hover:text-primary transition-colors"
                    >
                      <span>{column?.label}</span>
                      {getSortIcon(column?.key)}
                    </button>
                  ) : (
                    column?.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects?.map((project) => (
              <ProjectTableRow
                key={project?.id}
                project={project}
                isSelected={selectedProjects?.includes(project?.id)}
                onSelect={(checked) => handleSelectProject(project?.id, checked)}
                onEdit={() => onEditProject(project)}
                onView={() => onViewProject(project)}
                onDelete={() => onDeleteProject(project?.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {projects?.map((project) => (
          <div key={project?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedProjects?.includes(project?.id)}
                  onChange={(e) => handleSelectProject(project?.id, e?.target?.checked)}
                  className="rounded border-border"
                />
                <div>
                  <h4 className="font-medium text-foreground">{project?.name}</h4>
                  <p className="text-sm text-muted-foreground">{project?.client}</p>
                </div>
              </div>
              <ProjectStatusBadge status={project?.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <span className="text-muted-foreground">Start:</span>
                <span className="ml-1 text-foreground">{project?.startDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Deadline:</span>
                <span className="ml-1 text-foreground">{project?.deadline}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Assigned:</span>
                <span className="ml-1 text-foreground">{project?.assignedTo}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Progress:</span>
                <span className="ml-1 text-foreground">{project?.progress}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-full bg-muted rounded-full h-2 mr-4">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project?.progress}%` }}
                />
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewProject(project)}
                  iconName="Eye"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditProject(project)}
                  iconName="Edit"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteProject(project?.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {projects?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first project or adjust your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;