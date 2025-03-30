import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="border-b border-gray-800">
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-4"
                >
                  Stay Updated with Our Latest Offers
                </motion.h3>
                <p className="text-gray-400 text-lg">
                  Subscribe to our newsletter and get exclusive deals directly in your inbox
                </p>
              </div>
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src="https://res.cloudinary.com/dzprmnlxn/image/upload/v1740241995/logosss_1_gcobhi.png" 
                  alt="Rental Rides Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-6">
                Your trusted partner for premium car rentals. Experience luxury and convenience on every journey.
              </p>
              <div className="space-y-4">
                <a href="tel:+94768834360" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>+94 76 883 4360</span>
                </a>
                <a href="mailto:info@rentalrides.com" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>info@rentalrides.com</span>
                </a>
                <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>123 Main Street, New York, NY 10001</span>
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {['About Us', 'Our Fleet', 'Locations', 'Contact'].map((link) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                {['FAQs', 'Terms & Conditions', 'Privacy Policy', 'Help Center'].map((link) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-6">Connect With Us</h3>
              <div className="flex space-x-4 mb-8">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Mail, label: 'Email' }
                ].map(({ icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </motion.a>
                ))}
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl">
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Monday - Friday: 9AM - 8PM</p>
                  <p>Saturday: 10AM - 6PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-gray-400 text-center md:text-left">
                © 2025 All Rights Reserved
              </p>
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">Developed by</span>
                <motion.a
                  href="https://github.com/lordskidgod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  JaNuK
                </motion.a>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;