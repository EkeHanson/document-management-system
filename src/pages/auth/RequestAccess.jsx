import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaLock, FaCheck } from 'react-icons/fa';
import logo from '../../assets/images/christmas_2012_new_4009.jpg';
import './Auth.css';

const RequestAccess = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    projectName: '',
    role: 'viewer',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Here you would typically call your API to submit the access request
      // await api.submitAccessRequest(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <img src={logo} alt="DMS Logo" className="auth-logo" />
            <h1>Access Request Submitted</h1>
            <p>Thank you for your interest in our Document Management System</p>
          </div>

          <div className="success-message">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h2>Request Received</h2>
            <p>
              Your access request has been submitted successfully. 
              Our team will review your information and contact you within 2 business days.
            </p>
            <p>
              For immediate assistance, please contact our support team at 
              <a href="mailto:support@dms.com">support@dms.com</a>.
            </p>
          </div>

          <div className="auth-footer">
            <p>
              Return to <Link to="/login" className="auth-link">Login page</Link>
            </p>
          </div>
        </div>
        <div className="auth-bg-overlay"></div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <img src={logo} alt="DMS Logo" className="auth-logo" />
          <h1>Request System Access</h1>
          <p>Please provide your details to request access to the Document Management System</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div className="input-group">
                <span className="input-icon">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-group">
                <span className="input-icon">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <span className="input-icon">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your work email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-group">
              <span className="input-icon">
                <FaPhone />
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <div className="input-group">
              <span className="input-icon">
                <FaBuilding />
              </span>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter your company name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <div className="input-group">
              <span className="input-icon">
                <FaUser />
              </span>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter your job title"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="projectName">Project Name (if applicable)</label>
            <div className="input-group">
              <span className="input-icon">
                <FaBuilding />
              </span>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter project name you'll be working on"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Requested Access Level</label>
            <div className="input-group">
              <span className="input-icon">
                <FaLock />
              </span>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="viewer">Viewer (Read-only access)</option>
                <option value="editor">Editor (Create and modify documents)</option>
                <option value="admin">Administrator (Full system access)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Additional Information</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please provide any additional information about your request"
              rows="3"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="auth-bg-overlay"></div>
    </div>
  );
};

export default RequestAccess;