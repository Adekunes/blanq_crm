import React, { useMemo, useState } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const TemplatesLibrary = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({ search: '', category: '' });
  const { role } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Master Contract Template', category: 'Contracts', description: 'Client services agreement', driveUrl: 'https://drive.google.com/contract-template', updatedAt: '2024-12-01' },
    { id: 2, name: 'Invoice Template v2', category: 'Finance', description: 'Invoice layout and fields', driveUrl: 'https://drive.google.com/invoice-template', updatedAt: '2024-11-20' },
    { id: 3, name: 'Proposal Deck', category: 'Proposals', description: 'Agency proposal slides', driveUrl: 'https://drive.google.com/proposal', updatedAt: '2024-10-05' },
    { id: 4, name: 'Onboarding Email', category: 'Communication', description: 'Welcome email for clients', driveUrl: 'https://drive.google.com/onboarding-email', updatedAt: '2024-09-15' },
    { id: 5, name: 'Brand Guidelines', category: 'Branding & Marketing', description: 'Brand guideline template', driveUrl: 'https://drive.google.com/brand-guidelines', updatedAt: '2024-08-10' },
  ]);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Contracts', label: 'Contracts' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Proposals', label: 'Proposals' },
    { value: 'Communication', label: 'Communication' },
    { value: 'Branding & Marketing', label: 'Branding & Marketing' }
  ];

  const filtered = useMemo(() => templates.filter(t => {
    const s = filters.search?.toLowerCase();
    const matchesSearch = !s || t.name.toLowerCase().includes(s) || (t.description || '').toLowerCase().includes(s);
    const matchesCategory = !filters.category || t.category === filters.category;
    return matchesSearch && matchesCategory;
  }), [templates, filters]);

  const exportCsv = () => {
    const rows = [
      ['Name', 'Category', 'Description', 'Drive URL', 'Updated At'],
      ...filtered.map(t => [t.name, t.category, (t.description || '').replace(/\n/g, ' '), t.driveUrl, t.updatedAt])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `templates-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const createNew = () => { setEditing(null); setShowModal(true); };
  const editItem = (t) => { setEditing(t); setShowModal(true); };

  const saveItem = (item) => {
    if (item?.id) {
      setTemplates(prev => prev.map(t => t.id === item.id ? item : t));
    } else {
      setTemplates(prev => [...prev, { ...item, id: Date.now() }]);
    }
    setShowModal(false);
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Layout" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Templates Library</h1>
                <p className="text-muted-foreground">Contracts, proposals, invoices, SOPs, and communication</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg border p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input type="search" placeholder="Search templates..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
              <Select value={filters.category} onChange={(v) => setFilters({ ...filters, category: v })} options={categoryOptions} />
              <div className="flex gap-2">
                <Button variant="outline" iconName="Download" onClick={exportCsv}>Export CSV</Button>
                {role === 'admin' && (
                  <Button iconName="Plus" onClick={createNew}>New</Button>
                )}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(t => (
              <div key={t.id} className="bg-card border rounded-lg p-4 hover:shadow-elevated transition-smooth">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{t.name}</h3>
                    <p className="text-xs text-muted-foreground">{t.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" iconName="ExternalLink" onClick={() => window.open(t.driveUrl, '_blank')}>Open</Button>
                    {role === 'admin' && (
                      <Button size="sm" variant="outline" iconName="Edit2" onClick={() => editItem(t)}>Edit</Button>
                    )}
                  </div>
                </div>
                {t.description && (
                  <p className="text-sm text-muted-foreground mt-3">{t.description}</p>
                )}
                <div className="text-xs text-muted-foreground mt-3">Updated {new Date(t.updatedAt).toLocaleDateString('en-CA')}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showModal && (
        <TemplateModal
          template={editing}
          onClose={() => { setShowModal(false); setEditing(null); }}
          onSave={saveItem}
        />
      )}
    </div>
  );
};

const TemplateModal = ({ template, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', category: '', description: '', driveUrl: '' });
  const options = [
    { value: 'Contracts', label: 'Contracts' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Proposals', label: 'Proposals' },
    { value: 'Communication', label: 'Communication' },
    { value: 'Branding & Marketing', label: 'Branding & Marketing' }
  ];

  React.useEffect(() => {
    if (template) {
      setForm({ name: template.name || '', category: template.category || '', description: template.description || '', driveUrl: template.driveUrl || '' });
    } else {
      setForm({ name: '', category: '', description: '', driveUrl: '' });
    }
  }, [template]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.driveUrl) return;
    onSave({ ...template, ...form, updatedAt: new Date().toISOString().slice(0,10) });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-popover text-popover-foreground border border-border rounded-lg w-full max-w-lg p-6 shadow-elevated">
        <h3 className="text-lg font-semibold mb-4">{template ? 'Edit Template' : 'New Template'}</h3>
        <form onSubmit={submit} className="space-y-3">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Select value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={options} />
          <Input placeholder="Google Drive URL" value={form.driveUrl} onChange={(e) => setForm({ ...form, driveUrl: e.target.value })} />
          <Input placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplatesLibrary;


