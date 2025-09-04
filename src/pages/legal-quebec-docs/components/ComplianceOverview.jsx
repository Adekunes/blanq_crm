import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceOverview = ({ documents, onViewExpiring, onViewExpired }) => {
  const totalDocuments = documents?.length;
  const compliantDocs = documents?.filter(doc => doc?.complianceStatus === 'compliant')?.length;
  const expiringDocs = documents?.filter(doc => doc?.complianceStatus === 'expiring')?.length;
  const expiredDocs = documents?.filter(doc => doc?.complianceStatus === 'expired')?.length;
  const pendingDocs = documents?.filter(doc => doc?.complianceStatus === 'pending')?.length;

  const complianceRate = totalDocuments > 0 ? Math.round((compliantDocs / totalDocuments) * 100) : 0;

  const stats = [
    {
      label: 'Total Documents',
      value: totalDocuments,
      icon: 'FileText',
      color: 'text-foreground',
      bgColor: 'bg-muted/10'
    },
    {
      label: 'Compliant',
      value: compliantDocs,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Expiring Soon',
      value: expiringDocs,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      action: expiringDocs > 0 ? onViewExpiring : null
    },
    {
      label: 'Expired',
      value: expiredDocs,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      action: expiredDocs > 0 ? onViewExpired : null
    }
  ];

  const upcomingRenewals = documents?.filter(doc => doc?.requiresRenewal && doc?.expiryDate)?.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))?.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Compliance Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Compliance Overview</h3>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{complianceRate}%</p>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Shield" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className={`${stat?.bgColor} rounded-lg p-4 ${stat?.action ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
              onClick={stat?.action}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon name={stat?.icon} size={20} className={stat?.color} />
                {stat?.action && (
                  <Icon name="ChevronRight" size={16} className={stat?.color} />
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Renewals */}
      {upcomingRenewals?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Upcoming Renewals</h3>
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
            >
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingRenewals?.map((doc, index) => {
              const daysUntilExpiry = Math.ceil(
                (new Date(doc.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
              );
              
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" size={16} className="text-warning" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc?.name}</p>
                      <p className="text-sm text-muted-foreground">{doc?.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : 'Expired'}
                    </p>
                    <p className="text-xs text-muted-foreground">{doc?.expiryDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Quebec Compliance Checklist */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={16} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Quebec Business Compliance</h3>
        </div>

        <div className="space-y-3">
          {[
            { item: 'Business Registration (REQ)', status: 'compliant' },
            { item: 'GST/HST Registration', status: 'compliant' },
            { item: 'Quebec Sales Tax (QST)', status: 'expiring' },
            { item: 'Workers\' Compensation (CNESST)', status: 'compliant' },
            { item: 'Professional Liability Insurance', status: 'compliant' }
          ]?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-foreground">{item?.item}</span>
              <div className="flex items-center space-x-2">
                {item?.status === 'compliant' && (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                )}
                {item?.status === 'expiring' && (
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                )}
                {item?.status === 'expired' && (
                  <Icon name="XCircle" size={16} className="text-error" />
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item?.status === 'compliant' ? 'bg-success/10 text-success' :
                  item?.status === 'expiring'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                }`}>
                  {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceOverview;