import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Users, Calendar, Settings, LogOut, PlusCircle, 
  ChevronDown, ChevronRight, Search, Bell, Menu, X,
  BarChart, FileSpreadsheet, Upload, Download, Filter,
  Sun, Moon, Home, Package, MessageSquare, AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  submenu?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    icon: Home,
    label: 'Dashboard',
    path: '/admin/dashboard'
  },
  {
    icon: Car,
    label: 'Vehicle Management',
    submenu: [
      { icon: PlusCircle, label: 'Add Vehicle', path: '/admin/vehicles/add' },
      { icon: Package, label: 'All Vehicles', path: '/admin/vehicles' },
      { icon: Settings, label: 'Categories', path: '/admin/vehicles/categories' }
    ]
  },
  {
    icon: Calendar,
    label: 'Bookings',
    submenu: [
      { icon: Calendar, label: 'All Bookings', path: '/admin/bookings' },
      { icon: AlertCircle, label: 'Pending', path: '/admin/bookings/pending' },
      { icon: MessageSquare, label: 'Requests', path: '/admin/bookings/requests' }
    ]
  },
  {
    icon: Users,
    label: 'Customer Management',
    path: '/admin/customers'
  },
  {
    icon: BarChart,
    label: 'Analytics',
    path: '/admin/analytics'
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/admin/settings'
  }
];

const AdminDashboard: React.FC = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, message: 'New booking request', time: '5m ago' },
    { id: 2, message: 'Vehicle maintenance due', time: '1h ago' },
    { id: 3, message: 'Customer review received', time: '2h ago' }
  ]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/admin/login');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const stats = [
    { label: 'Total Vehicles', value: '24', icon: Car, trend: '+12%' },
    { label: 'Active Bookings', value: '12', icon: Calendar, trend: '+5%' },
    { label: 'Total Customers', value: '156', icon: Users, trend: '+25%' },
    { label: 'Monthly Revenue', value: '$5,234', icon: BarChart, trend: '+18%' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <img 
                  src="https://res.cloudinary.com/dzprmnlxn/image/upload/v1740241995/logosss_1_gcobhi.png" 
                  alt="Logo" 
                  className="h-8"
                />
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <div key={item.label}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        if (item.submenu) {
                          setExpandedItem(expandedItem === item.label ? null : item.label);
                        } else if (item.path) {
                          navigate(item.path);
                        }
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg
                        ${expandedItem === item.label 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                      </div>
                      {item.submenu && (
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 
                            ${expandedItem === item.label ? 'rotate-180' : ''}`}
                        />
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {item.submenu && expandedItem === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {item.submenu.map((subItem) => (
                            <motion.button
                              key={subItem.label}
                              whileHover={{ x: 4 }}
                              onClick={() => subItem.path && navigate(subItem.path)}
                              className="w-full flex items-center p-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <subItem.icon className="h-4 w-4 mr-3" />
                              <span>{subItem.label}</span>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* User Profile */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium">A</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Ashen Perera</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">rpmarlondesilva@gmail.com</p>
                  </div>
                </div>

                <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={handleSignOut}
  className="w-60 flex items-center justify-start space-x-2 p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
>
  <LogOut className="h-8 w-5" />
  <span>Sign Out</span>
</motion.button>

              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                    <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDarkMode ? (
                    <Sun className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Moon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {stat.value}
                        </h3>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className="text-green-500 text-sm font-medium">
                        {stat.trend}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                        vs last month
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsAddingVehicle(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white flex items-center justify-between group hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">Add New Vehicle</h3>
                  <p className="text-blue-100">Add a new vehicle to your rental fleet</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <PlusCircle className="h-6 w-6" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-6 text-white flex items-center justify-between group hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">Generate Report</h3>
                  <p className="text-purple-100">Download monthly analytics report</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
              </motion.button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {[1, 2, 3, 4, 5].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: item * 0.1 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          New Booking Request
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Toyota Camry • 3 days • New York City
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        New
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <AnimatePresence>
        {isAddingVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add New Vehicle
                </h3>
                <button
                  onClick={() => setIsAddingVehicle(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Vehicle Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      placeholder="e.g., Toyota Camry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700">
                        <option>Luxury</option>
                        <option>SUV</option>
                        <option>Sports</option>
                        <option>Electric</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price per Day
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                        placeholder="$"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                      placeholder="Enter vehicle description..."
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
                <button
                  onClick={() => setIsAddingVehicle(false)}
                  className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add Vehicle
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;