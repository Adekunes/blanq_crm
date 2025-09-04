import React from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialStats = ({ testimonials }) => {
  const totalTestimonials = testimonials?.length;
  const averageRating = testimonials?.length > 0 
    ? (testimonials?.reduce((sum, t) => sum + t?.rating, 0) / testimonials?.length)?.toFixed(1)
    : 0;
  
  const withMedia = testimonials?.filter(t => t?.media && t?.media?.length > 0)?.length;
  const recentTestimonials = testimonials?.filter(t => {
    const testimonialDate = new Date(t.dateReceived);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo?.setDate(thirtyDaysAgo?.getDate() - 30);
    return testimonialDate >= thirtyDaysAgo;
  })?.length;

  const stats = [
    {
      label: 'Total Testimonials',
      value: totalTestimonials,
      icon: 'MessageSquare',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Average Rating',
      value: `${averageRating}/5`,
      icon: 'Star',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'With Media',
      value: withMedia,
      icon: 'Image',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Recent (30 days)',
      value: recentTestimonials,
      icon: 'Calendar',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialStats;