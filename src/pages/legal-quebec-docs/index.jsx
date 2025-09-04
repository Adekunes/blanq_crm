import React, { useState, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import DocumentCard from './components/DocumentCard';
import DocumentFilters from './components/DocumentFilters';
import DocumentUploadModal from './components/DocumentUploadModal';
import DocumentPreviewModal from './components/DocumentPreviewModal';
import ComplianceOverview from './components/ComplianceOverview';

const LegalQuebecDocs = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [activeTab, setActiveTab] = useState('documents'); // 'documents' or 'compliance'

  // Filter states
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    status: 'all',
    search: '',
    dateRange: { start: '', end: '' }
  });

  // Mock documents data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Business Registration Certificate",
      category: "Registration",
      type: "registration",
      description: "Official business registration certificate from Quebec government",
      uploadDate: "2024-01-15",
      expiryDate: "2025-01-15",
      fileSize: 2048576,
      fileName: "business_registration_2024.pdf",
      complianceStatus: "compliant",
      tags: ["registration", "quebec", "business"],
      isConfidential: false,
      requiresRenewal: true,
      uploadedBy: "Admin User"
    },
    {
      id: 2,
      name: "GST Registration Document",
      category: "Taxes",
      type: "tax",
      description: "Goods and Services Tax registration certificate",
      uploadDate: "2024-02-10",
      expiryDate: "2025-02-10",
      fileSize: 1536000,
      fileName: "gst_registration.pdf",
      complianceStatus: "compliant",
      tags: ["gst", "tax", "federal"],
      isConfidential: true,
      requiresRenewal: true,
      uploadedBy: "Finance Manager"
    },
    {
      id: 3,
      name: "Quebec Sales Tax Certificate",
      category: "Taxes",
      type: "tax",
      description: "Provincial sales tax registration for Quebec",
      uploadDate: "2024-01-20",
      expiryDate: "2024-12-31",
      fileSize: 1024000,
      fileName: "qst_certificate.pdf",
      complianceStatus: "expiring",
      tags: ["qst", "quebec", "provincial"],
      isConfidential: true,
      requiresRenewal: true,
      uploadedBy: "Admin User"
    },
    {
      id: 4,
      name: "Professional Liability Insurance",
      category: "Official Correspondence",
      type: "certificate",
      description: "Professional liability insurance certificate",
      uploadDate: "2024-03-01",
      expiryDate: "2025-03-01",
      fileSize: 3072000,
      fileName: "liability_insurance_2024.pdf",
      complianceStatus: "compliant",
      tags: ["insurance", "liability", "professional"],
      isConfidential: false,
      requiresRenewal: true,
      uploadedBy: "HR Manager"
    },
    {
      id: 5,
      name: "CNESST Registration",
      category: "Registration",
      type: "registration",
      description: "Workers\' compensation board registration",
      uploadDate: "2023-12-15",
      expiryDate: "2024-08-15",
      fileSize: 2560000,
      fileName: "cnesst_registration.pdf",
      complianceStatus: "expired",
      tags: ["cnesst", "workers", "compensation"],
      isConfidential: true,
      requiresRenewal: true,
      uploadedBy: "Admin User"
    },
    {
      id: 6,
      name: "Revenue Quebec Correspondence",
      category: "Official Correspondence",
      type: "correspondence",
      description: "Official letter from Revenue Quebec regarding tax compliance",
      uploadDate: "2024-08-20",
      expiryDate: "",
      fileSize: 512000,
      fileName: "revenue_quebec_letter.pdf",
      complianceStatus: "compliant",
      tags: ["revenue", "quebec", "correspondence"],
      isConfidential: true,
      requiresRenewal: false,
      uploadedBy: "Finance Manager"
    }
  ]);

  // Filter documents based on current filters
  const filteredDocuments = documents?.filter(doc => {
    const matchesCategory = filters?.category === 'all' || doc?.category?.toLowerCase()?.includes(filters?.category);
    const matchesType = filters?.type === 'all' || doc?.type === filters?.type;
    const matchesStatus = filters?.status === 'all' || doc?.complianceStatus === filters?.status;
    const matchesSearch = !filters?.search || 
      doc?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      doc?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      doc?.tags?.some(tag => tag?.toLowerCase()?.includes(filters?.search?.toLowerCase()));
    
    const matchesDateRange = (!filters?.dateRange?.start || new Date(doc.uploadDate) >= new Date(filters.dateRange.start)) &&
                            (!filters?.dateRange?.end || new Date(doc.uploadDate) <= new Date(filters.dateRange.end));

    return matchesCategory && matchesType && matchesStatus && matchesSearch && matchesDateRange;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      type: 'all',
      status: 'all',
      search: '',
      dateRange: { start: '', end: '' }
    });
  };

  const handleDocumentUpload = (newDocument) => {
    setDocuments(prev => [newDocument, ...prev]);
    setIsUploadModalOpen(false);
  };

  const handleDocumentView = (document) => {
    setSelectedDocument(document);
    setIsPreviewModalOpen(true);
  };

  const handleDocumentDownload = (document) => {
    // Mock download functionality
    console.log('Downloading document:', document?.name);
  };

  const handleDocumentEdit = (document) => {
    console.log('Editing document:', document?.name);
  };

  const handleDocumentDelete = (document) => {
    if (window.confirm(`Are you sure you want to delete "${document?.name}"?`)) {
      setDocuments(prev => prev?.filter(doc => doc?.id !== document?.id));
    }
  };

  const handleViewExpiring = () => {
    setFilters(prev => ({ ...prev, status: 'expiring' }));
    setActiveTab('documents');
  };

  const handleViewExpired = () => {
    setFilters(prev => ({ ...prev, status: 'expired' }));
    setActiveTab('documents');
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Legal & Quebec Documents
              </h1>
              <p className="text-muted-foreground">
                Manage official business documentation with Quebec compliance tracking
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                iconName={viewMode === 'grid' ? 'List' : 'Grid3X3'}
                iconPosition="left"
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
              
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                New Document
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === 'documents'
                  ? 'bg-card text-foreground shadow-subtle' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="FileText" size={16} className="inline mr-2" />
              Documents ({filteredDocuments?.length})
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeTab === 'compliance' ?'bg-card text-foreground shadow-subtle' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Shield" size={16} className="inline mr-2" />
              Compliance Overview
            </button>
          </div>

          {/* Content */}
          {activeTab === 'documents' ? (
            <>
              {/* Filters */}
              <DocumentFilters
                selectedCategory={filters?.category}
                onCategoryChange={(value) => handleFilterChange('category', value)}
                selectedType={filters?.type}
                onTypeChange={(value) => handleFilterChange('type', value)}
                selectedStatus={filters?.status}
                onStatusChange={(value) => handleFilterChange('status', value)}
                searchQuery={filters?.search}
                onSearchChange={(value) => handleFilterChange('search', value)}
                dateRange={filters?.dateRange}
                onDateRangeChange={(value) => handleFilterChange('dateRange', value)}
                onClearFilters={handleClearFilters}
              />

              {/* Documents Grid/List */}
              {filteredDocuments?.length > 0 ? (
                <div className={`${
                  viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
                }`}>
                  {filteredDocuments?.map((document) => (
                    <DocumentCard
                      key={document?.id}
                      document={document}
                      onView={handleDocumentView}
                      onDownload={handleDocumentDownload}
                      onEdit={handleDocumentEdit}
                      onDelete={handleDocumentDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
                  <p className="text-muted-foreground mb-4">
                    {filters?.search || filters?.category !== 'all' || filters?.type !== 'all' || filters?.status !== 'all' ?'Try adjusting your filters to find what you\'re looking for.'
                      : 'Get started by uploading your first document.'
                    }
                  </p>
                  <Button
                    onClick={() => setIsUploadModalOpen(true)}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Upload Document
                  </Button>
                </div>
              )}
            </>
          ) : (
            <ComplianceOverview
              documents={documents}
              onViewExpiring={handleViewExpiring}
              onViewExpired={handleViewExpired}
            />
          )}
        </div>
      </main>
      {/* Modals */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleDocumentUpload}
      />
      <DocumentPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        document={selectedDocument}
      />
    </div>
  );
};

export default LegalQuebecDocs;