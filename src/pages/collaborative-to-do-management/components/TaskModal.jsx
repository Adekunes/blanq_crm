import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { format } from 'date-fns';

const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  task = null,
  viewTask = null,
  partnerOptions
}) => {
  const [isViewMode, setIsViewMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    estimatedHours: '',
    tags: [],
    dependencies: [],
    progress: 0
  });

  const [newTag, setNewTag] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (viewTask) {
      setIsViewMode(true);
      setFormData({
        title: viewTask?.title || '',
        description: viewTask?.description || '',
        assignedTo: viewTask?.assignedTo || '',
        priority: viewTask?.priority || 'medium',
        status: viewTask?.status || 'todo',
        dueDate: viewTask?.dueDate || '',
        estimatedHours: viewTask?.estimatedHours || '',
        tags: viewTask?.tags || [],
        dependencies: viewTask?.dependencies || [],
        progress: viewTask?.progress || 0
      });
    } else if (task) {
      setIsViewMode(false);
      setFormData({
        title: task?.title || '',
        description: task?.description || '',
        assignedTo: task?.assignedTo || '',
        priority: task?.priority || 'medium',
        status: task?.status || 'todo',
        dueDate: task?.dueDate || '',
        estimatedHours: task?.estimatedHours || '',
        tags: task?.tags || [],
        dependencies: task?.dependencies || [],
        progress: task?.progress || 0
      });
    } else {
      setIsViewMode(false);
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        priority: 'medium',
        status: 'todo',
        dueDate: '',
        estimatedHours: '',
        tags: [],
        dependencies: [],
        progress: 0
      });
    }
    setErrors({});
    setNewTag('');
    setNewComment('');
  }, [task, viewTask, isOpen]);

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    if (newTag?.trim() && !formData?.tags?.includes(newTag?.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev?.tags, newTag?.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev?.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const addComment = () => {
    if (newComment?.trim() && (task || viewTask)) {
      const comment = {
        id: Date.now(),
        author: 'You',
        text: newComment?.trim(),
        timestamp: format(new Date(), 'yyyy-MM-dd HH:mm')
      };
      
      // This would typically update the task in the parent component
      console.log('Adding comment:', comment);
      setNewComment('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) newErrors.title = 'Task title is required';
    if (!formData?.assignedTo) newErrors.assignedTo = 'Assignment is required';
    if (!formData?.dueDate) newErrors.dueDate = 'Due date is required';
    
    if (formData?.dueDate && new Date(formData.dueDate) < new Date()?.setHours(0, 0, 0, 0)) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (isViewMode) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'text-blue-500';
      case 'inProgress':
        return 'text-yellow-500';
      case 'completed':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  if (!isOpen) return null;

  const currentTask = viewTask || task;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {isViewMode ? 'Task Details' : task ? 'Edit Task' : 'New Task'}
          </h2>
          <div className="flex items-center space-x-2">
            {isViewMode && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setIsViewMode(false);
                  setFormData({
                    title: viewTask?.title || '',
                    description: viewTask?.description || '',
                    assignedTo: viewTask?.assignedTo || '',
                    priority: viewTask?.priority || 'medium',
                    status: viewTask?.status || 'todo',
                    dueDate: viewTask?.dueDate || '',
                    estimatedHours: viewTask?.estimatedHours || '',
                    tags: viewTask?.tags || [],
                    dependencies: viewTask?.dependencies || [],
                    progress: viewTask?.progress || 0
                  });
                }}
                iconName="Edit"
              >
                Edit
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Task Title"
                  type="text"
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  error={errors?.title}
                  required
                  placeholder="Enter task title"
                  disabled={isViewMode}
                />
              </div>

              <Select
                label="Assigned To"
                options={partnerOptions}
                value={formData?.assignedTo}
                onChange={(value) => handleInputChange('assignedTo', value)}
                error={errors?.assignedTo}
                required
                placeholder="Select assignee"
                disabled={isViewMode}
              />

              <Input
                label="Due Date"
                type="date"
                value={formData?.dueDate}
                onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
                error={errors?.dueDate}
                required
                disabled={isViewMode}
              />

              <Select
                label="Priority"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
                placeholder="Select priority"
                disabled={isViewMode}
              />

              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
                placeholder="Select status"
                disabled={isViewMode}
              />

              <Input
                label="Estimated Hours"
                type="number"
                value={formData?.estimatedHours}
                onChange={(e) => handleInputChange('estimatedHours', e?.target?.value)}
                placeholder="0"
                min="0"
                step="0.5"
                disabled={isViewMode}
              />

              {/* Progress for In Progress tasks */}
              {formData?.status === 'inProgress' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Progress ({formData?.progress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={formData?.progress}
                    onChange={(e) => handleInputChange('progress', parseInt(e?.target?.value))}
                    disabled={isViewMode}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Task Description
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none disabled:opacity-50"
                placeholder="Describe the task requirements and objectives..."
                disabled={isViewMode}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData?.tags?.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-1 bg-muted px-3 py-1 rounded-full">
                    <span className="text-sm text-muted-foreground">{tag}</span>
                    {!isViewMode && (
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {!isViewMode && (
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e?.target?.value)}
                    placeholder="Add new tag..."
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e?.key === 'Enter') {
                        e?.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    iconName="Plus"
                  >
                    Add
                  </Button>
                </div>
              )}
            </div>

            {/* Task Metadata for View Mode */}
            {isViewMode && currentTask && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Created:</span>
                    <span className="text-sm text-foreground">{currentTask?.createdAt}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Flag" size={16} className={getPriorityColor(currentTask?.priority)} />
                    <span className="text-sm text-muted-foreground">Priority:</span>
                    <span className={`text-sm font-medium capitalize ${getPriorityColor(currentTask?.priority)}`}>
                      {currentTask?.priority}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Icon name="Circle" size={16} className={getStatusColor(currentTask?.status)} />
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className={`text-sm font-medium capitalize ${getStatusColor(currentTask?.status)}`}>
                      {currentTask?.status?.replace(/([A-Z])/g, ' $1')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {currentTask?.estimatedHours && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Estimated:</span>
                      <span className="text-sm text-foreground">{currentTask?.estimatedHours}h</span>
                    </div>
                  )}

                  {currentTask?.completedAt && (
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-500" />
                      <span className="text-sm text-muted-foreground">Completed:</span>
                      <span className="text-sm text-foreground">{currentTask?.completedAt}</span>
                    </div>
                  )}

                  {currentTask?.dependencies && currentTask?.dependencies?.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Link" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Dependencies:</span>
                      <span className="text-sm text-foreground">{currentTask?.dependencies?.length}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Comments Section */}
            {currentTask && currentTask?.comments && currentTask?.comments?.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Comments ({currentTask?.comments?.length})
                </label>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {currentTask?.comments?.map((comment) => (
                    <div key={comment?.id} className="flex space-x-3 p-3 bg-muted rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={comment?.author === 'You' ? 'User' : 'Users'} size={16} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-foreground">{comment?.author}</span>
                          <span className="text-xs text-muted-foreground">{comment?.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground break-words">{comment?.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e?.target?.value)}
                    placeholder="Add a comment..."
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e?.key === 'Enter') {
                        e?.preventDefault();
                        addComment();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addComment}
                    iconName="Send"
                    disabled={!newComment?.trim()}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {isViewMode ? 'Close' : 'Cancel'}
            </Button>
            {!isViewMode && (
              <Button
                type="submit"
                loading={isSubmitting}
                iconName="Save"
                iconPosition="left"
              >
                {task ? 'Update Task' : 'Create Task'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;