import React from 'react';
import { 
  Search, Bell, Filter, AlertTriangle, 
  Clock, CalendarX, BellRing, Check,
  ShoppingCart, MoreVertical, Pill,
  Beaker, Droplets, FileText, Activity,
  ThermometerSnowflake, ChevronLeft, ChevronRight,
  Eye
} from 'lucide-react';

const Alert = () => {
  return (
    <>
      <style>{`
        .alerts-container {
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
          margin-bottom: 2rem;
        }
        
        .header-title-section {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .icon-circle {
          width: 48px;
          height: 48px;
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
          padding: 0.6rem 1rem 0.6rem 2.5rem;
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
        
        .btn-filter {
          background-color: white;
          border: 1px solid #e2e8f0;
          color: #64748b;
          border-radius: 50%;
          width: 40px;
          height: 40px;
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

        .kpi-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          letter-spacing: 0.05em;
        }
        
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .dot-red { background-color: #ef4444; }
        .dot-orange { background-color: #f97316; }
        .dot-blue { background-color: #2563eb; }

        .kpi-icon {
          width: 36px;
          height: 36px;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-red-light { background-color: #fef2f2; color: #ef4444; }
        .icon-orange-light { background-color: #fff7ed; color: #f97316; }
        .icon-blue-light { background-color: #eff6ff; color: #2563eb; }

        .kpi-value-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .kpi-value {
          font-size: 2.5rem;
          font-weight: 600;
          color: #0f172a;
          line-height: 1;
        }
        
        .kpi-unit {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
        }
        
        .kpi-unit-red { color: #ef4444; }
        .kpi-unit-orange { color: #f97316; }
        .kpi-unit-blue { color: #2563eb; }

        .kpi-desc {
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.4;
        }

        /* Main Table Panel */
        .panel-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .panel-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 1rem;
        }
        
        .tab-list {
          display: flex;
          gap: 0.5rem;
        }

        .tab-item {
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
        }
        
        .tab-item.active {
          background-color: #2563eb;
          color: white;
        }
        
        .mark-read-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #3b82f6;
          background: none;
          border: none;
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

        .type-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .pill-red { background-color: #fef2f2; color: #ef4444; border: 1px solid #fecaca; }
        .pill-orange { background-color: #fff7ed; color: #f97316; border: 1px solid #fed7aa; }
        
        .priority-badge {
          display: inline-flex;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        
        .pb-high { background-color: #fef2f2; color: #ef4444; }
        .pb-med { background-color: #fff7ed; color: #f97316; }

        .med-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .med-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #eff6ff;
          color: #2563eb;
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
        
        .med-desc {
          font-size: 0.7rem;
          color: #94a3b8;
        }
        
        .detail-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .detail-text {
          font-size: 0.8rem;
          font-weight: 500;
          color: #0f172a;
        }
        
        .detail-sub {
          font-size: 0.75rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .progress-bar {
          height: 4px;
          background-color: #e2e8f0;
          border-radius: 9999px;
          width: 120px;
          margin-top: 0.25rem;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 9999px;
        }
        
        .fill-red { background-color: #ef4444; width: 25%; }
        
        .date-cell {
          display: flex;
          flex-direction: column;
        }
        
        .date-main {
          font-size: 0.8rem;
          font-weight: 500;
          color: #0f172a;
        }
        
        .date-sub {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .action-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-reorder {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 1rem;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }
        
        .btn-view {
          padding: 0.4rem 1rem;
          background: none;
          color: #475569;
          border: none;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .action-more {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
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

      <div className="alerts-container">
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
              <a href="/batch" className="nav-item">Batches</a>
              <a href="#" className="nav-item">Medicines</a>
              <a href="/transactions" className="nav-item">Transactions</a>
              <a href="#" className="nav-item active">Alerts</a>
              <a href="#" className="nav-item">AI Insights & Reorder</a>
            </div>
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
                <BellRing size={24} />
              </div>
              <div>
                <h1 className="page-title">Alerts</h1>
                <p className="page-subtitle">Stay informed about low stock, expiring batches, and real-time clinical thresholds.</p>
              </div>
            </div>
            <div className="header-actions">
              <div className="global-search">
                <Search className="search-icon" />
                <input type="text" placeholder="Search alerts, NDC, medicine, batch..." />
              </div>
              <button className="btn-filter">
                <Filter size={18} />
              </button>
            </div>
          </header>

          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title"><span className="dot dot-red"></span> LOW STOCK WARNINGS</span>
                <div className="kpi-icon icon-red-light"><AlertTriangle size={18} /></div>
              </div>
              <div className="kpi-value-row">
                <div className="kpi-value">12</div>
                <div className="kpi-unit kpi-unit-red">SKUs Below Min Level</div>
              </div>
              <div className="kpi-desc">Automated purchase orders recommended today.</div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title"><span className="dot dot-orange"></span> EXPIRING BATCHES</span>
                <div className="kpi-icon icon-orange-light"><Clock size={18} /></div>
              </div>
              <div className="kpi-value-row">
                <div className="kpi-value">8</div>
                <div className="kpi-unit kpi-unit-orange">Within Next 30 Days</div>
              </div>
              <div className="kpi-desc">Requires rotation or vendor returns protocol.</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title"><span className="dot dot-red"></span> EXPIRED BATCHES</span>
                <div className="kpi-icon icon-red-light"><CalendarX size={18} /></div>
              </div>
              <div className="kpi-value-row">
                <div className="kpi-value">3</div>
                <div className="kpi-unit kpi-unit-red">Immediate Action Required</div>
              </div>
              <div className="kpi-desc">Requires disposal protocol & vendor return.</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title"><span className="dot dot-blue"></span> ACTIVE INVENTORY ALERTS</span>
                <div className="kpi-icon icon-blue-light"><BellRing size={18} /></div>
              </div>
              <div className="kpi-value-row">
                <div className="kpi-value">20</div>
                <div className="kpi-unit kpi-unit-blue">Pending Review</div>
              </div>
              <div className="kpi-desc">Updated 2 mins ago via DSCSA Gateway.</div>
            </div>
          </div>

          {/* Alerts List Panel */}
          <div className="panel-card">
            <div className="panel-nav">
              <div className="tab-list">
                <div className="tab-item active">All (20)</div>
                <div className="tab-item">Low Stock (12)</div>
                <div className="tab-item">Expiring Soon (8)</div>
                <div className="tab-item">Batches</div>
                <div className="tab-item">System Notices</div>
              </div>
              <button className="mark-read-btn">
                <Check size={16} /> Mark all as read
              </button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Item / Medicine</th>
                    <th>Details & Threshold</th>
                    <th>Priority</th>
                    <th>Date Flagged</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {/* Row 1 */}
                  <tr>
                    <td>
                      <div className="type-pill pill-red">
                        <AlertTriangle size={14} /> Low Stock
                      </div>
                    </td>
                    <td>
                      <div className="med-cell">
                        <div className="med-icon"><Pill size={16} /></div>
                        <div className="med-info">
                          <span className="med-name">Paracetamol 500mg</span>
                          <span className="med-desc">Oral Tablet • NDC 50458-587-01</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="detail-cell">
                        <div className="detail-text"><span className="text-red" style={{color:'#ef4444'}}>5 units left</span> • Threshold: 20</div>
                        <div className="progress-bar"><div className="progress-fill fill-red"></div></div>
                      </div>
                    </td>
                    <td><span className="priority-badge pb-high">High</span></td>
                    <td>
                      <div className="date-cell">
                        <span className="date-main">Apr 27, 2025</span>
                        <span className="date-sub">09:14 AM</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button className="btn-reorder"><ShoppingCart size={14}/> Reorder</button>
                        <button className="action-more"><MoreVertical size={16}/></button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td>
                      <div className="type-pill pill-orange">
                        <Clock size={14} /> Expiring Soon
                      </div>
                    </td>
                    <td>
                      <div className="med-cell">
                        <div className="med-icon" style={{backgroundColor: '#fff7ed', color: '#f97316'}}><Beaker size={16} /></div>
                        <div className="med-info">
                          <span className="med-name">Amoxicillin 250mg</span>
                          <span className="med-desc">Capsule • GlaxoSmithKline</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="detail-cell">
                        <div className="detail-text">Batch #A123</div>
                        <div className="detail-sub"><Clock size={12} style={{color:'#f97316'}}/> Expires in 7 days (May 04, 2025)</div>
                      </div>
                    </td>
                    <td><span className="priority-badge pb-med">Medium</span></td>
                    <td>
                      <div className="date-cell">
                        <span className="date-main">Apr 26, 2025</span>
                        <span className="date-sub">04:30 PM</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button className="btn-view">View Batch</button>
                        <button className="action-more"><MoreVertical size={16}/></button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td>
                      <div className="type-pill pill-red">
                        <AlertTriangle size={14} /> Low Stock
                      </div>
                    </td>
                    <td>
                      <div className="med-cell">
                        <div className="med-icon" style={{backgroundColor: '#f1f5f9', color: '#3b82f6'}}><Droplets size={16} /></div>
                        <div className="med-info">
                          <span className="med-name">Vitamin D3 Softgel</span>
                          <span className="med-desc">60,000 IU • Sun Pharma</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="detail-cell">
                        <div className="detail-text"><span className="text-red" style={{color:'#ef4444'}}>Only 3 units left</span> • Threshold: 10</div>
                        <div className="progress-bar"><div className="progress-fill fill-red" style={{width: '30%'}}></div></div>
                      </div>
                    </td>
                    <td><span className="priority-badge pb-high">High</span></td>
                    <td>
                      <div className="date-cell">
                        <span className="date-main">Apr 26, 2025</span>
                        <span className="date-sub">01:12 PM</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button className="btn-reorder"><ShoppingCart size={14}/> Reorder</button>
                        <button className="action-more"><MoreVertical size={16}/></button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr>
                    <td>
                      <div className="type-pill pill-orange">
                        <Clock size={14} /> Expiring Soon
                      </div>
                    </td>
                    <td>
                      <div className="med-cell">
                        <div className="med-icon" style={{backgroundColor: '#fff7ed', color: '#f97316'}}><FileText size={16} /></div>
                        <div className="med-info">
                          <span className="med-name">Metformin 500mg</span>
                          <span className="med-desc">Extended-Release • Bristol-Myers</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="detail-cell">
                        <div className="detail-text">Batch #B456</div>
                        <div className="detail-sub"><Clock size={12} style={{color:'#f97316'}}/> Expires in 12 days (May 09, 2025)</div>
                      </div>
                    </td>
                    <td><span className="priority-badge pb-med">Medium</span></td>
                    <td>
                      <div className="date-cell">
                        <span className="date-main">Apr 25, 2025</span>
                        <span className="date-sub">11:05 AM</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button className="btn-view">View Batch</button>
                        <button className="action-more"><MoreVertical size={16}/></button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr>
                    <td>
                      <div className="type-pill pill-red">
                        <AlertTriangle size={14} /> Low Stock
                      </div>
                    </td>
                    <td>
                      <div className="med-cell">
                        <div className="med-icon"><Activity size={16} /></div>
                        <div className="med-info">
                          <span className="med-name">Azithromycin 250mg</span>
                          <span className="med-desc">Film-coated • Pfizer Labs</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="detail-cell">
                        <div className="detail-text"><span className="text-red" style={{color:'#ef4444'}}>Only 7 units left</span> • Threshold: 20</div>
                        <div className="progress-bar"><div className="progress-fill fill-red" style={{width: '35%'}}></div></div>
                      </div>
                    </td>
                    <td><span className="priority-badge pb-high">High</span></td>
                    <td>
                      <div className="date-cell">
                        <span className="date-main">Apr 24, 2025</span>
                        <span className="date-sub">02:40 PM</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button className="btn-reorder"><ShoppingCart size={14}/> Reorder</button>
                        <button className="action-more"><MoreVertical size={16}/></button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 6 */}
                  <tr>
                    <td>
                      <div className="type-pill pill-orange">
                        <Clock size={14} /> Expiring Soon
                      </div>
                    </td>
                    <td>
                      <div className="med-cell">
                        <div className="med-icon" style={{backgroundColor: '#fff7ed', color: '#f97316'}}><Pill size={16} /></div>
                        <div className="med-info">
                          <span className="med-name">Cetirizine 10mg</span>
                          <span className="med-desc">Antihistamine • McNeil</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="detail-cell">
                        <div className="detail-text">Batch #C789</div>
                        <div className="detail-sub"><Clock size={12} style={{color:'#f97316'}}/> Expires in 18 days (May 15, 2025)</div>
                      </div>
                    </td>
                    <td><span className="priority-badge pb-med">Medium</span></td>
                    <td>
                      <div className="date-cell">
                        <span className="date-main">Apr 23, 2025</span>
                        <span className="date-sub">05:22 PM</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button className="btn-view">View Batch</button>
                        <button className="action-more"><MoreVertical size={16}/></button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Row 7 */}
                  <tr>
                    <td>
                      <div className="type-pill pill-red">
                        <ThermometerSnowflake size={14} /> Cold Vault Low
                      </div>
                    </td>
                    <td>
                      <div className="med-cell">
                        <div className="med-icon" style={{backgroundColor: '#eff6ff', color: '#2563eb'}}><ThermometerSnowflake size={16} /></div>
                        <div className="med-info">
                          <span className="med-name">Insulin Glargine 100U/ml</span>
                          <span className="med-desc">SoloStar Pen • Cold Refrig #2</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="detail-cell">
                        <div className="detail-text"><span className="text-red" style={{color:'#ef4444'}}>Only 4 pens left</span> • Threshold: 15</div>
                        <div className="progress-bar"><div className="progress-fill fill-red" style={{width: '26%'}}></div></div>
                      </div>
                    </td>
                    <td><span className="priority-badge pb-high">High</span></td>
                    <td>
                      <div className="date-cell">
                        <span className="date-main">Apr 22, 2025</span>
                        <span className="date-sub">08:00 AM</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-cell">
                        <button className="btn-reorder"><ShoppingCart size={14}/> Reorder</button>
                        <button className="action-more"><MoreVertical size={16}/></button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            
            <div className="table-footer">
              <div className="showing-text">Showing 1-7 of 20 alerts</div>
              <div className="pagination">
                <button className="page-btn" style={{color: '#94a3b8'}}><ChevronLeft size={16}/></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn" style={{color: '#94a3b8'}}><ChevronRight size={16}/></button>
              </div>
            </div>
          </div>

        </main>
        
        {/* Footer */}
        <footer className="bottom-footer">
          <div>© 2025 MedStock Clinical Systems. All rights reserved.</div>
          <div className="sys-status">
            <span style={{color: '#10b981'}}>●</span> System Operational
          </div>
        </footer>
      </div>
    </>
  );
};

export default Alert;
