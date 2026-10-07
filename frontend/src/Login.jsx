import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Key, Eye, ArrowRight } from 'lucide-react';
import api from './api/axios';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    
    api.post('/login', formData)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        navigate('/dashboard');
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Invalid credentials');
      });
  };
  return (
    <>
      <style>{`
        .login-container {
          display: flex;
          min-height: 100vh;
          background-color: #dbe4f4;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #0f172a;
          position: relative;
        }

        /* Top Navigation */
        .login-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 3rem;
          z-index: 10;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 1.25rem;
          color: #0f172a;
          text-decoration: none;
        }

        .logo-mark {
          background-color: #2563eb;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.125rem;
        }

        /* Left Content Area */
        .login-left {
          flex: 1;
          padding: 8rem 3rem 4rem 5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          max-width: 55%;
        }

        .left-content h1 {
          font-size: 3rem;
          line-height: 1.1;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .left-content p {
          font-size: 1.125rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 3rem;
          max-width: 90%;
        }

        .image-container {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
          height: 400px;
          position: relative;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Right Content Area */
        .login-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 5rem 4rem 2rem;
        }

        .login-card {
          background-color: #ffffff;
          border-radius: 1.5rem;
          padding: 3rem;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.08);
        }

        .login-card h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #0f172a;
        }

        .login-card .subtitle {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background-color: #f1f5f9;
          color: #0f172a;
          border: none;
          padding: 0.875rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-bottom: 2rem;
        }

        .google-btn:hover {
          background-color: #e2e8f0;
        }

        .google-icon {
          width: 20px;
          height: 20px;
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin-bottom: 2rem;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }

        .divider span {
          padding: 0 1rem;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: #64748b;
        }

        .input-action {
          position: absolute;
          right: 1rem;
          color: #64748b;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          background-color: #f8fafc;
          border: 1px solid transparent;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          color: #0f172a;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #2563eb;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .form-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .checkbox {
          appearance: none;
          width: 1.1rem;
          height: 1.1rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.25rem;
          margin: 0;
          cursor: pointer;
          position: relative;
          background-color: white;
        }

        .checkbox:checked {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .checkbox:checked::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 2px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-label {
          font-size: 0.875rem;
          color: #475569;
        }
        
        .forgot-password {
          font-size: 0.875rem;
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }

        .submit-btn {
          width: 100%;
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background-color 0.2s;
        }

        .submit-btn:hover {
          background-color: #1d4ed8;
        }

        .signup-link {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.875rem;
          color: #475569;
        }

        .signup-link a {
          color: #2563eb;
          font-weight: 600;
          text-decoration: none;
        }

        /* Footer Elements */
        .bottom-footer {
          position: absolute;
          bottom: 2rem;
          left: 5rem;
          right: 5rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #64748b;
        }

        .footer-links-right {
          display: flex;
          gap: 2rem;
        }
        
        .footer-links-right a {
          color: #64748b;
          text-decoration: none;
        }

        @media (max-width: 1024px) {
          .login-container {
            flex-direction: column;
          }
          .login-left, .login-right {
            max-width: 100%;
            padding: 4rem 2rem;
          }
          .login-left {
            padding-top: 8rem;
          }
          .bottom-footer {
            position: static;
            padding: 2rem;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="login-container">
        {/* Top Navigation */}
        <nav className="login-nav">
          <a href="/" className="nav-logo">
            <div className="logo-mark">M</div>
            <span>MedStock</span>
          </a>
        </nav>

        {/* Left Side */}
        <div className="login-left">
          <div className="left-content">
            <h1>Precision inventory for modern healthcare.</h1>
            <p>
              Never let an empty shelf delay patient care. Track every batch,
              avoid urgent stockouts, and dispense with total peace of mind.
            </p>
            
            <div className="image-container">
              <img 
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Pharmacist managing inventory" 
              />
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="login-right">
          <div className="login-card">
            <h2>Welcome back</h2>
            <p className="subtitle">Enter your credentials to access your dispensary dashboard</p>

            <button className="google-btn">
              <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            <div className="divider">
              <span>OR SIGN IN WITH EMAIL</span>
            </div>

            {error && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center', backgroundColor: '#fef2f2', padding: '0.5rem', borderRadius: '0.5rem' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Work Email</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="e.g. s.jenkins@healthclinic.org" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <Key size={18} className="input-icon" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" placeholder="Enter your password" />
                  <button type="button" className="input-action">
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              <div className="form-actions-row">
                <div className="checkbox-wrapper">
                  <input type="checkbox" id="remember" className="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  <label htmlFor="remember" className="checkbox-label">
                    Remember this device
                  </label>
                </div>
                <a href="/forgot" className="forgot-password">Forgot password?</a>
              </div>

              <button type="submit" className="submit-btn">
                Sign in to MedStock <ArrowRight size={18} />
              </button>
            </form>

            <div className="signup-link">
              Don't have an account? <a href="/signup">Sign up</a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Area */}
        <div className="bottom-footer">
          <div>© 2025 MedStock Clinical Systems. Institutional Reliability.</div>
          <div className="footer-links-right">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/status">System Status</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
