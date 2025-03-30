import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, ChevronDown, Phone, MapPin, User, Calendar, Clock } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Our Fleet',
    href: '#',
    submenu: [
      { label: 'Economy Cars', href: '#economy' },
      { label: 'Luxury Sedans', href: '#luxury' },
      { label: 'Premium SUVs', href: '#suvs' },
      { label: 'Sports Cars', href: '#sports' },
      { label: 'Electric Vehicles', href: '#electric' },
    ],
  },
  {
    label: 'Rental Services',
    href: '#',
    submenu: [
      { label: 'Daily Rentals', href: '#daily' },
      { label: 'Long-term Leasing', href: '#long-term' },
      { label: 'Airport Transfers', href: '#airport' },
      { label: 'Corporate Fleet', href: '#corporate' },
      { label: 'Wedding Cars', href: '#wedding' },
    ],
  },
  {
    label: 'Locations',
    href: '#',
    submenu: [
      { label: 'Airport Locations', href: '#airport-locations' },
      { label: 'City Branches', href: '#city-branches' },
      { label: 'International Rentals', href: '#international' },
      { label: 'Find Nearest Branch', href: '#find-branch' },
    ],
  },
  {
    label: 'Support',
    href: '#',
    submenu: [
      { label: 'Rental Guide', href: '#guide' },
      { label: 'Insurance Options', href: '#insurance' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Contact Us', href: '#contact' },
    ],
  },
];

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 100);
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 20);
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleDropdownEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
      }}
      transition={{ duration: 0.3 }}
      className={`fixed w-full z-50 transition-all duration-300
        ${isScrolled ? 'backdrop-blur-lg shadow-lg' : ''}
        ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`py-2 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'} 
            transition-all duration-300 ${isScrolled ? 'lg:hidden' : ''}`}
        >
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="tel:+94768834360"
                className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                <Phone className="h-4 w-4 mr-1" />
                <span>24/7 Support: +94 76 883 4360</span>
              </motion.a>
              <motion.div className={`flex items-center space-x-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <Clock className="h-4 w-4" />
                <span>Open 24/7</span>
              </motion.div>
            </div>
            <div className="flex items-center space-x-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#locations"
                className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                <MapPin className="h-4 w-4 mr-1" />
                <span>Find Locations</span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                <User className="h-4 w-4 mr-1" />
                <span>Member Login</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <img 
                src="https://res.cloudinary.com/dzprmnlxn/image/upload/v1740241995/logosss_1_gcobhi.png" 
                alt="DriveEase Logo" 
                className="h-12 w-auto"
              />
            </motion.a>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </motion.button>

                <AnimatePresence>
                  {item.submenu && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute left-0 mt-2 w-56 rounded-xl shadow-lg py-2 z-50 border
                        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                    >
                      {item.submenu.map((subItem) => (
                        <motion.a
                          key={subItem.label}
                          href={subItem.href}
                          whileHover={{ x: 10, backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)' }}
                          className={`block px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                          {subItem.label}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Now</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="h-5 w-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="h-5 w-5 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm"
            >
              <Calendar className="h-4 w-4" />
              <span>Book</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => handleDropdownEnter(item.label)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-lg
                      ${isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-800' 
                        : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4"
                      >
                        {item.submenu.map((subItem) => (
                          <motion.a
                            key={subItem.label}
                            href={subItem.href}
                            whileHover={{ x: 10 }}
                            className={`block px-3 py-2 rounded-lg
                              ${isDarkMode 
                                ? 'text-gray-400 hover:text-blue-400' 
                                : 'text-gray-600 hover:text-blue-600'}`}
                          >
                            {subItem.label}
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;