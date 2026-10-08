import React, { useState, useEffect } from 'react';
import api from './api/axios';
import { 
  Search, Bell, RefreshCw, ChevronRight, Zap, 
  TrendingUp, AlertTriangle, Calendar, Star, CheckCircle2,
  Bot, ArrowRight, Check, Sparkles, Activity
} from 'lucide-react';

const Insights = () => {
  const [insightsData, setInsightsData] = useState({
    recommendations: [],
    kpis: {
      increasing: null,
      lowStock: null,
      expiry: null,
      topSelling: null
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState('');

  const generateAiInsights = async () => {
    setLoadingAi(true);
    setAiError('');
    try {
      const res = await api.post('/ai/inventory-insights');
      setAiSummary(res.data.insights);
    } catch (err) {
      console.error(err);
      setAiError(err.response?.data?.error || err.response?.data?.message || "Failed to load AI Insights");
    } finally {
      setLoadingAi(false);
    }
  };

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const res = await api.get('/reorder');
      const list = res.data.reorderList;
      
      const recs = [];
      let topSeller = null;
      let worstStock = null;
      
      list.forEach(item => {
        if (item.needsReorder) {
          recs.push({
            name: item.name,
            desc: `ID: ${item.medicineId}`,
            currentQty: item.currentStock,
            currentQtyClass: item.currentStock <= item.minimumStock ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600',
            recQty: item.suggestedReorderQuantity,
            reasonText: `Avg ${item.averageDailySales}/day | Sold ${item.last30DaysSales} in 30d`,
            reasonIcon: <Activity size={14} style={{ color: '#64748b', marginRight: '4px' }} />
          });
        }
        
        // Find top seller
        if (!topSeller || item.last30DaysSales > topSeller.last30DaysSales) {
          topSeller = item;
        }
        
        // Find worst stock (lowest difference between current and min)
        const stockDiff = item.currentStock - item.minimumStock;
        if (!worstStock || stockDiff < (worstStock.currentStock - worstStock.minimumStock)) {
          worstStock = item;
        }
      });
      
      setInsightsData({
        recommendations: recs,
        kpis: {
          topSelling: topSeller,
          lowStock: worstStock
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const filteredRecommendations = insightsData.recommendations.filter(rec =>
    !searchQuery || JSON.stringify(rec).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style>{`
        .insights-container {
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
          gap: 0.75rem;
        }
        
        .dot-blue-large {
          width: 10px;
          height: 10px;
          background-color: #2563eb;
          border-radius: 50%;
          margin-top: 0.5rem;
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
          max-width: 600px;
          line-height: 1.4;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .global-search {
          position: relative;
          width: 300px;
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

        /* Layout Grids */
        .insights-grid {
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

        /* Cards General */
        .panel-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .panel-title-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .panel-icon-circle {
          width: 32px;
          height: 32px;
          background-color: #eff6ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
        }

        .panel-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }
        
        .panel-subtitle {
          font-size: 0.75rem;
          color: #64748b;
        }
        
        .link-view-all {
          font-size: 0.8rem;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* AI Recommendations Table */
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
          font-weight: 600;
          color: #64748b;
          padding: 1rem 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        td {
          padding: 1rem 0.5rem;
          border-bottom: 1px solid #f8fafc;
          vertical-align: middle;
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

        .qty-pill {
          display: inline-flex;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        
        .qty-red { color: #ef4444; background-color: #fef2f2; }
        .qty-blue { color: #2563eb; background-color: #eff6ff; }
        .qty-gray { color: #475569; background-color: #f1f5f9; }
        
        .reason-cell {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: #475569;
        }

        .btn-reorder-small {
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 0.4rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .table-footer-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }
        
        .footer-note {
          font-size: 0.8rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-solid-large {
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }

        /* Key Inventory Insights */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .section-subtitle {
          font-size: 0.75rem;
          color: #64748b;
        }

        .insights-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .insight-card {
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .insight-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          color: #0f172a;
        }
        
        .insight-icon-sm {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .bg-green-light { background-color: #dcfce7; color: #16a34a; }
        .bg-orange-light { background-color: #ffedd5; color: #ea580c; }
        .bg-blue-light { background-color: #dbeafe; color: #2563eb; }
        
        .insight-text {
          font-size: 0.8rem;
          color: #475569;
          line-height: 1.4;
        }
        
        .insight-footer {
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: auto;
        }
        
        .text-green { color: #16a34a; }
        .text-orange { color: #ea580c; }
        .text-blue { color: #2563eb; }

        /* Chart Panel */
        .chart-legend {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.75rem;
          color: #475569;
          font-weight: 500;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        
        .chart-area {
          height: 200px;
          width: 100%;
          position: relative;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 1rem;
        }
        
        .chart-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .x-axis-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: #94a3b8;
          padding: 0 10px;
        }

        .chart-footer {
          background-color: #f8fafc;
          border-radius: 0.5rem;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
        }

        .cf-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #475569;
        }
        
        .cf-right {
          color: #2563eb;
          font-weight: 600;
          font-size: 0.8rem;
          background-color: #eff6ff;
          padding: 0.2rem 0.5rem;
          border-radius: 0.25rem;
        }

        /* AI Promo Card */
        .ai-promo-card {
          background: linear-gradient(to bottom, #ffffff, #f8fafc);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .ai-promo-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .bot-icon-wrapper {
          width: 48px;
          height: 48px;
          background-color: #2563eb;
          color: white;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-promo-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 0.5rem;
        }
        
        .ai-promo-desc {
          font-size: 0.8rem;
          color: #475569;
          line-height: 1.5;
        }
        
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 0.5rem 0;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #475569;
          font-weight: 500;
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
      `}</style>

      <div className="insights-container">
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
              <a href="/alerts" className="nav-item">Alerts</a>
              <a href="#" className="nav-item active">AI Insights & Reorder</a>
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
              <div className="dot-blue-large"></div>
              <div>
                <h1 className="page-title">AI Reorder / Insights</h1>
                <p className="page-subtitle">AI-powered recommendations to manage stock velocity, reduce expiry waste, and prevent clinical shortages.</p>
              </div>
            </div>
            <div className="header-actions">
              <div className="global-search">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search medicine" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="btn-outline">
                <RefreshCw size={16} /> Refresh Analysis
              </button>
            </div>
          </header>

          <div className="insights-grid">
            {/* Left Column */}
            <div className="left-column">
              
              {/* AI Recommendations Panel */}
              <div className="panel-card">
                <div className="panel-header">
                  <div className="panel-title-wrapper">
                    <div className="panel-icon-circle">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h2 className="panel-title">Reorder Recommendations</h2>
                      <p className="panel-subtitle">Based on 30-day trailing sales and current stock levels.</p>
                    </div>
                  </div>
                  <a href="#" className="link-view-all">View All <ChevronRight size={16}/></a>
                </div>

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Current Stock</th>
                        <th>Recommended Qty</th>
                        <th>Reason / Metrics</th>
                        <th style={{textAlign: 'right'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecommendations.length > 0 ? (
                        filteredRecommendations.map((rec, idx) => (
                          <tr key={idx}>
                            <td>
                              <div className="med-cell">
                                <span className="med-name">{rec.name}</span>
                                <span className="med-desc">{rec.desc}</span>
                              </div>
                            </td>
                            <td><span className={`qty-pill`} style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', backgroundColor: '#f1f5f9' }}>{rec.currentQty}</span></td>
                            <td><span className="qty-pill qty-blue" style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 600 }}>{rec.recQty}</span></td>
                            <td>
                              <div className="reason-cell" style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
                                {rec.reasonIcon} {rec.reasonText}
                              </div>
                            </td>
                            <td style={{textAlign: 'right'}}>
                              <button className="btn-reorder-small" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', backgroundColor: 'white' }}>Reorder</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                            {loading ? "Calculating..." : (searchQuery ? "No matching recommendations found." : "No reorders recommended at this time.")}
                          </td>
                        </tr>
                      )}

                    </tbody>
                  </table>
                </div>

                <div className="table-footer-action">
                  <div className="footer-note">
                    <CheckCircle2 size={16} className="text-blue" style={{color:'#2563eb'}}/> 
                    5 prioritized POs recommended for dispatch
                  </div>
                  <button className="btn-solid-large">
                    <Check size={18} /> Approve All & Create Bulk Purchase Orders
                  </button>
                </div>
              </div>

              {/* Key Inventory Insights Section */}
              <div>
                <div className="section-header">
                  <div className="section-title">
                    <div className="dot-blue-large"></div> Key Inventory Insights
                  </div>
                  <div className="section-subtitle">Real-time dynamic heuristics</div>
                </div>

                <div className="insights-cards-grid">
                  {/* Insight 1 */}
                  <div className="insight-card">
                    <div className="insight-header">
                      <div className="insight-icon-sm bg-green-light"><TrendingUp size={14}/></div>
                      Action Needed
                    </div>
                    <div className="insight-text">
                      You have <strong>{insightsData.recommendations.length} items</strong> below their optimal stock levels based on trailing sales.
                    </div>
                    <div className="insight-footer text-green">
                      + Restock Suggested
                    </div>
                  </div>

                  {/* Insight 2 */}
                  <div className="insight-card">
                    <div className="insight-header">
                      <div className="insight-icon-sm bg-orange-light"><AlertTriangle size={14}/></div>
                      Most Urgent Restock
                    </div>
                    <div className="insight-text">
                      {insightsData.kpis.lowStock ? (
                        <><strong>{insightsData.kpis.lowStock.name}</strong> is currently at {insightsData.kpis.lowStock.currentStock} units (Min: {insightsData.kpis.lowStock.minimumStock}).</>
                      ) : "All stock levels are perfectly optimal."}
                    </div>
                    <div className="insight-footer text-orange">
                      ⚠ Review Quantities
                    </div>
                  </div>

                  {/* Insight 3 */}
                  <div className="insight-card">
                    <div className="insight-header">
                      <div className="insight-icon-sm bg-blue-light"><Activity size={14}/></div>
                      Total Order Volume
                    </div>
                    <div className="insight-text">
                      To fully restock all recommended items for a 30-day supply, you need to order <strong>{insightsData.recommendations.reduce((sum, r) => sum + r.recQty, 0)} total units</strong>.
                    </div>
                    <div className="insight-footer text-blue">
                      ✔ Covers next 30 days
                    </div>
                  </div>

                  {/* Insight 4 */}
                  <div className="insight-card">
                    <div className="insight-header">
                      <div className="insight-icon-sm bg-blue-light"><Star size={14}/></div>
                      Best Performing
                    </div>
                    <div className="insight-text">
                      {insightsData.kpis.topSelling ? (
                        <><strong>{insightsData.kpis.topSelling.name}</strong> was your highest selling medicine ({insightsData.kpis.topSelling.last30DaysSales} units in 30 days).</>
                      ) : "No sales data available yet."}
                    </div>
                    <div className="insight-footer text-blue">
                      ✔ Steady Margin Tier 1
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              
              {/* Stock Demand Forecast Panel */}
              <div className="panel-card">
                <div className="panel-header">
                  <div className="panel-title-wrapper">
                    <div className="panel-icon-circle">
                      <Activity size={18} />
                    </div>
                    <div>
                      <h2 className="panel-title">Stock Demand Forecast</h2>
                      <p className="panel-subtitle">Next 7 days demand prediction (top medicines)</p>
                    </div>
                  </div>
                  <a href="#" className="link-view-all">View Details <ChevronRight size={16}/></a>
                </div>

                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="dot dot-blue" style={{width:'8px',height:'8px',backgroundColor:'#2563eb',borderRadius:'50%'}}></div> Paracetamol
                  </div>
                  <div className="legend-item">
                    <div className="dot" style={{width:'8px',height:'8px',backgroundColor:'#0ea5e9',borderRadius:'50%'}}></div> Amoxicillin
                  </div>
                  <div className="legend-item">
                    <div className="dot dot-orange" style={{width:'8px',height:'8px',backgroundColor:'#f97316',borderRadius:'50%'}}></div> Vitamin D3
                  </div>
                </div>

                <div className="chart-area">
                  <svg className="chart-svg" viewBox="0 0 400 150" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="400" y2="20" stroke="#f1f5f9" strokeWidth="1"/>
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#f1f5f9" strokeWidth="1"/>
                    <line x1="0" y1="80" x2="400" y2="80" stroke="#f1f5f9" strokeWidth="1"/>
                    <line x1="0" y1="110" x2="400" y2="110" stroke="#f1f5f9" strokeWidth="1"/>

                    {/* Area fill for Paracetamol */}
                    <path d="M0,100 L60,80 L120,80 L180,70 L240,40 L300,30 L360,30 L400,35 L400,150 L0,150 Z" fill="rgba(37, 99, 235, 0.05)" />
                    
                    {/* Line for Paracetamol (Blue) */}
                    <path d="M0,100 L60,80 L120,80 L180,70 L240,40 L300,30 L360,30 L400,35" fill="none" stroke="#2563eb" strokeWidth="2" />
                    <circle cx="60" cy="80" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>
                    <circle cx="120" cy="80" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>
                    <circle cx="180" cy="70" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>
                    <circle cx="240" cy="40" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>
                    <circle cx="300" cy="30" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>
                    <circle cx="360" cy="30" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>

                    {/* Line for Amoxicillin (Light Blue/Cyan) */}
                    <path d="M0,120 L60,110 L120,115 L180,105 L240,90 L300,80 L360,80 L400,85" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                    <circle cx="120" cy="115" r="2" fill="#0ea5e9" />
                    <circle cx="240" cy="90" r="2" fill="#0ea5e9" />
                    <circle cx="300" cy="80" r="2" fill="#0ea5e9" />
                    
                    {/* Line for Vitamin D3 (Orange) */}
                    <path d="M0,130 L60,135 L120,135 L180,130 L240,125 L300,125 L360,130 L400,135" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4 2"/>
                  </svg>
                </div>
                <div className="x-axis-labels">
                  <span>Apr 28</span>
                  <span>Apr 29</span>
                  <span>Apr 30</span>
                  <span>May 1</span>
                  <span>May 2</span>
                  <span>May 3</span>
                  <span>May 4</span>
                </div>

                <div className="chart-footer">
                  <div className="cf-left">
                    <Calendar size={16} style={{color:'#64748b'}}/>
                    <span>Forecasted Peak: <strong>May 3 - May 4</strong> (Weekend Clinic Surge)</span>
                  </div>
                  <div className="cf-right">+10% Avg Drift</div>
                </div>
              </div>

              {/* AI Promo Card / Summary Card */}
              <div className="ai-promo-card">
                <div className="ai-promo-header">
                  <div className="bot-icon-wrapper">
                    <Bot size={24} />
                  </div>
                  <Sparkles size={20} style={{color: '#3b82f6'}} />
                </div>
                
                {!aiSummary && !loadingAi && (
                  <>
                    <div>
                      <div className="ai-promo-title">Pharmacy AI Assistant</div>
                      <p className="ai-promo-desc">
                        Get an intelligent, natural-language summary of your entire pharmacy's health, warnings, and suggested actions using Google Gemini.
                      </p>
                    </div>
                    {aiError && <div style={{color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem'}}>{aiError}</div>}
                    <button 
                      className="btn-solid-large" 
                      style={{width: '100%', justifyContent: 'center', marginTop: '1rem'}}
                      onClick={generateAiInsights}
                    >
                      <Sparkles size={16} style={{ marginRight: '0.5rem' }}/> Generate AI Summary
                    </button>
                  </>
                )}

                {loadingAi && (
                  <div style={{ padding: '2rem 0', textAlign: 'center', color: '#64748b' }}>
                    <RefreshCw size={24} className="spin-icon" style={{ margin: '0 auto 1rem auto', animation: 'spin 1s linear infinite' }} />
                    <p>Gemini is analyzing your inventory data...</p>
                  </div>
                )}

                {aiSummary && !loadingAi && (
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.25rem' }}>Executive Summary</h4>
                      <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>{aiSummary.summary}</p>
                    </div>
                    
                    {aiSummary.importantWarnings && (Array.isArray(aiSummary.importantWarnings) ? aiSummary.importantWarnings.length > 0 : true) && (
                      <div style={{ backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '0.5rem' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#dc2626', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <AlertTriangle size={14} /> Warnings
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#991b1b' }}>
                          {Array.isArray(aiSummary.importantWarnings) 
                            ? aiSummary.importantWarnings.map((warning, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{warning}</li>)
                            : <li style={{ marginBottom: '0.25rem' }}>{aiSummary.importantWarnings}</li>
                          }
                        </ul>
                      </div>
                    )}

                    {aiSummary.reorderSuggestions && (Array.isArray(aiSummary.reorderSuggestions) ? aiSummary.reorderSuggestions.length > 0 : true) && (
                      <div style={{ backgroundColor: '#eff6ff', padding: '0.75rem', borderRadius: '0.5rem' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2563eb', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <ShoppingCart size={14} /> Reorder Strategy
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#1e40af' }}>
                          {Array.isArray(aiSummary.reorderSuggestions)
                            ? aiSummary.reorderSuggestions.map((suggestion, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{suggestion}</li>)
                            : <li style={{ marginBottom: '0.25rem' }}>{aiSummary.reorderSuggestions}</li>
                          }
                        </ul>
                      </div>
                    )}
                    
                    <button 
                      className="btn-outline" 
                      style={{width: '100%', justifyContent: 'center', marginTop: '0.5rem'}}
                      onClick={generateAiInsights}
                    >
                      <RefreshCw size={14} style={{ marginRight: '0.25rem' }}/> Refresh Analysis
                    </button>
                  </div>
                )}
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

export default Insights;
