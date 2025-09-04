import React, { useMemo, useState } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const Finance = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState('invoices'); // 'invoices' | 'receipts'
  const [invoiceFilters, setInvoiceFilters] = useState({
    search: '',
    status: '',
    client: ''
  });
  const [receiptFilters, setReceiptFilters] = useState({
    search: '',
    vendor: ''
  });
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [editingReceipt, setEditingReceipt] = useState(null);

  // Mock data for invoices
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: 'INV-2025-001',
      client: 'TechCorp Solutions',
      project: 'E-commerce Website Redesign',
      date: '2024-12-20',
      dueDate: '2025-01-10',
      amount: 5500,
      status: 'Pending'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-089',
      client: 'StartupXYZ',
      project: 'Mobile App Development',
      date: '2024-12-05',
      dueDate: '2024-12-28',
      amount: 3200,
      status: 'Overdue'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2025-002',
      client: 'Healthcare Plus',
      project: 'SEO Optimization Campaign',
      date: '2024-12-30',
      dueDate: '2025-01-15',
      amount: 2800,
      status: 'Pending'
    }
  ]);

  // Mock data for receipts
  const [receipts, setReceipts] = useState([
    {
      id: 1,
      name: 'Figma Subscription',
      vendor: 'Figma',
      amount: 30,
      date: '2024-12-01',
      notes: 'Monthly design tool subscription'
    },
    {
      id: 2,
      name: 'Google Workspace',
      vendor: 'Google',
      amount: 24,
      date: '2024-12-01',
      notes: 'Email and storage'
    },
    {
      id: 3,
      name: 'Stock Photos',
      vendor: 'Envato',
      amount: 59,
      date: '2024-12-12',
      notes: 'Project assets'
    }
  ]);

  const clientOptions = useMemo(() => [
    { value: '', label: 'All Clients' },
    { value: 'TechCorp Solutions', label: 'TechCorp Solutions' },
    { value: 'StartupXYZ', label: 'StartupXYZ' },
    { value: 'Healthcare Plus', label: 'Healthcare Plus' }
  ], []);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Overdue', label: 'Overdue' }
  ];

  const vendorOptions = useMemo(() => [
    { value: '', label: 'All Vendors' },
    { value: 'Figma', label: 'Figma' },
    { value: 'Google', label: 'Google' },
    { value: 'Envato', label: 'Envato' }
  ], []);

  const filteredInvoices = useMemo(() => {
    return invoices?.filter(inv => {
      const matchesSearch = !invoiceFilters?.search ||
        inv?.invoiceNumber?.toLowerCase()?.includes(invoiceFilters?.search?.toLowerCase()) ||
        inv?.client?.toLowerCase()?.includes(invoiceFilters?.search?.toLowerCase()) ||
        inv?.project?.toLowerCase()?.includes(invoiceFilters?.search?.toLowerCase());
      const matchesStatus = !invoiceFilters?.status || inv?.status === invoiceFilters?.status;
      const matchesClient = !invoiceFilters?.client || inv?.client === invoiceFilters?.client;
      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [invoices, invoiceFilters]);

  const filteredReceipts = useMemo(() => {
    return receipts?.filter(rec => {
      const matchesSearch = !receiptFilters?.search ||
        rec?.name?.toLowerCase()?.includes(receiptFilters?.search?.toLowerCase()) ||
        rec?.vendor?.toLowerCase()?.includes(receiptFilters?.search?.toLowerCase());
      const matchesVendor = !receiptFilters?.vendor || rec?.vendor === receiptFilters?.vendor;
      return matchesSearch && matchesVendor;
    });
  }, [receipts, receiptFilters]);

  const formatAmount = (amount) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);

  const exportInvoicesCsv = (rows) => {
    const csv = [
      ['Invoice #', 'Client', 'Project', 'Date', 'Due Date', 'Amount', 'Status'],
      ...rows.map(r => [r.invoiceNumber, r.client, r.project, r.date, r.dueDate, r.amount, r.status])
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoices-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportReceiptsCsv = (rows) => {
    const csv = [
      ['Receipt Name', 'Vendor', 'Amount', 'Date', 'Notes'],
      ...rows.map(r => [r.name, r.vendor, r.amount, r.date, (r.notes || '').replace(/\n/g, ' ')])
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipts-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCreateInvoice = () => {
    setEditingInvoice(null);
    setShowInvoiceModal(true);
  };

  const handleCreateReceipt = () => {
    setEditingReceipt(null);
    setShowReceiptModal(true);
  };

  const saveInvoice = (invoice) => {
    if (invoice?.id) {
      setInvoices(prev => prev.map(i => i.id === invoice.id ? invoice : i));
    } else {
      setInvoices(prev => [...prev, { ...invoice, id: Date.now() }]);
    }
    setShowInvoiceModal(false);
    setEditingInvoice(null);
  };

  const saveReceipt = (receipt) => {
    if (receipt?.id) {
      setReceipts(prev => prev.map(r => r.id === receipt.id ? receipt : r));
    } else {
      setReceipts(prev => [...prev, { ...receipt, id: Date.now() }]);
    }
    setShowReceiptModal(false);
    setEditingReceipt(null);
  };

  const markInvoicePaid = (invoice) => {
    setInvoices(prev => prev.map(i => i.id === invoice.id ? { ...i, status: 'Paid' } : i));
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Receipt" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Finance</h1>
                <p className="text-muted-foreground">Track invoices and receipts</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-md text-sm border ${activeTab === 'invoices' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'}`}
              onClick={() => setActiveTab('invoices')}
            >
              Invoices
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm border ${activeTab === 'receipts' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'}`}
              onClick={() => setActiveTab('receipts')}
            >
              Receipts
            </button>
          </div>

          {activeTab === 'invoices' && (
            <div className="space-y-4">
              {/* Filters and actions */}
              <div className="bg-card rounded-lg border p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Input
                    type="search"
                    placeholder="Search invoices, clients, projects..."
                    value={invoiceFilters.search}
                    onChange={(e) => setInvoiceFilters({ ...invoiceFilters, search: e.target.value })}
                  />
                  <Select
                    value={invoiceFilters.status}
                    onChange={(v) => setInvoiceFilters({ ...invoiceFilters, status: v })}
                    options={statusOptions}
                    placeholder="Status"
                  />
                  <Select
                    value={invoiceFilters.client}
                    onChange={(v) => setInvoiceFilters({ ...invoiceFilters, client: v })}
                    options={clientOptions}
                    placeholder="Client"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => exportInvoicesCsv(filteredInvoices)} variant="outline" iconName="Download">Export CSV</Button>
                    {role === 'admin' && (
                      <Button onClick={handleCreateInvoice} iconName="Plus" iconPosition="left">New</Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-card rounded-lg border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left">
                    <tr className="border-b">
                      <th className="p-3">Invoice #</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Project</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Due</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices?.map(inv => (
                      <tr key={inv.id} className="border-b hover:bg-muted/40">
                        <td className="p-3 font-medium">{inv.invoiceNumber}</td>
                        <td className="p-3">{inv.client}</td>
                        <td className="p-3">{inv.project}</td>
                        <td className="p-3">{new Date(inv.date).toLocaleDateString('en-CA')}</td>
                        <td className="p-3">{new Date(inv.dueDate).toLocaleDateString('en-CA')}</td>
                        <td className="p-3">{formatAmount(inv.amount)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            inv.status === 'Paid' ? 'bg-success text-success-foreground' :
                            inv.status === 'Pending' ? 'bg-warning text-warning-foreground' :
                            'bg-error text-error-foreground'
                          }`}>{inv.status}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2 justify-end">
                            {inv.status !== 'Paid' && role === 'admin' && (
                              <Button size="sm" variant="success" onClick={() => markInvoicePaid(inv)} iconName="Check">Mark Paid</Button>
                            )}
                            {role === 'admin' && (
                              <Button size="sm" variant="outline" onClick={() => { setEditingInvoice(inv); setShowInvoiceModal(true); }} iconName="Edit2">Edit</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'receipts' && (
            <div className="space-y-4">
              {/* Filters and actions */}
              <div className="bg-card rounded-lg border p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    type="search"
                    placeholder="Search receipts or vendors..."
                    value={receiptFilters.search}
                    onChange={(e) => setReceiptFilters({ ...receiptFilters, search: e.target.value })}
                  />
                  <Select
                    value={receiptFilters.vendor}
                    onChange={(v) => setReceiptFilters({ ...receiptFilters, vendor: v })}
                    options={vendorOptions}
                    placeholder="Vendor"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => exportReceiptsCsv(filteredReceipts)} variant="outline" iconName="Download">Export CSV</Button>
                    {role === 'admin' && (
                      <Button onClick={handleCreateReceipt} iconName="Plus" iconPosition="left">New</Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-card rounded-lg border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left">
                    <tr className="border-b">
                      <th className="p-3">Name</th>
                      <th className="p-3">Vendor</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Notes</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReceipts?.map(rec => (
                      <tr key={rec.id} className="border-b hover:bg-muted/40">
                        <td className="p-3 font-medium">{rec.name}</td>
                        <td className="p-3">{rec.vendor}</td>
                        <td className="p-3">{formatAmount(rec.amount)}</td>
                        <td className="p-3">{new Date(rec.date).toLocaleDateString('en-CA')}</td>
                        <td className="p-3 max-w-xs truncate" title={rec.notes}>{rec.notes}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2 justify-end">
                            {role === 'admin' && (
                              <Button size="sm" variant="outline" onClick={() => { setEditingReceipt(rec); setShowReceiptModal(true); }} iconName="Edit2">Edit</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showInvoiceModal && (
        <InvoiceModal
          invoice={editingInvoice}
          onClose={() => { setShowInvoiceModal(false); setEditingInvoice(null); }}
          onSave={saveInvoice}
        />
      )}
      {showReceiptModal && (
        <ReceiptModal
          receipt={editingReceipt}
          onClose={() => { setShowReceiptModal(false); setEditingReceipt(null); }}
          onSave={saveReceipt}
        />
      )}
    </div>
  );
};

const InvoiceModal = ({ invoice, onClose, onSave }) => {
  const [form, setForm] = useState({
    invoiceNumber: '',
    client: '',
    project: '',
    date: '',
    dueDate: '',
    amount: '',
    status: 'Pending'
  });
  const statusOptions = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Overdue', label: 'Overdue' }
  ];

  React.useEffect(() => {
    if (invoice) {
      setForm({
        invoiceNumber: invoice.invoiceNumber || '',
        client: invoice.client || '',
        project: invoice.project || '',
        date: invoice.date || '',
        dueDate: invoice.dueDate || '',
        amount: invoice.amount || '',
        status: invoice.status || 'Pending'
      });
    } else {
      setForm({ invoiceNumber: '', client: '', project: '', date: '', dueDate: '', amount: '', status: 'Pending' });
    }
  }, [invoice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.invoiceNumber || !form.client || !form.date || !form.amount) return;
    onSave({ ...invoice, ...form, amount: Number(form.amount) });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-popover text-popover-foreground border border-border rounded-lg w-full max-w-lg p-6 shadow-elevated">
        <h3 className="text-lg font-semibold mb-4">{invoice ? 'Edit Invoice' : 'New Invoice'}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Invoice #" value={form.invoiceNumber} onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })} />
          <Input placeholder="Client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
          <Input placeholder="Project" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input type="date" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Input type="date" placeholder="Due Date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input type="number" placeholder="Amount (CAD)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            <Select value={form.status} onChange={(v) => setForm({ ...form, status: v })} options={statusOptions} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ReceiptModal = ({ receipt, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    vendor: '',
    amount: '',
    date: '',
    notes: ''
  });

  React.useEffect(() => {
    if (receipt) {
      setForm({
        name: receipt.name || '',
        vendor: receipt.vendor || '',
        amount: receipt.amount || '',
        date: receipt.date || '',
        notes: receipt.notes || ''
      });
    } else {
      setForm({ name: '', vendor: '', amount: '', date: '', notes: '' });
    }
  }, [receipt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.vendor || !form.amount || !form.date) return;
    onSave({ ...receipt, ...form, amount: Number(form.amount) });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-popover text-popover-foreground border border-border rounded-lg w-full max-w-lg p-6 shadow-elevated">
        <h3 className="text-lg font-semibold mb-4">{receipt ? 'Edit Receipt' : 'New Receipt'}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Receipt Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Vendor" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input type="number" placeholder="Amount (CAD)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            <Input type="date" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <Input placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Finance;


