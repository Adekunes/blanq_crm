import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProjectFilters from './components/ProjectFilters';
import ProjectTable from './components/ProjectTable';
import ProjectModal from './components/ProjectModal';
import ProjectDetailModal from './components/ProjectDetailModal';

const ProjectManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'deadline', direction: 'asc' });
  const [filters, setFilters] = useState({
    status: '',
    client: '',
    assignedTo: '',
    projectType: '',
    search: '',
    startDateFrom: '',
    deadlineUntil: ''
  });

  // Mock data for projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-commerce Website Redesign",
      client: "TechCorp Solutions",
      startDate: "2024-08-15",
      deadline: "2024-09-30",
      assignedTo: "Sarah Johnson",
      status: "active",
      projectType: "website",
      progress: 65,
      budget: "15000",
      description: `Complete redesign of the existing e-commerce platform with modern UI/UX principles.\nFocus on mobile responsiveness and conversion optimization.\nIntegration with new payment gateway and inventory management system.`,
      deliverables: [
        { id: 1, text: "User research and wireframes", completed: true },
        { id: 2, text: "Homepage design mockups", completed: true },
        { id: 3, text: "Product catalog pages", completed: false },
        { id: 4, text: "Shopping cart functionality", completed: false },
        { id: 5, text: "Payment integration", completed: false }
      ],
      notes: `Client prefers minimalist design approach.\nRequested weekly progress updates.\nBudget includes 3 months of post-launch support.`,
      driveLinks: [
        { id: 1, name: "Design Assets", url: "https://drive.google.com/drive/folders/1abc123" },
        { id: 2, name: "Client Feedback", url: "https://drive.google.com/drive/folders/2def456" }
      ],
      attachments: []
    },
    {
      id: 2,
      name: "Brand Identity Package",
      client: "Green Valley Restaurant",
      startDate: "2024-08-20",
      deadline: "2024-09-15",
      assignedTo: "Michael Chen",
      status: "completed",
      projectType: "branding",
      progress: 100,
      budget: "8500",
      description: `Complete brand identity development including logo design, color palette, and marketing materials.\nCreation of brand guidelines and application across various touchpoints.`,
      deliverables: [
        { id: 1, text: "Logo concepts and variations", completed: true },
        { id: 2, text: "Brand color palette", completed: true },
        { id: 3, text: "Typography selection", completed: true },
        { id: 4, text: "Business card design", completed: true },
        { id: 5, text: "Menu design templates", completed: true }
      ],
      notes: `Client loved the organic, nature-inspired approach.\nAll deliverables approved on first review.\nRequested additional social media templates.`,
      driveLinks: [
        { id: 1, name: "Final Brand Assets", url: "https://drive.google.com/drive/folders/3ghi789" }
      ],
      attachments: []
    },
    {
      id: 3,
      name: "SEO Optimization Campaign",
      client: "Local Law Firm",
      startDate: "2024-09-01",
      deadline: "2024-12-01",
      assignedTo: "David Rodriguez",
      status: "active",
      projectType: "seo",
      progress: 25,
      budget: "12000",
      description: `Comprehensive SEO strategy implementation for local law firm.\nKeyword research, on-page optimization, and local search enhancement.\nMonthly reporting and strategy adjustments.`,
      deliverables: [
        { id: 1, text: "SEO audit and analysis", completed: true },
        { id: 2, text: "Keyword research report", completed: false },
        { id: 3, text: "On-page optimization", completed: false },
        { id: 4, text: "Local listings optimization", completed: false },
        { id: 5, text: "Content strategy plan", completed: false }
      ],
      notes: `Focus on personal injury and family law keywords.\nCompetitor analysis shows strong local competition.\nClient wants monthly progress reports.`,
      driveLinks: [],
      attachments: []
    },
    {
      id: 4,
      name: "Social Media Management",
      client: "Fashion Boutique",
      startDate: "2024-07-15",
      deadline: "2024-10-15",
      assignedTo: "Emma Wilson",
      status: "on-hold",
      projectType: "marketing",
      progress: 40,
      budget: "6000",
      description: `Three-month social media management campaign for fashion boutique.\nContent creation, posting schedule, and engagement management.\nFocus on Instagram and Facebook platforms.`,
      deliverables: [
        { id: 1, text: "Content calendar creation", completed: true },
        { id: 2, text: "Brand photography session", completed: true },
        { id: 3, text: "Instagram story templates", completed: false },
        { id: 4, text: "Influencer collaboration setup", completed: false }
      ],
      notes: `Project on hold due to client budget constraints.\nPlan to resume in October 2024.\nAll created content stored in shared drive.`,
      driveLinks: [
        { id: 1, name: "Content Assets", url: "https://drive.google.com/drive/folders/4jkl012" }
      ],
      attachments: []
    },
    {
      id: 5,
      name: "Website Maintenance Package",
      client: "Healthcare Clinic",
      startDate: "2024-08-01",
      deadline: "2024-11-01",
      assignedTo: "Alex Thompson",
      status: "active",
      projectType: "maintenance",
      progress: 80,
      budget: "4500",
      description: `Ongoing website maintenance and security updates for healthcare clinic.\nRegular backups, plugin updates, and performance monitoring.\nMonthly security scans and optimization.`,
      deliverables: [
        { id: 1, text: "Security audit and hardening", completed: true },
        { id: 2, text: "Performance optimization", completed: true },
        { id: 3, text: "Backup system setup", completed: true },
        { id: 4, text: "Monthly maintenance reports", completed: false }
      ],
      notes: `Client requires HIPAA compliance considerations.\nScheduled maintenance windows on weekends.\nEmergency support included in package.`,
      driveLinks: [],
      attachments: []
    }
  ]);

  // Mock data for dropdowns
  const clientOptions = [
    { value: "TechCorp Solutions", label: "TechCorp Solutions" },
    { value: "Green Valley Restaurant", label: "Green Valley Restaurant" },
    { value: "Local Law Firm", label: "Local Law Firm" },
    { value: "Fashion Boutique", label: "Fashion Boutique" },
    { value: "Healthcare Clinic", label: "Healthcare Clinic" },
    { value: "Startup Inc", label: "Startup Inc" },
    { value: "Retail Chain", label: "Retail Chain" }
  ];

  const teamMemberOptions = [
    { value: "Sarah Johnson", label: "Sarah Johnson" },
    { value: "Michael Chen", label: "Michael Chen" },
    { value: "David Rodriguez", label: "David Rodriguez" },
    { value: "Emma Wilson", label: "Emma Wilson" },
    { value: "Alex Thompson", label: "Alex Thompson" },
    { value: "Lisa Park", label: "Lisa Park" },
    { value: "James Miller", label: "James Miller" }
  ];

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects?.filter(project => {
      const matchesStatus = !filters?.status || project?.status === filters?.status;
      const matchesClient = !filters?.client || project?.client === filters?.client;
      const matchesAssignedTo = !filters?.assignedTo || project?.assignedTo === filters?.assignedTo;
      const matchesProjectType = !filters?.projectType || project?.projectType === filters?.projectType;
      const matchesSearch = !filters?.search || 
        project?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        project?.client?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      const matchesStartDate = !filters?.startDateFrom || project?.startDate >= filters?.startDateFrom;
      const matchesDeadline = !filters?.deadlineUntil || project?.deadline <= filters?.deadlineUntil;

      return matchesStatus && matchesClient && matchesAssignedTo && matchesProjectType && 
             matchesSearch && matchesStartDate && matchesDeadline;
    });

    // Sort projects
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        // Handle date sorting
        if (sortConfig?.key === 'startDate' || sortConfig?.key === 'deadline') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

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
  }, [projects, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      client: '',
      assignedTo: '',
      projectType: '',
      search: '',
      startDateFrom: '',
      deadlineUntil: ''
    });
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
    setShowDetailModal(false);
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev?.filter(p => p?.id !== projectId));
    }
  };

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      // Update existing project
      setProjects(prev => prev?.map(p => 
        p?.id === editingProject?.id 
          ? { ...p, ...projectData, id: editingProject?.id }
          : p
      ));
    } else {
      // Create new project
      const newProject = {
        ...projectData,
        id: Math.max(...projects?.map(p => p?.id)) + 1,
        progress: 0
      };
      setProjects(prev => [...prev, newProject]);
    }
    setShowProjectModal(false);
    setEditingProject(null);
  };

  const handleBulkStatusUpdate = (projectIds, newStatus) => {
    setProjects(prev => prev?.map(project => 
      projectIds?.includes(project?.id) 
        ? { ...project, status: newStatus }
        : project
    ));
  };

  const getStatusCounts = () => {
    return {
      total: projects?.length,
      active: projects?.filter(p => p?.status === 'active')?.length,
      onHold: projects?.filter(p => p?.status === 'on-hold')?.length,
      completed: projects?.filter(p => p?.status === 'completed')?.length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <>
      <Helmet>
        <title>Project Management - BLANQ CRM</title>
        <meta name="description" content="Manage digital agency projects, track milestones, and coordinate team assignments efficiently." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Project Management
                </h1>
                <p className="text-muted-foreground">
                  Track projects, manage deadlines, and coordinate team assignments
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
                <Button
                  onClick={handleNewProject}
                  iconName="Plus"
                  iconPosition="left"
                >
                  New Project
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="FolderOpen" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Projects</p>
                    <p className="text-2xl font-bold text-foreground">{statusCounts?.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Play" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold text-foreground">{statusCounts?.active}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Pause" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">On Hold</p>
                    <p className="text-2xl font-bold text-foreground">{statusCounts?.onHold}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">{statusCounts?.completed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <ProjectFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              clientOptions={clientOptions}
              teamMemberOptions={teamMemberOptions}
            />

            {/* Projects Table */}
            <ProjectTable
              projects={filteredAndSortedProjects}
              onEditProject={handleEditProject}
              onViewProject={handleViewProject}
              onDeleteProject={handleDeleteProject}
              onBulkStatusUpdate={handleBulkStatusUpdate}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
        </main>

        {/* Project Modal */}
        <ProjectModal
          isOpen={showProjectModal}
          onClose={() => {
            setShowProjectModal(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
          project={editingProject}
          clientOptions={clientOptions}
          teamMemberOptions={teamMemberOptions}
        />

        {/* Project Detail Modal */}
        <ProjectDetailModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
          onEdit={handleEditProject}
        />
      </div>
    </>
  );
};

export default ProjectManagement;