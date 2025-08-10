"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, Cell } from "recharts";
import { motion } from 'framer-motion';

type Row = { state: string; changePct: number };

export default function FundingChangeBars() {
  // State funding change data since 2008
  const data: Row[] = [
    { state: "PA", changePct: -25 },
    { state: "AZ", changePct: -23 },
    { state: "OH", changePct: -22 },
    { state: "OR", changePct: -21 },
    { state: "IL", changePct: -20 },
    { state: "MI", changePct: -19 },
    { state: "CO", changePct: -19 },
    { state: "MO", changePct: -18 },
    { state: "FL", changePct: -18 },
    { state: "WI", changePct: -17 },
    { state: "IN", changePct: -16 },
    { state: "WA", changePct: -16 },
    { state: "MN", changePct: -15 },
    { state: "CA", changePct: -15 },
    { state: "VA", changePct: -14 },
  ];

  // Sort by most severe cuts first
  const sortedData = [...data].sort((a, b) => a.changePct - b.changePct);

  const getBarColor = (value: number) => {
    if (value >= -10) return '#fbbf24'; // yellow-400
    if (value >= -15) return '#fb923c'; // orange-400
    if (value >= -20) return '#f87171'; // red-400
    return '#dc2626'; // red-600
  };

  return (
    <motion.section 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold">
        <span className="gradient-text">State Funding Cuts & Tuition Response</span>
      </h2>
      
      <figure className="glass-card rounded-xl p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Per-Student State Funding Change Since 2008 (Top 15 Cuts)
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Real decline in state appropriations per full-time equivalent student
          </p>
        </div>
        
        <ResponsiveContainer width="100%" height={520}>
          <BarChart 
            data={sortedData} 
            layout="horizontal" 
            margin={{ left: 50, right: 40, top: 10, bottom: 10 }}
          >
            <XAxis 
              type="number" 
              tickFormatter={(v) => `${v}%`}
              domain={[-30, 0]}
              ticks={[-30, -25, -20, -15, -10, -5, 0]}
            />
            <YAxis 
              type="category" 
              dataKey="state" 
              width={40}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(v: number) => `${v}%`}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="changePct">
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.changePct)} />
              ))}
              <LabelList 
                dataKey="changePct" 
                position="right" 
                formatter={(v) => `${v}%`}
                style={{ fontSize: '11px', fill: '#4b5563' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-medium">Legend:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span>-10% to 0%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-400 rounded"></div>
              <span>-15% to -10%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <span>-20% to -15%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span>Below -20%</span>
            </div>
          </div>
        </div>
        
        <figcaption className="text-sm text-gray-600 mt-4">
          Many states saw double-digit real declines in per-FTE appropriations after 2008, 
          driving universities to increase reliance on non-resident tuition. <sup><a href="/references#2" className="text-blue-600 hover:underline">[2]</a></sup>
        </figcaption>
      </figure>
    </motion.section>
  );
}