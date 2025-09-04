import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCard = ({ document, onView, onDownload, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'bg-success/10 text-success border-success/20';
      case 'expiring':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'expired':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'registration':
        return 'Building';
      case 'tax':
        return 'Calculator';
      case 'correspondence':
        return 'Mail';
      case 'contract':
        return 'FileText';
      case 'certificate':
        return 'Award';
      default:
        return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getTypeIcon(document?.type)} size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{document?.name}</h3>
            <p className="text-sm text-muted-foreground">{document?.category}</p>
          </div>
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-8 w-8"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
          
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevated z-20">
                <div className="p-1">
                  <button
                    onClick={() => {
                      onView(document);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"
                  >
                    <Icon name="Eye" size={16} />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => {
                      onDownload(document);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"
                  >
                    <Icon name="Download" size={16} />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => {
                      onEdit(document);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"
                  >
                    <Icon name="Edit" size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(document);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md"
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Upload Date:</span>
          <span className="text-foreground">{document?.uploadDate}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">File Size:</span>
          <span className="text-foreground">{formatFileSize(document?.fileSize)}</span>
        </div>
        {document?.expiryDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Expires:</span>
            <span className="text-foreground">{document?.expiryDate}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(document?.complianceStatus)}`}>
          {document?.complianceStatus === 'compliant' && <Icon name="CheckCircle" size={12} className="mr-1" />}
          {document?.complianceStatus === 'expiring' && <Icon name="AlertTriangle" size={12} className="mr-1" />}
          {document?.complianceStatus === 'expired' && <Icon name="XCircle" size={12} className="mr-1" />}
          {document?.complianceStatus?.charAt(0)?.toUpperCase() + document?.complianceStatus?.slice(1)}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(document)}
          iconName="Eye"
          iconPosition="left"
          iconSize={14}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default DocumentCard;