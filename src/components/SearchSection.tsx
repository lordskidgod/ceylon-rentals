import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Car, Filter, Clock, CreditCard, Fuel, Star, Battery, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample vehicle data - in a real app, this would come from an API
const vehicleData = [
  {
    id: 1,
    name: 'Tesla Model 3',
    type: 'electric',
    transmission: 'automatic',
    passengers: 5,
    pricePerDay: 89,
    features: ['GPS', 'Bluetooth', 'Backup Camera', 'Leather Seats'],
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 128,
    available: true
  },
  {
    id: 2,
    name: 'BMW M4',
    type: 'sports',
    transmission: 'automatic',
    passengers: 4,
    pricePerDay: 129,
    features: ['GPS', 'Bluetooth', 'Leather Seats'],
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 96,
    available: true
  },
  {
    id: 3,
    name: 'Range Rover Sport',
    type: 'suv',
    transmission: 'automatic',
    passengers: 7,
    pricePerDay: 149,
    features: ['GPS', 'Bluetooth', 'Backup Camera', 'Leather Seats'],
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 84,
    available: true
  },
  {
    id: 4,
    name: 'Mercedes-Benz S-Class',
    type: 'luxury',
    transmission: 'automatic',
    passengers: 5,
    pricePerDay: 199,
    features: ['GPS', 'Bluetooth', 'Backup Camera', 'Leather Seats'],
    image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 156,
    available: true
  },
  {
    id: 5,
    name: 'Porsche 911',
    type: 'sports',
    transmission: 'manual',
    passengers: 2,
    pricePerDay: 299,
    features: ['GPS', 'Bluetooth', 'Leather Seats'],
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviews: 92,
    available: true
  }
];

const popularLocations = [
  'New York City Airport',
  'Los Angeles Downtown',
  'Chicago O\'Hare',
  'Miami Beach',
  'Las Vegas Strip'
];

interface SearchFilters {
  location: string;
  pickupDate: string;
  returnDate: string;
  vehicleType: string;
  transmission: string;
  passengers: string;
  duration: string;
  priceRange: number;
  features: string[];
}

const SearchSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicleData);
  
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    pickupDate: '',
    returnDate: '',
    vehicleType: '',
    transmission: '',
    passengers: '',
    duration: '',
    priceRange: 500,
    features: []
  });

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSearch = () => {
    const filtered = vehicleData.filter(vehicle => {
      const matchesType = !filters.vehicleType || vehicle.type === filters.vehicleType.toLowerCase();
      const matchesTransmission = !filters.transmission || vehicle.transmission === filters.transmission.toLowerCase();
      const matchesPassengers = !filters.passengers || vehicle.passengers >= parseInt(filters.passengers);
      const matchesPrice = vehicle.pricePerDay <= filters.priceRange;
      const matchesFeatures = filters.features.length === 0 || 
        filters.features.every(feature => vehicle.features.includes(feature));

      return matchesType && matchesTransmission && matchesPassengers && matchesPrice && matchesFeatures;
    });

    setFilteredVehicles(filtered);
    setShowResults(true);
  };

  return (
    <div id="search" className="relative -mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
      >
        <div className="mb-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-3"
          >
            Find Your Perfect Ride
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300">
            Search from our fleet of premium vehicles
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Location Input */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2 relative"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Pick-up Location
              </label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 group-hover:text-blue-600"/>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, location: e.target.value }));
                    setShowLocationDropdown(true);
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                  className="pl-10 block w-full h-12 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50"
                  placeholder="Enter city or airport"
                />
                <AnimatePresence>
                  {showLocationDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-10 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="p-3">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                          Popular Locations
                        </div>
                        {popularLocations
                          .filter(loc => loc.toLowerCase().includes(filters.location.toLowerCase()))
                          .map((loc, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                              onClick={() => {
                                setFilters(prev => ({ ...prev, location: loc }));
                                setShowLocationDropdown(false);
                              }}
                              type="button"
                              className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-150"
                            >
                              {loc}
                            </motion.button>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Pick-up Date */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Pick-up Date
              </label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 transition-colors group-hover:text-blue-600" />
                <input
                  type="date"
                  value={filters.pickupDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, pickupDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-10 block w-full h-12 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50"
                />
              </div>
            </motion.div>

            {/* Return Date */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Return Date
              </label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 transition-colors group-hover:text-blue-600" />
                <input
                  type="date"
                  value={filters.returnDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, returnDate: e.target.value }))}
                  min={filters.pickupDate || new Date().toISOString().split('T')[0]}
                  className="pl-10 block w-full h-12 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50"
                />
              </div>
            </motion.div>

            {/* Search Button */}
            <div className="space-y-2 flex flex-col justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl transition duration-200 ease-in-out flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20"
              >
                <Car className="h-5 w-5" />
                <span>Search Cars</span>
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-8 pt-4 border-t border-gray-100 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Vehicle Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Vehicle Type
                    </label>
                    <div className="relative group">
                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 transition-colors group-hover:text-blue-600" />
                      <select
                        value={filters.vehicleType}
                        onChange={(e) => setFilters(prev => ({ ...prev, vehicleType: e.target.value }))}
                        className="pl-10 block w-full h-12 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 appearance-none"
                      >
                        <option value="">Any Type</option>
                        <option value="luxury">Luxury</option>
                        <option value="suv">SUV</option>
                        <option value="sports">Sports</option>
                        <option value="electric">Electric</option>
                      </select>
                    </div>
                  </div>

                  {/* Transmission */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Transmission
                    </label>
                    <div className="relative group">
                      <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 transition-colors group-hover:text-blue-600" />
                      <select
                        value={filters.transmission}
                        onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
                        className="pl-10 block w-full h-12 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 appearance-none"
                      >
                        <option value="">Any</option>
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Passengers
                    </label>
                    <div className="relative group">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 transition-colors group-hover:text-blue-600" />
                      <select
                        value={filters.passengers}
                        onChange={(e) => setFilters(prev => ({ ...prev, passengers: e.target.value }))}
                        className="pl-10 block w-full h-12 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 appearance-none"
                      >
                        <option value="">Any</option>
                        <option value="2">1-2</option>
                        <option value="4">3-4</option>
                        <option value="6">5-6</option>
                        <option value="7">7+</option>
                      </select>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Rental Duration
                    </label>
                    <div className="relative group">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 transition-colors group-hover:text-blue-600" />
                      <select
                        value={filters.duration}
                        onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                        className="pl-10 block w-full h-12 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 appearance-none"
                      >
                        <option value="">Any Duration</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Price Range Slider */}
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price Range (per day)
                    </label>
                    <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">
                      <CreditCard className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        ${filters.priceRange}
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={filters.priceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>$50</span>
                    <span>$500</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Additional Features
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['GPS Navigation', 'Bluetooth', 'Backup Camera', 'Leather Seats'].map((feature) => (
                      <motion.label
                        key={feature}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={filters.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {feature}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Advanced Search Toggle */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <Filter className="h-4 w-4" />
            <span>{isExpanded ? 'Less Filters' : 'More Filters'}</span>
          </motion.button>
        </form>

        {/* Search Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Available Vehicles
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredVehicles.length} results found
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div className="relative">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ${vehicle.pricePerDay}/day
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {vehicle.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                                {vehicle.rating}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({vehicle.reviews} reviews)
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {vehicle.type.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-2" />
                          {vehicle.passengers} Seats
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Fuel className="h-4 w-4 mr-2" />
                          {vehicle.transmission}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-200"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Book Now</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchSection;