import React, { useState, useEffect } from 'react';
import api from './api/axios';
import {
  Shield, Search, Bell, User,
  Activity, AlertTriangle, Clock, TrendingUp,
  Package, ShoppingCart, BarChart2,
  ChevronRight, ArrowUpRight, ArrowDownRight,
  Zap, Info, CheckCircle2, ChevronDown, ArrowRight,
} from 'lucide-react';
const getPast7Days = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const weekStr = d.toLocaleDateString('en-US', { weekday: 'short' });
    if (i === 0) {
      dates.push(<span key={i} style={{ fontWeight: 600, color: '#2563eb' }}>Today ({weekStr})</span>);
    } else {
      dates.push(<span key={i}>{dayStr} ({weekStr})</span>);
    }
  }
  return dates;
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    user: {
      name: "Dispensary Pharmacist",
      location: "Central Hospital Outpatient Pharmacy Unit",
      lastSync: "4 mins ago",
      currentTime: new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    },
    kpis: {
      medicines: 0,
      lowStock: 0,
      expiring: 0,
      sales: "₹0",
      salesPercent: "0%",
      salesCompare: "vs yesterday (0 orders)"
    },
    transactions: [],
    graph: {
      pathData: "",
      points: [],
      dates: getPast7Days(),
      stats: { velocity: "0", fulfillment: "0%" }
    },
    attentionItems: [],
    aiRecs: []
  });

  useEffect(() => {
    // Example: fetch real dashboard data from backend
    // api.get('/dashboard/summary').then(res => {
    //   if(res.data) setDashboardData(res.data);
    // }).catch(err => console.error("Error fetching dashboard data", err));
  }, []);

  return (
    <>
      <style>{`
        .dashboard-container {
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
          gap: 1rem;
        }

        .nav-search {
          position: relative;
          display: flex;
          align-items: center;
          width: 250px;
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
        }

        .icon-btn:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #1d4ed8;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
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

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background-color: #2563eb;
          border-radius: 50%;
        }

        .status-time {
          color: #64748b;
          font-weight: 400;
        }

        .page-title {
          font-size: 2.25rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 0.875rem;
        }

        .global-search {
          position: relative;
          width: 350px;
        }

        .global-search input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background-color: white;
          font-size: 0.875rem;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
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
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
        }

        .kpi-icon {
          padding: 0.5rem;
          border-radius: 0.5rem;
        }

        .icon-blue { background-color: #eff6ff; color: #2563eb; }
        .icon-red { background-color: #fef2f2; color: #ef4444; }
        .icon-orange { background-color: #fff7ed; color: #f97316; }
        .icon-green { background-color: #f0fdf4; color: #22c55e; }

        .kpi-value {
          font-size: 2.5rem;
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
          gap: 0.25rem;
        }
        
        .text-green { color: #16a34a; font-weight: 500; }
        .text-red { color: #dc2626; font-weight: 500; }

        /* Dashboard Grid Layout */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        /* Card Base */
        .panel-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          margin-bottom: 1.5rem;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
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
        
        .panel-subtitle {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 0.25rem;
        }

        /* Chart Placeholder */
        .chart-area {
          height: 250px;
          position: relative;
          border-bottom: 1px dashed #e2e8f0;
          margin-bottom: 1rem;
          background: linear-gradient(180deg, rgba(37,99,235,0.05) 0%, rgba(255,255,255,0) 100%);
          display: flex;
          align-items: flex-end;
        }
        
        .chart-svg {
          width: 100%;
          height: 100%;
        }

        .chart-x-axis {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: #94a3b8;
          padding: 0 1rem;
        }

        .chart-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }

        .stat-block h4 {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .stat-block p {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0f172a;
        }

        .btn-link {
          color: #2563eb;
          background: none;
          border: none;
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
        }

        /* Transactions Table */
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
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        td {
          padding: 1rem 0;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.875rem;
        }
        
        .tx-id { color: #64748b; font-family: monospace; }
        .tx-medicine { font-weight: 500; color: #0f172a; }
        .tx-desc { font-size: 0.75rem; color: #64748b; }
        
        .badge-pill {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .badge-blue { background-color: #eff6ff; color: #2563eb; }
        .badge-gray { background-color: #f1f5f9; color: #475569; }

        /* Attention List */
        .attention-item {
          padding: 1rem 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .attention-item:last-child {
          border-bottom: none;
        }
        
        .att-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        
        .att-tag {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .tag-red { background-color: #ef4444; color: white; }
        .tag-orange { background-color: #f97316; color: white; }
        
        .att-meta { font-size: 0.75rem; color: #64748b; }
        
        .att-title { font-weight: 600; color: #0f172a; font-size: 0.95rem; }
        .att-desc { font-size: 0.75rem; color: #64748b; margin-bottom: 0.5rem; }
        
        .att-value {
          font-size: 1.25rem;
          font-weight: 700;
          text-align: right;
        }
        .val-red { color: #ef4444; }
        .val-orange { color: #f97316; }
        
        .att-action {
          display: flex;
          justify-content: flex-end;
        }
        
        .btn-ghost-blue {
          background: none;
          border: none;
          color: #2563eb;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
        }

        /* AI Recommendations */
        .ai-card {
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        
        .ai-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .ai-title { font-weight: 600; color: #0f172a; font-size: 0.9rem; }
        .ai-rec-val { font-size: 1.125rem; font-weight: 700; color: #2563eb; text-align: right; }
        .ai-rec-label { font-size: 0.65rem; color: #64748b; text-transform: uppercase; }
        
        .ai-meta {
          font-size: 0.75rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        
        .ai-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid #f1f5f9;
        }
        
        .ai-vendor { font-size: 0.7rem; color: #64748b; }
        
        .btn-solid-blue {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
        }
        
        .btn-dark {
          background-color: #0f172a;
          color: white;
          width: 100%;
          border: none;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          margin-top: 1rem;
        }
      `}</style>

      <div className="dashboard-container">
        {/* Top Navigation */}
        <nav className="top-nav">
          <div className="nav-left">
            <div className="brand">
              <div className="logo-mark">M</div>
              <span>MedStock</span>
            </div>
            <div className="nav-links">
              <a href="#" className="nav-item active">Dashboard</a>
              <a href="#" className="nav-item">Medicines</a>
              <a href="#" className="nav-item">Orders</a>
              <a href="#" className="nav-item">Analytics</a>
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-search">
              <Search className="search-icon" />
              <input type="text" placeholder="Search inventory, batch #..." />
            </div>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <div className="user-avatar">
              <User size={18} />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">

          {/* Header */}
          <header className="page-header">
            <div>
              <div className="status-badge">
                <span className="status-dot"></span>
                DISPENSARY OPERATIONS ACTIVE
                <span className="status-time">• {dashboardData.user.currentTime}</span>
              </div>
              <h1 className="page-title">Welcome back, {dashboardData.user.name}</h1>
              <p className="page-subtitle">{dashboardData.user.location} • System synchronized {dashboardData.user.lastSync}</p>
            </div>
            <div className="global-search">
              <Search className="search-icon" />
              <input type="text" placeholder="Search medicine, SKU, batch, or transaction..." />
            </div>
          </header>

          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Medicines</span>
                <Package className="kpi-icon icon-blue" size={32} />
              </div>
              <div className="kpi-value">{dashboardData.kpis.medicines}</div>
              <div className="kpi-footer">
                <CheckCircle2 size={12} className="text-green" />
                <span>Total active cataloged formulations</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Low Stock</span>
                <AlertTriangle className="kpi-icon icon-red" size={32} />
              </div>
              <div className="kpi-value text-red">{dashboardData.kpis.lowStock}</div>
              <div className="kpi-footer">
                <span className="text-red">●</span>
                <span>Below safe threshold par level</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Expiring</span>
                <Clock className="kpi-icon icon-orange" size={32} />
              </div>
              <div className="kpi-value">{dashboardData.kpis.expiring}</div>
              <div className="kpi-footer">
                <span className="text-orange">■ &lt;30 days</span>
                <span>Batches flagged</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Today's Sales</span>
                <Activity className="kpi-icon icon-blue" size={32} />
              </div>
              <div className="kpi-value">{dashboardData.kpis.sales}</div>
              <div className="kpi-footer">
                <TrendingUp size={12} className="text-green" />
                <span className="text-green">{dashboardData.kpis.salesPercent}</span>
                <span>{dashboardData.kpis.salesCompare}</span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="dashboard-grid">
            {/* Left Column */}
            <div className="left-column">

              {/* Chart Panel */}
              <div className="panel-card">
                <div className="panel-header">
                  <div>
                    <h3 className="panel-title"><TrendingUp size={18} color="#2563eb" /> Stock Movement</h3>
                    <p className="panel-subtitle">Inflow deliveries vs. outpatient dispensing units (Past 7 Days)</p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span> Dispensed</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8', opacity: 0.5 }}></span> Inflow</span>
                    <span style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Weekly <ChevronDown size={12} /></span>
                  </div>
                </div>

                <div className="chart-area">
                  <svg className="chart-svg" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <path d={`${dashboardData.graph.pathData} L500,150 L0,150 Z`} fill="rgba(37,99,235,0.1)" />
                    <path d={dashboardData.graph.pathData} fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
                    <path d={dashboardData.graph.pathData.replace(/Q50,90/, 'Q50,110').replace(/100,110/, '100,80').replace(/T200,80/, 'T200,120').replace(/T300,100/, 'T300,70').replace(/T400,60/, 'T400,90').replace(/T500,40/, 'T500,30')} fill="none" stroke="#2563eb" strokeWidth="3" />
                    {dashboardData.graph.points.map((pt, i) => (
                      <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#2563eb" />
                    ))}
                  </svg>
                </div>
                <div className="chart-x-axis">
                  {dashboardData.graph.dates}
                </div>

                <div className="chart-footer">
                  <div style={{ display: 'flex', gap: '3rem' }}>
                    <div className="stat-block">
                      <h4>Dispensary Velocity</h4>
                      <p>{dashboardData.graph.stats.velocity} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#64748b' }}>units/wk</span></p>
                    </div>
                    <div className="stat-block">
                      <h4>Avg Fulfillment Rate</h4>
                      <p>{dashboardData.graph.stats.fulfillment}</p>
                    </div>
                  </div>
                  <button className="btn-link">Detailed Ledger <ArrowRight size={16} /></button>
                </div>
              </div>

              {/* Transactions Panel */}
              <div className="panel-card">
                <div className="panel-header" style={{ marginBottom: '1rem' }}>
                  <div>
                    <h3 className="panel-title"><ShoppingCart size={18} color="#64748b" /> Recent Transactions</h3>
                    <p className="panel-subtitle">Latest 5 dispensary audit activities</p>
                  </div>
                  <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '99px', padding: '0.2rem 0.75rem', fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>Live Stream</button>
                </div>

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Txn ID</th>
                        <th>Medicine / Item</th>
                        <th>Type</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                        <th style={{ textAlign: 'right' }}>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.transactions.map((txn, index) => (
                        <tr key={index}>
                          <td className="tx-id">{txn.id}</td>
                          <td>
                            <div className="tx-medicine">{txn.medicine}</div>
                            <div className="tx-desc">{txn.desc}</div>
                          </td>
                          <td><span className={`badge-pill ${txn.typeClass}`}>{txn.type}</span></td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>{txn.amount}</td>
                          <td style={{ textAlign: 'right', color: '#64748b', fontSize: '0.75rem' }}>{txn.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Showing 5 of 142 transactions today</span>
                  <button className="btn-link">Report Audit CSV <ArrowDownRight size={16} /></button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">

              {/* Attention Required Panel */}
              <div className="panel-card">
                <div className="panel-header" style={{ marginBottom: '1rem' }}>
                  <div>
                    <h3 className="panel-title"><AlertTriangle size={18} color="#ef4444" /> Attention Required</h3>
                    <p className="panel-subtitle">Immediate inventory actions</p>
                  </div>
                  <span style={{ background: '#ef4444', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>3 Urgent</span>
                </div>

                <div className="attention-list">
                  {dashboardData.attentionItems.map((item, index) => (
                    <div className="attention-item" key={index}>
                      <div className="att-header">
                        <span className={`att-tag ${item.tagClass}`}>● {item.type}</span>
                        <span className="att-meta">{item.par}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div className="att-title">{item.title}</div>
                          <div className="att-desc">{item.desc}</div>
                        </div>
                        <div>
                          <div className={`att-value ${item.valueClass}`}>{item.value}</div>
                          <div style={{ fontSize: '0.65rem', color: item.valueClass === 'val-red' ? '#ef4444' : '#f97316', textAlign: 'right' }}>{item.unit}</div>
                        </div>
                      </div>
                      <div className="att-action">
                        <button className="btn-ghost-blue">{item.action} <ArrowUpRight size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <button style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600, marginTop: '1rem' }}>
                  <Info size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> View All 15 Critical Alerts
                </button>
              </div>

              {/* AI Reorder Panel */}
              <div className="panel-card">
                <div className="panel-header" style={{ marginBottom: '1rem' }}>
                  <div>
                    <h3 className="panel-title"><Zap size={18} color="#2563eb" /> AI Reorder Recommendations</h3>
                    <p className="panel-subtitle">Predictive restocking based on velocity</p>
                  </div>
                  <span style={{ background: '#eff6ff', color: '#2563eb', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>98% Accuracy</span>
                </div>

                {dashboardData.aiRecs.map((rec, index) => (
                  <div className="ai-card" key={index}>
                    <div className="ai-header">
                      <div className="ai-title">{rec.title}</div>
                      <div>
                        <div className="ai-rec-label">Recommended</div>
                        <div className="ai-rec-val">{rec.recValue}</div>
                      </div>
                    </div>
                    <div className="ai-meta">
                      <span className={rec.runoutClass}>● {rec.runout}</span>
                      <span>•</span>
                      <span>{rec.burnRate}</span>
                    </div>
                    <div className="ai-footer">
                      <span className="ai-vendor">Vendor: {rec.vendor}</span>
                      <button className="btn-solid-blue">Fast Reorder <Zap size={12} /></button>
                    </div>
                  </div>
                ))}

                <button className="btn-dark">
                  <CheckCircle2 size={16} /> Approve All & Create PO
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
