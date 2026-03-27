'use client';

import { motion } from 'framer-motion';

const features = [
  { title: 'Categories', description: 'Organize tasks into custom categories for better workflow.', icon: '📁' },
  { title: 'Due Dates', description: 'Never miss a deadline with smart date tracking.', icon: '📅' },
  { title: 'Priority Levels', description: 'Focus on what matters most with priority sorting.', icon: '🎯' },
  { title: 'Dark Mode', description: 'Easy on the eyes with a beautiful dark theme.', icon: '🌙' },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}