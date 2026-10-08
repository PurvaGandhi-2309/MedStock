import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/axios';
import {
  Package, AlertTriangle, Clock, RefreshCw, ShoppingCart, List, LogOut, TrendingUp, ChevronDown, Search, User
} from 'lucide-react';

const generateChartData = (dailyStats) => {
  if (!dailyStats || dailyStats.length === 0) return { outPath: '', inPath: '', points: [], dates: [], maxOut: 0, maxIn: 0 };
  const sorted = [...dailyStats].sort((a, b) => new Date(a.date) - new Date(b.date));
  const maxVal = Math.max(...sorted.map(d => Math.max(d.in, d.out)), 1);
  
  const step = 500 / Math.max(sorted.length - 1, 1);
  const outPoints = sorted.map((d, i) => ({ x: i * step, y: 140 - (d.out / maxVal) * 120, val: d.out }));
  const inPoints = sorted.map((d, i) => ({ x: i * step, y: 140 - (d.in / maxVal) * 120, val: d.in }));

  const outPath = 'M ' + outPoints.map(p => `${p.x},${p.y}`).join(' L ');
  const inPath = 'M ' + inPoints.map(p => `${p.x},${p.y}`).join(' L ');
  
  const dates = sorted.map(d => {
    const dt = new Date(d.date);
    return `${dt.getDate()}/${dt.getMonth()+1}`;
  });
  
  const maxOut = Math.max(...sorted.map(d => d.out));
  const maxIn = Math.max(...sorted.map(d => d.in));

  return { outPath, inPath, points: outPoints, dates, maxOut, maxIn };
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalMedicines: 0,
    totalStock: 0,
    lowStockCount: 0,
    expiredCount: 0,
    expiringSoonCount: 0,
    recentTransactions: [],
    categorySummary: [],
    dailyStats: [],
    userName: 'Pharmacist'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    
    api.get('/dashboard', { signal: controller.signal })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'CanceledError') return;
        
        if (!err.response) {
          setError({ type: 'network', message: 'Network error' });
        } else if (err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError({ type: 'server', message: `Server error: ${err.response.status}` });
        }
        setLoading(false);
      });
      
    return () => controller.abort();
  };

  useEffect(() => {
    const cleanup = fetchDashboardData();
    return cleanup;
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f1f5f9;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #0f172a;
        }

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

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: #0f172a;
        }

        .logo-mark {
          background-color: #2563eb;
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
          gap: 1rem;
        }

        .nav-item {
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .nav-item.active {
          color: #2563eb;
          font-weight: 600;
        }

        .nav-search {
          position: relative;
          display: flex;
          align-items: center;
          width: 250px;
          margin-right: 1rem;
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
          margin-left: 1rem;
        }

        .main-content {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

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
          margin: 0 0 0.5rem 0;
        }
        
        .page-subtitle {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0;
        }

        .global-search {
          position: relative;
          width: 350px;
          margin-bottom: 1rem;
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

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: white;
          border: 1px solid #e2e8f0;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
        }
        
        .refresh-btn:hover { background-color: #f8fafc; }

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
          display: flex;
          flex-direction: column;
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .kpi-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
        }

        .kpi-icon {
          padding: 0.5rem;
          border-radius: 0.5rem;
        }

        .icon-blue { background-color: #eff6ff; color: #2563eb; }
        .icon-green { background-color: #f0fdf4; color: #22c55e; }
        .icon-red { background-color: #fef2f2; color: #ef4444; }

        .kpi-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        
        .kpi-value.text-red { color: #ef4444; }

        .kpi-footer {
          font-size: 0.75rem;
          color: #64748b;
        }

        .skeleton {
          background: #e2e8f0;
          background: linear-gradient(90deg, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s infinite;
          border-radius: 0.25rem;
        }

        @keyframes pulse {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .skeleton-title { height: 16px; width: 60%; margin-bottom: 1rem; }
        .skeleton-value { height: 40px; width: 40%; margin-bottom: 0.5rem; }
        .skeleton-footer { height: 12px; width: 80%; }

        .dashboard-main-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .left-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .right-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .panel-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
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
          margin-top: 1rem;
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

        .panel-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .transaction-item:last-child { border-bottom: none; padding-bottom: 0; }

        .tx-left {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .tx-name { font-weight: 600; font-size: 0.9rem; }
        .tx-date { font-size: 0.75rem; color: #64748b; }

        .tx-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .badge {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .badge-in { background-color: #dcfce7; color: #16a34a; }
        .badge-out { background-color: #ffedd5; color: #ea580c; }

        .tx-qty { font-weight: 600; font-size: 0.9rem; }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background-color: #f8fafc;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .cat-name { font-weight: 600; }
        .cat-units { color: #64748b; }

        .empty-state {
          text-align: center;
          color: #94a3b8;
          padding: 2rem 0;
          font-size: 0.875rem;
        }

        .error-state {
          background-color: #fef2f2;
          border: 1px solid #fca5a5;
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .error-title { color: #dc2626; font-weight: 600; margin-bottom: 0.5rem; }
        
        .btn-primary {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
        }
      `}</style>

      <div className="dashboard-container">
        <nav className="top-nav">
          <div className="brand">
            <div className="logo-mark">M</div>
            <span>MedStock</span>
          </div>
          <div className="nav-links">
            <div className="nav-search">
              <Search className="search-icon" size={16} />
              <input type="text" placeholder="Search inventory..." />
            </div>
            <a href="/dashboard" className="nav-item active">Dashboard</a>
            <a href="/medicines" className="nav-item">Medicines</a>
            <a href="/batch" className="nav-item">Batches</a>
            <button onClick={handleLogout} style={{background:'none', border:'none', color:'#ef4444', fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:'4px'}}>
              <LogOut size={16}/> Logout
            </button>
            <div className="user-avatar" title={data.userName}>
              {data.userName ? data.userName.charAt(0).toUpperCase() : 'P'}
            </div>
          </div>
        </nav>

        <main className="main-content">
          <header className="page-header">
            <div>
              <h1 className="page-title">Welcome back, {data.userName}</h1>
              <p className="page-subtitle">Dispensary Operations • System Active</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div className="global-search">
                <Search className="search-icon" size={18} />
                <input type="text" placeholder="Search medicine, SKU, batch..." />
              </div>
              <button className="refresh-btn" onClick={fetchDashboardData} disabled={loading}>
                <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}/> Refresh
              </button>
            </div>
          </header>

          {error && (
            <div className="error-state">
              <div className="error-title">{error.message}</div>
              <button className="btn-primary" onClick={fetchDashboardData}>Retry</button>
            </div>
          )}

          {!error && (
            <>
              <div className="kpi-grid">
                {/* KPI 1: Total Medicines */}
                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-title">Total Medicines</span>
                    <Package className="kpi-icon icon-blue" size={32} />
                  </div>
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-value"></div>
                      <div className="skeleton skeleton-footer"></div>
                    </>
                  ) : (
                    <>
                      <div className="kpi-value">{data.totalMedicines}</div>
                      <div className="kpi-footer">Registered in catalog</div>
                    </>
                  )}
                </div>

                {/* KPI 2: Total Stock Units */}
                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-title">Total Stock Units</span>
                    <List className="kpi-icon icon-green" size={32} />
                  </div>
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-value"></div>
                      <div className="skeleton skeleton-footer"></div>
                    </>
                  ) : (
                    <>
                      <div className="kpi-value">{data.totalStock}</div>
                      <div className="kpi-footer">Across all valid batches</div>
                    </>
                  )}
                </div>

                {/* KPI 3: Low Stock Alerts */}
                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-title">Low Stock Alerts</span>
                    <AlertTriangle className={`kpi-icon ${data.lowStockCount > 0 ? 'icon-red' : 'icon-blue'}`} size={32} />
                  </div>
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-value"></div>
                      <div className="skeleton skeleton-footer"></div>
                    </>
                  ) : (
                    <>
                      <div className={`kpi-value ${data.lowStockCount > 0 ? 'text-red' : ''}`}>{data.lowStockCount}</div>
                      <div className="kpi-footer">Medicines below minimum limit</div>
                    </>
                  )}
                </div>

                {/* KPI 4: Expiry Warnings */}
                <div className="kpi-card">
                  <div className="kpi-header">
                    <span className="kpi-title">Expiry Warnings</span>
                    <Clock className={`kpi-icon ${(data.expiringSoonCount + data.expiredCount) > 0 ? 'icon-red' : 'icon-blue'}`} size={32} />
                  </div>
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-value"></div>
                      <div className="skeleton skeleton-footer"></div>
                    </>
                  ) : (
                    <>
                      <div className={`kpi-value ${(data.expiringSoonCount + data.expiredCount) > 0 ? 'text-red' : ''}`}>
                        {data.expiringSoonCount + data.expiredCount}
                      </div>
                      <div className="kpi-footer">{data.expiringSoonCount} expiring soon, {data.expiredCount} expired</div>
                    </>
                  )}
                </div>
              </div>

              <div className="dashboard-main-grid">
                <div className="left-column">
                  {/* Chart Panel */}
                  <div className="panel-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 className="panel-title" style={{marginBottom: 0}}><TrendingUp size={18} color="#2563eb" /> Stock Movement</h3>
                        <p className="panel-subtitle">Inflow deliveries vs. outpatient dispensing units (Past 7 Days)</p>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span> Dispensed</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8', opacity: 0.5 }}></span> Inflow</span>
                      </div>
                    </div>

                    {loading ? (
                      <div className="chart-area" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div className="skeleton" style={{ width: '100%', height: '100%' }}></div>
                      </div>
                    ) : (
                      <>
                        {(() => {
                          const chart = generateChartData(data.dailyStats);
                          return (
                            <>
                              <div className="chart-area">
                                <svg className="chart-svg" viewBox="0 0 500 150" preserveAspectRatio="none">
                                  {/* Dispensed Path (OUT) */}
                                  <path d={`${chart.outPath} L 500,150 L 0,150 Z`} fill="rgba(37,99,235,0.1)" />
                                  <path d={chart.outPath} fill="none" stroke="#2563eb" strokeWidth="3" />
                                  
                                  {/* Inflow Path (IN) */}
                                  <path d={chart.inPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                                  
                                  {chart.points.map((pt, i) => (
                                    <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#2563eb" />
                                  ))}
                                </svg>
                              </div>
                              <div className="chart-x-axis">
                                {chart.dates.map((d, i) => (
                                  <span key={i}>{d}</span>
                                ))}
                              </div>
                            </>
                          );
                        })()}
                      </>
                    )}
                  </div>

                  {/* Recent Activity */}
                  <div className="panel-card">
                    <h2 className="panel-title"><ShoppingCart size={20} color="#2563eb" /> Recent Activity</h2>
                    
                    {loading ? (
                      <div className="transaction-list">
                        {[1, 2, 3].map(i => (
                          <div className="transaction-item" key={i}>
                            <div className="tx-left">
                              <div className="skeleton skeleton-title" style={{ width: '120px' }}></div>
                              <div className="skeleton skeleton-footer" style={{ width: '80px' }}></div>
                            </div>
                            <div className="skeleton skeleton-value" style={{ width: '40px', height: '24px' }}></div>
                          </div>
                        ))}
                      </div>
                    ) : data.recentTransactions.length > 0 ? (
                      <div className="transaction-list">
                        {data.recentTransactions.map(tx => (
                          <div className="transaction-item" key={tx.id}>
                            <div className="tx-left">
                              <div className="tx-name">{tx.medicineName}</div>
                              <div className="tx-date">{new Date(tx.date).toLocaleString()}</div>
                            </div>
                            <div className="tx-right">
                              <span className={`badge ${tx.type === 'IN' ? 'badge-in' : 'badge-out'}`}>{tx.type}</span>
                              <span className="tx-qty">{tx.quantity} units</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">No recent activity found.</div>
                    )}
                  </div>
                </div>

                <div className="right-column">
                  {/* Category Breakdown */}
                  <div className="panel-card">
                    <h2 className="panel-title"><List size={20} color="#2563eb" /> Category Breakdown</h2>
                  
                  {loading ? (
                    <div className="category-list">
                      {[1, 2].map(i => (
                        <div className="category-item" key={i}>
                          <div className="skeleton skeleton-title" style={{ margin:0, width: '80px' }}></div>
                          <div className="skeleton skeleton-title" style={{ margin:0, width: '40px' }}></div>
                        </div>
                      ))}
                    </div>
                  ) : Object.keys(data.categorySummary).length > 0 ? (
                    <div className="category-list">
                      {Array.isArray(data.categorySummary) ? (
                        data.categorySummary.map((cat, i) => (
                          <div className="category-item" key={i}>
                            <span className="cat-name">{cat.category}</span>
                            <span className="cat-units">{cat.totalStock} units</span>
                          </div>
                        ))
                      ) : (
                        Object.keys(data.categorySummary).map(key => (
                          <div className="category-item" key={key}>
                            <span className="cat-name">{key}</span>
                            <span className="cat-units">{data.categorySummary[key]} units</span>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="empty-state">No categories available.</div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
