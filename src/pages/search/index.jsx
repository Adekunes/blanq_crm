import React, { useMemo, useState } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

// Lightweight in-memory global search across mocked datasets
const Search = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [query, setQuery] = useState('');

  // Local mirrors of other page mock data (minimal to demonstrate cross-entity search)
  const clients = [
    { id: 1, type: 'client', companyName: 'TechCorp Solutions', contactPerson: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com' },
    { id: 2, type: 'client', companyName: 'HealthFirst Clinic', contactPerson: 'Dr. Michael Chen', email: 'm.chen@healthfirst.ca' }
  ];

  const projects = [
    { id: 1, type: 'project', name: 'E-commerce Website Redesign', client: 'TechCorp Solutions', status: 'active' },
    { id: 2, type: 'project', name: 'Brand Identity Package', client: 'Green Valley Restaurant', status: 'completed' }
  ];

  const invoices = [
    { id: 1, type: 'invoice', invoiceNumber: 'INV-2025-001', client: 'TechCorp Solutions', status: 'Pending' },
    { id: 2, type: 'invoice', invoiceNumber: 'INV-2024-089', client: 'StartupXYZ', status: 'Overdue' }
  ];

  const templates = [
    { id: 1, type: 'template', name: 'Master Contract Template', category: 'Contracts' },
    { id: 2, type: 'template', name: 'Invoice Template v2', category: 'Finance' }
  ];

  const results = useMemo(() => {
    if (!query?.trim()) return [];
    const q = query.toLowerCase();
    const r = [];
    clients.forEach(c => {
      if (c.companyName.toLowerCase().includes(q) || c.contactPerson.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)) {
        r.push({ kind: 'Client', title: c.companyName, subtitle: `${c.contactPerson} • ${c.email}` });
      }
    });
    projects.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)) {
        r.push({ kind: 'Project', title: p.name, subtitle: `${p.client} • ${p.status}` });
      }
    });
    invoices.forEach(i => {
      if (i.invoiceNumber.toLowerCase().includes(q) || i.client.toLowerCase().includes(q)) {
        r.push({ kind: 'Invoice', title: `#${i.invoiceNumber}`, subtitle: `${i.client} • ${i.status}` });
      }
    });
    templates.forEach(t => {
      if (t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) {
        r.push({ kind: 'Template', title: t.name, subtitle: t.category });
      }
    });
    return r;
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Search" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Global Search</h1>
              <p className="text-muted-foreground">Search across clients, projects, invoices, and templates</p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <Input type="search" placeholder="Type to search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div className="mt-6 space-y-2">
            {results.length === 0 && query && (
              <div className="text-sm text-muted-foreground">No results.</div>
            )}
            {results.map((r, idx) => (
              <div key={idx} className="bg-card border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.subtitle}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-muted text-foreground">{r.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;



