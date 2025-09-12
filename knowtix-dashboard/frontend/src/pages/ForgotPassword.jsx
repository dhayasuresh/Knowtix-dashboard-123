// pages/ForgotPassword.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any email
      if (email) {
        setSubmitted(true);
      } else {
        setError('Please enter your email address');
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <div className="logo-icon">K</div>
            <h1>Knowtix</h1>
          </div>
          <p>Reset your password</p>
        </div>
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Email Sent!</h3>
            <p>We've sent a password reset link to your email address.</p>
            <p>Please check your inbox and follow the instructions.</p>
            <div className="auth-footer">
              <p><Link to="/login">Back to login</Link></p>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : 'Reset Password'}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>Remember your password? <Link to="/login">Sign in</Link></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;