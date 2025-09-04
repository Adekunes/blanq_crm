import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const TestimonialFilters = ({
  searchTerm,
  onSearchChange,
  selectedProject,
  onProjectChange,
  selectedIndustry,
  onIndustryChange,
  selectedMediaType,
  onMediaTypeChange,
  selectedRating,
  onRatingChange,
  onClearFilters
}) => {
  const projectOptions = [
    { value: '', label: 'All Projects' },
    { value: 'website-redesign', label: 'Website Redesign' },
    { value: 'brand-identity', label: 'Brand Identity' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'ecommerce-development', label: 'E-commerce Development' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'seo-optimization', label: 'SEO Optimization' }
  ];

  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail' },
    { value: 'education', label: 'Education' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'hospitality', label: 'Hospitality' }
  ];

  const mediaTypeOptions = [
    { value: '', label: 'All Media Types' },
    { value: 'text', label: 'Text Only' },
    { value: 'image', label: 'With Screenshots' },
    { value: 'video', label: 'With Video' }
  ];

  const ratingOptions = [
    { value: '', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' }
  ];

  const hasActiveFilters = selectedProject || selectedIndustry || selectedMediaType || selectedRating || searchTerm;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search testimonials, clients, or projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 lg:flex-1">
          <Select
            options={projectOptions}
            value={selectedProject}
            onChange={onProjectChange}
            placeholder="Filter by project"
            className="flex-1"
          />
          
          <Select
            options={industryOptions}
            value={selectedIndustry}
            onChange={onIndustryChange}
            placeholder="Filter by industry"
            className="flex-1"
          />
        </div>

        {/* Additional Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            options={mediaTypeOptions}
            value={selectedMediaType}
            onChange={onMediaTypeChange}
            placeholder="Media type"
            className="w-full sm:w-40"
          />
          
          <Select
            options={ratingOptions}
            value={selectedRating}
            onChange={onRatingChange}
            placeholder="Rating"
            className="w-full sm:w-32"
          />

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
              className="whitespace-nowrap"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialFilters;