import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import logo from '../../assets/images/christmas_2012_new_4009.jpg';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Password reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <img src={logo} alt="DMS Logo" className="auth-logo" />
          <h1>Reset Your Password</h1>
          <p>
            {submitted
              ? 'Check your email for further instructions'
              : 'Enter your email to receive a password reset link'}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {submitted ? (
          <div className="auth-success">
            <FaCheckCircle className="success-icon" />
            <p>
              We've sent a password reset link to <strong>{email}</strong>. Please
              check your inbox.
            </p>
            <p>
              Didn't receive the email?{' '}
              <button
                type="button"
                className="auth-link"
                onClick={() => setSubmitted(false)}
              >
                Try again
              </button>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-group">
                <span className="input-icon">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="auth-bg-overlay"></div>
    </div>
  );
};

export default ForgotPassword;