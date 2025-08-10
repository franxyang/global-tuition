"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { motion } from 'framer-motion';

const data = [
  { 
    name: "Public Flagship Avg", 
    Resident: 10500, 
    NonResident: 35000, 
    International: 40000 
  },
  { 
    name: "UW-Madison 2025", 
    Resident: 10506, 
    NonResident: 42531, 
    International: 42531 
  },
  { 
    name: "UC Berkeley", 
    Resident: 14000, 
    NonResident: 44000, 
    International: 48000 
  }
];

export default function TuitionComparison() {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <motion.figure 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-bold text-gray-900">
        Tuition Price Tiers Comparison
      </h3>
      <div className="glass-card rounded-xl p-6">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              angle={-20}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              label={{ value: 'Annual Tuition ($)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Legend />
            <Bar dataKey="Resident" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="NonResident" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="International" fill="#ec4899" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="text-sm text-gray-600">
        Typical public flagship pricing shows 3–4× differential between resident and non-resident/international tuition. 
        <sup><a href="/references#1" className="text-blue-600 hover:text-blue-800">[1]</a></sup>
      </figcaption>
    </motion.figure>
  );
}