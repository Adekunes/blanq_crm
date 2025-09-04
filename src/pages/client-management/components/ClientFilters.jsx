import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ClientFilters = ({
  searchTerm,
  onSearchChange,
  selectedIndustry,
  onIndustryChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
  onAddClient
}) => {
  const industryOptions = [
    { value: '', label: 'All Industries' },
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
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
    { value: 'On Hold', label: 'On Hold' }
  ];

  const hasActiveFilters = searchTerm || selectedIndustry || selectedStatus;

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 lg:max-w-md">
          <Input
            type="search"
            placeholder="Search clients, contacts, or emails..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Industry Filter */}
        <div className="lg:w-48">
          <Select
            options={industryOptions}
            value={selectedIndustry}
            onChange={onIndustryChange}
            placeholder="Filter by industry"
          />
        </div>

        {/* Status Filter */}
        <div className="lg:w-48">
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={onStatusChange}
            placeholder="Filter by status"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 lg:ml-auto">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear Filters
            </Button>
          )}
          
          <Button
            variant="default"
            onClick={onAddClient}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            New Client
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Search: "{searchTerm}"
              <button
                onClick={() => onSearchChange('')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {selectedIndustry && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Industry: {selectedIndustry}
              <button
                onClick={() => onIndustryChange('')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {selectedStatus && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Status: {selectedStatus}
              <button
                onClick={() => onStatusChange('')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientFilters;