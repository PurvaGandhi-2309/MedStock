import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import logoSvg from '../assets/logo_pixel.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Stock', path: '/stock' },
    { name: 'Batches', path: '/batch' },
    { name: 'Medicines', path: '/medicines' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Alerts', path: '/alert' }
  ];

  return (
    <>
    <style>{`
      .navbar-modern {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 2rem;
        background-color: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        position: sticky;
        top: 0;
        z-index: 50;
      }
      .navbar-container {
        display: flex;
        align-items: center;
        background-color: #f8fafc;
        border-radius: 9999px;
        padding: 0.25rem;
        gap: 0.5rem;
      }
      .nav-pill {
        padding: 0.5rem 1.25rem;
        border-radius: 9999px;
        color: #64748b;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.9rem;
        transition: all 0.2s;
      }
      .nav-pill:hover {
        color: #0f172a;
        background-color: #f1f5f9;
      }
      .nav-pill.active {
        background-color: white;
        color: #0f172a;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        font-weight: 600;
      }
      .nav-pill-primary {
        background-color: #2563eb;
        color: white !important;
        padding: 0.5rem 1.5rem;
        border-radius: 9999px;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 2px 4px rgba(37,99,235,0.3);
      }
      .nav-pill-primary:hover {
        background-color: #1d4ed8;
      }
    `}</style>
    <nav className="navbar-modern">
      <div className="navbar-container">
        {navItems.map(item => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`nav-pill ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
        <Link to="/insights" className="nav-pill-primary">
          AI Insights & Reorder
        </Link>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
