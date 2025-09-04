import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import ProjectCard from './components/ProjectCard';
import InvoiceCard from './components/InvoiceCard';
import QuickActionCard from './components/QuickActionCard';
import MetricCard from './components/MetricCard';
import RecentActivityList from './components/RecentActivityList';

import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Mock data for active projects
  const activeProjects = [
    {
      id: 1,
      name: "E-commerce Website Redesign",
      client: "TechCorp Solutions",
      status: "Active",
      deadline: "2025-01-15",
      assignedTo: "Sarah Johnson",
      completedMilestones: 3,
      totalMilestones: 5
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "StartupXYZ",
      status: "On Hold",
      deadline: "2025-01-20",
      assignedTo: "Mike Chen",
      completedMilestones: 2,
      totalMilestones: 6
    },
    {
      id: 3,
      name: "Brand Identity Package",
      client: "Local Restaurant Group",
      status: "Active",
      deadline: "2025-01-08",
      assignedTo: "Emma Wilson",
      completedMilestones: 4,
      totalMilestones: 4
    },
    {
      id: 4,
      name: "SEO Optimization Campaign",
      client: "Healthcare Plus",
      status: "Active",
      deadline: "2025-01-12",
      assignedTo: "David Rodriguez",
      completedMilestones: 1,
      totalMilestones: 3
    }
  ];

  // Mock data for pending invoices
  const pendingInvoices = [
    {
      id: 1,
      invoiceNumber: "INV-2025-001",
      client: "TechCorp Solutions",
      amount: 5500.00,
      status: "Pending",
      dueDate: "2025-01-10",
      project: "E-commerce Website Redesign"
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-089",
      client: "StartupXYZ",
      amount: 3200.00,
      status: "Overdue",
      dueDate: "2024-12-28",
      project: "Mobile App Development"
    },
    {
      id: 3,
      invoiceNumber: "INV-2025-002",
      client: "Healthcare Plus",
      amount: 2800.00,
      status: "Pending",
      dueDate: "2025-01-15",
      project: "SEO Optimization Campaign"
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "project_created",
      description: "New project \'Brand Identity Package\' created for Local Restaurant Group",
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 2,
      type: "invoice_paid",
      description: "Invoice INV-2024-088 marked as paid by TechCorp Solutions",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 3,
      type: "project_completed",
      description: "Project milestone completed for Healthcare Plus SEO campaign",
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: 4,
      type: "client_added",
      description: "New client \'Local Restaurant Group\' added to system",
      timestamp: new Date(Date.now() - 14400000) // 4 hours ago
    },
    {
      id: 5,
      type: "document_uploaded",
      description: "Contract template uploaded to Templates library",
      timestamp: new Date(Date.now() - 21600000) // 6 hours ago
    }
  ];

  // Quick action handlers
  const handleGoogleDriveAccess = (folderType) => {
    // Mock Google Drive folder links
    const driveLinks = {
      contracts: "https://drive.google.com/drive/folders/contracts",
      templates: "https://drive.google.com/drive/folders/templates",
      receipts: "https://drive.google.com/drive/folders/receipts",
      testimonials: "https://drive.google.com/drive/folders/testimonials"
    };
    
    // In a real app, this would open the Google Drive folder
    window.open(driveLinks?.[folderType], '_blank');
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    navigate('/project-management', { state: { selectedProject: project } });
  };

  const handleUpdateProjectStatus = (project) => {
    navigate('/project-management', { state: { editProject: project } });
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    // In a real app, this would open an invoice modal or navigate to invoice details
    console.log('Viewing invoice:', invoice);
  };

  const handleMarkInvoicePaid = (invoice) => {
    // In a real app, this would update the invoice status
    console.log('Marking invoice as paid:', invoice);
  };

  // Calculate metrics
  const totalActiveProjects = activeProjects?.filter(p => p?.status === 'Active')?.length;
  const overdueInvoices = pendingInvoices?.filter(i => i?.status === 'Overdue')?.length;
  const totalPendingAmount = pendingInvoices?.reduce((sum, invoice) => sum + invoice?.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`transition-layout ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your agency today.
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Active Projects"
              value={totalActiveProjects}
              icon="FolderOpen"
              color="primary"
              trend="up"
              trendValue="+2"
            />
            <MetricCard
              title="Overdue Invoices"
              value={overdueInvoices}
              icon="AlertTriangle"
              color="error"
              trend={overdueInvoices > 0 ? "up" : "stable"}
              trendValue={overdueInvoices > 0 ? `+${overdueInvoices}` : "0"}
            />
            <MetricCard
              title="Pending Amount"
              value={new Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })?.format(totalPendingAmount)}
              icon="DollarSign"
              color="warning"
              trend="up"
              trendValue="+12%"
            />
            <MetricCard
              title="New Clients"
              value="3"
              icon="Users"
              color="success"
              trend="up"
              trendValue="+1"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Projects and Invoices */}
            <div className="xl:col-span-2 space-y-8">
              {/* Active Projects Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Active Projects</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => navigate('/project-management')}
                  >
                    New Project
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {activeProjects?.slice(0, 4)?.map((project) => (
                    <ProjectCard
                      key={project?.id}
                      project={project}
                      onViewDetails={handleViewProject}
                      onUpdateStatus={handleUpdateProjectStatus}
                    />
                  ))}
                </div>
              </div>

              {/* Pending Invoices Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Pending Invoices</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="FileText"
                    iconPosition="left"
                    onClick={() => navigate('/client-management')}
                  >
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pendingInvoices?.map((invoice) => (
                    <InvoiceCard
                      key={invoice?.id}
                      invoice={invoice}
                      onViewInvoice={handleViewInvoice}
                      onMarkPaid={handleMarkInvoicePaid}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions and Activity */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <QuickActionCard
                    title="Contracts Folder"
                    description="Access signed contracts and agreements"
                    icon="FileText"
                    color="primary"
                    linkText="Open Drive"
                    onClick={() => handleGoogleDriveAccess('contracts')}
                  />
                  <QuickActionCard
                    title="Templates Library"
                    description="Contract templates, proposals, and documents"
                    icon="Layout"
                    color="accent"
                    linkText="Browse Templates"
                    onClick={() => handleGoogleDriveAccess('templates')}
                  />
                  <QuickActionCard
                    title="Receipts & Expenses"
                    description="Financial records and expense tracking"
                    icon="Receipt"
                    color="warning"
                    linkText="View Receipts"
                    onClick={() => handleGoogleDriveAccess('receipts')}
                  />
                  <QuickActionCard
                    title="Client Testimonials"
                    description="Collect and manage client feedback"
                    icon="MessageSquare"
                    color="success"
                    linkText="Manage Testimonials"
                    onClick={() => navigate('/testimonials-section')}
                  />
                </div>
              </div>

              {/* Recent Activity */}
              <RecentActivityList activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;