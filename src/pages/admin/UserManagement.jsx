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
  FaExclamationTriangle
} from 'react-icons/fa';
import { MdEmail, MdPerson, MdAdminPanelSettings } from 'react-icons/md';
import { toast } from 'react-toastify';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';

// Dummy user data for testing
const dummyUsers = [
  {
    id: '1',
    name: 'Root Admin',
    email: 'root@example.com',
    role: 'root_admin',
    status: 'active',
    lastActive: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Document Manager',
    email: 'manager@example.com',
    role: 'admin',
    status: 'active',
    lastActive: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: '3',
    name: 'Content Editor',
    email: 'editor@example.com',
    role: 'editor',
    status: 'active',
    lastActive: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  },
  {
    id: '4',
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'guest',
    status: 'inactive',
    lastActive: null
  }
];

// Mock API service
const mockUserService = {
  fetchUsers: () => new Promise(resolve => {
    setTimeout(() => resolve([...dummyUsers]), 500);
  }),
  
  updateUser: (userId, data) => new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = dummyUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        reject(new Error('User not found'));
        return;
      }
      
      // Simulate validation
      if (data.name.length < 2) {
        reject(new Error('Name must be at least 2 characters'));
        return;
      }
      
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
      resolve({ success: true });
    }, 500);
  }),
  
  generatePassword: (userId) => new Promise(resolve => {
    setTimeout(() => {
      const tempPassword = Math.random().toString(36).slice(-8);
      resolve({ tempPassword });
    }, 400);
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
        const updatedUser = await mockUserService.updateUser(currentUser.id, formData);
        toast.success('User updated successfully');
        fetchUsers();
      } else {
        // In a real implementation, this would call the API to create user
        const newUser = {
          ...formData,
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          lastActive: null
        };
        setUsers(prev => [...prev, newUser]);
        setFilteredUsers(prev => [...prev, newUser]);
        toast.success('User created successfully');
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

  const handleGeneratePassword = async (userId) => {
    if (window.confirm('Generate a new random password for this user?')) {
      try {
        const { tempPassword } = await mockUserService.generatePassword(userId);
        toast.success(
          <div>
            <p>New password generated successfully</p>
            <p className="font-bold mt-2">Temporary Password: {tempPassword}</p>
            <p className="text-sm text-yellow-600">Please inform the user to change this password immediately</p>
          </div>,
          { autoClose: 10000 }
        );
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
      case 'root_admin': return <MdAdminPanelSettings className="text-red-500" />;
      case 'admin': return <FaUserShield className="text-purple-500" />;
      case 'reviewer': return <FaUserShield className="text-blue-500" />;
      case 'editor': return <FaEdit className="text-green-500" />;
      default: return <FaUser className="text-gray-500" />;
    }
  };

  const getRoleLabel = (roleValue) => {
    const roleObj = roles.find(r => r.value === roleValue);
    return roleObj ? roleObj.label : roleValue;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => {
            setCurrentUser(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <FaUserPlus className="mr-2" /> Add User
        </button>
      </div>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No users found matching your search
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <MdPerson className="text-blue-600 text-xl" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MdEmail className="text-gray-500 mr-2" />
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRoleIcon(user.role)}
                          <div className="ml-2">
                            <div className="capitalize">{getRoleLabel(user.role)}</div>
                            <div className="text-xs text-gray-500">
                              Last active: {user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${user.status === 'active' ? 'bg-green-100 text-green-800' : 
                            user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="Edit user"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handlePasswordResetClick(user)}
                            className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                            title="Reset password"
                          >
                            <FaKey />
                          </button>
                          <button
                            onClick={() => handleGeneratePassword(user.id)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="Generate new password"
                          >
                            <FaSyncAlt />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                minLength="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {formData.role && (
                <p className="mt-1 text-xs text-gray-500">
                  {roles.find(r => r.value === formData.role)?.description}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {!currentUser && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    A temporary password will be automatically generated for new users.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setCurrentUser(null);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                minLength="8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                minLength="8"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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