import React, { useState, useMemo, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import ClientTable from './components/ClientTable';
import ClientFilters from './components/ClientFilters';
import ClientModal from './components/ClientModal';
import BulkActions from './components/BulkActions';
import ClientStats from './components/ClientStats';
import Icon from '../../components/AppIcon';

const ClientManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'companyName', direction: 'asc' });
  const [modalState, setModalState] = useState({ isOpen: false, client: null, mode: 'view' });

  // Mock client data
  useEffect(() => {
    const mockClients = [
      {
        id: 1,
        companyName: "TechCorp Solutions",
        contactPerson: "Sarah Johnson",
        email: "sarah.johnson@techcorp.com",
        phone: "+1 (514) 555-0123",
        website: "techcorp.com",
        industry: "Technology",
        status: "Active",
        address: "1234 Rue Saint-Catherine, Montreal, QC H3G 1P1",
        taxId: "123456789RT0001",
        notes: "Long-term client with multiple ongoing projects. Prefers weekly status updates.",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-09-01T14:20:00Z"
      },
      {
        id: 2,
        companyName: "HealthFirst Clinic",
        contactPerson: "Dr. Michael Chen",
        email: "m.chen@healthfirst.ca",
        phone: "+1 (514) 555-0456",
        website: "healthfirst.ca",
        industry: "Healthcare",
        status: "Active",
        address: "5678 Boulevard René-Lévesque, Montreal, QC H2Z 1A1",
        taxId: "987654321RT0001",
        notes: "Healthcare client requiring HIPAA compliance for all digital solutions.",
        createdAt: "2024-02-20T09:15:00Z",
        updatedAt: "2024-08-28T16:45:00Z"
      },
      {
        id: 3,
        companyName: "EcoGreen Manufacturing",
        contactPerson: "Marie Dubois",
        email: "marie.dubois@ecogreen.qc.ca",
        phone: "+1 (514) 555-0789",
        website: "ecogreen.qc.ca",
        industry: "Manufacturing",
        status: "Pending",
        address: "9012 Avenue du Parc, Montreal, QC H2N 1X7",
        taxId: "456789123RT0001",
        notes: "New client in onboarding phase. Sustainability-focused manufacturing company.",
        createdAt: "2024-08-30T11:00:00Z",
        updatedAt: "2024-09-02T08:30:00Z"
      },
      {
        id: 4,
        companyName: "Quebec Finance Group",
        contactPerson: "Jean-Pierre Tremblay",
        email: "jp.tremblay@qfg.ca",
        phone: "+1 (514) 555-0321",
        website: "quebecfinance.ca",
        industry: "Finance",
        status: "Active",
        address: "3456 Rue Sherbrooke, Montreal, QC H3A 1B9",
        taxId: "789123456RT0001",
        notes: "Financial services client requiring enhanced security measures and compliance.",
        createdAt: "2024-03-10T13:45:00Z",
        updatedAt: "2024-09-01T10:15:00Z"
      },
      {
        id: 5,
        companyName: "EduTech Academy",
        contactPerson: "Lisa Wang",
        email: "lisa.wang@edutech.ca",
        phone: "+1 (514) 555-0654",
        website: "edutech.ca",
        industry: "Education",
        status: "On Hold",
        address: "7890 Rue University, Montreal, QC H3A 2A7",
        taxId: "321654987RT0001",
        notes: "Educational technology client. Project on hold due to budget constraints.",
        createdAt: "2024-04-05T15:20:00Z",
        updatedAt: "2024-08-15T12:00:00Z"
      },
      {
        id: 6,
        companyName: "Montreal Real Estate Co.",
        contactPerson: "Robert Martinez",
        email: "robert@mtlrealestate.com",
        phone: "+1 (514) 555-0987",
        website: "mtlrealestate.com",
        industry: "Real Estate",
        status: "Active",
        address: "2468 Boulevard Saint-Laurent, Montreal, QC H2X 2T1",
        taxId: "654987321RT0001",
        notes: "Real estate client specializing in commercial properties in Montreal area.",
        createdAt: "2024-05-12T08:30:00Z",
        updatedAt: "2024-09-03T14:10:00Z"
      },
      {
        id: 7,
        companyName: "Digital Commerce Plus",
        contactPerson: "Amanda Foster",
        email: "amanda@dcplus.ca",
        phone: "+1 (514) 555-0147",
        website: "dcplus.ca",
        industry: "E-commerce",
        status: "Inactive",
        address: "1357 Rue Sainte-Catherine, Montreal, QC H3G 2W5",
        taxId: "147258369RT0001",
        notes: "Former e-commerce client. Contract ended in July 2024. Open to future collaboration.",
        createdAt: "2023-11-20T16:45:00Z",
        updatedAt: "2024-07-31T17:30:00Z"
      },
      {
        id: 8,
        companyName: "Consulting Pro Services",
        contactPerson: "David Kim",
        email: "david.kim@consultingpro.ca",
        phone: "+1 (514) 555-0258",
        website: "consultingpro.ca",
        industry: "Consulting",
        status: "Active",
        address: "8642 Avenue McGill College, Montreal, QC H3A 3J6",
        taxId: "258369147RT0001",
        notes: "Management consulting firm requiring professional web presence and client portal.",
        createdAt: "2024-06-18T12:15:00Z",
        updatedAt: "2024-09-04T09:45:00Z"
      }
    ];

    setClients(mockClients);
  }, []);

  // Filtered and sorted clients
  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients?.filter(client => {
      const matchesSearch = !searchTerm || 
        client?.companyName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        client?.contactPerson?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        client?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesIndustry = !selectedIndustry || client?.industry === selectedIndustry;
      const matchesStatus = !selectedStatus || client?.status === selectedStatus;
      
      return matchesSearch && matchesIndustry && matchesStatus;
    });

    // Sort clients
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        const aValue = a?.[sortConfig?.key];
        const bValue = b?.[sortConfig?.key];
        
        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [clients, searchTerm, selectedIndustry, selectedStatus, sortConfig]);

  // Handlers
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectClient = (clientId) => {
    setSelectedClients(prev => 
      prev?.includes(clientId) 
        ? prev?.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedClients?.length === filteredAndSortedClients?.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredAndSortedClients?.map(client => client?.id));
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('');
    setSelectedStatus('');
  };

  const handleAddClient = () => {
    setModalState({ isOpen: true, client: null, mode: 'create' });
  };

  const handleEditClient = (client) => {
    setModalState({ isOpen: true, client, mode: 'edit' });
  };

  const handleViewClient = (client) => {
    setModalState({ isOpen: true, client, mode: 'view' });
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      setClients(prev => prev?.filter(client => client?.id !== clientId));
      setSelectedClients(prev => prev?.filter(id => id !== clientId));
    }
  };

  const handleSaveClient = (clientData) => {
    if (modalState?.mode === 'create') {
      setClients(prev => [...prev, clientData]);
    } else {
      setClients(prev => prev?.map(client => 
        client?.id === clientData?.id ? clientData : client
      ));
    }
  };

  const handleBulkStatusUpdate = (clientIds, newStatus) => {
    setClients(prev => prev?.map(client => 
      clientIds?.includes(client?.id) 
        ? { ...client, status: newStatus, updatedAt: new Date()?.toISOString() }
        : client
    ));
    setSelectedClients([]);
  };

  const handleBulkDelete = (clientIds) => {
    setClients(prev => prev?.filter(client => !clientIds?.includes(client?.id)));
    setSelectedClients([]);
  };

  const handleBulkExport = (clientIds, format) => {
    const exportClients = clients?.filter(client => clientIds?.includes(client?.id));
    
    if (format === 'csv') {
      const csvContent = [
        ['Company Name', 'Contact Person', 'Email', 'Phone', 'Website', 'Industry', 'Status'],
        ...exportClients?.map(client => [
          client?.companyName,
          client?.contactPerson,
          client?.email,
          client?.phone,
          client?.website,
          client?.industry,
          client?.status
        ])
      ]?.map(row => row?.join(','))?.join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL?.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clients-export-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
      a?.click();
      window.URL?.revokeObjectURL(url);
    }
    
    setSelectedClients([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Client Management</h1>
                <p className="text-muted-foreground">Manage your client relationships and profiles</p>
              </div>
            </div>
          </div>

          {/* Client Statistics */}
          <ClientStats clients={clients} />

          {/* Filters */}
          <ClientFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedIndustry={selectedIndustry}
            onIndustryChange={setSelectedIndustry}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onClearFilters={handleClearFilters}
            onAddClient={handleAddClient}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedClients={selectedClients}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onBulkDelete={handleBulkDelete}
            onBulkExport={handleBulkExport}
            onClearSelection={() => setSelectedClients([])}
          />

          {/* Client Table */}
          <ClientTable
            clients={filteredAndSortedClients}
            onEditClient={handleEditClient}
            onViewClient={handleViewClient}
            onDeleteClient={handleDeleteClient}
            selectedClients={selectedClients}
            onSelectClient={handleSelectClient}
            onSelectAll={handleSelectAll}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Results Summary */}
          {filteredAndSortedClients?.length > 0 && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Showing {filteredAndSortedClients?.length} of {clients?.length} clients
              {(searchTerm || selectedIndustry || selectedStatus) && (
                <span> (filtered)</span>
              )}
            </div>
          )}
        </div>
      </main>
      {/* Client Modal */}
      <ClientModal
        isOpen={modalState?.isOpen}
        onClose={() => setModalState({ isOpen: false, client: null, mode: 'view' })}
        client={modalState?.client}
        onSave={handleSaveClient}
        mode={modalState?.mode}
      />
    </div>
  );
};

export default ClientManagement;