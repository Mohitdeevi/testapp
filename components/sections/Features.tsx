import { motion } from 'framer-motion';

const features = [
  { title: 'Categories', description: 'Organize tasks by categories.' },
  { title: 'Due Dates', description: 'Set deadlines for your tasks.' },
  { title: 'Priority Levels', description: 'Prioritize your tasks.' },
  { title: 'Dark Mode', description: 'Switch to dark mode for a better experience.' },
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
