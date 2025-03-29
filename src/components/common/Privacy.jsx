// src/components/common/Privacy.jsx
import { motion } from 'framer-motion';
import { FiShield, FiDatabase, FiUser, FiCheck } from 'react-icons/fi';

const Privacy = () => {
  const sections = [
    {
      icon: <FiUser className="text-indigo-500 text-xl" />,
      title: "Information We Collect",
      content: "We collect information to provide better services to all our users. The types of information we collect include:",
      items: [
        "Account information (name, email, contact details)",
        "Document metadata and content you upload",
        "Usage data (how you interact with our service)",
        "Device information (browser type, IP address)"
      ]
    },
    {
      icon: <FiDatabase className="text-indigo-500 text-xl" />,
      title: "How We Use Information",
      content: "We use the information we collect for the following purposes:",
      items: [
        "Provide, maintain, and improve our services",
        "Develop new features and functionality",
        "Ensure system security and prevent fraud",
        "Communicate with you about service updates",
        "Comply with legal obligations"
      ]
    },
    {
      icon: <FiShield className="text-indigo-500 text-xl" />,
      title: "Data Security",
      content: "We implement robust security measures to protect your data:",
      items: [
        "Encryption of data in transit and at rest",
        "Regular security audits and penetration testing",
        "Role-based access controls",
        "Data backup and disaster recovery procedures"
      ]
    },
    {
      title: "Third-Party Services",
      content: "We may use third-party services that have access to your information only to perform specific tasks on our behalf:",
      items: [
        "Cloud storage providers (AWS, Azure)",
        "Analytics services (Google Analytics)",
        "Customer support platforms",
        "Payment processors"
      ],
      note: "These third parties are obligated not to disclose or use your information for any other purpose."
    },
    {
      title: "International Data Transfers",
      content: "Your information may be transferred to and maintained on computers located outside of your country where data protection laws may differ."
    },
    {
      title: "Your Rights",
      content: "You have certain rights regarding your personal data:",
      items: [
        "Access and receive a copy of your data",
        "Request correction of inaccurate data",
        "Request deletion of your data",
        "Object to processing of your data",
        "Withdraw consent where applicable"
      ]
    },
    {
      title: "Changes to This Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date."
    },
    {
      title: "Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact our Data Protection Officer at privacy@dms-solutions.com."
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
          Privacy Policy
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Effective date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            DMS Solutions Privacy Policy
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This policy describes how we collect, use, and protect your information.
          </p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt className="text-sm font-medium text-gray-900 flex items-start">
                  {section.icon && (
                    <span className="mr-2 mt-0.5">
                      {section.icon}
                    </span>
                  )}
                  {section.title}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p className="mb-3">{section.content}</p>
                  {section.items && (
                    <ul className="space-y-2 pl-5">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.note && (
                    <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                      {section.note}
                    </div>
                  )}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-100">
          <h3 className="text-lg font-medium text-indigo-900 mb-3">
            Data Protection Principles
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <FiCheck className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5 mr-2" />
              <span>We process data lawfully, fairly, and transparently</span>
            </li>
            <li className="flex items-start">
              <FiCheck className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5 mr-2" />
              <span>We collect data only for specified, explicit purposes</span>
            </li>
            <li className="flex items-start">
              <FiCheck className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5 mr-2" />
              <span>We ensure data is accurate and kept up to date</span>
            </li>
            <li className="flex items-start">
              <FiCheck className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5 mr-2" />
              <span>We retain data only as long as necessary</span>
            </li>
            <li className="flex items-start">
              <FiCheck className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5 mr-2" />
              <span>We implement appropriate security measures</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Compliance Information
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800">GDPR</h4>
              <p className="text-sm text-gray-600">
                We comply with the General Data Protection Regulation (GDPR) for our EU users.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">CCPA</h4>
              <p className="text-sm text-gray-600">
                California Consumer Privacy Act (CCPA) rights are respected for California residents.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">SOC 2 Type II</h4>
              <p className="text-sm text-gray-600">
                Our systems and processes are SOC 2 Type II certified for security and compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;