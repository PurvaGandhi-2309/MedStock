import React from 'react';
import { 
  Search, Bell, Filter, Download,
  ArrowRightLeft, RefreshCw, Calendar, Tag, Package,
  TrendingUp, ArrowDownToLine, ShoppingCart, Settings2,
  MoreHorizontal, ChevronLeft, ChevronRight
} from 'lucide-react';

const Transactions = () => {
  return (
    <>
      <style>{`
        .transactions-container {
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
          background-color: #2563eb;
          color: white;
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
        }

        .icon-btn::after {
          content: '';
          position: absolute;
          top: 6px;
          right: 8px;
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
          font-size: 0.8rem;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.2;
        }

        .user-role {
          font-size: 0.7rem;
          color: #64748b;
          background-color: #eff6ff;
          color: #2563eb;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
          font-weight: 600;
          display: inline-block;
          margin-top: 0.1rem;
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

        .icon-circle {
          width: 40px;
          height: 40px;
          background-color: #eff6ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .badge-live {
          background-color: #eff6ff;
          color: #3b82f6;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 700;
          border: 1px solid #bfdbfe;
          text-transform: uppercase;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 0.875rem;
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        
        .global-search {
          position: relative;
          width: 320px;
        }

        .global-search input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          border-radius: 9999px;
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
          width: 16px;
        }
        
        .btn-refresh {
          background-color: white;
          border: 1px solid #e2e8f0;
          color: #64748b;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* Filter Bar */
        .filter-bar {
          background-color: white;
          border-radius: 1rem;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .filter-group {
          display: flex;
          gap: 2rem;
        }

        .filter-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .filter-select {
          padding: 0.5rem 2rem 0.5rem 1rem;
          border-radius: 9999px;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.875rem;
          color: #0f172a;
          font-weight: 500;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
          cursor: pointer;
          min-width: 180px;
        }
        
        .filter-actions {
          display: flex;
          gap: 1rem;
          align-items: flex-end;
        }

        .btn-solid-blue {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.5rem;
          background-color: #2563eb;
          border: none;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .btn-outline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.5rem;
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
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
          justify-content: space-between;
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .kpi-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
        }

        .kpi-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-blue-light { background-color: #eff6ff; color: #3b82f6; }
        .icon-gray-light { background-color: #f1f5f9; color: #64748b; }

        .kpi-value {
          font-size: 2.25rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .kpi-footer {
          font-size: 0.75rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        
        .text-blue { color: #2563eb; font-weight: 500; }

        /* Main Table Panel */
        .panel-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .panel-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .dot-blue {
          width: 8px;
          height: 8px;
          background-color: #2563eb;
          border-radius: 50%;
        }
        
        .badge-gray {
          background-color: #f1f5f9;
          color: #475569;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 500;
        }
        
        .view-all-link {
          font-size: 0.875rem;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.25rem;
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
          font-size: 0.7rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 1rem 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        td {
          padding: 1.25rem 0.5rem;
          border-bottom: 1px solid #f8fafc;
          vertical-align: middle;
          font-size: 0.875rem;
          color: #0f172a;
        }

        .med-cell {
          display: flex;
          flex-direction: column;
        }

        .med-name {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.875rem;
        }
        
        .med-desc {
          font-size: 0.7rem;
          color: #94a3b8;
        }

        .type-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .pill-sale { background-color: #fef2f2; color: #ef4444; }
        .pill-stockin { background-color: #eff6ff; color: #2563eb; }
        .pill-adj { background-color: #f1f5f9; color: #64748b; }

        .qty-sale { color: #ef4444; font-weight: 600; }
        .qty-stockin { color: #2563eb; font-weight: 600; }
        .qty-adj { color: #64748b; font-weight: 600; }
        
        .col-price { color: #64748b; }
        .col-total { font-weight: 600; color: #0f172a; }

        .user-role-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #475569;
        }
        
        .role-avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #e2e8f0;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6rem;
          font-weight: bold;
        }

        .remarks-text {
          font-size: 0.8rem;
          color: #64748b;
        }

        .action-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
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
        
        .page-ellipsis {
          color: #94a3b8;
          font-size: 0.8rem;
          padding: 0 0.25rem;
        }

        /* Bottom Footer */
        .bottom-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: 2rem;
        }
        
        .sys-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>

      <div className="transactions-container">
        {/* Top Navigation */}
        <nav className="top-nav">
          <div className="nav-left">
            <div className="brand">
              <div className="logo-mark">M</div>
              <span>MedStock</span>
            </div>
            <div className="nav-search">
              <Search className="search-icon" />
              <input type="text" placeholder="Search medicine, NDC, batch..." />
            </div>
          </div>
          
          <div className="nav-links">
            <a href="/dashboard" className="nav-item">Dashboard</a>
            <a href="/stock" className="nav-item">Stock</a>
            <a href="/batch" className="nav-item">Batches</a>
            <a href="#" className="nav-item">Medicines</a>
            <a href="#" className="nav-item active">Transactions</a>
            <a href="#" className="nav-item">Alerts</a>
            <a href="#" className="nav-item">AI Insights<br/><span style={{fontSize:'0.65rem'}}> & Reorder</span></a>
          </div>

          <div className="nav-right">
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
                <ArrowRightLeft size={20} />
              </div>
              <div>
                <h1 className="page-title">
                  Transactions <span className="badge-live">Live Ledger</span>
                </h1>
                <p className="page-subtitle">Track all medicine stock movements, dispensations, and receipts in real time.</p>
              </div>
            </div>
            <div className="header-actions">
              <div className="global-search">
                <Search className="search-icon" />
                <input type="text" placeholder="Search medicine, batch, or transaction ID" />
              </div>
              <button className="btn-refresh">
                <RefreshCw size={16} />
              </button>
            </div>
          </header>

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="filter-group">
              <div className="filter-item">
                <label className="filter-label"><Calendar size={14}/> Date Range</label>
                <select className="filter-select">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="filter-item">
                <label className="filter-label"><Tag size={14}/> Type</label>
                <select className="filter-select">
                  <option>All Types</option>
                  <option>Sale</option>
                  <option>Stock In</option>
                  <option>Adjustment</option>
                </select>
              </div>
              <div className="filter-item">
                <label className="filter-label"><Package size={14}/> Medicine</label>
                <select className="filter-select">
                  <option>All Medicines</option>
                </select>
              </div>
            </div>
            <div className="filter-actions">
              <button className="btn-solid-blue">
                <Filter size={16} /> Apply
              </button>
              <button className="btn-outline">
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Total Transactions</span>
                <div className="kpi-icon icon-blue-light"><TrendingUp size={16} /></div>
              </div>
              <div>
                <div className="kpi-value">124</div>
                <div className="kpi-footer">
                  <span className="text-blue">↗ +12% from last week</span>
                </div>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Stock In (Receipts)</span>
                <div className="kpi-icon icon-blue-light"><ArrowDownToLine size={16} /></div>
              </div>
              <div>
                <div className="kpi-value">42</div>
                <div className="kpi-footer">
                  <span className="text-blue">↗ +12% from last week</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Stock Out (Sales)</span>
                <div className="kpi-icon icon-blue-light"><ShoppingCart size={16} /></div>
              </div>
              <div>
                <div className="kpi-value">76</div>
                <div className="kpi-footer">
                  <span className="text-blue">↗ +22% from last week</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Adjustments</span>
                <div className="kpi-icon icon-gray-light"><Settings2 size={16} /></div>
              </div>
              <div>
                <div className="kpi-value">6</div>
                <div className="kpi-footer">
                  <span>✔ Audit verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions List Panel */}
          <div className="panel-card">
            <div className="panel-header">
              <h2 className="panel-title">
                <span className="dot-blue"></span> Recent Transactions <span className="badge-gray">Updated 1m ago</span>
              </h2>
              <a href="#" className="view-all-link">
                View All <ChevronRight size={16} />
              </a>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Medicine Name</th>
                    <th>Type</th>
                    <th style={{textAlign: 'right'}}>Quantity</th>
                    <th style={{textAlign: 'right'}}>Unit Price</th>
                    <th style={{textAlign: 'right'}}>Total</th>
                    <th>User / Role</th>
                    <th>Remarks</th>
                    <th style={{textAlign: 'center'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {/* Row 1 */}
                  <tr>
                    <td style={{color: '#64748b'}}>Apr 27, 2025 10:24 AM</td>
                    <td>
                      <div className="med-cell">
                        <span className="med-name">Paracetamol 500mg</span>
                        <span className="med-desc">Tablet • Strip of 10</span>
                      </div>
                    </td>
                    <td><span className="type-pill pill-sale">Sale</span></td>
                    <td className="qty-sale" style={{textAlign: 'right'}}>-10</td>
                    <td className="col-price" style={{textAlign: 'right'}}>₹5.00</td>
                    <td className="col-total" style={{textAlign: 'right'}}>₹50.00</td>
                    <td>
                      <div className="user-role-cell">
                        <div className="role-avatar">P</div>
                        <span>Pharmacist</span>
                      </div>
                    </td>
                    <td className="remarks-text">Walk-in sale</td>
                    <td style={{textAlign: 'center'}}>
                      <button className="action-btn" style={{margin:'0 auto'}}><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td style={{color: '#64748b'}}>Apr 27, 2025 09:12 AM</td>
                    <td>
                      <div className="med-cell">
                        <span className="med-name">Amoxicillin 250mg</span>
                        <span className="med-desc">Capsule • Box of 50</span>
                      </div>
                    </td>
                    <td><span className="type-pill pill-stockin">Stock In</span></td>
                    <td className="qty-stockin" style={{textAlign: 'right'}}>+50</td>
                    <td className="col-price" style={{textAlign: 'right'}}>₹12.00</td>
                    <td className="col-total" style={{textAlign: 'right'}}>₹600.00</td>
                    <td>
                      <div className="user-role-cell">
                        <div className="role-avatar">A</div>
                        <span>Admin</span>
                      </div>
                    </td>
                    <td className="remarks-text">Purchase PO-4928</td>
                    <td style={{textAlign: 'center'}}>
                      <button className="action-btn" style={{margin:'0 auto'}}><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td style={{color: '#64748b'}}>Apr 26, 2025 04:36 PM</td>
                    <td>
                      <div className="med-cell">
                        <span className="med-name">Vitamin D3 Softgel</span>
                        <span className="med-desc">60,000 IU Capsule</span>
                      </div>
                    </td>
                    <td><span className="type-pill pill-sale">Sale</span></td>
                    <td className="qty-sale" style={{textAlign: 'right'}}>-5</td>
                    <td className="col-price" style={{textAlign: 'right'}}>₹20.00</td>
                    <td className="col-total" style={{textAlign: 'right'}}>₹100.00</td>
                    <td>
                      <div className="user-role-cell">
                        <div className="role-avatar">P</div>
                        <span>Pharmacist</span>
                      </div>
                    </td>
                    <td className="remarks-text">Walk-in sale</td>
                    <td style={{textAlign: 'center'}}>
                      <button className="action-btn" style={{margin:'0 auto'}}><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr>
                    <td style={{color: '#64748b'}}>Apr 26, 2025 01:20 PM</td>
                    <td>
                      <div className="med-cell">
                        <span className="med-name">Metformin 500mg</span>
                        <span className="med-desc">Extended Release Tab</span>
                      </div>
                    </td>
                    <td><span className="type-pill pill-stockin">Stock In</span></td>
                    <td className="qty-stockin" style={{textAlign: 'right'}}>+30</td>
                    <td className="col-price" style={{textAlign: 'right'}}>₹8.00</td>
                    <td className="col-total" style={{textAlign: 'right'}}>₹240.00</td>
                    <td>
                      <div className="user-role-cell">
                        <div className="role-avatar">A</div>
                        <span>Admin</span>
                      </div>
                    </td>
                    <td className="remarks-text">Supplier Cipla</td>
                    <td style={{textAlign: 'center'}}>
                      <button className="action-btn" style={{margin:'0 auto'}}><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr>
                    <td style={{color: '#64748b'}}>Apr 25, 2025 11:05 AM</td>
                    <td>
                      <div className="med-cell">
                        <span className="med-name">Azithromycin 250mg</span>
                        <span className="med-desc">Tablet • Strip of 6</span>
                      </div>
                    </td>
                    <td><span className="type-pill pill-sale">Sale</span></td>
                    <td className="qty-sale" style={{textAlign: 'right'}}>-8</td>
                    <td className="col-price" style={{textAlign: 'right'}}>₹12.00</td>
                    <td className="col-total" style={{textAlign: 'right'}}>₹96.00</td>
                    <td>
                      <div className="user-role-cell">
                        <div className="role-avatar">P</div>
                        <span>Pharmacist</span>
                      </div>
                    </td>
                    <td className="remarks-text">Prescription Rx-1044</td>
                    <td style={{textAlign: 'center'}}>
                      <button className="action-btn" style={{margin:'0 auto'}}><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>

                  {/* Row 6 */}
                  <tr>
                    <td style={{color: '#64748b'}}>Apr 25, 2025 08:45 AM</td>
                    <td>
                      <div className="med-cell">
                        <span className="med-name">Ceftriaxone 1g IV</span>
                        <span className="med-desc">Sterile Vial for Injection</span>
                      </div>
                    </td>
                    <td><span className="type-pill pill-sale">Sale</span></td>
                    <td className="qty-sale" style={{textAlign: 'right'}}>-4</td>
                    <td className="col-price" style={{textAlign: 'right'}}>₹250.00</td>
                    <td className="col-total" style={{textAlign: 'right'}}>₹1,000.00</td>
                    <td>
                      <div className="user-role-cell">
                        <div className="role-avatar" style={{backgroundColor: '#e0e7ff', color: '#4f46e5'}}>D</div>
                        <span>Dispensary</span>
                      </div>
                    </td>
                    <td className="remarks-text">Inpatient Ward 3</td>
                    <td style={{textAlign: 'center'}}>
                      <button className="action-btn" style={{margin:'0 auto'}}><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                  
                  {/* Row 7 */}
                  <tr>
                    <td style={{color: '#64748b'}}>Apr 24, 2025 03:15 PM</td>
                    <td>
                      <div className="med-cell">
                        <span className="med-name">Insulin Glargine</span>
                        <span className="med-desc">SoloStar Pen 100IU/ml</span>
                      </div>
                    </td>
                    <td><span className="type-pill pill-adj">Adjustment</span></td>
                    <td className="qty-adj" style={{textAlign: 'right'}}>-1</td>
                    <td className="col-price" style={{textAlign: 'right'}}>₹450.00</td>
                    <td className="col-total" style={{textAlign: 'right'}}>₹450.00</td>
                    <td>
                      <div className="user-role-cell">
                        <div className="role-avatar">P</div>
                        <span>Pharmacist</span>
                      </div>
                    </td>
                    <td className="remarks-text">Cold-Chain Damaged</td>
                    <td style={{textAlign: 'center'}}>
                      <button className="action-btn" style={{margin:'0 auto'}}><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            
            <div className="table-footer">
              <div className="showing-text">Showing 1-7 of 124 transactions</div>
              <div className="pagination">
                <button className="page-btn" style={{color: '#94a3b8'}}><ChevronLeft size={16}/></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <span className="page-ellipsis">...</span>
                <button className="page-btn">10</button>
                <button className="page-btn" style={{color: '#94a3b8'}}><ChevronRight size={16}/></button>
              </div>
            </div>
          </div>

        </main>
        
        {/* Footer */}
        <footer className="bottom-footer">
          <div>© 2025 MedStock Clinical Systems. All rights reserved.</div>
          <div className="sys-status">
            <span className="dot-blue"></span> System Operational
            <span style={{margin: '0 0.5rem', color: '#cbd5e1'}}>•</span>
            v2.4.1-clinical
          </div>
        </footer>
      </div>
    </>
  );
};

export default Transactions;
