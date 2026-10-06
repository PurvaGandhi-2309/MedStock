import React from 'react';
import './App.css';
import { Eye, Clock, TrendingUp, Package, Search, AlertCircle, BarChart2, Shield } from 'lucide-react';

function App() {
  return (
    <div className="medstock-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo-container">
            <div className="logo-icon">
              <Shield size={20} color="#2563eb" />
            </div>
            <span className="logo-text">MedStock</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#product">Product</a>
            <a href="#about">About</a>
          </div>
          <div className="nav-actions">
            <a href="#login" className="login-btn">Login</a>
            <button className="signup-btn">Sign Up</button>
            <div className="avatar"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">
            <span className="dot"></span>
            PHARMACY INVENTORY PLATFORM
          </div>
          <h1 className="hero-title">
            Simple and complete pharmacy<br />stock control
          </h1>
          <p className="hero-subtitle">
            Track every batch, expiry date, and reorder level in one place, so shelves never<br />run empty.
          </p>
          <button className="explore-btn">Explore features</button>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="section bg-white">
        <div className="section-header">
          <span className="section-label">THE PROBLEM</span>
          <h2 className="section-title">
            Managing medicine inventory should not<br />be complicated.
          </h2>
          <p className="section-subtitle">
            Pharmacies handle many medicines, batches and stock movements every day. Without a<br />
            clear inventory system, it can become difficult to know what is available, what needs to be<br />
            reordered, and which medicines are approaching their expiry date.
          </p>
        </div>

        <div className="cards-grid-3">
          <div className="card">
            <div className="card-icon-wrapper">
              <Eye size={20} className="card-icon" />
            </div>
            <h3 className="card-title">Stock Visibility</h3>
            <p className="card-text">
              Quickly see which medicines are available, running low, or need attention.
            </p>
            <a href="#" className="card-link">See features <span className="arrow">→</span></a>
          </div>
          <div className="card">
            <div className="card-icon-wrapper">
              <Clock size={20} className="card-icon" />
            </div>
            <h3 className="card-title">Expiry Management</h3>
            <p className="card-text">
              Track batch expiry dates and identify medicines that are approaching expiry.
            </p>
            <a href="#" className="card-link">See features <span className="arrow">→</span></a>
          </div>
          <div className="card">
            <div className="card-icon-wrapper">
              <TrendingUp size={20} className="card-icon" />
            </div>
            <h3 className="card-title">Better Stock Decisions</h3>
            <p className="card-text">
              Use stock movement and sales history to understand inventory changes and plan replenishment.
            </p>
            <a href="#" className="card-link">See features <span className="arrow">→</span></a>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="section bg-gray">
        <div className="section-header">
          <span className="section-label">CORE FEATURES</span>
          <h2 className="section-title">
            Everything you need to manage pharmacy<br />inventory
          </h2>
        </div>

        <div className="features-grid">
          <div className="features-row-3">
            <div className="card feature-card">
              <div className="card-icon-wrapper">
                <Package size={20} className="card-icon" />
              </div>
              <h3 className="card-title">Medicine & Batch Management</h3>
              <p className="card-text">
                Maintain medicine details, batch numbers, quantities and expiry dates in one place. Keep track of suppliers and categories effortlessly.
              </p>
              <a href="#" className="card-link">See features <span className="arrow">→</span></a>
            </div>
            <div className="card feature-card">
              <div className="card-icon-wrapper">
                <Search size={20} className="card-icon" />
              </div>
              <h3 className="card-title">Stock Tracking</h3>
              <p className="card-text">
                Monitor stock levels and record incoming and outgoing inventory with clear stock movements. Prevent discrepancies in real-time.
              </p>
              <a href="#" className="card-link">See features <span className="arrow">→</span></a>
            </div>
            <div className="card feature-card">
              <div className="card-icon-wrapper">
                <Clock size={20} className="card-icon" />
              </div>
              <h3 className="card-title">Expiry Tracking</h3>
              <p className="card-text">
                Identify medicines and batches that are approaching expiry so they can be handled on time. Automate removal of expired items.
              </p>
              <a href="#" className="card-link">See features <span className="arrow">→</span></a>
            </div>
          </div>
          <div className="features-row-2">
            <div className="card feature-card">
              <div className="card-icon-wrapper">
                <AlertCircle size={20} className="card-icon" />
              </div>
              <h3 className="card-title">Low-Stock Alerts</h3>
              <p className="card-text">
                Get a clear view of medicines below their required stock level and know when restocking is needed. Set up automatic reorder reminders.
              </p>
              <a href="#" className="card-link">See features <span className="arrow">→</span></a>
            </div>
            <div className="card feature-card">
              <div className="card-icon-wrapper">
                <BarChart2 size={20} className="card-icon" />
              </div>
              <h3 className="card-title">Sales History</h3>
              <p className="card-text">
                Review previous sales and stock movements to understand how inventory changes over time. Generate insightful reports for better planning.
              </p>
              <a href="#" className="card-link">See features <span className="arrow">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="section bg-white">
        <div className="section-header">
          <span className="section-label">WORKFLOW</span>
          <h2 className="section-title">How MedStock Works</h2>
        </div>

        <div className="cards-grid-3 workflow-grid">
          <div className="card workflow-card">
            <div className="step-number">01</div>
            <h3 className="card-title">Add Medicines</h3>
            <p className="card-text">
              Add medicines with important details such as batch number, quantity and expiry date.
            </p>
          </div>
          <div className="card workflow-card">
            <div className="step-number">02</div>
            <h3 className="card-title">Track Inventory</h3>
            <p className="card-text">
              Record stock coming in and going out while keeping current quantities updated.
            </p>
          </div>
          <div className="card workflow-card">
            <div className="step-number">03</div>
            <h3 className="card-title">Monitor & Act</h3>
            <p className="card-text">
              Check low-stock and expiry alerts and use inventory history to make better decisions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gray cta-section">
        <div className="cta-box">
          <h2 className="cta-title">Take control of your medicine<br />inventory.</h2>
          <p className="cta-text">
            Keep your medicines organized, stay ahead of low-stock items, and<br />monitor expiry dates with MedStock.
          </p>
          <button className="cta-btn">Sign Up</button>
          <p className="cta-login">
            Already have an account? <a href="#login">Login</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="logo-container">
              <div className="logo-icon">
                <Shield size={20} color="#2563eb" />
              </div>
              <span className="logo-text">MedStock</span>
            </div>
            <p className="footer-desc">
              Smart Medicine Inventory Management. Maintain<br />
              pharmaceutical control, tracking, and clinical replenishment.
            </p>
          </div>
          <div className="footer-right">
            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How it Works</a>
              <a href="#product">Product</a>
              <a href="#about">About</a>
              <a href="#login">Login</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 MedStock. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
