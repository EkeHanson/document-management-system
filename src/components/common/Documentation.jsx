// src/components/common/Documentation.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiFileText, FiVideo, FiDownload, FiSearch, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import './Documentation.css'
const Documentation = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const documentationCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <FiBook className="text-blue-500 text-xl" />,
      items: [
        {
          id: 'gs-1',
          title: 'System Overview',
          type: 'article',
          description: 'Learn about the DMS architecture and core features'
        },
        {
          id: 'gs-2',
          title: 'First Time Setup',
          type: 'article',
          description: 'Step-by-step guide to configure your account'
        },
        {
          id: 'gs-3',
          title: 'User Roles Explained',
          type: 'video',
          description: 'Video tutorial on permission levels and access controls'
        }
      ]
    },
    {
      id: 'document-management',
      title: 'Document Management',
      icon: <FiFileText className="text-blue-500 text-xl" />,
      items: [
        {
          id: 'dm-1',
          title: 'Uploading Documents',
          type: 'article',
          description: 'How to upload single or multiple documents'
        },
        {
          id: 'dm-2',
          title: 'Version Control',
          type: 'article',
          description: 'Working with document versions and history'
        },
        {
          id: 'dm-3',
          title: 'Document Approval Workflows',
          type: 'article',
          description: 'Setting up and managing approval processes'
        },
        {
          id: 'dm-4',
          title: 'Advanced Search Techniques',
          type: 'video',
          description: 'Using metadata and full-text search effectively'
        }
      ]
    },
    {
      id: 'drawings',
      title: 'Drawing Management',
      icon: <FiFileText className="text-blue-500 text-xl" />,
      items: [
        {
          id: 'dr-1',
          title: 'AutoCAD Integration',
          type: 'article',
          description: 'Connecting your AutoCAD environment'
        },
        {
          id: 'dr-2',
          title: 'BIM Model Viewing',
          type: 'video',
          description: 'Working with BIM models in the DMS'
        }
      ]
    },
    {
      id: 'admin',
      title: 'Administration',
      icon: <FiFileText className="text-blue-500 text-xl" />,
      items: [
        {
          id: 'ad-1',
          title: 'User Management',
          type: 'article',
          description: 'Adding and managing users'
        },
        {
          id: 'ad-2',
          title: 'Security Settings',
          type: 'article',
          description: 'Configuring security policies'
        },
        {
          id: 'ad-3',
          title: 'System Configuration',
          type: 'article',
          description: 'Customizing system settings'
        }
      ]
    }
  ];

  const popularResources = [
    {
      title: 'DMS User Manual',
      type: 'PDF',
      size: '4.2 MB',
      link: '#'
    },
    {
      title: 'API Documentation',
      type: 'Web',
      size: '',
      link: '#'
    },
    {
      title: 'Training Videos',
      type: 'Playlist',
      size: '12 videos',
      link: '#'
    },
    {
      title: 'Keyboard Shortcuts',
      type: 'Cheat Sheet',
      size: '1.1 MB',
      link: '#'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Documentation Center
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Guides, tutorials, and resources for using the DMS
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search documentation..."
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            {documentationCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {documentationCategories.map(category => (
              <div 
                key={category.id} 
                className={`${activeCategory === category.id ? 'block' : 'hidden'}`}
              >
                <div className="p-6 border-b border-gray-200 flex items-center bg-gray-50">
                  <span className="mr-3">{category.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  {category.items.map(item => (
                    <li key={item.id} className="hover:bg-gray-50">
                      <div className="px-6 py-4">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex justify-between items-start text-left"
                        >
                          <div className="flex items-start">
                            <span className="mr-3 mt-0.5">
                              {expandedItems[item.id] ? (
                                <FiChevronDown className="text-gray-400" />
                              ) : (
                                <FiChevronRight className="text-gray-400" />
                              )}
                            </span>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                            </div>
                          </div>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.type}
                          </span>
                        </button>
                        {expandedItems[item.id] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 pl-9"
                          >
                            <div className="border-l-2 border-gray-200 pl-4">
                              <p className="text-gray-600 mb-3">
                                Detailed content about {item.title.toLowerCase()} would appear here in the actual implementation.
                              </p>
                              <div className="flex space-x-3">
                                <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                  <FiFileText className="mr-1" /> Read Article
                                </button>
                                {item.type === 'video' && (
                                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    <FiVideo className="mr-1" /> Watch Video
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Resources</h2>
          <div className="space-y-4">
            {popularResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-1">{resource.title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>{resource.type}</span>
                  {resource.size && <span>{resource.size}</span>}
                </div>
                <a
                  href={resource.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <FiDownload className="mr-1" /> Download
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-3">Need Help?</h3>
            <p className="text-blue-700 mb-4">
              Can't find what you're looking for? Our support team is ready to help.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Contact Support
            </button>
          </div>

          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-3">API Documentation</h3>
            <p className="text-gray-600 mb-4">
              Access our comprehensive API documentation for developers and integrators.
            </p>
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-200">
              View API Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;