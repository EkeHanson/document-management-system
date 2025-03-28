import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaHistory, FaLock, FaSearch, FaUsers, FaFilePdf, FaFileExcel, FaFileWord, FaFileImage, FaFileArchive } from 'react-icons/fa';
import { MdDashboard, MdEngineering, MdOutlineWaterDrop } from 'react-icons/md';
import { BsFillCalendarCheckFill } from 'react-icons/bs';

const LandingPage = () => {
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Engineering Document Management System</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Streamline your project documentation with our secure, version-controlled document management solution
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-transparent border-2 border-white hover:bg-blue-700 font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Request Demo
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Powerful Features for Engineering Teams</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">
                <FaCloudUploadAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3">Document Control</h3>
              <p className="text-gray-600">
                Full version control with check-in/check-out functionality to manage document revisions efficiently.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">
                <FaHistory />
              </div>
              <h3 className="text-xl font-semibold mb-3">Version History</h3>
              <p className="text-gray-600">
                Track every change with complete audit trails and version comparison tools.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">
                <FaLock />
              </div>
              <h3 className="text-xl font-semibold mb-3">Role-Based Access</h3>
              <p className="text-gray-600">
                Granular permissions ensure the right people have access to the right documents.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">
                <MdEngineering />
              </div>
              <h3 className="text-xl font-semibold mb-3">AutoCAD Integration</h3>
              <p className="text-gray-600">
                Direct integration with AutoCAD and BIM tools for seamless drawing management.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">
                <MdOutlineWaterDrop />
              </div>
              <h3 className="text-xl font-semibold mb-3">Watermarking</h3>
              <p className="text-gray-600">
                Automatic watermarking for downloaded documents to protect intellectual property.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">
                <BsFillCalendarCheckFill />
              </div>
              <h3 className="text-xl font-semibold mb-3">Submission Tracking</h3>
              <p className="text-gray-600">
                Monitor deadlines and submission schedules with automated reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* File Type Support */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Supported File Types</h2>
          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            <div className="flex flex-col items-center">
              <FaFilePdf className="text-4xl text-red-500 mb-2" />
              <span>PDF</span>
            </div>
            <div className="flex flex-col items-center">
              <FaFileWord className="text-4xl text-blue-500 mb-2" />
              <span>Word</span>
            </div>
            <div className="flex flex-col items-center">
              <FaFileExcel className="text-4xl text-green-500 mb-2" />
              <span>Excel</span>
            </div>
            <div className="flex flex-col items-center">
              <FaFileImage className="text-4xl text-yellow-500 mb-2" />
              <span>Images</span>
            </div>
            <div className="flex flex-col items-center">
              <FaFileArchive className="text-4xl text-purple-500 mb-2" />
              <span>ZIP/RAR</span>
            </div>
            <div className="flex flex-col items-center">
              <MdEngineering className="text-4xl text-gray-700 mb-2" />
              <span>CAD Files</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your document management?</h2>
          <p className="text-xl mb-8">
            Join hundreds of engineering teams who trust our DMS for their critical project documentation.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Document Management</h3>
            <p className="text-gray-400">
              A comprehensive solution for engineering project documentation with full version control and collaboration features.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">System Status</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p>123 Engineering Way</p>
              <p>Suite 400</p>
              <p>New York, NY 10001</p>
              <p className="mt-2">info@dms.example.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Document Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;