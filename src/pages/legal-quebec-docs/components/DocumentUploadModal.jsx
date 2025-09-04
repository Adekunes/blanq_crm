import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DocumentUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    type: '',
    description: '',
    expiryDate: '',
    tags: '',
    isConfidential: false,
    requiresRenewal: false
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const categoryOptions = [
    { value: 'registration', label: 'Registration Documents' },
    { value: 'taxes', label: 'Tax Documents' },
    { value: 'correspondence', label: 'Official Correspondence' },
    { value: 'contracts', label: 'Contracts & Agreements' },
    { value: 'certificates', label: 'Certificates & Licenses' }
  ];

  const typeOptions = [
    { value: 'incorporation', label: 'Incorporation Certificate' },
    { value: 'tax-return', label: 'Tax Return' },
    { value: 'gst-registration', label: 'GST Registration' },
    { value: 'business-license', label: 'Business License' },
    { value: 'official-letter', label: 'Official Letter' },
    { value: 'contract', label: 'Contract' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!formData?.name) {
        setFormData(prev => ({
          ...prev,
          name: file?.name?.replace(/\.[^/.]+$/, '')
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDocument = {
        id: Date.now(),
        name: formData?.name,
        category: formData?.category,
        type: formData?.type,
        description: formData?.description,
        uploadDate: new Date()?.toLocaleDateString('en-CA'),
        expiryDate: formData?.expiryDate,
        fileSize: selectedFile?.size,
        fileName: selectedFile?.name,
        tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(Boolean),
        isConfidential: formData?.isConfidential,
        requiresRenewal: formData?.requiresRenewal,
        complianceStatus: 'compliant',
        uploadedBy: 'Admin User'
      };

      setUploadProgress(100);
      setTimeout(() => {
        onUpload(newDocument);
        handleClose();
      }, 500);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      category: '',
      type: '',
      description: '',
      expiryDate: '',
      tags: '',
      isConfidential: false,
      requiresRenewal: false
    });
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Upload New Document</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={isUploading}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Document *
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {selectedFile ? (
                <div className="flex items-center justify-center space-x-3">
                  <Icon name="File" size={24} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedFile?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile?.size / 1024 / 1024)?.toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                    disabled={isUploading}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ) : (
                <div>
                  <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX, JPG, PNG up to 10MB
                  </p>
                </div>
              )}
              <input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
                required
              />
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Uploading...</span>
                <span className="text-muted-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Document Name"
              type="text"
              placeholder="Enter document name"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
              disabled={isUploading}
            />

            <Select
              label="Category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
              placeholder="Select category"
              required
              disabled={isUploading}
            />

            <Select
              label="Document Type"
              options={typeOptions}
              value={formData?.type}
              onChange={(value) => handleInputChange('type', value)}
              placeholder="Select type"
              required
              disabled={isUploading}
            />

            <Input
              label="Expiry Date"
              type="date"
              value={formData?.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
              disabled={isUploading}
            />
          </div>

          <Input
            label="Description"
            type="text"
            placeholder="Brief description of the document"
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            disabled={isUploading}
          />

          <Input
            label="Tags"
            type="text"
            placeholder="Enter tags separated by commas"
            value={formData?.tags}
            onChange={(e) => handleInputChange('tags', e?.target?.value)}
            description="Use tags to make documents easier to find"
            disabled={isUploading}
          />

          <div className="space-y-3">
            <Checkbox
              label="Confidential Document"
              description="Restrict access to authorized personnel only"
              checked={formData?.isConfidential}
              onChange={(e) => handleInputChange('isConfidential', e?.target?.checked)}
              disabled={isUploading}
            />

            <Checkbox
              label="Requires Renewal"
              description="Set up automatic renewal reminders"
              checked={formData?.requiresRenewal}
              onChange={(e) => handleInputChange('requiresRenewal', e?.target?.checked)}
              disabled={isUploading}
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isUploading}
              disabled={!selectedFile}
              iconName="Upload"
              iconPosition="left"
            >
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadModal;