// src/components/common/Terms.jsx
import { motion } from 'framer-motion';
import { FiCheck, FiAlertTriangle, } from 'react-icons/fi';

const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the Document Management System (DMS) provided by DMS Solutions, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use our services."
    },
    {
      title: "2. Description of Service",
      content: "Our DMS provides document storage, version control, collaboration tools, and related services for engineering projects. We reserve the right to modify or discontinue the Service with or without notice at any time."
    },
    {
      title: "3. User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to immediately notify us of any unauthorized use of your account. You must be at least 18 years old to use this Service.",
      subItems: [
        "Properly classify all documents according to your organization's protocols",
        "Maintain accurate metadata for all uploaded documents",
        "Ensure all documents comply with applicable laws and regulations",
        "Not upload malicious or illegal content"
      ]
    },
    {
      title: "4. Intellectual Property",
      content: "All intellectual property rights in the Service and its original content are owned by DMS Solutions. Your documents remain your property, and we claim no intellectual property rights over your materials."
    },
    {
      title: "5. Data Retention",
      content: "We will retain your documents for the duration of your subscription. Upon termination, you may request export of your data within 30 days. After this period, we may delete all your content."
    },
    {
      title: "6. Limitation of Liability",
      content: "DMS Solutions shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the Service."
    },
    {
      title: "7. Governing Law",
      content: "These Terms shall be governed by the laws of the State of California without regard to its conflict of law provisions."
    },
    {
      title: "8. Changes to Terms",
      content: "We reserve the right to modify these terms at any time. We will provide notice of significant changes through our website or via email. Continued use after changes constitutes acceptance."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Document Management System (DMS) - Terms of Service
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Please read these terms carefully before using our service.
          </p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt className="text-sm font-medium text-gray-900">
                  {section.title}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p className="mb-3">{section.content}</p>
                  {section.subItems && (
                    <ul className="space-y-2">
                      {section.subItems.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <FiCheck className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertTriangle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Need help understanding these terms?
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Contact our legal team at{' '}
                <a href="mailto:legal@dms-solutions.com" className="font-medium underline">
                  support@prolianceltd.com
                </a>{' '}
                for any questions about these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;