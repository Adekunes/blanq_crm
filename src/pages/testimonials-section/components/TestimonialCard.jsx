import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestimonialCard = ({ testimonial, onView, onEdit, onDelete }) => {
  const getMediaTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'image':
        return 'Image';
      default:
        return 'FileText';
    }
  };

  const getMediaTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'text-blue-600';
      case 'image':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const truncateText = (text, maxLength = 120) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{testimonial?.clientName}</h3>
            <p className="text-sm text-muted-foreground">{testimonial?.company}</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => onView(testimonial)}
            className="h-8 w-8 p-0"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(testimonial)}
            className="h-8 w-8 p-0"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(testimonial)}
            className="h-8 w-8 p-0 text-error hover:text-error"
          />
        </div>
      </div>
      {/* Project Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {testimonial?.projectTags?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Testimonial Preview */}
      <div className="mb-4">
        <p className="text-foreground text-sm leading-relaxed">
          "{truncateText(testimonial?.content)}"
        </p>
      </div>
      {/* Media Indicators */}
      {testimonial?.media && testimonial?.media?.length > 0 && (
        <div className="flex items-center space-x-4 mb-4">
          {testimonial?.media?.map((media, index) => (
            <div key={index} className="flex items-center space-x-1">
              <Icon
                name={getMediaTypeIcon(media?.type)}
                size={16}
                className={getMediaTypeColor(media?.type)}
              />
              <span className="text-xs text-muted-foreground">
                {media?.type === 'video' ? 'Video' : 'Screenshot'}
              </span>
            </div>
          ))}
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {new Date(testimonial.dateReceived)?.toLocaleDateString('en-CA')}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={14} className="text-yellow-500" />
          <span className="text-sm font-medium text-foreground">
            {testimonial?.rating}/5
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;