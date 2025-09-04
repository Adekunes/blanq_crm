import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  selectedClients, 
  onBulkStatusUpdate, 
  onBulkDelete, 
  onBulkExport,
  onClearSelection 
}) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('');

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
    { value: 'On Hold', label: 'On Hold' }
  ];

  const handleBulkStatusUpdate = () => {
    if (bulkStatus && selectedClients?.length > 0) {
      onBulkStatusUpdate(selectedClients, bulkStatus);
      setBulkStatus('');
      setIsActionsOpen(false);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedClients?.length} client(s)? This action cannot be undone.`)) {
      onBulkDelete(selectedClients);
      setIsActionsOpen(false);
    }
  };

  const handleBulkExport = (format) => {
    onBulkExport(selectedClients, format);
    setIsActionsOpen(false);
  };

  if (selectedClients?.length === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedClients?.length} client{selectedClients?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            iconSize={14}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear Selection
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Select
                options={statusOptions}
                value={bulkStatus}
                onChange={setBulkStatus}
                placeholder="Change status..."
                className="w-40"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkStatusUpdate}
                disabled={!bulkStatus}
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={14}
              >
                Update
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkExport('csv')}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export CSV
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDelete}
              className="text-error border-error hover:bg-error hover:text-white"
              iconName="Trash2"
              iconPosition="left"
              iconSize={14}
            >
              Delete
            </Button>
          </div>

          {/* Mobile Actions Dropdown */}
          <div className="md:hidden relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              iconName="MoreVertical"
              iconSize={16}
            />

            {isActionsOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsActionsOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-20">
                  <div className="p-2 space-y-1">
                    <div className="px-3 py-2 border-b border-border">
                      <Select
                        options={statusOptions}
                        value={bulkStatus}
                        onChange={setBulkStatus}
                        placeholder="Change status..."
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBulkStatusUpdate}
                        disabled={!bulkStatus}
                        className="w-full mt-2"
                        iconName="RefreshCw"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Update Status
                      </Button>
                    </div>
                    
                    <button
                      onClick={() => handleBulkExport('csv')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      <Icon name="Download" size={14} />
                      Export CSV
                    </button>
                    
                    <button
                      onClick={() => handleBulkExport('pdf')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      <Icon name="FileText" size={14} />
                      Export PDF
                    </button>
                    
                    <button
                      onClick={handleBulkDelete}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-colors"
                    >
                      <Icon name="Trash2" size={14} />
                      Delete Selected
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;