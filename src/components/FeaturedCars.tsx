import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Battery, Fuel, Users, Star } from 'lucide-react';

const cars = [
  {
    id: 1,
    name: 'Tesla Model 3',
    category: 'Electric',
    price: 89,
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    features: ['Auto Pilot', '350mi Range', 'Supercharging'],
    specs: {
      power: '450hp',
      acceleration: '3.1s',
      range: '350mi',
      passengers: 5
    }
  },
  {
    id: 2,
    name: 'BMW M4',
    category: 'Sports',
    price: 129,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    features: ['503 HP', '0-60 in 3.8s', 'Carbon Fiber'],
    specs: {
      power: '503hp',
      acceleration: '3.8s',
      range: '400mi',
      passengers: 4
    }
  },
  {
    id: 3,
    name: 'Range Rover Sport',
    category: 'SUV',
    price: 149,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    features: ['Luxury Interior', 'Off-road Ready', 'Premium Sound'],
    specs: {
      power: '395hp',
      acceleration: '5.5s',
      range: '450mi',
      passengers: 7
    }
  }
];

const FeaturedCars: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  return (
    <section id="featured" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900"
          >
            <span className="text-blue-600 dark:text-blue-300 font-medium">Featured Fleet</span>
          </motion.div>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Premium Vehicles
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">
            Experience luxury and performance with our carefully curated selection
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {car.name}
                  </h3>
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {car.category}
                  </motion.span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Battery className="h-5 w-5 mr-2" />
                    <span>{car.specs.power}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Fuel className="h-5 w-5 mr-2" />
                    <span>{car.specs.acceleration}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Car className="h-5 w-5 mr-2" />
                    <span>{car.specs.range}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{car.specs.passengers} seats</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${car.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-300">/day</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCar(car.id)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-150 ease-in-out"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedCar(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Complete Your Booking
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Fill in your details to book this vehicle
                </p>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                  ✕
                </button>
                {/* Add booking form here */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedCars;