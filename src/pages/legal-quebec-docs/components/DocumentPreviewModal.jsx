import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DocumentPreviewModal = ({ isOpen, onClose, document }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Mock total pages

  if (!isOpen || !document) return null;

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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const handleDownload = () => {
    // Mock download functionality
    const link = document?.createElement('a');
    link.href = '#';
    link.download = document?.fileName || document?.name;
    link?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{document?.name}</h2>
              <p className="text-sm text-muted-foreground">{document?.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Document Preview */}
          <div className="flex-1 flex flex-col bg-muted/30">
            {/* Preview Controls */}
            <div className="flex items-center justify-between p-4 bg-card border-b border-border">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                  iconSize={16}
                />
                <span className="text-sm text-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  iconName="ChevronRight"
                  iconSize={16}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="ZoomOut" iconSize={16} />
                <span className="text-sm text-foreground">100%</span>
                <Button variant="outline" size="sm" iconName="ZoomIn" iconSize={16} />
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="bg-white border border-border rounded-lg shadow-subtle w-full max-w-2xl aspect-[8.5/11] flex items-center justify-center">
                <div className="text-center">
                  <Icon name="FileText" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">Document Preview</p>
                  <p className="text-sm text-muted-foreground">
                    {document?.fileName || document?.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Details Sidebar */}
          <div className="w-80 bg-card border-l border-border p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">Document Details</h3>
            
            <div className="space-y-4">
              {/* Compliance Status */}
              <div>
                <label className="text-sm font-medium text-foreground">Compliance Status</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(document?.complianceStatus)}`}>
                    {document?.complianceStatus === 'compliant' && <Icon name="CheckCircle" size={12} className="mr-1" />}
                    {document?.complianceStatus === 'expiring' && <Icon name="AlertTriangle" size={12} className="mr-1" />}
                    {document?.complianceStatus === 'expired' && <Icon name="XCircle" size={12} className="mr-1" />}
                    {document?.complianceStatus?.charAt(0)?.toUpperCase() + document?.complianceStatus?.slice(1)}
                  </span>
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <p className="text-sm text-muted-foreground mt-1">{document?.category}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Document Type</label>
                  <p className="text-sm text-muted-foreground mt-1">{document?.type}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Upload Date</label>
                  <p className="text-sm text-muted-foreground mt-1">{document?.uploadDate}</p>
                </div>
                
                {document?.expiryDate && (
                  <div>
                    <label className="text-sm font-medium text-foreground">Expiry Date</label>
                    <p className="text-sm text-muted-foreground mt-1">{document?.expiryDate}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-foreground">File Size</label>
                  <p className="text-sm text-muted-foreground mt-1">{formatFileSize(document?.fileSize)}</p>
                </div>
                
                {document?.uploadedBy && (
                  <div>
                    <label className="text-sm font-medium text-foreground">Uploaded By</label>
                    <p className="text-sm text-muted-foreground mt-1">{document?.uploadedBy}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {document?.description && (
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <p className="text-sm text-muted-foreground mt-1">{document?.description}</p>
                </div>
              )}

              {/* Tags */}
              {document?.tags && document?.tags?.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-foreground">Tags</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {document?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Flags */}
              <div className="space-y-2">
                {document?.isConfidential && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Lock" size={16} className="text-warning" />
                    <span className="text-warning">Confidential Document</span>
                  </div>
                )}
                
                {document?.requiresRenewal && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="RefreshCw" size={16} className="text-primary" />
                    <span className="text-primary">Requires Renewal</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleDownload}
                >
                  Download Document
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Document
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;