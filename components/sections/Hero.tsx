import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="bg-primary text-white py-20">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          Organize Your Life
        </motion.h1>
        <p className="text-xl mb-8">Manage your tasks efficiently with our modern todo app.</p>
      </div>
    </section>
  );
}
