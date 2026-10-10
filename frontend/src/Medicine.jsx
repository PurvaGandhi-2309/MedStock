import logoSvg from './assets/logo_pixel.png';
import React, { useState, useEffect } from 'react';
import api from './api/axios';
import { 
  Search, Bell, Download, Plus, Filter,
  ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal, Link2, Activity,
  AlertCircle, CheckCircle2, ShieldAlert
} from 'lucide-react';

const Medicine = () => {
  const [medicineData, setMedicineData] = useState({
    total: 0,
    medicinesList: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const initialForm = { medicineId: '', name: '', dosageForm: '', category: '', manufacturer: '', unit: '', minimumStock: 0 };
  const [formData, setFormData] = useState(initialForm);

  const fetchMedicines = () => {
    setLoading(true);
    api.get('/medicines')
      .then(res => {
        setMedicineData({
          total: res.data.count || res.data.medicines?.length || 0,
          medicinesList: res.data.medicines || []
        });
        setError('');
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to load medicines.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      api.delete(`/medicines/${id}`)
        .then(() => fetchMedicines())
        .catch(err => alert(err.response?.data?.message || 'Failed to delete medicine'));
    }
  };

  const handleSave = () => {
    if (!formData.medicineId || !formData.name || !formData.category || !formData.dosageForm || !formData.manufacturer || !formData.unit) {
      setModalError('Please fill in all required fields.');
      return;
    }
    if (Number(formData.minimumStock) < 0) {
      setModalError('Minimum stock cannot be negative.');
      return;
    }

    setModalError('');
    setIsSaving(true);
    
    const payload = { ...formData, minimumStock: Number(formData.minimumStock) };

    const request = isEditModalOpen 
      ? api.put(`/medicines/${formData.medicineId}`, payload)
      : api.post('/medicines', payload);

    request
      .then(() => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setFormData(initialForm);
        fetchMedicines();
      })
      .catch(err => {
        console.error("Save medicine error:", err);
        const backendMessage = err.response?.data?.message;
        const validationError = err.response?.data?.error;
        let errorMessage = 'Failed to save medicine: ' + (err.message || 'Unknown error');
        
        if (validationError && validationError.includes('validation failed')) {
            errorMessage = 'Validation failed: Please ensure all fields are correct. ' + (backendMessage || '');
        } else if (backendMessage) {
            errorMessage = backendMessage;
        } else if (validationError) {
            errorMessage = validationError;
        }
        
        setModalError(errorMessage);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const openEditModal = (med) => {
    setFormData({
      medicineId: med.medicineId || '',
      name: med.name || '',
      dosageForm: med.dosageForm || '',
      category: med.category || '',
      manufacturer: med.manufacturer || '',
      unit: med.unit || '',
      minimumStock: med.minimumStock || 0
    });
    setModalError('');
    setIsEditModalOpen(true);
  };
  
  const openAddModal = () => {
    setFormData(initialForm);
    setModalError('');
    setIsAddModalOpen(true);
  };

  return (
    <>
      <style>{`
        .medicine-container {
          min-height: 100vh;
          background-color: #f8fafc;
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
          align-items: center;
          gap: 0.25rem;
          background-color: #f1f5f9;
          padding: 0.25rem;
          border-radius: 9999px;
        }

        .nav-item {
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #64748b;
          text-decoration: none;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .nav-item:hover {
          color: #0f172a;
        }

        .nav-item.active {
          background-color: white;
          color: #0f172a;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .nav-search {
          position: relative;
          width: 320px;
          margin-left: 1rem;
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
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          width: 16px;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
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
          background-color: #f1f5f9;
        }
        
        .icon-btn::after {
          content: '';
          position: absolute;
          top: 4px;
          right: 4px;
          width: 6px;
          height: 6px;
          background-color: #ef4444;
          border-radius: 50%;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #475569;
        }
        
        .user-avatar {
          width: 32px;
          height: 32px;
          background-color: #1e40af;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
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
          align-items: flex-end;
          margin-bottom: 2rem;
        }
        
        .breadcrumb {
          font-size: 0.7rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 0.875rem;
          max-width: 600px;
          line-height: 1.4;
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
        }
        
        .btn-outline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
        }
        
        .btn-solid {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background-color: #2563eb;
          border: none;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
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
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .kpi-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .icon-blue { background-color: #eff6ff; color: #2563eb; }
        .icon-red { background-color: #fef2f2; color: #ef4444; }
        
        .kpi-badge {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .badge-blue { background-color: #eff6ff; color: #2563eb; }
        .badge-gray { background-color: #f1f5f9; color: #475569; }
        .badge-red { background-color: #fef2f2; color: #ef4444; }

        .kpi-value {
          font-size: 2.25rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        
        .val-red { color: #ef4444; }

        .kpi-title {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .kpi-footer {
          font-size: 0.75rem;
          color: #94a3b8;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #f1f5f9;
          padding-top: 0.75rem;
        }
        
        .text-blue-bold { color: #2563eb; font-weight: 600; }
        .text-red-bold { color: #ef4444; font-weight: 600; }
        
        /* Banner */
        .notice-banner {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }
        
        .banner-img {
          width: 140px;
          height: 90px;
          border-radius: 0.5rem;
          object-fit: cover;
          background-color: #e2e8f0;
        }
        
        .banner-content {
          flex: 1;
        }
        
        .banner-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        
        .banner-tag {
          font-size: 0.65rem;
          font-weight: 600;
          color: #2563eb;
          background-color: #eff6ff;
          padding: 0.2rem 0.5rem;
          border-radius: 0.25rem;
        }
        
        .banner-station {
          font-size: 0.75rem;
          color: #64748b;
        }
        
        .banner-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        
        .banner-desc {
          font-size: 0.8rem;
          color: #64748b;
          line-height: 1.5;
        }

        /* Filter Section */
        .filter-section {
          background-color: white;
          border-radius: 1rem 1rem 0 0;
          padding: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .search-category-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .large-search {
          position: relative;
          width: 350px;
        }
        
        .large-search input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border-radius: 9999px;
          border: 1px solid #e2e8f0;
          font-size: 0.875rem;
        }
        
        .large-search .search-icon {
          position: absolute;
          left: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          width: 16px;
        }
        
        .category-pills {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }
        
        .cat-pill {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #475569;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          white-space: nowrap;
          cursor: pointer;
        }
        
        .cat-pill.active {
          background-color: #2563eb;
          color: white;
          border-color: #2563eb;
        }
        
        .dropdown-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .dropdown-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .filter-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .dropdown-select {
          padding: 0.4rem 2rem 0.4rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background-color: white;
          font-size: 0.8rem;
          color: #0f172a;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
          background-size: 1em;
          cursor: pointer;
        }

        /* Table */
        .table-container {
          background-color: white;
          border-radius: 0 0 1rem 1rem;
          width: 100%;
          overflow-x: auto;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        
        th {
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
          background-color: #f8fafc;
        }
        
        td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          font-size: 0.875rem;
          color: #0f172a;
        }
        
        .empty-state {
          padding: 3rem;
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
        }

        /* Footer Pagination */
        .table-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
        }

        .showing-text {
          font-size: 0.8rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .per-page-select {
          padding: 0.25rem 1.5rem 0.25rem 0.5rem;
          border-radius: 0.25rem;
          border: 1px solid #e2e8f0;
          font-size: 0.8rem;
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
          border-radius: 50%;
          background: none;
          border: none;
          font-size: 0.8rem;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
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
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
          margin-top: 2rem;
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
          max-height: 90vh;
          overflow-y: auto;
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
          margin-top: 1rem;
        }
        .modal-error {
          color: #ef4444;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          background-color: #fef2f2;
          padding: 0.5rem;
          border-radius: 0.25rem;
        }
      `}</style>

      <div className="medicine-container">
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
            
            <div className="nav-search">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search medicines, NDC, batch..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="nav-right">
            <button className="icon-btn">
              <Bell size={18} />
            </button>
            <div className="user-profile">
              <span>St. Jude Pharmacy</span>
              <div className="user-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          
          {/* Header */}
          <div className="breadcrumb">
            Pharmacy Control <ChevronRight size={12}/>
          </div>
          <header className="page-header">
            <div>
              <h1 className="page-title">Medicines Directory</h1>
              <p className="page-subtitle">Manage pharmacy stock, formulations, batch compliance, cold-chain monitoring, and automated replenishment thresholds.</p>
            </div>
            <div className="header-actions">
              
              <button className="btn-solid" onClick={openAddModal}>
                <Plus size={16} /> Add New Medicine
              </button>
            </div>
          </header>


          {/* Table Controls */}
          <div className="filter-section">
            <div className="search-category-row">
              <div className="large-search">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search medicine name, generic formulation, SKU, or lot..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="category-pills">
                <div className="cat-pill active">All Stock ({medicineData.total})</div>
                <div className="cat-pill">Antibiotics</div>
                <div className="cat-pill">Analgesics</div>
                <div className="cat-pill">Cardiovascular</div>
                <div className="cat-pill">Respiratory</div>
                <div className="cat-pill">Cold-Chain Biologics</div>
              </div>
            </div>
            
            <div className="dropdown-row">
              <div className="dropdown-group">
                <span className="filter-label">FILTER BY:</span>
                <select className="dropdown-select">
                  <option>Dosage Form: All</option>
                </select>
                <select className="dropdown-select">
                  <option>Stock Status: All</option>
                </select>
                <select className="dropdown-select">
                  <option>Storage: Ambient (15-25°C)</option>
                </select>
              </div>
              
              <div className="dropdown-group">
                <span className="filter-label" style={{textTransform:'none'}}>Sort:</span>
                <select className="dropdown-select">
                  <option>Stock Level: Ascending</option>
                </select>
                <button style={{background:'none', border:'none', color:'#64748b', cursor:'pointer'}}>
                  <Filter size={16}/>
                </button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Medicine ID</th>
                  <th>Name & Manufacturer</th>
                  <th>Category</th>
                  <th>Dosage & Unit</th>
                  <th>Min Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">Loading medicines...</div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state" style={{color: '#ef4444'}}>{error}</div>
                    </td>
                  </tr>
                ) : medicineData.medicinesList.length > 0 ? (
                  medicineData.medicinesList.filter(med => !searchQuery || JSON.stringify(med).toLowerCase().includes(searchQuery.toLowerCase())).map((med, idx) => (
                    <tr key={idx}>
                      <td>{med.medicineId}</td>
                      <td>
                        <div className="med-name">{med.name}</div>
                        <div style={{fontSize: '0.75rem', color: '#64748b'}}>{med.manufacturer || '--'}</div>
                      </td>
                      <td>{med.category || '--'}</td>
                      <td>
                        {med.dosageForm || '--'} <br/>
                        <span style={{fontSize: '0.75rem', color: '#64748b'}}>Unit: {med.unit || '--'}</span>
                      </td>
                      <td>{med.minimumStock}</td>
                      <td>
                        <button onClick={() => openEditModal(med)} style={{background:'none', border:'none', color:'#2563eb', cursor:'pointer', marginRight: '0.5rem', fontWeight: 600}}>Edit</button>
                        <button onClick={() => handleDelete(med.medicineId)} style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontWeight: 600}}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">
                        {searchQuery ? "No matches found." : "No medicines found."}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="table-footer">
            <div className="showing-text">
              Showing {medicineData.medicinesList.length} of {medicineData.total} medicines
              <span style={{display:'flex', alignItems:'center', gap:'0.5rem', marginLeft:'1rem'}}>
                Per page: 
                <select className="per-page-select">
                  <option>7</option>
                </select>
              </span>
            </div>
            <div className="pagination">
              <button className="page-btn" style={{color: '#94a3b8'}}><ChevronLeft size={16}/></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span style={{color: '#94a3b8', padding: '0 0.25rem'}}>...</span>
              <button className="page-btn">48</button>
              <button className="page-btn" style={{color: '#94a3b8'}}><ChevronRight size={16}/></button>
            </div>
          </div>

        </main>
        
        {/* Footer */}
        <footer className="bottom-footer">
          <div>MedStock — Pharmacy & Inventory Management Platform</div>
          <div style={{display:'flex', gap:'1.5rem'}}>
            <span>Security & Compliance</span>
            <span>System Status</span>
            <span>Health</span>
          </div>
        </footer>
      </div>

      {(isAddModalOpen || isEditModalOpen) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">{isEditModalOpen ? 'Edit Medicine' : 'Add New Medicine'}</h3>
            
            {modalError && <div className="modal-error">{modalError}</div>}

            <label style={{fontSize: '0.8rem', fontWeight: 500}}>Medicine ID *</label>
            <input 
              type="text" 
              className="modal-input" 
              placeholder="e.g. MED-001" 
              value={formData.medicineId}
              onChange={(e) => setFormData({...formData, medicineId: e.target.value})}
              disabled={isEditModalOpen}
            />

            <label style={{fontSize: '0.8rem', fontWeight: 500}}>Medicine Name *</label>
            <input 
              type="text" 
              className="modal-input" 
              placeholder="e.g. Amoxicillin" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />

            <label style={{fontSize: '0.8rem', fontWeight: 500}}>Dosage Form *</label>
            <select
              className="modal-input"
              value={formData.dosageForm}
              onChange={(e) => setFormData({...formData, dosageForm: e.target.value})}
            >
              <option value="">Select Dosage Form</option>
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
              <option value="Syrup">Syrup</option>
              <option value="Injection">Injection</option>
              <option value="Ointment">Ointment</option>
              <option value="Drops">Drops</option>
              <option value="Inhaler">Inhaler</option>
              <option value="Cream">Cream</option>
              <option value="Suppository">Suppository</option>
              <option value="Other">Other</option>
            </select>

            <label style={{fontSize: '0.8rem', fontWeight: 500}}>Category *</label>
            <select
              className="modal-input"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Analgesics">Analgesics</option>
              <option value="Cardiovascular">Cardiovascular</option>
              <option value="Respiratory">Respiratory</option>
              <option value="Cold-Chain Biologics">Cold-Chain Biologics</option>
              <option value="Vitamins">Vitamins</option>
              <option value="Painkiller">Painkiller</option>
              <option value="Other">Other</option>
            </select>

            <label style={{fontSize: '0.8rem', fontWeight: 500}}>Manufacturer *</label>
            <input 
              type="text" 
              className="modal-input" 
              placeholder="e.g. Pfizer" 
              value={formData.manufacturer}
              onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
            />

            <label style={{fontSize: '0.8rem', fontWeight: 500}}>Unit *</label>
            <select
              className="modal-input"
              value={formData.unit}
              onChange={(e) => setFormData({...formData, unit: e.target.value})}
            >
              <option value="">Select Unit</option>
              <option value="Box">Box</option>
              <option value="Bottle">Bottle</option>
              <option value="Blister Pack">Blister Pack</option>
              <option value="Vial">Vial</option>
              <option value="Ampoule">Ampoule</option>
              <option value="Tube">Tube</option>
              <option value="Other">Other</option>
            </select>

            <label style={{fontSize: '0.8rem', fontWeight: 500}}>Minimum Stock</label>
            <input 
              type="number" 
              className="modal-input" 
              placeholder="0" 
              min="0"
              value={formData.minimumStock}
              onChange={(e) => setFormData({...formData, minimumStock: e.target.value})}
            />

            <div className="modal-actions">
              <button className="btn-outline" onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
              }} disabled={isSaving}>Cancel</button>
              
              <button className="btn-solid" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Medicine;
