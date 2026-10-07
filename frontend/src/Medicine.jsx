import React, { useState } from 'react';
import { 
  Search, Bell, Download, Plus, Filter,
  ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal, Link2, Activity,
  AlertCircle, CheckCircle2, ShieldAlert
} from 'lucide-react';

const Medicine = () => {
  const [medicineData, setMedicineData] = useState({
    kpis: {
      total: 0,
      optimal: 0,
      lowStock: 0,
      expiring: 0
    },
    medicinesList: []
  });

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
      `}</style>

      <div className="medicine-container">
        {/* Top Navigation */}
        <nav className="top-nav">
          <div className="nav-left">
            <div className="brand">
              <div className="logo-mark">M</div>
              <span>MedStock</span>
            </div>
            
            <div className="nav-links">
              <a href="/dashboard" className="nav-item">Dashboard</a>
              <a href="#" className="nav-item active">Medicines / Inventory</a>
              <a href="/batch" className="nav-item">Batches</a>
            </div>
            
            <div className="nav-search">
              <Search className="search-icon" />
              <input type="text" placeholder="Search medicines, NDC, batch..." />
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
              <button className="btn-outline">
                <Download size={16} /> Export CSV / Report
              </button>
              <button className="btn-solid">
                <Plus size={16} /> Add New Medicine
              </button>
            </div>
          </header>

          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon-wrapper icon-blue"><Activity size={18} /></div>
                <div className="kpi-badge badge-blue">● Active Roster</div>
              </div>
              <div>
                <div className="kpi-value">{medicineData.kpis.total}</div>
                <div className="kpi-title">Total Formulations / SKUs</div>
                <div className="kpi-footer">
                  <span>99.2% formulary ready</span>
                  <span className="text-blue-bold">↗ +0 this wk</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon-wrapper icon-blue"><CheckCircle2 size={18} /></div>
                <div className="kpi-badge badge-blue">● Healthy</div>
              </div>
              <div>
                <div className="kpi-value">{medicineData.kpis.optimal}</div>
                <div className="kpi-title">Optimal Stock Level</div>
                <div className="kpi-footer">
                  <span>Safety buffer at 96.7%</span>
                  <span>Verified today</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon-wrapper icon-blue" style={{backgroundColor:'#f1f5f9', color:'#475569'}}><ShieldAlert size={18} /></div>
                <div className="kpi-badge badge-gray">● Action Required</div>
              </div>
              <div>
                <div className="kpi-value">{medicineData.kpis.lowStock}</div>
                <div className="kpi-title">Low Stock / Reorder</div>
                <div className="kpi-footer">
                  <span>0 auto-PO triggers sent</span>
                  <span className="text-blue-bold">Review ↗</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon-wrapper icon-red"><AlertCircle size={18} /></div>
                <div className="kpi-badge badge-red">● Next 30 Days</div>
              </div>
              <div>
                <div className="kpi-value val-red">{medicineData.kpis.expiring}</div>
                <div className="kpi-title">Batches Nearing Expiry</div>
                <div className="kpi-footer">
                  <span>FEFO quarantine ready</span>
                  <span className="text-red-bold">Critical review</span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="notice-banner">
            <div className="banner-img"></div>
            <div className="banner-content">
              <div className="banner-header">
                <span className="banner-tag">Cold Chain Notice</span>
                <span className="banner-station">Station #04 Refrigeration Unit Alpha</span>
              </div>
              <h3 className="banner-title">Automated FEFO (First-Expired, First-Out) Protocol Active</h3>
              <p className="banner-desc">Insulin and biological formulations are prioritized by batch date. Automated reorder webhooks are synchronized with McKesson and AmerisourceBergen dispatch gateways.</p>
            </div>
          </div>

          {/* Table Controls */}
          <div className="filter-section">
            <div className="search-category-row">
              <div className="large-search">
                <Search className="search-icon" />
                <input type="text" placeholder="Search medicine name, generic formulation, SKU, or lot..." />
              </div>
              <div className="category-pills">
                <div className="cat-pill active">All Stock ({medicineData.kpis.total})</div>
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
                  <th>Medicine Formulation</th>
                  <th>SKU / Code</th>
                  <th>Category</th>
                  <th>Dosage</th>
                  <th>Current Stock & Par</th>
                  <th>Batch & Expiry</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicineData.medicinesList.length > 0 ? (
                  medicineData.medicinesList.map((med, idx) => (
                    <tr key={idx}>
                      {/* Dynamic mapping would go here */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="empty-state">
                        No medicines loaded. Database connection pending.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="table-footer">
            <div className="showing-text">
              Showing 1-0 of {medicineData.kpis.total} medicines
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
    </>
  );
};

export default Medicine;
