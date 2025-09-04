import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientTable = ({ 
  clients, 
  onEditClient, 
  onViewClient, 
  onDeleteClient,
  selectedClients,
  onSelectClient,
  onSelectAll,
  sortConfig,
  onSort
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' },
      'Inactive': { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-muted-foreground' },
      'Pending': { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' },
      'On Hold': { bg: 'bg-error/10', text: 'text-error', dot: 'bg-error' }
    };

    const config = statusConfig?.[status] || statusConfig?.['Inactive'];

    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config?.dot}`}></span>
        {status}
      </span>
    );
  };

  const formatWebsite = (website) => {
    if (!website) return '-';
    const url = website?.startsWith('http') ? website : `https://${website}`;
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 transition-colors"
        onClick={(e) => e?.stopPropagation()}
      >
        {website}
      </a>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedClients?.length === clients?.length && clients?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'companyName', label: 'Company' },
                { key: 'contactPerson', label: 'Contact Person' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'website', label: 'Website' },
                { key: 'status', label: 'Status' }
              ]?.map((column) => (
                <th 
                  key={column?.key}
                  className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => onSort(column?.key)}
                >
                  <div className="flex items-center gap-2">
                    {column?.label}
                    {getSortIcon(column?.key)}
                  </div>
                </th>
              ))}
              <th className="w-24 px-4 py-3 text-center text-sm font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clients?.map((client) => (
              <tr
                key={client?.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onViewClient(client)}
                onMouseEnter={() => setHoveredRow(client?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedClients?.includes(client?.id)}
                    onChange={() => onSelectClient(client?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{client?.companyName}</div>
                  <div className="text-sm text-muted-foreground">{client?.industry}</div>
                </td>
                <td className="px-4 py-3 text-foreground">{client?.contactPerson}</td>
                <td className="px-4 py-3">
                  <a 
                    href={`mailto:${client?.email}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                    onClick={(e) => e?.stopPropagation()}
                  >
                    {client?.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-foreground">{client?.phone}</td>
                <td className="px-4 py-3">{formatWebsite(client?.website)}</td>
                <td className="px-4 py-3">{getStatusBadge(client?.status)}</td>
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditClient(client)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit2" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteClient(client?.id)}
                      className="h-8 w-8 text-error hover:text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {clients?.map((client) => (
          <div
            key={client?.id}
            className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={() => onViewClient(client)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedClients?.includes(client?.id)}
                  onChange={() => onSelectClient(client?.id)}
                  className="rounded border-border"
                  onClick={(e) => e?.stopPropagation()}
                />
                <div>
                  <h3 className="font-medium text-foreground">{client?.companyName}</h3>
                  <p className="text-sm text-muted-foreground">{client?.industry}</p>
                </div>
              </div>
              {getStatusBadge(client?.status)}
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="User" size={14} className="text-muted-foreground" />
                <span className="text-foreground">{client?.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <a 
                  href={`mailto:${client?.email}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                  onClick={(e) => e?.stopPropagation()}
                >
                  {client?.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-foreground">{client?.phone}</span>
              </div>
              {client?.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Globe" size={14} className="text-muted-foreground" />
                  {formatWebsite(client?.website)}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2" onClick={(e) => e?.stopPropagation()}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditClient(client)}
                iconName="Edit2"
                iconPosition="left"
                iconSize={14}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDeleteClient(client?.id)}
                className="text-error border-error hover:bg-error hover:text-white"
                iconName="Trash2"
                iconPosition="left"
                iconSize={14}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {clients?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No clients found</h3>
          <p className="text-muted-foreground">Get started by adding your first client.</p>
        </div>
      )}
    </div>
  );
};

export default ClientTable;