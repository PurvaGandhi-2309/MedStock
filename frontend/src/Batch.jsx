import React, { useState } from 'react';
import {
  Search, Bell, Plus, Calendar,
  MoreHorizontal, ChevronLeft, ChevronRight,
  Activity, AlertTriangle, SlidersHorizontal,
  RefreshCw, CheckCircle2, Thermometer, ShieldCheck,
  Link2, LayoutGrid
} from 'lucide-react';

const Batch = () => {
  const [batchData, setBatchData] = useState({
    kpis: {
      total: 0,
      expiring: 0,
      expired: 0
    },
    batchesList: []
  });

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
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .header-title-section {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .icon-circle {
          width: 40px;
          height: 40px;
          background-color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .badge-live {
          background-color: #eff6ff;
          color: #2563eb;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
          border: 1px solid #bfdbfe;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 0.875rem;
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .global-search {
          position: relative;
          width: 300px;
        }

        .global-search input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background-color: white;
          font-size: 0.875rem;
        }

        .global-search .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          width: 18px;
          height: 18px;
        }
        
        .btn-filter {
          background-color: white;
          border: 1px solid #e2e8f0;
          color: #64748b;
          border-radius: 0.5rem;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
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
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .kpi-title {
          font-size: 0.75rem;
          font-weight: 600;
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
        .icon-red { background-color: #fef2f2; color: #ef4444; }

        .kpi-value {
          font-size: 2.25rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.5rem;
          line-height: 1;
        }
        
        .val-red { color: #ef4444; }

        .kpi-footer {
          font-size: 0.8rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        
        .text-green { color: #10b981; font-weight: 500; }
        .text-orange { color: #f97316; font-weight: 500; }
        .text-red { color: #ef4444; font-weight: 500; }

        /* Protocol Card Special Styling */
        .protocol-card {
          border: 1px solid #e2e8f0;
        }
        
        .protocol-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .protocol-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }
        
        .protocol-desc {
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.4;
          margin-bottom: 1rem;
        }
        
        .status-ready {
          font-size: 0.7rem;
          font-weight: 600;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .dot-green {
          width: 6px;
          height: 6px;
          background-color: #10b981;
          border-radius: 50%;
        }

        .btn-solid-full {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
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

        /* Main Table Panel */
        .panel-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
          border: 1px solid #e2e8f0;
          margin-bottom: 1.5rem;
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
        
        .badge-gray {
          background-color: #f1f5f9;
          color: #475569;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        
        .panel-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .table-search {
          position: relative;
          width: 200px;
        }

        .table-search input {
          width: 100%;
          padding: 0.4rem 1rem 0.4rem 2.25rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.8rem;
        }

        .table-search .search-icon {
          position: absolute;
          left: 0.6rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          width: 14px;
        }

        .table-select {
          padding: 0.4rem 1.75rem 0.4rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background-color: white;
          font-size: 0.8rem;
          font-weight: 500;
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
          font-weight: 600;
          color: #64748b;
          padding: 1rem 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        td {
          padding: 1.25rem 0.5rem;
          border-bottom: 1px solid #f8fafc;
          vertical-align: middle;
          font-size: 0.875rem;
          color: #475569;
        }

        .med-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #0f172a;
          font-weight: 600;
        }
        
        .link-icon-blue { color: #3b82f6; width: 14px; }
        .link-icon-orange { color: #f97316; width: 14px; }
        .link-icon-red { color: #ef4444; width: 14px; }
        
        .text-red { color: #ef4444; }
        .text-orange { color: #f97316; }

        .status-dot-cell {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 600;
        }
        
        .s-green { color: #10b981; }
        .s-orange { color: #f97316; }
        .s-red { color: #ef4444; }

        .action-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
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
          font-size: 0.8rem;
          color: #64748b;
        }

        .pagination {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .page-btn {
          width: 28px;
          height: 28px;
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

        /* Info Cards */
        .info-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .info-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .info-icon {
          width: 40px;
          height: 40px;
          background-color: #eff6ff;
          color: #2563eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .info-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }
        
        .info-desc {
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.5;
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
      `}</style>

      <div className="batch-container">
        {/* Top Navigation */}
        <nav className="top-nav">
          <div className="nav-left">
            <div className="brand">
              <div className="logo-mark">M</div>
              <span>MedStock</span>
            </div>
            <div className="nav-links">
              <a href="/dashboard" className="nav-item">Dashboard</a>
              <a href="/stock" className="nav-item">Stock</a>
              <a href="#" className="nav-item active">Batches</a>
              <a href="#" className="nav-item">Medicines</a>
              <a href="#" className="nav-item">Orders</a>
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-search">
              <Search className="search-icon" />
              <input type="text" placeholder="Search medicines, NDC, batch..." />
            </div>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80" alt="Dr. Patricia Gray" />
              </div>
              <div className="user-info">
                <span className="user-name">Dr. Patricia Gray</span>
                <span className="user-role">Lead Pharmacist</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">

          {/* Header */}
          <header className="page-header">
            <div className="header-title-section">
              <div className="icon-circle">
                <Activity size={20} />
              </div>
              <div>
                <h1 className="page-title">
                  Batches <span className="badge-live">Live Inventory</span>
                </h1>
                <p className="page-subtitle">Track medicine batches, expiry dates, retail distribution and supplier compliance.</p>
              </div>
            </div>
            <div className="header-actions">
              <div className="global-search">
                <Search className="search-icon" />
                <input type="text" placeholder="Search medicine, batch number..." />
              </div>
              <button className="btn-filter">
                <SlidersHorizontal size={16} />
              </button>
            </div>
          </header>

          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Total Batches</span>
                <div className="kpi-icon icon-blue"><LayoutGrid size={18} /></div>
              </div>
              <div>
                <div className="kpi-value">{batchData.kpis.total}</div>
                <div className="kpi-footer">
                  <span className="text-green">↑ +0% this month</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Expiring Soon</span>
                <div className="kpi-icon icon-blue"><Calendar size={18} /></div>
              </div>
              <div>
                <div className="kpi-value">{batchData.kpis.expiring}</div>
                <div className="kpi-footer">
                  <span className="text-orange">⏱ Within 30 days</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Expired Batches</span>
                <div className="kpi-icon icon-red"><AlertTriangle size={18} /></div>
              </div>
              <div>
                <div className="kpi-value val-red">{batchData.kpis.expired}</div>
                <div className="kpi-footer">
                  <span className="text-red">⚠ Needs immediate action</span>
                </div>
              </div>
            </div>

            <div className="kpi-card protocol-card">
              <div>
                <div className="protocol-header">
                  <span className="kpi-title">Quick Protocol</span>
                  <span className="status-ready"><span className="dot-green"></span> Ready</span>
                </div>
                <div className="protocol-title">Fast Intake Form</div>
                <div className="protocol-desc">Assign verified NDC, track cold-chain lot codes.</div>
              </div>
              <button className="btn-solid-full">
                <Plus size={16} /> Add Batch
              </button>
            </div>
          </div>

          {/* Batch List Panel */}
          <div className="panel-card">
            <div className="panel-header">
              <h2 className="panel-title">
                Batch List <span className="badge-gray">156 items</span>
              </h2>
              <div className="panel-controls">
                <div className="table-search">
                  <Search className="search-icon" />
                  <input type="text" placeholder="Search batch or medicine..." />
                </div>
                <select className="table-select">
                  <option>All Medicines</option>
                </select>
                <select className="table-select">
                  <option>All Status</option>
                </select>
                <button className="action-btn" style={{ marginLeft: '0.5rem' }}>
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Batch No.</th>
                    <th>Mfg. Date</th>
                    <th>Expiry Date</th>
                    <th>Quantity</th>
                    <th>Supplier</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {batchData.batchesList.map((batch, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="med-cell">
                          <Link2 className={`link-icon-${batch.iconColor}`} />
                          <span>{batch.name}</span>
                        </div>
                      </td>
                      <td>{batch.batchId}</td>
                      <td>{batch.mfgDate}</td>
                      <td className={batch.expiryClass}>{batch.expiryDate}</td>
                      <td className={batch.qtyClass} style={{ fontWeight: 500 }}>{batch.qty}</td>
                      <td>{batch.supplier}</td>
                      <td><div className={`status-dot-cell ${batch.statusClass}`}>● {batch.status}</div></td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="action-btn" style={{ margin: '0 auto' }}><MoreHorizontal size={18} /></button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="showing-text">Showing 1-7 of 156 batches</div>
              <div className="pagination">
                <button className="page-btn" style={{ color: '#94a3b8' }}><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn" style={{ color: '#94a3b8' }}><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>


        </main>

        {/* Footer */}
        <footer className="bottom-footer">
          <div>MedStock Clinical Systems v2.4 • DEA / FDA Compliant Audit Trail</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Protocols & Formulary</span>
            <span>Dispensary Support</span>
            <span>© 2024 MedStock Health Tech Inc.</span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Batch;
