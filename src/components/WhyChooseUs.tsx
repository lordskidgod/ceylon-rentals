import React from 'react';
import { Shield, Clock, Headphones, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All our vehicles are regularly maintained and fully insured for your peace of mind.'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Book your vehicle any time, day or night, with our easy-to-use online system.'
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Our dedicated support team is always ready to assist you with any questions.'
  },
  {
    icon: Award,
    title: 'Best Price Guarantee',
    description: 'We offer competitive rates and match any comparable price in the market.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Why Choose Rental Rides?
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Experience the difference with our premium car rental service
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                  className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400"
                >
                  <Icon className="h-full w-full" />
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-xl font-medium text-gray-900 dark:text-white"
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 text-base text-gray-500 dark:text-gray-300"
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;