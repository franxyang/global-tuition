"use client";

import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

export default function Calculator() {
  const [students, setStudents] = useState(1000);
  const [avgTuition, setAvgTuition] = useState(40000);
  const [baseBudget, setBaseBudget] = useState(500000000);
  const [revenue, setRevenue] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const totalRevenue = students * avgTuition;
    setRevenue(totalRevenue);
    if (baseBudget > 0) {
      setPercentage((totalRevenue / baseBudget) * 100);
    }
  }, [students, avgTuition, baseBudget]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <motion.div 
      className="glass-card rounded-2xl p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold gradient-text mb-6">
        💰 Tuition Revenue Calculator
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="students" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Nonresident Students
          </label>
          <input
            id="students"
            type="number"
            min="0"
            max="50000"
            value={students}
            onChange={(e) => setStudents(Math.min(50000, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby="students-help"
          />
          <p id="students-help" className="text-xs text-gray-500 mt-1">
            Range: 0 - 50,000 students
          </p>
        </div>

        <div>
          <label htmlFor="tuition" className="block text-sm font-medium text-gray-700 mb-1">
            Average Annual Tuition
          </label>
          <input
            id="tuition"
            type="number"
            min="0"
            max="100000"
            value={avgTuition}
            onChange={(e) => setAvgTuition(Math.min(100000, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby="tuition-help"
          />
          <p id="tuition-help" className="text-xs text-gray-500 mt-1">
            Range: $0 - $100,000
          </p>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Base Budget (Optional)
          </label>
          <input
            id="budget"
            type="number"
            min="0"
            max="5000000000"
            value={baseBudget}
            onChange={(e) => setBaseBudget(Math.min(5000000000, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby="budget-help"
          />
          <p id="budget-help" className="text-xs text-gray-500 mt-1">
            Range: $0 - $5 billion
          </p>
        </div>
      </div>

      <motion.div 
        className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200/50"
        aria-live="polite"
        aria-atomic="true"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="text-center">
          <div className="text-xs uppercase tracking-wide text-gray-600 mb-2">
            Estimated Annual Revenue
          </div>
          <div className="text-4xl font-bold gradient-text mb-3">
            {formatCurrency(revenue)}
          </div>
          {baseBudget > 0 && (
            <>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-700">
                This represents <span className="font-bold text-lg">{percentage.toFixed(1)}%</span> of the base budget
              </p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}