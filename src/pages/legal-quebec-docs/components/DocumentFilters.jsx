import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DocumentFilters = ({
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onClearFilters
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'registration', label: 'Registration' },
    { value: 'taxes', label: 'Taxes' },
    { value: 'correspondence', label: 'Official Correspondence' },
    { value: 'contracts', label: 'Contracts' },
    { value: 'certificates', label: 'Certificates' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'pdf', label: 'PDF Documents' },
    { value: 'doc', label: 'Word Documents' },
    { value: 'image', label: 'Images' },
    { value: 'spreadsheet', label: 'Spreadsheets' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'compliant', label: 'Compliant' },
    { value: 'expiring', label: 'Expiring Soon' },
    { value: 'expired', label: 'Expired' },
    { value: 'pending', label: 'Pending Review' }
  ];

  const hasActiveFilters = selectedCategory !== 'all' || 
                          selectedType !== 'all' || 
                          selectedStatus !== 'all' || 
                          searchQuery || 
                          (dateRange?.start || dateRange?.end);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Documents</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
          placeholder="Select category"
        />

        <Select
          label="Document Type"
          options={typeOptions}
          value={selectedType}
          onChange={onTypeChange}
          placeholder="Select type"
        />

        <Select
          label="Compliance Status"
          options={statusOptions}
          value={selectedStatus}
          onChange={onStatusChange}
          placeholder="Select status"
        />

        <Input
          label="Search Documents"
          type="search"
          placeholder="Search by name or content..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="From Date"
          type="date"
          value={dateRange?.start}
          onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
        />

        <Input
          label="To Date"
          type="date"
          value={dateRange?.end}
          onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
        />
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Category: {categoryOptions?.find(opt => opt?.value === selectedCategory)?.label}
                <button
                  onClick={() => onCategoryChange('all')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Type: {typeOptions?.find(opt => opt?.value === selectedType)?.label}
                <button
                  onClick={() => onTypeChange('all')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Status: {statusOptions?.find(opt => opt?.value === selectedStatus)?.label}
                <button
                  onClick={() => onStatusChange('all')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Search: "{searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentFilters;