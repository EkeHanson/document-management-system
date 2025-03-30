import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiLock, 
  FiGitBranch, 
  FiDownload, 
  FiEdit, 
  FiList, 
  FiCalendar,
  FiLayers,
  FiUsers,
  FiBarChart2,
  FiClock,
  FiCheckCircle,
  FiCode,
  FiArrowRight
} from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "Role-Based Access Control",
      description: "Granular permissions ensure users only access documents they're authorized to view or edit."
    },
    {
      icon: <FiGitBranch className="w-6 h-6" />,
      title: "Document Versioning",
      description: "Automatic version numbering with full history tracking and comparison tools."
    },
    {
      icon: <FiDownload className="w-6 h-6" />,
      title: "Watermarking",
      description: "Dynamic watermarking for downloaded/printed documents with user and timestamp information."
    },
    {
      icon: <FiEdit className="w-6 h-6" />,
      title: "Check-Out/Check-In",
      description: "Prevent conflicts with document locking during edits and mandatory check-in comments."
    },
    {
      icon: <FiList className="w-6 h-6" />,
      title: "Document Control Index",
      description: "Automated DCI generation with customizable templates and real-time updates."
    },
    {
      icon: <FiCalendar className="w-6 h-6" />,
      title: "Transmittal Management",
      description: "Generate, track, and manage document transmittals with automated notifications."
    },
    {
      icon: <FiLayers className="w-6 h-6" />,
      title: "AutoCAD/BIM Integration",
      description: "Native support for engineering drawings with markup and version control capabilities."
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Collaboration Tools",
      description: "Real-time commenting, annotation, and task assignment on documents."
    },
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: "Project Scheduling",
      description: "Integrated deadline tracking with automated reminders for document submissions."
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Comprehensive Audit Trails",
      description: "Detailed logs of all document actions with non-repudiation capabilities."
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Mobile Responsive",
      description: "Full functionality across all devices with offline capabilities for critical features."
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "API Integration",
      description: "RESTful API for seamless integration with other enterprise systems."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Enterprise-Grade Document Control
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive features designed specifically for engineering document management
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50 text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
        >
        <div className="inline-flex rounded-md shadow">
            <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
            Request Demo
            {/* <svg
                className="ml-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
            </svg> */}
            </a>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;