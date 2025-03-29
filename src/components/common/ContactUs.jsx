// src/components/common/ContactUs.jsx
import { useState, useRef, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactUs = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  
  // Contact info (could be moved to config)
  const contactInfo = [
    {
      icon: <FiMail className="text-blue-500 text-xl" />,
      title: 'Email Us',
      description: 'support@dms-solutions.com',
      href: 'mailto:support@dms-solutions.com',
    },
    {
      icon: <FiPhone className="text-blue-500 text-xl" />,
      title: 'Call Us',
      description: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: <FiMapPin className="text-blue-500 text-xl" />,
      title: 'Visit Us',
      description: '123 Tech Park, San Francisco, CA 94107',
      href: 'https://maps.google.com',
    },
  ];

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please verify you are not a robot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would use your API service
      await axios.post('/api/contact', {
        ...formData,
        recaptchaToken,
      });
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset reCAPTCHA
      recaptchaRef.current.reset();
      setRecaptchaToken(null);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        ...errors,
        submit: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    if (errors.recaptcha) {
      setErrors(prev => ({
        ...prev,
        recaptcha: null,
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Have questions about our Document Management System? Get in touch with our team.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Our Contact Information</h2>
          <p className="text-gray-600">
            We're here to help with any questions about our DMS platform. Reach out through any of these channels.
          </p>
          
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex-shrink-0 mt-1">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  <a 
                    href={item.href} 
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {item.description}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Office Hours */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">Office Hours</h3>
            <p className="mt-2 text-gray-600">
              Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
              Saturday - Sunday: Closed
            </p>
            <p className="mt-4 text-gray-600">
              For urgent support outside business hours, please call our emergency line: +1 (555) 987-6543
            </p>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
          
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg flex items-start"
              >
                <FiCheckCircle className="text-green-500 text-xl mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Thank you for your message!</p>
                  <p className="text-sm mt-1">We've received your inquiry and will get back to you within 24 hours.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg">
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.subject ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="How can we help?"
              />
              {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.message ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Tell us about your inquiry..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>
            
            <div className="pt-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
              />
              {errors.recaptcha && <p className="mt-1 text-sm text-red-600">{errors.recaptcha}</p>}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              By submitting this form, you agree to our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> and consent to having your data processed.
            </p>
          </form>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
        <div className="bg-gray-100 rounded-xl overflow-hidden h-96">
          {/* In a real app, you would embed a Google Map or similar */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="text-center p-6">
              <FiMapPin className="mx-auto text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">DMS Solutions Headquarters</h3>
              <p className="text-gray-600">123 Tech Park, San Francisco, CA 94107</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;