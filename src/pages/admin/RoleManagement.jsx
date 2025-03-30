import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaKey } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import api from '../../services/api';
import './RoleManagement.css';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const allPermissions = [
    'document:create',
    'document:read',
    'document:update',
    'document:delete',
    'document:approve',
    'drawing:create',
    'drawing:read',
    'drawing:update',
    'drawing:delete',
    'transmittal:create',
    'transmittal:read',
    'transmittal:update',
    'transmittal:delete',
    'user:manage',
    'role:manage',
    'settings:manage'
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (Array.isArray(roles)) {
      const results = roles.filter(role =>
        role.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoles(results);
    }
  }, [searchTerm, roles]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/roles');
      if (Array.isArray(response.data)) {
        setRoles(response.data);
        setFilteredRoles(response.data);
      } else {
        toast.error('Invalid roles data received');
        setRoles([]);
        setFilteredRoles([]);
      }
    } catch (error) {
      toast.error('Failed to fetch roles');
      setRoles([]);
      setFilteredRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      return {
        ...prev,
        permissions: newPermissions
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentRole) {
        await api.put(`/roles/${currentRole.id}`, formData);
        toast.success('Role updated successfully');
      } else {
        await api.post('/roles', formData);
        toast.success('Role created successfully');
      }
      fetchRoles();
      setIsModalOpen(false);
      setCurrentRole(null);
      setFormData({
        name: '',
        description: '',
        permissions: []
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions || []
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await api.delete(`/roles/${roleId}`);
        toast.success('Role deleted successfully');
        fetchRoles();
      } catch (error) {
        toast.error('Failed to delete role');
      }
    }
  };

  return (
    <div className="role-management-container">
      <div className="role-management-header">
        <h1 className="role-management-title">Role Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <FaPlus className="btn-icon" /> Add Role
        </button>
      </div>

      <div className="role-search-container">
        <FaSearch className="role-search-icon" />
        <input
          type="text"
          placeholder="Search roles..."
          className="role-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loader">
          <div className="loader-spinner"></div>
        </div>
      ) : (
        <div className="role-table-container">
          <table className="role-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredRoles) && filteredRoles.map((role) => (
                <tr key={role.id}>
                  <td>
                    <div className="role-avatar">
                      <div className="role-avatar-icon">
                        <FaKey />
                      </div>
                      <div className="role-avatar-info">
                        <div className="role-name capitalize">{role.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="role-description">{role.description}</div>
                  </td>
                  <td>
                    <div className="role-permissions">
                      {role.permissions?.length > 0 ? (
                        <span className="role-permission-count">
                          {role.permissions.length} permissions
                        </span>
                      ) : (
                        <span className="role-no-permissions">
                          No permissions
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="role-actions">
                      <button
                        onClick={() => handleEdit(role)}
                        className="role-action-btn role-action-edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="role-action-btn role-action-delete"
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setCurrentRole(null);
          setFormData({
            name: '',
            description: '',
            permissions: []
          });
        }}
        title={currentRole ? 'Edit Role' : 'Add New Role'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Role Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Permissions</label>
            <div className="permissions-grid">
              {allPermissions.map(permission => (
                <div key={permission} className="permission-item">
                  <input
                    type="checkbox"
                    id={`perm-${permission}`}
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    className="permission-checkbox"
                  />
                  <label htmlFor={`perm-${permission}`} className="permission-label">
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setCurrentRole(null);
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {currentRole ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoleManagement;