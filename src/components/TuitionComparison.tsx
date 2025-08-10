"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { motion } from 'framer-motion';

export default function TuitionComparison() {
  const data = [
    { 
      name: "Public Flagship Average", 
      Resident: 10506, 
      NonResident: 35000, 
      International: 40000 
    },
    {
      name: "UW-Madison 2025",
      Resident: 10796,
      NonResident: 39120,
      International: 42531
    }
  ];

  const colors = {
    Resident: '#3b82f6',      // blue-500
    NonResident: '#8b5cf6',   // violet-500
    International: '#ec4899'   // pink-500
  };

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <motion.section 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold">
        <span className="gradient-text">Tuition Price Tiers</span>
      </h2>
      
      <figure className="glass-card rounded-xl p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Annual Undergraduate Tuition & Fees Comparison
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Non-resident and international students pay 3-4× more than in-state students
          </p>
        </div>
        
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 70, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              angle={-15}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`}
              label={{ 
                value: 'Annual Tuition ($)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              formatter={formatCurrency}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend 
              verticalAlign="top"
              height={36}
            />
            <Bar dataKey="Resident" fill={colors.Resident} radius={[8, 8, 0, 0]} />
            <Bar dataKey="NonResident" fill={colors.NonResident} radius={[8, 8, 0, 0]} />
            <Bar dataKey="International" fill={colors.International} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">In-State Average</div>
            <div className="text-xl font-bold text-blue-600">$10,506</div>
            <div className="text-xs text-gray-500">Base tuition rate</div>
          </div>
          <div className="p-3 bg-violet-50 rounded-lg">
            <div className="text-sm text-gray-600">Non-Resident Average</div>
            <div className="text-xl font-bold text-violet-600">$35,000</div>
            <div className="text-xs text-gray-500">3.3× in-state rate</div>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg">
            <div className="text-sm text-gray-600">International Average</div>
            <div className="text-xl font-bold text-pink-600">$40,000</div>
            <div className="text-xs text-gray-500">3.8× in-state rate</div>
          </div>
        </div>
        
        <figcaption className="text-sm text-gray-600 mt-4">
          Price differentiation generates crucial revenue: each international student brings in 
          revenue equivalent to nearly 4 in-state students. <sup><a href="/references#5" className="text-blue-600 hover:underline">[5]</a></sup>
        </figcaption>
      </figure>
    </motion.section>
  );
}