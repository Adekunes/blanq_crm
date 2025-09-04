import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvoiceCard = ({ invoice, onViewInvoice, onMarkPaid }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'overdue':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    })?.format(amount);
  };

  const getDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const isOverdue = invoice?.status?.toLowerCase() === 'overdue';
  const daysOverdue = isOverdue ? getDaysOverdue(invoice?.dueDate) : 0;

  return (
    <div className={`bg-card border rounded-lg p-6 hover:shadow-elevated transition-smooth ${
      isOverdue ? 'border-error/30 bg-error/5' : 'border-border'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-foreground">#{invoice?.invoiceNumber}</h3>
            {isOverdue && (
              <Icon name="AlertTriangle" size={16} className="text-error" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{invoice?.client}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice?.status)}`}>
          {invoice?.status}
        </span>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Amount:</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {formatAmount(invoice?.amount)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">
            Due: {new Date(invoice.dueDate)?.toLocaleDateString('en-CA')}
          </span>
        </div>

        {isOverdue && (
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-error" />
            <span className="text-sm text-error font-medium">
              {daysOverdue} days overdue
            </span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">Project: {invoice?.project}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewInvoice(invoice)}
        >
          View
        </Button>
        {invoice?.status?.toLowerCase() !== 'paid' && (
          <Button
            variant="success"
            size="sm"
            iconName="Check"
            iconPosition="left"
            onClick={() => onMarkPaid(invoice)}
          >
            Mark Paid
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvoiceCard;