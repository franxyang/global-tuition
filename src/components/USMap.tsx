"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

// Sample data for state tuition changes with geographic positioning
const stateData = {
  'CA': { name: 'California', change: -15, avgTuition: 44000, row: 3, col: 0 },
  'TX': { name: 'Texas', change: -12, avgTuition: 38000, row: 5, col: 3 },
  'FL': { name: 'Florida', change: -18, avgTuition: 35000, row: 6, col: 6 },
  'NY': { name: 'New York', change: -10, avgTuition: 42000, row: 2, col: 7 },
  'IL': { name: 'Illinois', change: -20, avgTuition: 41000, row: 3, col: 5 },
  'PA': { name: 'Pennsylvania', change: -25, avgTuition: 45000, row: 3, col: 7 },
  'OH': { name: 'Ohio', change: -22, avgTuition: 36000, row: 3, col: 6 },
  'MI': { name: 'Michigan', change: -19, avgTuition: 43000, row: 2, col: 5 },
  'WI': { name: 'Wisconsin', change: -17, avgTuition: 42531, row: 2, col: 4 },
  'VA': { name: 'Virginia', change: -14, avgTuition: 46000, row: 4, col: 7 },
  'WA': { name: 'Washington', change: -16, avgTuition: 39000, row: 1, col: 0 },
  'OR': { name: 'Oregon', change: -21, avgTuition: 37000, row: 2, col: 0 },
  'AZ': { name: 'Arizona', change: -23, avgTuition: 36500, row: 4, col: 1 },
  'CO': { name: 'Colorado', change: -19, avgTuition: 38500, row: 3, col: 2 },
  'NC': { name: 'North Carolina', change: -13, avgTuition: 35500, row: 4, col: 6 },
  'GA': { name: 'Georgia', change: -11, avgTuition: 34000, row: 5, col: 6 },
  'MA': { name: 'Massachusetts', change: -8, avgTuition: 48000, row: 2, col: 8 },
  'MN': { name: 'Minnesota', change: -15, avgTuition: 40000, row: 1, col: 4 },
  'MO': { name: 'Missouri', change: -18, avgTuition: 36000, row: 4, col: 4 },
  'IN': { name: 'Indiana', change: -16, avgTuition: 37000, row: 3, col: 5 },
};

export default function USMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getColorByChange = (change: number) => {
    if (change >= -10) return 'from-yellow-400 to-orange-400';
    if (change >= -15) return 'from-orange-400 to-red-400';
    if (change >= -20) return 'from-red-400 to-red-500';
    return 'from-red-500 to-red-600';
  };

  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        <span className="gradient-text">State Funding Cuts & Tuition Response</span>
      </h2>
      
      <div className="glass-card rounded-2xl p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Visualization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Per-Student State Funding Change Since 2008
            </h3>
            <div className="relative" style={{ height: '400px' }}>
              <div className="grid grid-cols-9 gap-1 h-full">
                {Array.from({ length: 63 }, (_item, index) => {
                  const row = Math.floor(index / 9);
                  const col = index % 9;
                  const state = Object.entries(stateData).find(
                    ([_, data]) => data.row === row && data.col === col
                  );
                  
                  if (state) {
                    const [code, data] = state;
                    return (
                      <motion.button
                        key={index}
                        className={`relative rounded bg-gradient-to-br ${getColorByChange(data.change)} text-white font-medium transition-all hover:shadow-lg hover:scale-110 hover:z-10`}
                        onClick={() => setSelectedState(code)}
                        onMouseEnter={() => setHoveredState(code)}
                        onMouseLeave={() => setHoveredState(null)}
                        whileHover={{ y: -2 }}
                      >
                        <div className="text-xs font-bold">{code}</div>
                        <div className="text-xs opacity-90">{data.change}%</div>
                      </motion.button>
                    );
                  }
                  
                  return <div key={index} className=""></div>;
                })}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedState || hoveredState ? 'State Details' : 'Hover or Click a State'}
            </h3>
            
            {(selectedState || hoveredState) ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                {(() => {
                  const state = selectedState || hoveredState || '';
                  const data = stateData[state as keyof typeof stateData];
                  if (!data) return null;
                  
                  return (
                    <>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="text-2xl font-bold gradient-text">{data.name}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg">
                          <div className="text-sm text-gray-600">State Funding Change</div>
                          <div className="text-2xl font-bold text-red-600">{data.change}%</div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-600">Avg Non-Resident Tuition</div>
                          <div className="text-2xl font-bold text-blue-600">
                            ${data.avgTuition.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        As state funding decreased by {Math.abs(data.change)}%, universities 
                        increased reliance on non-resident tuition, now averaging ${data.avgTuition.toLocaleString()} per year.
                      </p>
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                Select a state to see how funding cuts correlate with tuition increases
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Legend:</span>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"></div>
                <span>-10% to 0%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded"></div>
                <span>-20% to -10%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded"></div>
                <span>Below -20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}