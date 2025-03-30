import React, { useState, useEffect } from 'react';
import { 
  FaUserPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaUserShield, 
  FaUser,
  FaKey,
  FaSyncAlt,
  FaExclamationTriangle,
  FaCopy,
  FaHistory
} from 'react-icons/fa';
import { MdEmail, MdPerson, MdAdminPanelSettings } from 'react-icons/md';
import { toast } from 'react-toastify';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import './UserManagement.css';

// Dummy user data with enhanced security fields
const dummyUsers = [
  {
    id: '1',
    name: 'Root Admin',
    email: 'root@example.com',
    role: 'root_admin',
    status: 'active',
    lastActive: new Date().toISOString(),
    passwordChangedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Document Manager',
    email: 'manager@example.com',
    role: 'admin',
    status: 'active',
    lastActive: new Date(Date.now() - 86400000).toISOString(),
    passwordChangedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    name: 'Content Editor',
    email: 'editor@example.com',
    role: 'editor',
    status: 'active',
    lastActive: new Date(Date.now() - 259200000).toISOString(),
    passwordChangedAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: '4',
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'guest',
    status: 'inactive',
    lastActive: null,
    passwordChangedAt: null
  }
];

// Password generator function
const generateStrongPassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Enhanced mock service with password management
const mockUserService = {
  fetchUsers: () => new Promise(resolve => {
    setTimeout(() => resolve([...dummyUsers]), 500);
  }),
  
  updateUser: (userId, data) => new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = dummyUsers.findIndex(u => u.id === userId);
      if (userIndex === -1) reject(new Error('User not found'));
      
      const updatedUser = { ...dummyUsers[userIndex], ...data };
      dummyUsers[userIndex] = updatedUser;
      resolve(updatedUser);
    }, 800);
  }),
  
  deleteUser: (userId) => new Promise(resolve => {
    setTimeout(() => {
      const index = dummyUsers.findIndex(u => u.id === userId);
      if (index !== -1) dummyUsers.splice(index, 1);
      resolve();
    }, 300);
  }),
  
  resetPassword: (userId, newPassword) => new Promise(resolve => {
    setTimeout(() => {
      const user = dummyUsers.find(u => u.id === userId);
      if (user) {
        user.passwordChangedAt = new Date().toISOString();
      }
      resolve({ success: true });
    }, 500);
  }),
  
  generatePassword: (userId) => new Promise(resolve => {
    setTimeout(() => {
      const tempPassword = generateStrongPassword();
      resolve({ tempPassword });
    }, 400);
  }),
  
  sendPasswordEmail: (userId, tempPassword) => new Promise(resolve => {
    setTimeout(() => {
      console.log(`[Mock] Email sent to user ${userId} with temp password: ${tempPassword}`);
      alert(`[Mock] Email sent to user ${userId} with temp password: ${tempPassword}`);
      resolve();
    }, 300);
  })
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [generatedPasswords, setGeneratedPasswords] = useState({});
  const [showPasswordHistory, setShowPasswordHistory] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'guest',
    status: 'active'
  });
  
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const roles = [
    { value: 'root_admin', label: 'Root Admin', description: 'Full system access including user management' },
    { value: 'admin', label: 'Admin', description: 'Can manage documents and users but with some restrictions' },
    { value: 'reviewer', label: 'Reviewer', description: 'Can review and approve documents' },
    { value: 'editor', label: 'Editor', description: 'Can create and edit documents' },
    { value: 'guest', label: 'Guest', description: 'Read-only access to assigned documents' }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(user => {
      const nameMatch = user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const emailMatch = user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || emailMatch;
    });
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockUserService.fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
      console.error('Error fetching users:', err);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser) {
        await mockUserService.updateUser(currentUser.id, formData);
        toast.success('User updated successfully');
      } else {
        const tempPassword = generateStrongPassword();
        const newUser = {
          ...formData,
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          lastActive: null,
          passwordChangedAt: null
        };
        
        setUsers(prev => [...prev, newUser]);
        setFilteredUsers(prev => [...prev, newUser]);
        
        // Store the generated password
        setGeneratedPasswords(prev => ({
          ...prev,
          [newUser.id]: {
            password: tempPassword,
            timestamp: new Date().toISOString(),
            userName: newUser.name
          }
        }));
        
        // Show password to admin
        toast.success(
          <div>
            <p>User created successfully</p>
            <div className="password-history-password">
              <span>{tempPassword}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(tempPassword);
                  toast.info('Password copied to clipboard');
                }}
                className="password-history-copy"
              >
                <FaCopy />
              </button>
            </div>
            <div className="alert alert-error">
              <p>
                For security reasons:
                <br />• Never store this password in plain text
                <br />• The user must change it on first login
                <br />• This notification will not appear again
              </p>
            </div>
          </div>,
          { autoClose: 15000 }
        );
        
        // In a real app, you would send this via email
        await mockUserService.sendPasswordEmail(newUser.id, tempPassword);
      }
      setIsModalOpen(false);
      setCurrentUser(null);
      resetForm();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await mockUserService.resetPassword(currentUser.id, passwordData.newPassword);
      toast.success('Password reset successfully');
      setIsPasswordModalOpen(false);
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.message || 'Password reset failed');
    }
  };

  const handleGeneratePassword = async (userId, userName) => {
    if (window.confirm(`Generate a new random password for ${userName}?`)) {
      try {
        const { tempPassword } = await mockUserService.generatePassword(userId);
        
        // Store the password with user info
        setGeneratedPasswords(prev => ({
          ...prev,
          [userId]: {
            password: tempPassword,
            timestamp: new Date().toISOString(),
            userName
          }
        }));

        // Show copyable password
        toast.success(
          <div>
            <p>New password generated for {userName}</p>
            <div className="password-history-password">
              <span>{tempPassword}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(tempPassword);
                  toast.info('Password copied to clipboard');
                }}
                className="password-history-copy"
              >
                <FaCopy />
              </button>
            </div>
            <div className="alert alert-error">
              <p>
                For security reasons:
                <br />• Never store this password in plain text
                <br />• The user must change it immediately
                <br />• This notification will not appear again
              </p>
            </div>
          </div>,
          { autoClose: 15000 }
        );
        
        // In a real app, you would send this via email
        await mockUserService.sendPasswordEmail(userId, tempPassword);
      } catch (err) {
        toast.error('Failed to generate password');
      }
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const handlePasswordResetClick = (user) => {
    setCurrentUser(user);
    setIsPasswordModalOpen(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await mockUserService.deleteUser(userId);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'guest',
      status: 'active'
    });
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'root_admin': return <MdAdminPanelSettings className="user-role-icon" />;
      case 'admin': return <FaUserShield className="user-role-icon" />;
      case 'reviewer': return <FaUserShield className="user-role-icon" />;
      case 'editor': return <FaEdit className="user-role-icon" />;
      default: return <FaUser className="user-role-icon" />;
    }
  };

  const getRoleLabel = (roleValue) => {
    const roleObj = roles.find(r => r.value === roleValue);
    return roleObj ? roleObj.label : roleValue;
  };

  const PasswordHistory = () => (
    <div className="password-history">
      <div className="password-history-header">
        <h3 className="password-history-title">Generated Passwords</h3>
        <button 
          onClick={() => setShowPasswordHistory(!showPasswordHistory)}
          className="password-history-toggle"
        >
          {showPasswordHistory ? 'Hide' : 'Show'} <FaHistory className="password-history-icon" />
        </button>
      </div>
      
      {showPasswordHistory && (
        Object.entries(generatedPasswords).length === 0 ? (
          <p className="empty-state">No passwords generated in this session</p>
        ) : (
          <ul className="password-history-list">
            {Object.entries(generatedPasswords).map(([userId, data]) => {
              const user = users.find(u => u.id === userId);
              return (
                <li key={userId} className="password-history-item">
                  <span>
                    <span className="password-history-user">{data.userName}</span>
                    <span className="password-history-timestamp">
                      {new Date(data.timestamp).toLocaleString()}
                    </span>
                    {user?.passwordChangedAt && (
                      <span className="password-history-changed">(Changed)</span>
                    )}
                  </span>
                  <div className="password-history-actions">
                    <span className="password-history-password">
                      {data.password}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(data.password);
                        toast.info(`Copied password for ${data.userName}`);
                      }}
                      className="password-history-copy"
                      title="Copy password"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )
      )}
    </div>
  );

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h1 className="user-management-title">User Management</h1>
        <div className="user-management-actions">
          <button
            onClick={fetchUsers}
            className="btn btn-secondary"
            title="Refresh users"
          >
            <FaSyncAlt className="btn-icon" />
          </button>
          <button
            onClick={() => {
              setCurrentUser(null);
              setIsModalOpen(true);
            }}
            className="btn btn-primary"
          >
            <FaUserPlus className="btn-icon" /> Add User
          </button>
        </div>
      </div>

      <div className="user-search-container">
        <FaSearch className="user-search-icon" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="user-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="alert alert-error">
          <div className="alert-icon">
            <FaExclamationTriangle />
          </div>
          <div className="alert-content">
            <p>{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loader">
          <div className="loader-spinner"></div>
        </div>
      ) : (
        <div className="user-table-container">
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              No users found matching your search
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-avatar">
                          <div className="user-avatar-icon">
                            <MdPerson />
                          </div>
                          <div className="user-avatar-info">
                            <div className="user-name">{user.name}</div>
                            <div className="user-id">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="user-email">
                          <MdEmail className="user-email-icon" />
                          <div>{user.email}</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-role">
                          {getRoleIcon(user.role)}
                          <div className="user-role-info">
                            <div className="user-role-name">{getRoleLabel(user.role)}</div>
                            <div className="user-role-last-active">
                              Last active: {user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`user-status user-status-${user.status}`}>
                          {user.status}
                        </span>
                        {user.passwordChangedAt && (
                          <div className="user-pw-changed">
                            PW changed: {new Date(user.passwordChangedAt).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="user-actions">
                          <button
                            onClick={() => handleEdit(user)}
                            className="user-action-btn user-action-edit"
                            title="Edit user"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handlePasswordResetClick(user)}
                            className="user-action-btn user-action-password"
                            title="Reset password"
                          >
                            <FaKey />
                          </button>
                          <button
                            onClick={() => handleGeneratePassword(user.id, user.name)}
                            className="user-action-btn user-action-generate"
                            title="Generate new password"
                          >
                            <FaSyncAlt />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="user-action-btn user-action-delete"
                            title="Delete user"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <PasswordHistory />

      {/* User Edit/Create Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setCurrentUser(null);
          resetForm();
        }}
        title={currentUser ? 'Edit User' : 'Create New User'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
                minLength="2"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {formData.role && (
                <p className="form-help-text">
                  {roles.find(r => r.value === formData.role)?.description}
                </p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {!currentUser && (
            <div className="alert alert-warning">
              <div className="alert-icon">
                <FaExclamationTriangle />
              </div>
              <div className="alert-content">
                <p>
                  A temporary password will be automatically generated and displayed after creation.
                </p>
              </div>
            </div>
          )}

          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setCurrentUser(null);
                resetForm();
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {currentUser ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Password Reset Modal */}
      <Modal 
        isOpen={isPasswordModalOpen} 
        onClose={() => {
          setIsPasswordModalOpen(false);
          setPasswordData({ newPassword: '', confirmPassword: '' });
        }}
        title={`Reset Password for ${currentUser?.name || 'User'}`}
      >
        <form onSubmit={handlePasswordReset}>
          <div className="form-group">
            <label className="form-label">New Password *</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="form-input"
              required
              minLength="8"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="form-input"
              required
              minLength="8"
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Reset Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;