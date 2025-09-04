import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import ProjectStatusBadge from './ProjectStatusBadge';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProjectDetailModal = ({ isOpen, onClose, project, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'deliverables', label: 'Deliverables', icon: 'CheckSquare' },
    { id: 'files', label: 'Files & Links', icon: 'Folder' },
    { id: 'timeline', label: 'Timeline', icon: 'Calendar' }
  ];

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning';
    return 'bg-error';
  };

  const isOverdue = new Date(project.deadline) < new Date() && project?.status !== 'completed';
  const daysUntilDeadline = Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{project?.name}</h2>
              <p className="text-muted-foreground">{project?.client}</p>
            </div>
            <ProjectStatusBadge status={project?.status} />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(project)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab?.id 
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Timeline</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project?.startDate} → {project?.deadline}
                  </div>
                  {isOverdue ? (
                    <div className="text-error text-sm font-medium mt-1">
                      Overdue by {Math.abs(daysUntilDeadline)} days
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm mt-1">
                      {daysUntilDeadline} days remaining
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project?.progress)}`}
                        style={{ width: `${project?.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">{project?.progress}%</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Assigned To</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} color="white" />
                    </div>
                    <span className="text-sm text-foreground">{project?.assignedTo}</span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-3">Project Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Project Type:</span>
                      <span className="ml-2 text-sm text-foreground capitalize">{project?.projectType || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Budget:</span>
                      <span className="ml-2 text-sm text-foreground">
                        {project?.budget ? `CAD $${parseFloat(project?.budget)?.toLocaleString()}` : 'Not specified'}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Description:</span>
                      <p className="text-sm text-foreground mt-1">
                        {project?.description || 'No description provided'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-3">Notes</h3>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      {project?.notes || 'No notes added'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Project Deliverables</h3>
                <div className="text-sm text-muted-foreground">
                  {project?.deliverables?.filter(d => d?.completed)?.length || 0} of {project?.deliverables?.length || 0} completed
                </div>
              </div>

              {project?.deliverables && project?.deliverables?.length > 0 ? (
                <div className="space-y-2">
                  {project?.deliverables?.map((deliverable) => (
                    <div key={deliverable?.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Checkbox
                        checked={deliverable?.completed}
                        disabled
                      />
                      <span className={`flex-1 ${deliverable?.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {deliverable?.text}
                      </span>
                      {deliverable?.completed && (
                        <Icon name="CheckCircle" size={16} className="text-success" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="CheckSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No deliverables defined for this project</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-6">
              {/* Google Drive Links */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Google Drive Links</h3>
                {project?.driveLinks && project?.driveLinks?.length > 0 ? (
                  <div className="space-y-2">
                    {project?.driveLinks?.map((link) => (
                      <div key={link?.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <Icon name="ExternalLink" size={16} className="text-primary" />
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{link?.name}</div>
                          <div className="text-sm text-muted-foreground truncate">{link?.url}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(link?.url, '_blank')}
                          iconName="ExternalLink"
                          title="Open link"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Link" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No Google Drive links added</p>
                  </div>
                )}
              </div>

              {/* File Attachments */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">File Attachments</h3>
                {project?.attachments && project?.attachments?.length > 0 ? (
                  <div className="space-y-2">
                    {project?.attachments?.map((file, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Icon name="File" size={16} className="text-muted-foreground" />
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{file?.name}</div>
                          <div className="text-sm text-muted-foreground">{file?.size}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Download"
                          title="Download file"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No files attached to this project</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Project Timeline</h3>
              
              <div className="space-y-4">
                {/* Project Start */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <Icon name="Play" size={16} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">Project Started</div>
                    <div className="text-sm text-muted-foreground">{project?.startDate}</div>
                  </div>
                </div>

                {/* Current Status */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center mt-1">
                    <Icon name="Clock" size={16} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">Current Progress</div>
                    <div className="text-sm text-muted-foreground">{project?.progress}% completed</div>
                  </div>
                </div>

                {/* Project Deadline */}
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                    isOverdue ? 'bg-error' : 'bg-muted'
                  }`}>
                    <Icon name="Flag" size={16} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">Project Deadline</div>
                    <div className={`text-sm ${isOverdue ? 'text-error' : 'text-muted-foreground'}`}>
                      {project?.deadline}
                      {isOverdue && ' (Overdue)'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;