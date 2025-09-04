import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ProjectModal = ({
  isOpen,
  onClose,
  onSave,
  project = null,
  clientOptions,
  teamMemberOptions
}) => {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    startDate: '',
    deadline: '',
    assignedTo: '',
    status: 'active',
    projectType: '',
    description: '',
    deliverables: [],
    budget: '',
    notes: '',
    attachments: [],
    driveLinks: []
  });

  const [newDeliverable, setNewDeliverable] = useState('');
  const [newDriveLink, setNewDriveLink] = useState({ name: '', url: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project?.name || '',
        client: project?.client || '',
        startDate: project?.startDate || '',
        deadline: project?.deadline || '',
        assignedTo: project?.assignedTo || '',
        status: project?.status || 'active',
        projectType: project?.projectType || '',
        description: project?.description || '',
        deliverables: project?.deliverables || [],
        budget: project?.budget || '',
        notes: project?.notes || '',
        attachments: project?.attachments || [],
        driveLinks: project?.driveLinks || []
      });
    } else {
      setFormData({
        name: '',
        client: '',
        startDate: '',
        deadline: '',
        assignedTo: '',
        status: 'active',
        projectType: '',
        description: '',
        deliverables: [],
        budget: '',
        notes: '',
        attachments: [],
        driveLinks: []
      });
    }
    setErrors({});
  }, [project, isOpen]);

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' }
  ];

  const projectTypeOptions = [
    { value: 'website', label: 'Website Development' },
    { value: 'branding', label: 'Branding & Design' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'seo', label: 'SEO Optimization' },
    { value: 'maintenance', label: 'Website Maintenance' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addDeliverable = () => {
    if (newDeliverable?.trim()) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev?.deliverables, { id: Date.now(), text: newDeliverable?.trim(), completed: false }]
      }));
      setNewDeliverable('');
    }
  };

  const removeDeliverable = (id) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev?.deliverables?.filter(d => d?.id !== id)
    }));
  };

  const toggleDeliverable = (id) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev?.deliverables?.map(d => 
        d?.id === id ? { ...d, completed: !d?.completed } : d
      )
    }));
  };

  const addDriveLink = () => {
    if (newDriveLink?.name?.trim() && newDriveLink?.url?.trim()) {
      setFormData(prev => ({
        ...prev,
        driveLinks: [...prev?.driveLinks, { id: Date.now(), ...newDriveLink }]
      }));
      setNewDriveLink({ name: '', url: '' });
    }
  };

  const removeDriveLink = (id) => {
    setFormData(prev => ({
      ...prev,
      driveLinks: prev?.driveLinks?.filter(link => link?.id !== id)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) newErrors.name = 'Project name is required';
    if (!formData?.client) newErrors.client = 'Client selection is required';
    if (!formData?.startDate) newErrors.startDate = 'Start date is required';
    if (!formData?.deadline) newErrors.deadline = 'Deadline is required';
    if (!formData?.assignedTo) newErrors.assignedTo = 'Team member assignment is required';
    
    if (formData?.startDate && formData?.deadline && new Date(formData.startDate) > new Date(formData.deadline)) {
      newErrors.deadline = 'Deadline must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {project ? 'Edit Project' : 'New Project'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Project Name"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
                placeholder="Enter project name"
              />

              <Select
                label="Client"
                options={clientOptions}
                value={formData?.client}
                onChange={(value) => handleInputChange('client', value)}
                error={errors?.client}
                required
                searchable
                placeholder="Select client"
              />

              <Input
                label="Start Date"
                type="date"
                value={formData?.startDate}
                onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                error={errors?.startDate}
                required
              />

              <Input
                label="Deadline"
                type="date"
                value={formData?.deadline}
                onChange={(e) => handleInputChange('deadline', e?.target?.value)}
                error={errors?.deadline}
                required
              />

              <Select
                label="Assigned To"
                options={teamMemberOptions}
                value={formData?.assignedTo}
                onChange={(value) => handleInputChange('assignedTo', value)}
                error={errors?.assignedTo}
                required
                searchable
                placeholder="Select team member"
              />

              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
                placeholder="Select status"
              />

              <Select
                label="Project Type"
                options={projectTypeOptions}
                value={formData?.projectType}
                onChange={(value) => handleInputChange('projectType', value)}
                placeholder="Select project type"
              />

              <Input
                label="Budget (CAD)"
                type="number"
                value={formData?.budget}
                onChange={(e) => handleInputChange('budget', e?.target?.value)}
                placeholder="0.00"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Description
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Describe the project scope and objectives..."
              />
            </div>

            {/* Deliverables */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Deliverables
              </label>
              <div className="space-y-2 mb-3">
                {formData?.deliverables?.map((deliverable) => (
                  <div key={deliverable?.id} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                    <Checkbox
                      checked={deliverable?.completed}
                      onChange={() => toggleDeliverable(deliverable?.id)}
                    />
                    <span className={`flex-1 ${deliverable?.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {deliverable?.text}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDeliverable(deliverable?.id)}
                      iconName="X"
                    />
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e?.target?.value)}
                  placeholder="Add new deliverable..."
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addDeliverable}
                  iconName="Plus"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Google Drive Links */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Google Drive Links
              </label>
              <div className="space-y-2 mb-3">
                {formData?.driveLinks?.map((link) => (
                  <div key={link?.id} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                    <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{link?.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{link?.url}</div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDriveLink(link?.id)}
                      iconName="X"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  type="text"
                  value={newDriveLink?.name}
                  onChange={(e) => setNewDriveLink(prev => ({ ...prev, name: e?.target?.value }))}
                  placeholder="Link name..."
                />
                <div className="flex space-x-2">
                  <Input
                    type="url"
                    value={newDriveLink?.url}
                    onChange={(e) => setNewDriveLink(prev => ({ ...prev, url: e?.target?.value }))}
                    placeholder="Google Drive URL..."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addDriveLink}
                    iconName="Plus"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notes
              </label>
              <textarea
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Additional notes and comments..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Save"
              iconPosition="left"
            >
              {project ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;