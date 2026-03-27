'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="bg-indigo-500 text-white py-20">
      <div className="container mx-auto text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          Organize Your Life
        </motion.h1>
        <p className="text-xl mb-8 text-indigo-100">
          Manage your tasks efficiently with categories, due dates, and priorities.
        </p>
        <button className="bg-white text-indigo-500 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Get Started
        </button>
      </div>
    </section>
  );
}