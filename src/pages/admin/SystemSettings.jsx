import React, { useState, useEffect } from 'react';
import LogoUpload from '../../components/LogoUpload';
import { 
  FiSave, FiSettings, FiUpload, FiDownload, FiDatabase, 
  FiShield, FiBell, FiMail, FiSmartphone, FiImage,
  FiFileText, FiFile, FiArchive
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Loader from '../../components/common/Loader';
import api from '../../services/api';
import defaultLogo from '../../assets/images/christmas_2012_new_4009.jpg';
import './SystemSettings.css';

// Mock data to use if API fails
const MOCK_SETTINGS = {
  systemName: 'Document Management System',
  logo: defaultLogo, 
  theme: 'light',
  defaultRole: 'user',
  sessionTimeout: 30,
  loginAttempts: 5,
  passwordPolicy: {
    minLength: 8,
    requireUpper: true,
    requireNumber: true,
    requireSpecial: true,
  },
  documentSettings: {
    autoApproval: false,
    watermark: {
      enabled: true,
      text: 'CONFIDENTIAL',
      opacity: 50,
    },
    versioning: {
      keepAll: true,
      maxVersions: 10,
    },
  },
  fileUpload: {
    maxSize: 10,
    allowedTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png', 'dwg'],
  },
  notifications: {
    email: true,
    sms: false,
    push: false,
    types: {
      documentUpdate: true,
      approvalRequest: true,
      deadlineWarning: true,
      systemAlert: true,
    },
  },
  backup: {
    frequency: 'daily',
    location: 'cloud',
    retention: 30,
    autoCleanup: true,
  },
  integrations: {
    emailService: true,
    activeDirectory: false,
    slack: false,
    microsoftTeams: false,
  },
};

const SystemSettings = () => {
  const [settings, setSettings] = useState(MOCK_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/settings');
      
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error('Empty response from server');
      }

      const fetchedSettings = {
        ...MOCK_SETTINGS,
        ...response.data,
        passwordPolicy: {
          ...MOCK_SETTINGS.passwordPolicy,
          ...response.data.passwordPolicy,
        },
        documentSettings: {
          ...MOCK_SETTINGS.documentSettings,
          ...response.data.documentSettings,
          watermark: {
            ...MOCK_SETTINGS.documentSettings.watermark,
            ...response.data.documentSettings?.watermark,
          },
          versioning: {
            ...MOCK_SETTINGS.documentSettings.versioning,
            ...response.data.documentSettings?.versioning,
          },
        },
        fileUpload: {
          ...MOCK_SETTINGS.fileUpload,
          ...response.data.fileUpload,
        },
        notifications: {
          ...MOCK_SETTINGS.notifications,
          ...response.data.notifications,
          types: {
            ...MOCK_SETTINGS.notifications.types,
            ...response.data.notifications?.types,
          },
        },
        backup: {
          ...MOCK_SETTINGS.backup,
          ...response.data.backup,
        },
        integrations: {
          ...MOCK_SETTINGS.integrations,
          ...response.data.integrations,
        },
      };
      
      setSettings(fetchedSettings);
      setUsingMockData(false);
    } catch (error) {
      console.error('Using mock data due to:', error);
      setSettings(MOCK_SETTINGS);
      setUsingMockData(true);
      toast.warning('Showing demo data (API unavailable)');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleNestedChange = (parent, child, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }));
  };

  const handleFileTypeToggle = (type) => {
    setSettings(prev => {
      const currentTypes = [...prev.fileUpload.allowedTypes];
      const typeIndex = currentTypes.indexOf(type);
      
      if (typeIndex > -1) {
        currentTypes.splice(typeIndex, 1);
      } else {
        currentTypes.push(type);
      }

      return {
        ...prev,
        fileUpload: {
          ...prev.fileUpload,
          allowedTypes: currentTypes
        }
      };
    });
  };

  const handleNotificationTypeToggle = (type) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        types: {
          ...prev.notifications.types,
          [type]: !prev.notifications.types[type]
        }
      }
    }));
  };

  const handleLogoUpload = (logoUrl) => {
    setSettings(prev => ({
      ...prev,
      logo: logoUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/settings', settings);
      toast.success('System settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Settings update error:', error);
    } finally {
      setSaving(false);
    }
  };

  const fileTypes = [
    { id: 'pdf', label: 'PDF Documents', icon: <FiFileText className="icon" /> },
    { id: 'doc', label: 'Word DOC', icon: <FiFile className="icon" /> },
    { id: 'docx', label: 'Word DOCX', icon: <FiFile className="icon" /> },
    { id: 'xls', label: 'Excel XLS', icon: <FiFile className="icon" /> },
    { id: 'xlsx', label: 'Excel XLSX', icon: <FiFile className="icon" /> },
    { id: 'jpg', label: 'JPG Images', icon: <FiImage className="icon" /> },
    { id: 'png', label: 'PNG Images', icon: <FiImage className="icon" /> },
    { id: 'dwg', label: 'AutoCAD DWG', icon: <FiFile className="icon" /> },
    { id: 'zip', label: 'ZIP Archives', icon: <FiArchive className="icon" /> },
  ];

  const notificationTypes = [
    { id: 'documentUpdate', label: 'Document Updates' },
    { id: 'approvalRequest', label: 'Approval Requests' },
    { id: 'deadlineWarning', label: 'Deadline Warnings' },
    { id: 'systemAlert', label: 'System Alerts' },
  ];

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="system-settings-container">
      {usingMockData && (
        <div className="alert alert-warning">
          <div className="alert-icon">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="alert-content">
            <p>You're viewing demo data. Real settings will appear when connected to the server.</p>
          </div>
        </div>
      )}
      
      <div className="settings-header">
        <FiSettings className="header-icon" />
        <div>
          <h1 className="header-title">System Configuration</h1>
          <p className="header-subtitle">Manage application-wide settings and preferences</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
          <TabList className="settings-tablist">
            <Tab className="settings-tab" selectedClassName="settings-tab-active">
              <FiSettings className="tab-icon" /> General
            </Tab>
            <Tab className="settings-tab" selectedClassName="settings-tab-active">
              <FiShield className="tab-icon" /> Security
            </Tab>
            <Tab className="settings-tab" selectedClassName="settings-tab-active">
              <FiUpload className="tab-icon" /> Documents
            </Tab>
            <Tab className="settings-tab" selectedClassName="settings-tab-active">
              <FiBell className="tab-icon" /> Notifications
            </Tab>
            <Tab className="settings-tab" selectedClassName="settings-tab-active">
              <FiDatabase className="tab-icon" /> Backup
            </Tab>
          </TabList>

          {/* General Settings Tab */}
          <TabPanel>
            <div className="settings-card">
              <h2 className="settings-card-title">System Information</h2>
              
              <div className="settings-grid">
                <div>
                  <label className="settings-label">System Logo</label>
                  <LogoUpload currentLogo={settings.logo} onUpload={handleLogoUpload} />
                </div>
                
                <div>
                  <label htmlFor="systemName" className="settings-label">
                    System Name
                  </label>
                  <input
                    type="text"
                    id="systemName"
                    name="systemName"
                    value={settings.systemName}
                    onChange={handleChange}
                    className="settings-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="theme" className="settings-label">
                    Theme
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                    className="settings-input"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Preference</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="defaultRole" className="settings-label">
                    Default User Role
                  </label>
                  <select
                    id="defaultRole"
                    name="defaultRole"
                    value={settings.defaultRole}
                    onChange={handleChange}
                    className="settings-input"
                  >
                    <option value="user">Standard User</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="approver">Approver</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h2 className="settings-card-title">System Integrations</h2>
              
              <div className="settings-checkbox-group">
                <div className="settings-checkbox-item">
                  <input
                    id="integrations.emailService"
                    name="integrations.emailService"
                    type="checkbox"
                    checked={settings.integrations.emailService}
                    onChange={handleChange}
                    className="settings-checkbox"
                  />
                  <label htmlFor="integrations.emailService" className="settings-checkbox-label">
                    Email Service Integration
                  </label>
                  <p className="settings-checkbox-description">Enable system to send emails for notifications and alerts</p>
                </div>

                <div className="settings-checkbox-item">
                  <input
                    id="integrations.activeDirectory"
                    name="integrations.activeDirectory"
                    type="checkbox"
                    checked={settings.integrations.activeDirectory}
                    onChange={handleChange}
                    className="settings-checkbox"
                  />
                  <label htmlFor="integrations.activeDirectory" className="settings-checkbox-label">
                    Active Directory Integration
                  </label>
                  <p className="settings-checkbox-description">Sync users and groups with your organization's Active Directory</p>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Security Settings Tab */}
          <TabPanel>
            <div className="settings-card">
              <h2 className="settings-card-title">Authentication</h2>
              
              <div className="settings-grid">
                <div>
                  <label htmlFor="sessionTimeout" className="settings-label">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    id="sessionTimeout"
                    name="sessionTimeout"
                    min="5"
                    max="1440"
                    value={settings.sessionTimeout}
                    onChange={handleChange}
                    className="settings-input"
                  />
                </div>

                <div>
                  <label htmlFor="loginAttempts" className="settings-label">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    id="loginAttempts"
                    name="loginAttempts"
                    min="1"
                    max="10"
                    value={settings.loginAttempts}
                    onChange={handleChange}
                    className="settings-input"
                  />
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h2 className="settings-card-title">Password Policy</h2>
              
              <div className="settings-form-group">
                <div>
                  <label htmlFor="passwordPolicy.minLength" className="settings-label">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    id="passwordPolicy.minLength"
                    name="passwordPolicy.minLength"
                    min="6"
                    max="32"
                    value={settings.passwordPolicy.minLength}
                    onChange={(e) => handleNestedChange('passwordPolicy', 'minLength', e.target.value)}
                    className="settings-input"
                  />
                </div>

                <div className="settings-checkbox-item">
                  <input
                    id="passwordPolicy.requireUpper"
                    name="passwordPolicy.requireUpper"
                    type="checkbox"
                    checked={settings.passwordPolicy.requireUpper}
                    onChange={(e) => handleNestedChange('passwordPolicy', 'requireUpper', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="passwordPolicy.requireUpper" className="settings-checkbox-label">
                    Require Uppercase Letters
                  </label>
                </div>

                <div className="settings-checkbox-item">
                  <input
                    id="passwordPolicy.requireNumber"
                    name="passwordPolicy.requireNumber"
                    type="checkbox"
                    checked={settings.passwordPolicy.requireNumber}
                    onChange={(e) => handleNestedChange('passwordPolicy', 'requireNumber', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="passwordPolicy.requireNumber" className="settings-checkbox-label">
                    Require Numbers
                  </label>
                </div>

                <div className="settings-checkbox-item">
                  <input
                    id="passwordPolicy.requireSpecial"
                    name="passwordPolicy.requireSpecial"
                    type="checkbox"
                    checked={settings.passwordPolicy.requireSpecial}
                    onChange={(e) => handleNestedChange('passwordPolicy', 'requireSpecial', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="passwordPolicy.requireSpecial" className="settings-checkbox-label">
                    Require Special Characters
                  </label>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Document Settings Tab */}
          <TabPanel>
            <div className="settings-card">
              <h2 className="settings-card-title">Document Handling</h2>
              
              <div className="settings-form-group">
                <div className="settings-checkbox-item">
                  <input
                    id="documentSettings.autoApproval"
                    name="documentSettings.autoApproval"
                    type="checkbox"
                    checked={settings.documentSettings.autoApproval}
                    onChange={(e) => handleNestedChange('documentSettings', 'autoApproval', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="documentSettings.autoApproval" className="settings-checkbox-label">
                    Enable Auto-Approval for Minor Revisions
                  </label>
                  <p className="settings-checkbox-description">Documents with minor changes will be automatically approved</p>
                </div>

                <div className="settings-checkbox-item">
                  <input
                    id="documentSettings.watermark.enabled"
                    name="documentSettings.watermark.enabled"
                    type="checkbox"
                    checked={settings.documentSettings.watermark.enabled}
                    onChange={(e) => handleNestedChange('documentSettings.watermark', 'enabled', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="documentSettings.watermark.enabled" className="settings-checkbox-label">
                    Enable Watermarking
                  </label>
                </div>

                {settings.documentSettings.watermark.enabled && (
                  <div className="settings-nested-group">
                    <div>
                      <label htmlFor="documentSettings.watermark.text" className="settings-label">
                        Watermark Text
                      </label>
                      <input
                        type="text"
                        id="documentSettings.watermark.text"
                        name="documentSettings.watermark.text"
                        value={settings.documentSettings.watermark.text}
                        onChange={(e) => handleNestedChange('documentSettings.watermark', 'text', e.target.value)}
                        className="settings-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="documentSettings.watermark.opacity" className="settings-label">
                        Watermark Opacity ({settings.documentSettings.watermark.opacity}%)
                      </label>
                      <input
                        type="range"
                        id="documentSettings.watermark.opacity"
                        name="documentSettings.watermark.opacity"
                        min="10"
                        max="90"
                        step="5"
                        value={settings.documentSettings.watermark.opacity}
                        onChange={(e) => handleNestedChange('documentSettings.watermark', 'opacity', e.target.value)}
                        className="settings-range"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="settings-card">
              <h2 className="settings-card-title">Version Control</h2>
              
              <div className="settings-form-group">
                <div className="settings-checkbox-item">
                  <input
                    id="documentSettings.versioning.keepAll"
                    name="documentSettings.versioning.keepAll"
                    type="checkbox"
                    checked={settings.documentSettings.versioning.keepAll}
                    onChange={(e) => handleNestedChange('documentSettings.versioning', 'keepAll', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="documentSettings.versioning.keepAll" className="settings-checkbox-label">
                    Keep All Versions Indefinitely
                  </label>
                </div>

                {!settings.documentSettings.versioning.keepAll && (
                  <div className="settings-nested-group">
                    <label htmlFor="documentSettings.versioning.maxVersions" className="settings-label">
                      Maximum Versions to Keep
                    </label>
                    <input
                      type="number"
                      id="documentSettings.versioning.maxVersions"
                      name="documentSettings.versioning.maxVersions"
                      min="1"
                      max="50"
                      value={settings.documentSettings.versioning.maxVersions}
                      onChange={(e) => handleNestedChange('documentSettings.versioning', 'maxVersions', e.target.value)}
                      className="settings-input"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="settings-card">
              <h2 className="settings-card-title">File Upload Settings</h2>
              
              <div className="settings-grid">
                <div>
                  <label htmlFor="fileUpload.maxSize" className="settings-label">
                    Maximum File Size (MB)
                  </label>
                  <input
                    type="number"
                    id="fileUpload.maxSize"
                    name="fileUpload.maxSize"
                    min="1"
                    max="100"
                    value={settings.fileUpload.maxSize}
                    onChange={(e) => handleNestedChange('fileUpload', 'maxSize', e.target.value)}
                    className="settings-input"
                  />
                </div>

                <div>
                  <label className="settings-label">
                    Allowed File Types
                  </label>
                  <div className="file-types-grid">
                    {fileTypes.map((fileType) => (
                      <div key={fileType.id} className="file-type-item">
                        <input
                          type="checkbox"
                          id={`fileType-${fileType.id}`}
                          checked={settings.fileUpload.allowedTypes.includes(fileType.id)}
                          onChange={() => handleFileTypeToggle(fileType.id)}
                          className="file-type-checkbox"
                        />
                        <label htmlFor={`fileType-${fileType.id}`} className="file-type-label">
                          {fileType.icon} {fileType.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel>
            <div className="settings-card">
              <h2 className="settings-card-title">Notification Channels</h2>
              
              <div className="settings-form-group">
                <div className="settings-checkbox-item">
                  <input
                    id="notifications.email"
                    name="notifications.email"
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => handleNestedChange('notifications', 'email', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="notifications.email" className="settings-checkbox-label">
                    <FiMail className="checkbox-icon" /> Email Notifications
                  </label>
                  <p className="settings-checkbox-description">Send notifications via email to users</p>
                </div>

                <div className="settings-checkbox-item">
                  <input
                    id="notifications.sms"
                    name="notifications.sms"
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={(e) => handleNestedChange('notifications', 'sms', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="notifications.sms" className="settings-checkbox-label">
                    <FiSmartphone className="checkbox-icon" /> SMS Notifications
                  </label>
                  <p className="settings-checkbox-description">Send text message notifications (additional charges may apply)</p>
                </div>

                <div className="settings-checkbox-item">
                  <input
                    id="notifications.push"
                    name="notifications.push"
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => handleNestedChange('notifications', 'push', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="notifications.push" className="settings-checkbox-label">
                    <FiBell className="checkbox-icon" /> Push Notifications
                  </label>
                  <p className="settings-checkbox-description">Send notifications to mobile devices via our app</p>
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h2 className="settings-card-title">Notification Types</h2>
              
              <div className="notification-types-grid">
                {notificationTypes.map((notification) => (
                  <div key={notification.id} className="notification-type-item">
                    <input
                      id={`notification-${notification.id}`}
                      type="checkbox"
                      checked={settings.notifications.types[notification.id]}
                      onChange={() => handleNotificationTypeToggle(notification.id)}
                      className="notification-type-checkbox"
                    />
                    <label htmlFor={`notification-${notification.id}`} className="notification-type-label">
                      {notification.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          {/* Backup Tab */}
          <TabPanel>
            <div className="settings-card">
              <h2 className="settings-card-title">Backup Configuration</h2>
              
              <div className="settings-grid">
                <div>
                  <label htmlFor="backup.frequency" className="settings-label">
                    Backup Frequency
                  </label>
                  <select
                    id="backup.frequency"
                    name="backup.frequency"
                    value={settings.backup.frequency}
                    onChange={(e) => handleNestedChange('backup', 'frequency', e.target.value)}
                    className="settings-input"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="backup.location" className="settings-label">
                    Backup Location
                  </label>
                  <select
                    id="backup.location"
                    name="backup.location"
                    value={settings.backup.location}
                    onChange={(e) => handleNestedChange('backup', 'location', e.target.value)}
                    className="settings-input"
                  >
                    <option value="cloud">Cloud Storage</option>
                    <option value="local">Local Server</option>
                    <option value="external">External Drive</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="backup.retention" className="settings-label">
                    Retention Period (days)
                  </label>
                  <input
                    type="number"
                    id="backup.retention"
                    name="backup.retention"
                    min="1"
                    max="3650"
                    value={settings.backup.retention}
                    onChange={(e) => handleNestedChange('backup', 'retention', e.target.value)}
                    className="settings-input"
                  />
                </div>

                <div className="settings-checkbox-item">
                  <input
                    id="backup.autoCleanup"
                    name="backup.autoCleanup"
                    type="checkbox"
                    checked={settings.backup.autoCleanup}
                    onChange={(e) => handleNestedChange('backup', 'autoCleanup', e.target.checked)}
                    className="settings-checkbox"
                  />
                  <label htmlFor="backup.autoCleanup" className="settings-checkbox-label">
                    Automatic Cleanup
                  </label>
                  <p className="settings-checkbox-description">Automatically delete backups older than retention period</p>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>

        <div className="settings-footer">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <svg className="btn-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="btn-icon" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;