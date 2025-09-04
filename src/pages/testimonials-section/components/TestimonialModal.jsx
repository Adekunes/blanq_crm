import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TestimonialModal = ({ isOpen, onClose, testimonial, onSave, mode = 'view' }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    email: '',
    content: '',
    rating: 5,
    projectTags: [],
    industry: '',
    dateReceived: new Date()?.toISOString()?.split('T')?.[0],
    media: []
  });

  const [newTag, setNewTag] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);

  useEffect(() => {
    if (testimonial && isOpen) {
      setFormData({
        ...testimonial,
        dateReceived: testimonial?.dateReceived ? new Date(testimonial.dateReceived)?.toISOString()?.split('T')?.[0] : new Date()?.toISOString()?.split('T')?.[0]
      });
    } else if (mode === 'create' && isOpen) {
      setFormData({
        clientName: '',
        company: '',
        email: '',
        content: '',
        rating: 5,
        projectTags: [],
        industry: '',
        dateReceived: new Date()?.toISOString()?.split('T')?.[0],
        media: []
      });
    }
  }, [testimonial, isOpen, mode]);

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail' },
    { value: 'education', label: 'Education' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'hospitality', label: 'Hospitality' }
  ];

  const ratingOptions = [
    { value: 1, label: '1 Star' },
    { value: 2, label: '2 Stars' },
    { value: 3, label: '3 Stars' },
    { value: 4, label: '4 Stars' },
    { value: 5, label: '5 Stars' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag?.trim() && !formData?.projectTags?.includes(newTag?.trim())) {
      setFormData(prev => ({
        ...prev,
        projectTags: [...prev?.projectTags, newTag?.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      projectTags: prev?.projectTags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleMediaUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const mediaItem = {
        id: Date.now(),
        type: file?.type?.startsWith('image/') ? 'image' : 'video',
        name: file?.name,
        url: URL.createObjectURL(file),
        file: file
      };
      
      setFormData(prev => ({
        ...prev,
        media: [...prev?.media, mediaItem]
      }));
    }
  };

  const handleRemoveMedia = (mediaId) => {
    setFormData(prev => ({
      ...prev,
      media: prev?.media?.filter(item => item?.id !== mediaId)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {mode === 'view' ? 'Testimonial Details' : mode === 'edit' ? 'Edit Testimonial' : 'New Testimonial'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="h-8 w-8 p-0"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <Input
                label="Client Name"
                type="text"
                value={formData?.clientName}
                onChange={(e) => handleInputChange('clientName', e?.target?.value)}
                disabled={mode === 'view'}
                required
              />

              <Input
                label="Company"
                type="text"
                value={formData?.company}
                onChange={(e) => handleInputChange('company', e?.target?.value)}
                disabled={mode === 'view'}
                required
              />

              <Input
                label="Email"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                disabled={mode === 'view'}
              />

              <Select
                label="Industry"
                options={industryOptions}
                value={formData?.industry}
                onChange={(value) => handleInputChange('industry', value)}
                disabled={mode === 'view'}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Rating"
                  options={ratingOptions}
                  value={formData?.rating}
                  onChange={(value) => handleInputChange('rating', value)}
                  disabled={mode === 'view'}
                />

                <Input
                  label="Date Received"
                  type="date"
                  value={formData?.dateReceived}
                  onChange={(e) => handleInputChange('dateReceived', e?.target?.value)}
                  disabled={mode === 'view'}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Testimonial Content
                </label>
                <textarea
                  value={formData?.content}
                  onChange={(e) => handleInputChange('content', e?.target?.value)}
                  disabled={mode === 'view'}
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                  placeholder="Enter the client's testimonial..."
                />
              </div>

              {/* Project Tags */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData?.projectTags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {tag}
                      {mode !== 'view' && (
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-accent hover:text-accent/80"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {mode !== 'view' && (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e?.target?.value)}
                      placeholder="Add project tag..."
                      onKeyPress={(e) => e?.key === 'Enter' && handleAddTag()}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Plus"
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </div>

              {/* Media Upload */}
              {mode !== 'view' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Media Attachments
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                    id="media-upload"
                  />
                  <label
                    htmlFor="media-upload"
                    className="flex items-center justify-center w-full h-20 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-accent transition-colors"
                  >
                    <div className="text-center">
                      <Icon name="Upload" size={20} className="text-muted-foreground mx-auto mb-1" />
                      <span className="text-sm text-muted-foreground">Upload screenshots or videos</span>
                    </div>
                  </label>
                </div>
              )}

              {/* Media Preview */}
              {formData?.media && formData?.media?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Media Files
                  </label>
                  <div className="space-y-2">
                    {formData?.media?.map((media) => (
                      <div key={media?.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Icon
                            name={media?.type === 'video' ? 'Video' : 'Image'}
                            size={16}
                            className={media?.type === 'video' ? 'text-blue-600' : 'text-green-600'}
                          />
                          <span className="text-sm text-foreground">{media?.name}</span>
                        </div>
                        {mode !== 'view' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Trash2"
                            onClick={() => handleRemoveMedia(media?.id)}
                            className="h-6 w-6 p-0 text-error hover:text-error"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {mode !== 'view' && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {mode === 'edit' ? 'Save Changes' : 'Create Testimonial'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialModal;