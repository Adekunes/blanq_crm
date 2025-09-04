import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExportModal = ({ isOpen, onClose, testimonials, onExport }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedTestimonials, setSelectedTestimonials] = useState([]);
  const [includeMedia, setIncludeMedia] = useState(true);
  const [includeRatings, setIncludeRatings] = useState(true);
  const [includeProjectTags, setIncludeProjectTags] = useState(true);
  const [sortBy, setSortBy] = useState('rating');

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'csv', label: 'CSV Spreadsheet' },
    { value: 'json', label: 'JSON Data' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'date', label: 'Date (Recent First)' },
    { value: 'client', label: 'Client Name (A-Z)' },
    { value: 'company', label: 'Company Name (A-Z)' }
  ];

  const handleTestimonialToggle = (testimonialId) => {
    setSelectedTestimonials(prev => 
      prev?.includes(testimonialId)
        ? prev?.filter(id => id !== testimonialId)
        : [...prev, testimonialId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTestimonials?.length === testimonials?.length) {
      setSelectedTestimonials([]);
    } else {
      setSelectedTestimonials(testimonials?.map(t => t?.id));
    }
  };

  const handleExport = () => {
    const exportData = {
      format: exportFormat,
      testimonials: testimonials?.filter(t => selectedTestimonials?.includes(t?.id)),
      options: {
        includeMedia,
        includeRatings,
        includeProjectTags,
        sortBy
      }
    };
    
    onExport(exportData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Export Testimonials</h2>
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
          <div className="space-y-6">
            {/* Export Format */}
            <div>
              <Select
                label="Export Format"
                options={formatOptions}
                value={exportFormat}
                onChange={setExportFormat}
              />
            </div>

            {/* Sort Options */}
            <div>
              <Select
                label="Sort By"
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
              />
            </div>

            {/* Include Options */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Include in Export
              </label>
              <div className="space-y-2">
                <Checkbox
                  label="Media attachments"
                  checked={includeMedia}
                  onChange={(e) => setIncludeMedia(e?.target?.checked)}
                />
                <Checkbox
                  label="Rating scores"
                  checked={includeRatings}
                  onChange={(e) => setIncludeRatings(e?.target?.checked)}
                />
                <Checkbox
                  label="Project tags"
                  checked={includeProjectTags}
                  onChange={(e) => setIncludeProjectTags(e?.target?.checked)}
                />
              </div>
            </div>

            {/* Testimonial Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">
                  Select Testimonials ({selectedTestimonials?.length} of {testimonials?.length})
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {selectedTestimonials?.length === testimonials?.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
              
              <div className="max-h-60 overflow-y-auto border border-border rounded-lg">
                {testimonials?.map((testimonial) => (
                  <div
                    key={testimonial?.id}
                    className="flex items-center space-x-3 p-3 border-b border-border last:border-b-0 hover:bg-muted/50"
                  >
                    <Checkbox
                      checked={selectedTestimonials?.includes(testimonial?.id)}
                      onChange={() => handleTestimonialToggle(testimonial?.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {testimonial?.clientName} - {testimonial?.company}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial?.content?.substring(0, 60)}...
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-yellow-500" />
                      <span className="text-xs text-muted-foreground">
                        {testimonial?.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Preview */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Export Summary</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• {selectedTestimonials?.length} testimonials selected</p>
                <p>• Format: {formatOptions?.find(f => f?.value === exportFormat)?.label}</p>
                <p>• Sorted by: {sortOptions?.find(s => s?.value === sortBy)?.label}</p>
                {includeMedia && <p>• Including media attachments</p>}
                {includeRatings && <p>• Including rating scores</p>}
                {includeProjectTags && <p>• Including project tags</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedTestimonials?.length === 0}
            iconName="Download"
          >
            Export ({selectedTestimonials?.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;