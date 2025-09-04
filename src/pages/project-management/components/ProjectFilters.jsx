import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const ProjectFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
  clientOptions,
  teamMemberOptions
}) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' }
  ];

  const projectTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'website', label: 'Website Development' },
    { value: 'branding', label: 'Branding & Design' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'seo', label: 'SEO Optimization' },
    { value: 'maintenance', label: 'Website Maintenance' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Projects</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Select status"
        />

        {/* Client Filter */}
        <Select
          label="Client"
          options={[{ value: '', label: 'All Clients' }, ...clientOptions]}
          value={filters?.client}
          onChange={(value) => handleFilterChange('client', value)}
          placeholder="Select client"
          searchable
        />

        {/* Assigned To Filter */}
        <Select
          label="Assigned To"
          options={[{ value: '', label: 'All Team Members' }, ...teamMemberOptions]}
          value={filters?.assignedTo}
          onChange={(value) => handleFilterChange('assignedTo', value)}
          placeholder="Select team member"
          searchable
        />

        {/* Project Type Filter */}
        <Select
          label="Project Type"
          options={projectTypeOptions}
          value={filters?.projectType}
          onChange={(value) => handleFilterChange('projectType', value)}
          placeholder="Select type"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Search Filter */}
        <Input
          label="Search Projects"
          type="search"
          placeholder="Search by project name..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
        />

        {/* Start Date Range */}
        <Input
          label="Start Date From"
          type="date"
          value={filters?.startDateFrom}
          onChange={(e) => handleFilterChange('startDateFrom', e?.target?.value)}
        />

        {/* Deadline Range */}
        <Input
          label="Deadline Until"
          type="date"
          value={filters?.deadlineUntil}
          onChange={(e) => handleFilterChange('deadlineUntil', e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default ProjectFilters;