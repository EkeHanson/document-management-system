import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white text-center">
            <div className="flex justify-center mb-4">
              <FaExclamationTriangle className="text-5xl" />
            </div>
            <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
            <p className="opacity-90">
              The content you're looking for has either been moved or doesn't exist.
            </p>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <FaArrowLeft className="text-gray-600" />
                <span className="font-medium text-gray-700">Go Back</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white hover:shadow-md transition-all duration-200"
              >
                <FaHome />
                <span className="font-medium">Home Page</span>
              </motion.button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact support</a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Error404;