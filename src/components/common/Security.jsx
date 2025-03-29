// src/components/common/Security.jsx
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEyeOff, FiServer, FiKey, FiAward, FiCheck } from 'react-icons/fi';

const Security = () => {
  const securityFeatures = [
    {
      icon: <FiLock className="text-green-500 text-2xl" />,
      title: "Data Encryption",
      description: "All data is encrypted both in transit (TLS 1.3) and at rest (AES-256).",
      details: [
        "End-to-end encryption for document transfers",
        "Key management through AWS KMS",
        "Regular key rotation policies"
      ]
    },
    {
      icon: <FiShield className="text-green-500 text-2xl" />,
      title: "Access Controls",
      description: "Granular permission system with role-based access controls.",
      details: [
        "Customizable user roles and permissions",
        "Document-level access restrictions",
        "IP-based access restrictions available"
      ]
    },
    {
      icon: <FiEyeOff className="text-green-500 text-2xl" />,
      title: "Audit Logging",
      description: "Comprehensive tracking of all system activities.",
      details: [
        "Full document access history",
        "User activity monitoring",
        "Immutable audit trails"
      ]
    },
    {
      icon: <FiServer className="text-green-500 text-2xl" />,
      title: "Infrastructure Security",
      description: "Enterprise-grade security for our hosting environment.",
      details: [
        "SOC 2 Type II compliant data centers",
        "DDoS protection and mitigation",
        "Regular penetration testing"
      ]
    },
    {
      icon: <FiKey className="text-green-500 text-2xl" />,
      title: "Authentication",
      description: "Secure authentication with multiple verification options.",
      details: [
        "Multi-factor authentication (MFA)",
        "SAML 2.0 SSO integration",
        "Password policy enforcement"
      ]
    },
    {
      icon: <FiAward className="text-green-500 text-2xl" />,
      title: "Compliance",
      description: "Meeting global security and privacy standards.",
      details: [
        "GDPR compliant data processing",
        "CCPA ready for California residents",
        "HIPAA compliant configurations available"
      ]
    }
  ];

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Audited controls for security, availability, and confidentiality."
    },
    {
      name: "ISO 27001",
      description: "International standard for information security management."
    },
    {
      name: "GDPR",
      description: "Compliant with EU General Data Protection Regulation."
    },
    {
      name: "CCPA",
      description: "Ready for California Consumer Privacy Act requirements."
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
          Security Overview
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          How we protect your documents and data
        </p>
      </motion.div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Security Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-green-50 mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-start">
                    <FiCheck className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications & Compliance</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <ul className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                    <FiAward className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600 mt-1">{cert.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Resources</h2>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-3">Security Whitepaper</h3>
              <p className="text-gray-600 mb-4">
                Download our detailed security architecture whitepaper for technical information about our security measures.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Download PDF
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-3">Vulnerability Reporting</h3>
              <p className="text-gray-600 mb-4">
                Found a security vulnerability? Please report it to our security team.
              </p>
              <a 
                href="mailto:security@dms-solutions.com" 
                className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
              >
                Contact Security Team
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;