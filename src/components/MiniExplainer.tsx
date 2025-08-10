"use client";

import { motion } from 'framer-motion';

export default function MiniExplainer() {
  const steps = [
    {
      icon: "📉",
      title: "State $ ↓",
      description: "Public funding per student has declined steadily since 2008",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: "💰",
      title: "Nonresident $ ↑",
      description: "Universities recruit more out-of-state & international students",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "⚖️",
      title: "Equity trade-offs",
      description: "Access and support for marginalized students often suffer",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          The Funding Crisis Pipeline
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A three-step process that transforms public universities into tuition-dependent institutions
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 relative">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                <span className="text-3xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + 1) * 0.2, duration: 0.6 }}
                  className="text-3xl text-blue-400"
                >
                  →
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}