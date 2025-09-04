import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TaskFilters = ({ filters, onFilterChange, onClearFilters, partnerOptions }) => {
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
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => value !== '');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filter Tasks</h3>
          {hasActiveFilters() && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        
        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="text"
            placeholder="Search tasks, descriptions, or tags..."
            value={filters?.search}
            onChange={(e) => handleInputChange('search', e?.target?.value)}
            leftIcon="Search"
          />
        </div>

        {/* Assigned To */}
        <div>
          <Select
            placeholder="All Partners"
            options={partnerOptions}
            value={filters?.assignedTo}
            onChange={(value) => handleInputChange('assignedTo', value)}
            searchable={false}
          />
        </div>

        {/* Priority */}
        <div>
          <Select
            placeholder="All Priorities"
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => handleInputChange('priority', value)}
            searchable={false}
          />
        </div>

        {/* Status */}
        <div>
          <Select
            placeholder="All Statuses"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleInputChange('status', value)}
            searchable={false}
          />
        </div>

        {/* Due Date Range */}
        <div>
          <Input
            type="date"
            placeholder="Due date from"
            value={filters?.dueDateFrom}
            onChange={(e) => handleInputChange('dueDateFrom', e?.target?.value)}
            label="From"
          />
        </div>
      </div>
      {/* Second row for additional filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
        <div>
          <Input
            type="date"
            placeholder="Due date until"
            value={filters?.dueDateUntil}
            onChange={(e) => handleInputChange('dueDateUntil', e?.target?.value)}
            label="Until"
          />
        </div>

        {/* Quick Filter Buttons */}
        <div className="lg:col-span-5 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleInputChange('assignedTo', 'You')}
            className={filters?.assignedTo === 'You' ? 'bg-primary text-primary-foreground' : ''}
          >
            My Tasks
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleInputChange('assignedTo', 'Business Partner')}
            className={filters?.assignedTo === 'Business Partner' ? 'bg-primary text-primary-foreground' : ''}
          >
            Partner Tasks
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleInputChange('priority', 'high')}
            className={filters?.priority === 'high' ? 'bg-red-500 text-white' : ''}
          >
            High Priority
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date()?.toISOString()?.split('T')?.[0];
              const nextWeek = new Date();
              nextWeek?.setDate(nextWeek?.getDate() + 7);
              handleInputChange('dueDateFrom', today);
              handleInputChange('dueDateUntil', nextWeek?.toISOString()?.split('T')?.[0]);
            }}
            className={(filters?.dueDateFrom && filters?.dueDateUntil) ? 'bg-primary text-primary-foreground' : ''}
          >
            Due This Week
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const yesterday = new Date();
              yesterday?.setDate(yesterday?.getDate() - 1);
              handleInputChange('dueDateUntil', yesterday?.toISOString()?.split('T')?.[0]);
              handleInputChange('dueDateFrom', '');
            }}
          >
            Overdue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;