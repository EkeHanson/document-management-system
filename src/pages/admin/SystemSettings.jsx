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

const SystemSettings = () => {
  const [settings, setSettings] = useState({
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
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/settings');
      // Ensure all nested objects exist in the response
      const fetchedSettings = {
        ...settings, // Use defaults as fallback
        ...response.data, // Override with fetched data
        passwordPolicy: {
          ...settings.passwordPolicy,
          ...response.data.passwordPolicy,
        },
        documentSettings: {
          ...settings.documentSettings,
          ...response.data.documentSettings,
          watermark: {
            ...settings.documentSettings.watermark,
            ...response.data.documentSettings?.watermark,
          },
          versioning: {
            ...settings.documentSettings.versioning,
            ...response.data.documentSettings?.versioning,
          },
        },
        fileUpload: {
          ...settings.fileUpload,
          ...response.data.fileUpload,
        },
        notifications: {
          ...settings.notifications,
          ...response.data.notifications,
          types: {
            ...settings.notifications.types,
            ...response.data.notifications?.types,
          },
        },
        backup: {
          ...settings.backup,
          ...response.data.backup,
        },
        integrations: {
          ...settings.integrations,
          ...response.data.integrations,
        },
      };
      setSettings(fetchedSettings);
    } catch (error) {
      toast.error('Failed to fetch settings');
      console.error('Settings fetch error:', error);
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
    { id: 'pdf', label: 'PDF Documents', icon: <FiFileText className="mr-2" /> },
    { id: 'doc', label: 'Word DOC', icon: <FiFile className="mr-2" /> },
    { id: 'docx', label: 'Word DOCX', icon: <FiFile className="mr-2" /> },
    { id: 'xls', label: 'Excel XLS', icon: <FiFile className="mr-2" /> },
    { id: 'xlsx', label: 'Excel XLSX', icon: <FiFile className="mr-2" /> },
    { id: 'jpg', label: 'JPG Images', icon: <FiImage className="mr-2" /> },
    { id: 'png', label: 'PNG Images', icon: <FiImage className="mr-2" /> },
    { id: 'dwg', label: 'AutoCAD DWG', icon: <FiFile className="mr-2" /> },
    { id: 'zip', label: 'ZIP Archives', icon: <FiArchive className="mr-2" /> },
  ];

  const notificationTypes = [
    { id: 'documentUpdate', label: 'Document Updates' },
    { id: 'approvalRequest', label: 'Approval Requests' },
    { id: 'deadlineWarning', label: 'Deadline Warnings' },
    { id: 'systemAlert', label: 'System Alerts' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-8">
        <FiSettings className="text-3xl text-blue-600 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">System Configuration</h1>
          <p className="text-gray-600">Manage application-wide settings and preferences</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
          <TabList className="flex border-b border-gray-200 mb-6">
            <Tab className="px-4 py-2 font-medium cursor-pointer focus:outline-none" selectedClassName="text-blue-600 border-b-2 border-blue-600">
              <FiSettings className="inline mr-2" /> General
            </Tab>
            <Tab className="px-4 py-2 font-medium cursor-pointer focus:outline-none" selectedClassName="text-blue-600 border-b-2 border-blue-600">
              <FiShield className="inline mr-2" /> Security
            </Tab>
            <Tab className="px-4 py-2 font-medium cursor-pointer focus:outline-none" selectedClassName="text-blue-600 border-b-2 border-blue-600">
              <FiUpload className="inline mr-2" /> Documents
            </Tab>
            <Tab className="px-4 py-2 font-medium cursor-pointer focus:outline-none" selectedClassName="text-blue-600 border-b-2 border-blue-600">
              <FiBell className="inline mr-2" /> Notifications
            </Tab>
            <Tab className="px-4 py-2 font-medium cursor-pointer focus:outline-none" selectedClassName="text-blue-600 border-b-2 border-blue-600">
              <FiDatabase className="inline mr-2" /> Backup
            </Tab>
          </TabList>

          {/* General Settings Tab */}
          <TabPanel>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">System Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">System Logo</label>
                  <LogoUpload currentLogo={settings.logo} onUpload={handleLogoUpload} />
                </div>
                
                <div>
                  <label htmlFor="systemName" className="block text-sm font-medium text-gray-700 mb-1">
                    System Name
                  </label>
                  <input
                    type="text"
                    id="systemName"
                    name="systemName"
                    value={settings.systemName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                    Theme
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Preference</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="defaultRole" className="block text-sm font-medium text-gray-700 mb-1">
                    Default User Role
                  </label>
                  <select
                    id="defaultRole"
                    name="defaultRole"
                    value={settings.defaultRole}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="user">Standard User</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="approver">Approver</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">System Integrations</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="integrations.emailService"
                      name="integrations.emailService"
                      type="checkbox"
                      checked={settings.integrations.emailService}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="integrations.emailService" className="font-medium text-gray-700">
                      Email Service Integration
                    </label>
                    <p className="text-gray-500">Enable system to send emails for notifications and alerts</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="integrations.activeDirectory"
                      name="integrations.activeDirectory"
                      type="checkbox"
                      checked={settings.integrations.activeDirectory}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="integrations.activeDirectory" className="font-medium text-gray-700">
                      Active Directory Integration
                    </label>
                    <p className="text-gray-500">Sync users and groups with your organization's Active Directory</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Security Settings Tab */}
          <TabPanel>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Authentication</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="loginAttempts" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Password Policy</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="passwordPolicy.minLength" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="passwordPolicy.requireUpper"
                      name="passwordPolicy.requireUpper"
                      type="checkbox"
                      checked={settings.passwordPolicy.requireUpper}
                      onChange={(e) => handleNestedChange('passwordPolicy', 'requireUpper', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="passwordPolicy.requireUpper" className="font-medium text-gray-700">
                      Require Uppercase Letters
                    </label>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="passwordPolicy.requireNumber"
                      name="passwordPolicy.requireNumber"
                      type="checkbox"
                      checked={settings.passwordPolicy.requireNumber}
                      onChange={(e) => handleNestedChange('passwordPolicy', 'requireNumber', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="passwordPolicy.requireNumber" className="font-medium text-gray-700">
                      Require Numbers
                    </label>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="passwordPolicy.requireSpecial"
                      name="passwordPolicy.requireSpecial"
                      type="checkbox"
                      checked={settings.passwordPolicy.requireSpecial}
                      onChange={(e) => handleNestedChange('passwordPolicy', 'requireSpecial', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="passwordPolicy.requireSpecial" className="font-medium text-gray-700">
                      Require Special Characters
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Document Settings Tab */}
          <TabPanel>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Document Handling</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="documentSettings.autoApproval"
                      name="documentSettings.autoApproval"
                      type="checkbox"
                      checked={settings.documentSettings.autoApproval}
                      onChange={(e) => handleNestedChange('documentSettings', 'autoApproval', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="documentSettings.autoApproval" className="font-medium text-gray-700">
                      Enable Auto-Approval for Minor Revisions
                    </label>
                    <p className="text-gray-500">Documents with minor changes will be automatically approved</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="documentSettings.watermark.enabled"
                      name="documentSettings.watermark.enabled"
                      type="checkbox"
                      checked={settings.documentSettings.watermark.enabled}
                      onChange={(e) => handleNestedChange('documentSettings.watermark', 'enabled', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="documentSettings.watermark.enabled" className="font-medium text-gray-700">
                      Enable Watermarking
                    </label>
                  </div>
                </div>

                {settings.documentSettings.watermark.enabled && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <label htmlFor="documentSettings.watermark.text" className="block text-sm font-medium text-gray-700 mb-1">
                        Watermark Text
                      </label>
                      <input
                        type="text"
                        id="documentSettings.watermark.text"
                        name="documentSettings.watermark.text"
                        value={settings.documentSettings.watermark.text}
                        onChange={(e) => handleNestedChange('documentSettings.watermark', 'text', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="documentSettings.watermark.opacity" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="mt-1 block w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Version Control</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="documentSettings.versioning.keepAll"
                      name="documentSettings.versioning.keepAll"
                      type="checkbox"
                      checked={settings.documentSettings.versioning.keepAll}
                      onChange={(e) => handleNestedChange('documentSettings.versioning', 'keepAll', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="documentSettings.versioning.keepAll" className="font-medium text-gray-700">
                      Keep All Versions Indefinitely
                    </label>
                  </div>
                </div>

                {!settings.documentSettings.versioning.keepAll && (
                  <div className="ml-7">
                    <label htmlFor="documentSettings.versioning.maxVersions" className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">File Upload Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fileUpload.maxSize" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allowed File Types
                  </label>
                  <div className="space-y-2">
                    {fileTypes.map((fileType) => (
                      <div key={fileType.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`fileType-${fileType.id}`}
                          checked={settings.fileUpload.allowedTypes.includes(fileType.id)}
                          onChange={() => handleFileTypeToggle(fileType.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`fileType-${fileType.id}`} className="ml-2 text-sm text-gray-700">
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
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Notification Channels</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notifications.email"
                      name="notifications.email"
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) => handleNestedChange('notifications', 'email', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="notifications.email" className="font-medium text-gray-700 flex items-center">
                      <FiMail className="mr-2" /> Email Notifications
                    </label>
                    <p className="text-gray-500">Send notifications via email to users</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notifications.sms"
                      name="notifications.sms"
                      type="checkbox"
                      checked={settings.notifications.sms}
                      onChange={(e) => handleNestedChange('notifications', 'sms', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="notifications.sms" className="font-medium text-gray-700 flex items-center">
                      <FiSmartphone className="mr-2" /> SMS Notifications
                    </label>
                    <p className="text-gray-500">Send text message notifications (additional charges may apply)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notifications.push"
                      name="notifications.push"
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) => handleNestedChange('notifications', 'push', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="notifications.push" className="font-medium text-gray-700 flex items-center">
                      <FiBell className="mr-2" /> Push Notifications
                    </label>
                    <p className="text-gray-500">Send notifications to mobile devices via our app</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Notification Types</h2>
              
              <div className="space-y-3">
                {notificationTypes.map((notification) => (
                  <div key={notification.id} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={`notification-${notification.id}`}
                        type="checkbox"
                        checked={settings.notifications.types[notification.id]}
                        onChange={() => handleNotificationTypeToggle(notification.id)}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`notification-${notification.id}`} className="font-medium text-gray-700">
                        {notification.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          {/* Backup Tab */}
          <TabPanel>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Backup Configuration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="backup.frequency" className="block text-sm font-medium text-gray-700 mb-1">
                    Backup Frequency
                  </label>
                  <select
                    id="backup.frequency"
                    name="backup.frequency"
                    value={settings.backup.frequency}
                    onChange={(e) => handleNestedChange('backup', 'frequency', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="backup.location" className="block text-sm font-medium text-gray-700 mb-1">
                    Backup Location
                  </label>
                  <select
                    id="backup.location"
                    name="backup.location"
                    value={settings.backup.location}
                    onChange={(e) => handleNestedChange('backup', 'location', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="cloud">Cloud Storage</option>
                    <option value="local">Local Server</option>
                    <option value="external">External Drive</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="backup.retention" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="backup.autoCleanup"
                      name="backup.autoCleanup"
                      type="checkbox"
                      checked={settings.backup.autoCleanup}
                      onChange={(e) => handleNestedChange('backup', 'autoCleanup', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="backup.autoCleanup" className="font-medium text-gray-700">
                      Automatic Cleanup
                    </label>
                    <p className="text-gray-500">Automatically delete backups older than retention period</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={saving}
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="-ml-1 mr-2 h-5 w-5" />
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