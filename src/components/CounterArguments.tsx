"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CounterArguments() {
  const [view, setView] = useState<'pro' | 'con'>('pro');

  const proArguments = [
    {
      title: "Cross-subsidization Works",
      point: "Differential pricing allows universities to provide financial aid to in-state students who need it most.",
      icon: "💰"
    },
    {
      title: "Preserves Academic Programs",
      point: "International tuition revenue keeps labs open, funds research, and maintains program quality when state funding falls short.",
      icon: "🔬"
    },
    {
      title: "Global Diversity Benefits All",
      point: "International students bring diverse perspectives that enrich classroom discussions and campus culture.",
      icon: "🌍"
    }
  ];

  const conArguments = [
    {
      title: "Structural Over-pricing",
      point: "Short-term budget fixes through high tuition can't justify treating education as a luxury commodity.",
      icon: "⚠️"
    },
    {
      title: "Diversity as Fiscal Camouflage",
      point: "Using 'diversity' rhetoric to mask revenue generation undermines genuine inclusion efforts.",
      icon: "🎭"
    },
    {
      title: "Public Mission Erosion",
      point: "A public university's core mission should be financed publicly, not through market-rate tuition.",
      icon: "🏛️"
    }
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        <span className="gradient-text">Multiple Perspectives</span>
      </h2>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setView('pro')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              view === 'pro' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pro Arguments
          </button>
          <button
            onClick={() => setView('con')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              view === 'con' 
                ? 'bg-white text-purple-600 shadow-md' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Counter Arguments
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: view === 'pro' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: view === 'pro' ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {(view === 'pro' ? proArguments : conArguments).map((arg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`glass-card rounded-xl p-6 border-t-4 ${
                  view === 'pro' ? 'border-blue-500' : 'border-purple-500'
                }`}
              >
                <div className="text-3xl mb-3">{arg.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {arg.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {arg.point}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          <strong>My Response:</strong> While differential pricing provides short-term stability, 
          sustainable solutions require restored public funding, transparent budgeting, and genuine 
          commitment to both access and inclusion.
        </p>
      </div>
    </section>
  );
}