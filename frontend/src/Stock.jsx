import logoSvg from './assets/logo_pixel.png';
import React, { useState, useEffect } from 'react';
import api from './api/axios';
import {
  Search, Bell, User, Plus, Download, Minus,
  Package, LayoutGrid, AlertTriangle, Calendar,
  MoreHorizontal, ChevronLeft, ChevronRight,
  Pill, Activity, Beaker, FileText, Droplets, TrendingUp, Clock
} from 'lucide-react';

const Stock = () => {
  const [stockData, setStockData] = useState({
    kpis: { totalValue: "₹0", totalItems: 0, lowStock: 0, expiring: 0 },
    inventory: []
  });
  
  const [medicines, setMedicines] = useState([]);
  const [batches, setBatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOutModalOpen, setIsOutModalOpen] = useState(false);
  
  // Form State
  const [selectedMed, setSelectedMed] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [quantity, setQuantity] = useState('');
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [fefoResult, setFefoResult] = useState(null);

  const fetchData = async () => {
    try {
      const [medRes, batchRes] = await Promise.all([
        api.get('/medicines'),
        api.get('/batches')
      ]);
      setMedicines(medRes.data.medicines);
      setBatches(batchRes.data);
      
      const inv = medRes.data.medicines.map(med => {
        const medBatches = batchRes.data.filter(b => b.medicineId === med.medicineId);
        const currentStock = medBatches.reduce((sum, b) => b.expiryDate >= new Date().toISOString() ? sum + b.quantity : sum, 0);
        return {
          name: med.name,
          category: med.category,
          batch: medBatches.length > 0 ? medBatches.length + " batches" : "None",
          expiry: medBatches.length > 0 ? new Date(Math.min(...medBatches.map(b => new Date(b.expiryDate)))).toLocaleDateString() : "-",
          currentStock,
          minStock: med.minimumStock,
          status: currentStock > med.minimumStock ? 'In Stock' : 'Low Stock'
        };
      });
      
      setStockData({
        kpis: { 
          totalValue: "₹0", 
          totalItems: inv.reduce((sum, i) => sum + i.currentStock, 0), 
          lowStock: inv.filter(i => i.status === 'Low Stock').length, 
          expiring: 0 
        },
        inventory: inv
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredInventory = stockData.inventory.filter(item =>
    !searchQuery || JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleStockIn = async () => {
    if (!selectedMed || !selectedBatch || !quantity || quantity <= 0 || !Number.isInteger(Number(quantity))) {
      setErrorMsg("Please select a medicine, a batch, and enter a valid whole number quantity.");
      return;
    }
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await api.post('/stock/in', { medicineId: selectedMed, batchNumber: selectedBatch, quantity: Number(quantity) });
      setSuccessMsg(`Successfully added ${quantity} units!`);
      setQuantity('');
      setSelectedBatch('');
      fetchData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error adding stock");
    } finally {
      setSaving(false);
    }
  };

  const handleStockOut = async () => {
    if (!selectedMed || !quantity || quantity <= 0 || !Number.isInteger(Number(quantity))) {
      setErrorMsg("Please select a medicine and enter a valid whole number quantity.");
      return;
    }
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');
    setFefoResult(null);
    try {
      const res = await api.post('/stock/out', { medicineId: selectedMed, quantity: Number(quantity) });
      setSuccessMsg(`Successfully dispensed ${quantity} units!`);
      setFefoResult(res.data.batchesUsed);
      setQuantity('');
      fetchData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error dispensing stock");
    } finally {
      setSaving(false);
    }
  };
  
  const getAvailableStock = (medId) => {
    const medBatches = batches.filter(b => b.medicineId === medId && b.expiryDate >= new Date().toISOString() && b.quantity > 0);
    return medBatches.reduce((sum, b) => sum + b.quantity, 0);
  };

  return (
    <>
      <style>{`
        .batch-container {
          min-height: 100vh;
          background-color: #f1f5f9;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #0f172a;
          padding-bottom: 2rem;
        }

        /* Top Navigation */
        .top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 2rem;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: #0f172a;
        }

        .logo-mark {
          background-color: #1e293b;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1rem;
        }

        .nav-links {
          display: flex;
          gap: 0.5rem;
        }

        .nav-item {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
          text-decoration: none;
          transition: all 0.2s;
        }

        .nav-item:hover {
          color: #0f172a;
          background-color: #f8fafc;
        }

        .nav-item.active {
          background-color: #2563eb;
          color: white;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-search {
          position: relative;
          display: flex;
          align-items: center;
          width: 280px;
        }

        .nav-search input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          border-radius: 9999px;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.875rem;
        }

        .nav-search .search-icon {
          position: absolute;
          left: 0.75rem;
          color: #94a3b8;
          width: 16px;
          height: 16px;
        }

        .icon-btn {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .icon-btn::after {
          content: '';
          position: absolute;
          top: 6px;
          right: 6px;
          width: 6px;
          height: 6px;
          background-color: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
        }

        .icon-btn:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #e2e8f0;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.2;
        }

        .user-role {
          font-size: 0.75rem;
          color: #64748b;
        }

        /* Main Content */
        .main-content {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Page Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 0.875rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-outline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-outline:hover {
          background-color: #f8fafc;
          color: #0f172a;
        }

        .btn-solid {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background-color: #2563eb;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-solid:hover {
          background-color: #1d4ed8;
        }

        /* KPI Cards */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .kpi-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .kpi-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .kpi-icon {
          padding: 0.4rem;
          border-radius: 0.5rem;
        }

        .icon-blue { background-color: #eff6ff; color: #2563eb; }
        .icon-orange { background-color: #fff7ed; color: #f97316; }
        .icon-purple { background-color: #f3e8ff; color: #9333ea; }

        .kpi-value {
          font-size: 2rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.75rem;
          line-height: 1;
        }

        .kpi-footer {
          font-size: 0.8rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        
        .text-green { color: #16a34a; font-weight: 500; }
        .text-orange { color: #f97316; font-weight: 500; }
        .text-red { color: #ef4444; font-weight: 500; }

        /* Main Table Panel */
        .panel-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .panel-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .panel-controls {
          display: flex;
          gap: 1rem;
        }

        .table-search {
          position: relative;
          width: 250px;
        }

        .table-search input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.25rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.875rem;
        }

        .table-search .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .table-select {
          padding: 0.5rem 2rem 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background-color: white;
          font-size: 0.875rem;
          color: #475569;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
          background-size: 1em;
          cursor: pointer;
        }

        /* Table Styles */
        .table-container {
          width: 100%;
          overflow-x: auto;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        
        th {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 1rem 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        td {
          padding: 1.25rem 0.5rem;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .med-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .med-icon-wrapper {
          width: 32px;
          height: 32px;
          background-color: #eff6ff;
          color: #2563eb;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .med-info {
          display: flex;
          flex-direction: column;
        }

        .med-name {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.875rem;
        }

        .med-type {
          font-size: 0.75rem;
          color: #64748b;
        }

        .text-regular {
          font-size: 0.875rem;
          color: #475569;
        }
        
        .text-bold {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.875rem;
        }

        .batch-id {
          font-family: monospace;
          color: #64748b;
          font-size: 0.875rem;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .badge-instock {
          background-color: #eff6ff;
          color: #2563eb;
        }

        .badge-lowstock {
          background-color: #fff7ed;
          color: #f97316;
        }
        
        .val-orange {
          color: #f97316;
          font-weight: 600;
        }

        .action-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          color: #0f172a;
        }

        /* Pagination */
        .table-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          margin-top: 0.5rem;
        }

        .showing-text {
          font-size: 0.875rem;
          color: #64748b;
        }

        .pagination {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .page-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.375rem;
          background: none;
          border: none;
          font-size: 0.875rem;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
        }

        .page-btn:hover:not(.active) {
          background-color: #f1f5f9;
        }

        .page-btn.active {
          background-color: #2563eb;
          color: white;
        }

        /* Bottom Footer */
        .bottom-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          font-size: 0.75rem;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
          margin-top: 2rem;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-dot {
          width: 6px;
          height: 6px;
          background-color: #10b981;
          border-radius: 50%;
        }

        .footer-right {
          display: flex;
          gap: 1.5rem;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          width: 400px;
          max-width: 90%;
        }
        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .modal-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
      `}</style>

      <div className="batch-container">
        {/* Top Navigation */}
        <nav className="top-nav">
          <div className="nav-left">
            <div className="brand">
              <img src={logoSvg} alt="MedStock Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
              <span>MedStock</span>
            </div>
            <div className="nav-links">
              
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '9999px', margin: '0 1rem' }}>
              <a href="/dashboard" className="nav-item" style={{ padding: '0.4rem 1rem', borderRadius: '9999px', background: window.location.pathname === '/dashboard' ? 'white' : 'transparent', boxShadow: window.location.pathname === '/dashboard' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', color: window.location.pathname === '/dashboard' ? '#0f172a' : '#64748b', textDecoration: 'none', fontWeight: window.location.pathname === '/dashboard' ? '600' : '500' }}>Dashboard</a>
              <a href="/stock" className="nav-item" style={{ padding: '0.4rem 1rem', borderRadius: '9999px', background: window.location.pathname === '/stock' ? 'white' : 'transparent', boxShadow: window.location.pathname === '/stock' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', color: window.location.pathname === '/stock' ? '#0f172a' : '#64748b', textDecoration: 'none', fontWeight: window.location.pathname === '/stock' ? '600' : '500' }}>Stock</a>
              <a href="/batch" className="nav-item" style={{ padding: '0.4rem 1rem', borderRadius: '9999px', background: window.location.pathname === '/batch' ? 'white' : 'transparent', boxShadow: window.location.pathname === '/batch' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', color: window.location.pathname === '/batch' ? '#0f172a' : '#64748b', textDecoration: 'none', fontWeight: window.location.pathname === '/batch' ? '600' : '500' }}>Batches</a>
              <a href="/medicines" className="nav-item" style={{ padding: '0.4rem 1rem', borderRadius: '9999px', background: window.location.pathname === '/medicines' ? 'white' : 'transparent', boxShadow: window.location.pathname === '/medicines' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', color: window.location.pathname === '/medicines' ? '#0f172a' : '#64748b', textDecoration: 'none', fontWeight: window.location.pathname === '/medicines' ? '600' : '500' }}>Medicines</a>
              <a href="/transactions" className="nav-item" style={{ padding: '0.4rem 1rem', borderRadius: '9999px', background: window.location.pathname === '/transactions' ? 'white' : 'transparent', boxShadow: window.location.pathname === '/transactions' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', color: window.location.pathname === '/transactions' ? '#0f172a' : '#64748b', textDecoration: 'none', fontWeight: window.location.pathname === '/transactions' ? '600' : '500' }}>Transactions</a>
              <a href="/alert" className="nav-item" style={{ padding: '0.4rem 1rem', borderRadius: '9999px', background: window.location.pathname === '/alert' ? 'white' : 'transparent', boxShadow: window.location.pathname === '/alert' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', color: window.location.pathname === '/alert' ? '#0f172a' : '#64748b', textDecoration: 'none', fontWeight: window.location.pathname === '/alert' ? '600' : '500' }}>Alerts</a>
              <a href="/insights" style={{ background: '#2563eb', color: 'white', textDecoration: 'none', padding: '0.4rem 1rem', borderRadius: '9999px', fontWeight: '600', fontSize: '0.9rem', marginLeft: '0.5rem' }}>AI Insights & Reorder</a>
            </div>
</div>
          </div>

          <div className="nav-right">
            <div className="nav-search">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search medicines, NDC, batch..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                {/* Generic placeholder for user image */}
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80" alt="User" />
              </div>
              <div className="user-info">
                <span className="user-name">PG</span>
                <span className="user-role">Lead Pharmacist</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">

          {/* Header */}
          <header className="page-header">
            <div>
              <h1 className="page-title">Stock Inventory</h1>
              <p className="page-subtitle">Manage and track your current clinic and pharmacy stock levels.</p>
            </div>
            <div className="header-actions">
              <button className="btn-outline" onClick={() => { setIsOutModalOpen(true); setErrorMsg(''); setSuccessMsg(''); setFefoResult(null); }}>
                <Minus size={16} /> Dispense (OUT)
              </button>
              <button className="btn-solid" onClick={() => { setIsAddModalOpen(true); setErrorMsg(''); setSuccessMsg(''); }}>
                <Plus size={16} /> Add Stock (IN)
              </button>
            </div>
          </header>

          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Total Stock Value</span>
                <div className="kpi-icon icon-blue"><Activity size={18} /></div>
              </div>
              <div className="kpi-value">{stockData.kpis.totalValue}</div>
              <div className="kpi-footer">
                <TrendingUp size={14} className="text-green" />
                <span className="text-green">+0% this month</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Total Items in Stock</span>
                <div className="kpi-icon icon-blue"><Package size={18} /></div>
              </div>
              <div className="kpi-value">{stockData.kpis.totalItems}</div>
              <div className="kpi-footer">
                <TrendingUp size={14} className="text-green" />
                <span className="text-green">+0% this month</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Low Stock Items</span>
                <div className="kpi-icon icon-orange"><AlertTriangle size={18} /></div>
              </div>
              <div className="kpi-value">{stockData.kpis.lowStock}</div>
              <div className="kpi-footer">
                <AlertTriangle size={14} className="text-orange" />
                <span className="text-orange">Needs attention</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Expiring Soon</span>
                <div className="kpi-icon icon-blue"><Calendar size={18} /></div>
              </div>
              <div className="kpi-value">{stockData.kpis.expiring}</div>
              <div className="kpi-footer">
                <Clock size={14} className="text-red" />
                <span className="text-red">Within 30 days</span>
              </div>
            </div>
          </div>

          {/* Current Stock Table Panel */}
          <div className="panel-card">
            <div className="panel-header">
              <h2 className="panel-title">
                <LayoutGrid size={20} color="#2563eb" /> Current Stock
              </h2>
              <div className="panel-controls">
                <div className="table-search">
                  <Search size={16} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search medicine..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select className="table-select">
                  <option>All Categories</option>
                  <option>Pain Relief</option>
                  <option>Antibiotic</option>
                </select>
                <select className="table-select">
                  <option>All Stock Status</option>
                  <option>In Stock</option>
                  <option>Low Stock</option>
                </select>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Category</th>
                    <th>Batch No.</th>
                    <th>Expiry Date</th>
                    <th style={{ textAlign: 'center' }}>Current Stock</th>
                    <th style={{ textAlign: 'center' }}>Min Stock</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="med-cell">
                            <div className="med-icon-wrapper"><Pill size={16} /></div>
                            <div className="med-info">
                              <span className="med-name">{item.name}</span>
                              <span className="med-type">{item.type}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-regular">{item.category}</td>
                        <td className="batch-id">{item.batch}</td>
                        <td className="text-regular">{item.expiry}</td>
                        <td className={`text-bold ${item.status === 'Low Stock' ? 'val-orange' : ''}`} style={{ textAlign: 'center' }}>{item.currentStock}</td>
                        <td className="text-regular" style={{ textAlign: 'center' }}>{item.minStock}</td>
                        <td style={{ textAlign: 'center' }}><span className={`badge ${item.status === 'In Stock' ? 'badge-instock' : 'badge-lowstock'}`}>{item.status}</span></td>
                        <td style={{ textAlign: 'center' }}>
                          <button className="action-btn"><MoreHorizontal size={18} /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                        {searchQuery ? "No matches found." : "No stock loaded. Database connection pending."}
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="showing-text">Showing 1-7 of 342 medicines</div>
              <div className="pagination">
                <button className="page-btn"><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn">5</button>
                <button className="page-btn"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bottom-footer">
          <div className="footer-left">
            <span>MedStock Clinical Systems v2.4</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
              <span className="footer-dot"></span> DEA / FDA Compliant Audit Trail
            </span>
          </div>
          <div className="footer-right">
            <span>Protocols & Formulary</span>
            <span>Dispensary Support</span>
            <span>© 2024 MedStock Health Tech Inc.</span>
          </div>
        </footer>
      </div>
      
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add Stock (IN)</h3>
            
            {errorMsg && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fef2f2', borderRadius: '0.25rem' }}>{errorMsg}</div>}
            {successMsg && <div style={{ color: '#10b981', fontSize: '0.875rem', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ecfdf5', borderRadius: '0.25rem' }}>{successMsg}</div>}
            
            <select className="modal-input" value={selectedMed} onChange={e => { setSelectedMed(e.target.value); setSelectedBatch(''); }}>
              <option value="">Select Medicine</option>
              {medicines.map(m => (
                <option key={m._id} value={m.medicineId}>{m.name} ({m.medicineId})</option>
              ))}
            </select>
            
            <select className="modal-input" value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)} disabled={!selectedMed}>
              <option value="">Select Existing Batch</option>
              {batches.filter(b => b.medicineId === selectedMed).map(b => (
                <option key={b._id} value={b.batchNumber}>{b.batchNumber} (Expires: {new Date(b.expiryDate).toLocaleDateString()})</option>
              ))}
            </select>
            
            <input type="number" className="modal-input" placeholder="Quantity to add" value={quantity} onChange={e => setQuantity(e.target.value)} />
            
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setIsAddModalOpen(false)}>Close</button>
              <button className="btn-solid" onClick={handleStockIn} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isOutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Dispense Stock (OUT)</h3>
            
            {errorMsg && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fef2f2', borderRadius: '0.25rem' }}>{errorMsg}</div>}
            {successMsg && <div style={{ color: '#10b981', fontSize: '0.875rem', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ecfdf5', borderRadius: '0.25rem' }}>{successMsg}</div>}
            
            <select className="modal-input" value={selectedMed} onChange={e => setSelectedMed(e.target.value)}>
              <option value="">Select Medicine</option>
              {medicines.map(m => (
                <option key={m._id} value={m.medicineId}>{m.name} ({m.medicineId})</option>
              ))}
            </select>
            
            {selectedMed && (
              <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                Available Stock: <strong style={{ color: '#0f172a' }}>{getAvailableStock(selectedMed)} units</strong>
              </div>
            )}
            
            <input type="number" className="modal-input" placeholder="Quantity to dispense" value={quantity} onChange={e => setQuantity(e.target.value)} />
            
            {fefoResult && (
              <div style={{ fontSize: '0.75rem', backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <strong>FEFO Result:</strong>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem', marginBottom: 0 }}>
                  {fefoResult.map((b, i) => (
                    <li key={i}>Batch {b.batchNumber}: used {b.quantityTaken} (left: {b.quantityLeft})</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setIsOutModalOpen(false)}>Close</button>
              <button className="btn-solid" onClick={handleStockOut} disabled={saving}>
                {saving ? 'Saving...' : 'Dispense'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stock;
