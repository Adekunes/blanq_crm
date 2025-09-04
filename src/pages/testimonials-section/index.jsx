import React, { useState, useMemo } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import TestimonialCard from './components/TestimonialCard';
import TestimonialFilters from './components/TestimonialFilters';
import TestimonialModal from './components/TestimonialModal';
import TestimonialStats from './components/TestimonialStats';
import ExportModal from './components/ExportModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TestimonialsSection = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [modalMode, setModalMode] = useState('view');

  // Mock testimonials data
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      clientName: "Sarah Johnson",
      company: "TechFlow Solutions",
      email: "sarah@techflow.com",
      content: `BLANQ Digital transformed our online presence completely. Their team delivered a stunning website redesign that increased our conversion rate by 40%. The attention to detail and professional approach throughout the project was exceptional. They understood our vision and brought it to life beyond our expectations.`,
      rating: 5,
      projectTags: ["Website Redesign", "UX/UI Design", "Conversion Optimization"],
      industry: "technology",
      dateReceived: "2024-08-15",
      media: [
        { id: 1, type: "image", name: "website-before-after.jpg", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
        { id: 2, type: "video", name: "client-testimonial.mp4", url: "#" }
      ]
    },
    {
      id: 2,
      clientName: "Michael Chen",
      company: "HealthCare Plus",
      email: "m.chen@healthcareplus.ca",
      content: `Working with BLANQ Digital on our brand identity project was a game-changer. They created a cohesive brand that resonates with our patients and stands out in the healthcare industry. The logo, color palette, and marketing materials all work together perfectly.`,
      rating: 5,
      projectTags: ["Brand Identity", "Logo Design", "Marketing Materials"],
      industry: "healthcare",
      dateReceived: "2024-08-22",
      media: [
        { id: 3, type: "image", name: "brand-showcase.jpg", url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800" }
      ]
    },
    {
      id: 3,
      clientName: "Emma Rodriguez",
      company: "Green Valley Retail",
      email: "emma@greenvalley.com",
      content: `The e-commerce platform BLANQ Digital built for us has revolutionized our business. Online sales increased by 200% in the first quarter. The user experience is seamless, and the admin panel makes inventory management effortless.`,
      rating: 5,
      projectTags: ["E-commerce Development", "Inventory Management", "Payment Integration"],
      industry: "retail",
      dateReceived: "2024-07-30",
      media: []
    },
    {
      id: 4,
      clientName: "David Thompson",
      company: "EduTech Academy",
      email: "david@edutech.ca",
      content: `BLANQ Digital's digital marketing strategy helped us reach 300% more students this semester. Their SEO work and social media campaigns were incredibly effective. The team is knowledgeable, responsive, and delivers results.`,
      rating: 4,
      projectTags: ["Digital Marketing", "SEO", "Social Media"],
      industry: "education",
      dateReceived: "2024-08-05",
      media: [
        { id: 4, type: "image", name: "marketing-results.jpg", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" }
      ]
    },
    {
      id: 5,
      clientName: "Lisa Park",
      company: "Mountain View Properties",
      email: "lisa@mountainview.ca",
      content: `The mobile app BLANQ Digital developed for our real estate business has streamlined our operations significantly. Clients can now browse properties, schedule viewings, and communicate with agents all in one place. Excellent work!`,
      rating: 5,
      projectTags: ["Mobile App", "Real Estate", "Client Portal"],
      industry: "real-estate",
      dateReceived: "2024-07-18",
      media: [
        { id: 5, type: "video", name: "app-demo.mp4", url: "#" }
      ]
    },
    {
      id: 6,
      clientName: "Robert Kim",
      company: "Maple Leaf Finance",
      email: "robert@mapleleaf.ca",
      content: `BLANQ Digital's expertise in financial services web development is outstanding. They created a secure, compliant platform that our clients trust. The project was delivered on time and within budget.`,
      rating: 4,
      projectTags: ["Web Development", "Security", "Compliance"],
      industry: "finance",
      dateReceived: "2024-08-28",
      media: []
    }
  ]);

  // Filter testimonials based on search and filters
  const filteredTestimonials = useMemo(() => {
    return testimonials?.filter(testimonial => {
      const matchesSearch = !searchTerm || 
        testimonial?.clientName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        testimonial?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        testimonial?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        testimonial?.projectTags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));

      const matchesProject = !selectedProject || 
        testimonial?.projectTags?.some(tag => tag?.toLowerCase()?.includes(selectedProject?.toLowerCase()));

      const matchesIndustry = !selectedIndustry || testimonial?.industry === selectedIndustry;

      const matchesMediaType = !selectedMediaType || 
        (selectedMediaType === 'text' && (!testimonial?.media || testimonial?.media?.length === 0)) ||
        (selectedMediaType === 'image' && testimonial?.media && testimonial?.media?.some(m => m?.type === 'image')) ||
        (selectedMediaType === 'video' && testimonial?.media && testimonial?.media?.some(m => m?.type === 'video'));

      const matchesRating = !selectedRating || 
        (selectedRating === '5' && testimonial?.rating === 5) ||
        (selectedRating === '4' && testimonial?.rating >= 4) ||
        (selectedRating === '3' && testimonial?.rating >= 3);

      return matchesSearch && matchesProject && matchesIndustry && matchesMediaType && matchesRating;
    });
  }, [testimonials, searchTerm, selectedProject, selectedIndustry, selectedMediaType, selectedRating]);

  const handleViewTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteTestimonial = (testimonial) => {
    if (window.confirm(`Are you sure you want to delete the testimonial from ${testimonial?.clientName}?`)) {
      setTestimonials(prev => prev?.filter(t => t?.id !== testimonial?.id));
    }
  };

  const handleCreateTestimonial = () => {
    setSelectedTestimonial(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleSaveTestimonial = (testimonialData) => {
    if (modalMode === 'create') {
      const newTestimonial = {
        ...testimonialData,
        id: Date.now()
      };
      setTestimonials(prev => [newTestimonial, ...prev]);
    } else if (modalMode === 'edit') {
      setTestimonials(prev => 
        prev?.map(t => t?.id === selectedTestimonial?.id ? { ...testimonialData, id: t?.id } : t)
      );
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedProject('');
    setSelectedIndustry('');
    setSelectedMediaType('');
    setSelectedRating('');
  };

  const handleExport = (exportData) => {
    // Mock export functionality
    console.log('Exporting testimonials:', exportData);
    
    // In a real application, this would generate and download the file
    const filename = `testimonials-export-${new Date()?.toISOString()?.split('T')?.[0]}.${exportData?.format}`;
    alert(`Export completed: ${filename}\n${exportData?.testimonials?.length} testimonials exported`);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Testimonials</h1>
              <p className="text-muted-foreground">
                Manage client feedback and success stories for marketing materials
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                onClick={() => setIsExportModalOpen(true)}
              >
                Export
              </Button>
              <Button
                iconName="Plus"
                onClick={handleCreateTestimonial}
              >
                New Testimonial
              </Button>
            </div>
          </div>

          {/* Stats */}
          <TestimonialStats testimonials={testimonials} />

          {/* Filters */}
          <TestimonialFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedProject={selectedProject}
            onProjectChange={setSelectedProject}
            selectedIndustry={selectedIndustry}
            onIndustryChange={setSelectedIndustry}
            selectedMediaType={selectedMediaType}
            onMediaTypeChange={setSelectedMediaType}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            onClearFilters={handleClearFilters}
          />

          {/* Results */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTestimonials?.length} of {testimonials?.length} testimonials
            </p>
          </div>

          {/* Testimonials Grid */}
          {filteredTestimonials?.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTestimonials?.map((testimonial) => (
                <TestimonialCard
                  key={testimonial?.id}
                  testimonial={testimonial}
                  onView={handleViewTestimonial}
                  onEdit={handleEditTestimonial}
                  onDelete={handleDeleteTestimonial}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No testimonials found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedProject || selectedIndustry || selectedMediaType || selectedRating
                  ? "Try adjusting your filters to see more results." :"Get started by adding your first client testimonial."
                }
              </p>
              {!searchTerm && !selectedProject && !selectedIndustry && !selectedMediaType && !selectedRating && (
                <Button iconName="Plus" onClick={handleCreateTestimonial}>
                  Add First Testimonial
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      {/* Modals */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testimonial={selectedTestimonial}
        onSave={handleSaveTestimonial}
        mode={modalMode}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        testimonials={filteredTestimonials}
        onExport={handleExport}
      />
    </div>
  );
};

export default TestimonialsSection;