import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ClientModal = ({ 
  isOpen, 
  onClose, 
  client, 
  onSave, 
  mode = 'view' // 'view', 'edit', 'create'
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    status: 'Active',
    notes: '',
    address: '',
    taxId: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (client) {
      setFormData({
        companyName: client?.companyName || '',
        contactPerson: client?.contactPerson || '',
        email: client?.email || '',
        phone: client?.phone || '',
        website: client?.website || '',
        industry: client?.industry || '',
        status: client?.status || 'Active',
        notes: client?.notes || '',
        address: client?.address || '',
        taxId: client?.taxId || ''
      });
    } else {
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        website: '',
        industry: '',
        status: 'Active',
        notes: '',
        address: '',
        taxId: ''
      });
    }
    setErrors({});
    setActiveTab('details');
  }, [client, isOpen]);

  const industryOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Finance', label: 'Finance' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Education', label: 'Education' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Non-profit', label: 'Non-profit' },
    { value: 'Other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
    { value: 'On Hold', label: 'On Hold' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.companyName?.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData?.contactPerson?.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData?.industry) {
      newErrors.industry = 'Industry is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave({
        ...formData,
        id: client?.id || Date.now(),
        createdAt: client?.createdAt || new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Error saving client:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mockProjects = [
    {
      id: 1,
      name: "Website Redesign",
      status: "Active",
      startDate: "2024-01-15",
      deadline: "2024-03-15",
      progress: 75
    },
    {
      id: 2,
      name: "SEO Optimization",
      status: "Completed",
      startDate: "2023-11-01",
      deadline: "2024-01-01",
      progress: 100
    }
  ];

  const mockContracts = [
    {
      id: 1,
      name: "Service Agreement 2024",
      signedDate: "2024-01-10",
      status: "Active",
      type: "Annual Contract"
    },
    {
      id: 2,
      name: "NDA Agreement",
      signedDate: "2024-01-05",
      status: "Active",
      type: "Non-Disclosure"
    }
  ];

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';
  const isEditing = mode === 'edit' || mode === 'create';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'create' ? 'Add New Client' : 
               mode === 'edit'? 'Edit Client' : 'Client Details'}
            </h2>
            {client && (
              <p className="text-sm text-muted-foreground mt-1">
                {client?.companyName}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {mode === 'view' && (
              <Button
                variant="outline"
                onClick={() => setActiveTab('details')}
                iconName="Edit2"
                iconPosition="left"
                iconSize={16}
              >
                Edit Client
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'details', label: 'Details', icon: 'User' },
              { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
              { id: 'contracts', label: 'Contracts', icon: 'FileText' }
            ]?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                {tab?.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Company Name"
                  type="text"
                  value={formData?.companyName}
                  onChange={(e) => handleInputChange('companyName', e?.target?.value)}
                  error={errors?.companyName}
                  required
                  disabled={isReadOnly}
                />

                <Input
                  label="Contact Person"
                  type="text"
                  value={formData?.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e?.target?.value)}
                  error={errors?.contactPerson}
                  required
                  disabled={isReadOnly}
                />

                <Input
                  label="Email Address"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  required
                  disabled={isReadOnly}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  required
                  disabled={isReadOnly}
                />

                <Input
                  label="Website"
                  type="url"
                  value={formData?.website}
                  onChange={(e) => handleInputChange('website', e?.target?.value)}
                  placeholder="https://example.com"
                  disabled={isReadOnly}
                />

                <Input
                  label="Tax ID / Business Number"
                  type="text"
                  value={formData?.taxId}
                  onChange={(e) => handleInputChange('taxId', e?.target?.value)}
                  disabled={isReadOnly}
                />

                <Select
                  label="Industry"
                  options={industryOptions}
                  value={formData?.industry}
                  onChange={(value) => handleInputChange('industry', value)}
                  error={errors?.industry}
                  required
                  disabled={isReadOnly}
                />

                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  disabled={isReadOnly}
                />
              </div>

              <Input
                label="Address"
                type="text"
                value={formData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
                placeholder="Full business address"
                disabled={isReadOnly}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notes
                </label>
                <textarea
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                  placeholder="Additional notes about the client..."
                  rows={4}
                  disabled={isReadOnly}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Project History</h3>
                <Button
                  variant="outline"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  New Project
                </Button>
              </div>

              <div className="space-y-3">
                {mockProjects?.map((project) => (
                  <div key={project?.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{project?.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project?.status === 'Active' ? 'bg-success/10 text-success' :
                        project?.status === 'Completed'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {project?.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>Start: {new Date(project.startDate)?.toLocaleDateString()}</div>
                      <div>Deadline: {new Date(project.deadline)?.toLocaleDateString()}</div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-medium">{project?.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project?.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Signed Contracts</h3>
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={16}
                >
                  Upload Contract
                </Button>
              </div>

              <div className="space-y-3">
                {mockContracts?.map((contract) => (
                  <div key={contract?.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Icon name="FileText" size={20} className="text-primary" />
                        <div>
                          <h4 className="font-medium text-foreground">{contract?.name}</h4>
                          <p className="text-sm text-muted-foreground">{contract?.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          contract?.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                          {contract?.status}
                        </span>
                        <Button variant="ghost" size="icon">
                          <Icon name="Download" size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Signed: {new Date(contract.signedDate)?.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              {mode === 'create' ? 'Create Client' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientModal;