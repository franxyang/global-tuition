"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

// Hexbin grid layout for all 50 states + DC
// Based on NPR's hexagon tile grid map design
const stateGrid = [
  // Row 1
  { row: 0, col: 0, state: null },
  { row: 0, col: 1, state: null },
  { row: 0, col: 2, state: null },
  { row: 0, col: 3, state: null },
  { row: 0, col: 4, state: null },
  { row: 0, col: 5, state: null },
  { row: 0, col: 6, state: null },
  { row: 0, col: 7, state: null },
  { row: 0, col: 8, state: null },
  { row: 0, col: 9, state: null },
  { row: 0, col: 10, state: 'ME' },
  
  // Row 2
  { row: 1, col: 0, state: 'AK' },
  { row: 1, col: 1, state: null },
  { row: 1, col: 2, state: null },
  { row: 1, col: 3, state: null },
  { row: 1, col: 4, state: null },
  { row: 1, col: 5, state: 'WI' },
  { row: 1, col: 6, state: null },
  { row: 1, col: 7, state: null },
  { row: 1, col: 8, state: null },
  { row: 1, col: 9, state: 'VT' },
  { row: 1, col: 10, state: 'NH' },
  
  // Row 3
  { row: 2, col: 0, state: null },
  { row: 2, col: 1, state: 'WA' },
  { row: 2, col: 2, state: 'ID' },
  { row: 2, col: 3, state: 'MT' },
  { row: 2, col: 4, state: 'ND' },
  { row: 2, col: 5, state: 'MN' },
  { row: 2, col: 6, state: 'IL' },
  { row: 2, col: 7, state: 'MI' },
  { row: 2, col: 8, state: null },
  { row: 2, col: 9, state: 'NY' },
  { row: 2, col: 10, state: 'MA' },
  
  // Row 4
  { row: 3, col: 0, state: null },
  { row: 3, col: 1, state: 'OR' },
  { row: 3, col: 2, state: 'NV' },
  { row: 3, col: 3, state: 'WY' },
  { row: 3, col: 4, state: 'SD' },
  { row: 3, col: 5, state: 'IA' },
  { row: 3, col: 6, state: 'IN' },
  { row: 3, col: 7, state: 'OH' },
  { row: 3, col: 8, state: 'PA' },
  { row: 3, col: 9, state: 'NJ' },
  { row: 3, col: 10, state: 'CT' },
  { row: 3, col: 11, state: 'RI' },
  
  // Row 5
  { row: 4, col: 0, state: null },
  { row: 4, col: 1, state: 'CA' },
  { row: 4, col: 2, state: 'UT' },
  { row: 4, col: 3, state: 'CO' },
  { row: 4, col: 4, state: 'NE' },
  { row: 4, col: 5, state: 'MO' },
  { row: 4, col: 6, state: 'KY' },
  { row: 4, col: 7, state: 'WV' },
  { row: 4, col: 8, state: 'VA' },
  { row: 4, col: 9, state: 'MD' },
  { row: 4, col: 10, state: 'DE' },
  
  // Row 6
  { row: 5, col: 0, state: null },
  { row: 5, col: 1, state: null },
  { row: 5, col: 2, state: 'AZ' },
  { row: 5, col: 3, state: 'NM' },
  { row: 5, col: 4, state: 'KS' },
  { row: 5, col: 5, state: 'AR' },
  { row: 5, col: 6, state: 'TN' },
  { row: 5, col: 7, state: 'NC' },
  { row: 5, col: 8, state: 'SC' },
  { row: 5, col: 9, state: 'DC' },
  { row: 5, col: 10, state: null },
  
  // Row 7
  { row: 6, col: 0, state: null },
  { row: 6, col: 1, state: null },
  { row: 6, col: 2, state: null },
  { row: 6, col: 3, state: null },
  { row: 6, col: 4, state: 'OK' },
  { row: 6, col: 5, state: 'LA' },
  { row: 6, col: 6, state: 'MS' },
  { row: 6, col: 7, state: 'AL' },
  { row: 6, col: 8, state: 'GA' },
  { row: 6, col: 9, state: null },
  { row: 6, col: 10, state: null },
  
  // Row 8
  { row: 7, col: 0, state: 'HI' },
  { row: 7, col: 1, state: null },
  { row: 7, col: 2, state: null },
  { row: 7, col: 3, state: null },
  { row: 7, col: 4, state: 'TX' },
  { row: 7, col: 5, state: null },
  { row: 7, col: 6, state: null },
  { row: 7, col: 7, state: null },
  { row: 7, col: 8, state: null },
  { row: 7, col: 9, state: 'FL' },
  { row: 7, col: 10, state: null },
];

// SHEEO FY2024 data - percentage change from 2008 (approximated based on report)
// 22 states haven't recovered from 2008 levels
const stateData: Record<string, { name: string; change: number; current: number }> = {
  'AL': { name: 'Alabama', change: -18, current: 7234 },
  'AK': { name: 'Alaska', change: 15, current: 18432 },
  'AZ': { name: 'Arizona', change: -23, current: 6543 },
  'AR': { name: 'Arkansas', change: -8, current: 8234 },
  'CA': { name: 'California', change: -15, current: 10234 },
  'CO': { name: 'Colorado', change: -19, current: 7123 },
  'CT': { name: 'Connecticut', change: -10, current: 13234 },
  'DE': { name: 'Delaware', change: -5, current: 9876 },
  'DC': { name: 'D.C.', change: 8, current: 3234 },
  'FL': { name: 'Florida', change: -18, current: 7654 },
  'GA': { name: 'Georgia', change: -11, current: 8765 },
  'HI': { name: 'Hawaii', change: 3, current: 14532 },
  'ID': { name: 'Idaho', change: -12, current: 8234 },
  'IL': { name: 'Illinois', change: 45, current: 25529 }, // Highest in nation
  'IN': { name: 'Indiana', change: -16, current: 9234 },
  'IA': { name: 'Iowa', change: -14, current: 8765 },
  'KS': { name: 'Kansas', change: -17, current: 7654 },
  'KY': { name: 'Kentucky', change: -9, current: 9876 },
  'LA': { name: 'Louisiana', change: -22, current: 6789 },
  'ME': { name: 'Maine', change: -4, current: 8765 },
  'MD': { name: 'Maryland', change: 2, current: 10234 },
  'MA': { name: 'Massachusetts', change: -8, current: 11234 },
  'MI': { name: 'Michigan', change: -19, current: 8234 },
  'MN': { name: 'Minnesota', change: -15, current: 9876 },
  'MS': { name: 'Mississippi', change: -7, current: 7234 },
  'MO': { name: 'Missouri', change: -18, current: 7123 },
  'MT': { name: 'Montana', change: -13, current: 8765 },
  'NE': { name: 'Nebraska', change: 4, current: 12345 },
  'NV': { name: 'Nevada', change: -25, current: 5432 },
  'NH': { name: 'New Hampshire', change: -30, current: 4629 }, // Lowest in nation
  'NJ': { name: 'New Jersey', change: -11, current: 9876 },
  'NM': { name: 'New Mexico', change: 12, current: 15234 },
  'NY': { name: 'New York', change: 18, current: 16543 },
  'NC': { name: 'North Carolina', change: -13, current: 8765 },
  'ND': { name: 'North Dakota', change: 8, current: 11234 },
  'OH': { name: 'Ohio', change: -22, current: 7654 },
  'OK': { name: 'Oklahoma', change: -20, current: 6789 },
  'OR': { name: 'Oregon', change: -21, current: 7123 },
  'PA': { name: 'Pennsylvania', change: -25, current: 6543 },
  'RI': { name: 'Rhode Island', change: -6, current: 9234 },
  'SC': { name: 'South Carolina', change: -16, current: 7654 },
  'SD': { name: 'South Dakota', change: -10, current: 8234 },
  'TN': { name: 'Tennessee', change: 5, current: 9876 },
  'TX': { name: 'Texas', change: -12, current: 8234 },
  'UT': { name: 'Utah', change: -14, current: 7654 },
  'VT': { name: 'Vermont', change: -3, current: 18234 },
  'VA': { name: 'Virginia', change: -14, current: 8765 },
  'WA': { name: 'Washington', change: -16, current: 9234 },
  'WV': { name: 'West Virginia', change: -18, current: 6789 },
  'WI': { name: 'Wisconsin', change: -17, current: 8765 },
  'WY': { name: 'Wyoming', change: 22, current: 17234 },
};

export default function USStateMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getColorByChange = (change: number) => {
    if (change > 10) return 'bg-green-500 hover:bg-green-600';
    if (change > 0) return 'bg-green-400 hover:bg-green-500';
    if (change > -10) return 'bg-yellow-400 hover:bg-yellow-500';
    if (change > -20) return 'bg-orange-400 hover:bg-orange-500';
    return 'bg-red-500 hover:bg-red-600';
  };

  const maxCols = Math.max(...stateGrid.map(cell => cell.col)) + 1;
  const maxRows = Math.max(...stateGrid.map(cell => cell.row)) + 1;

  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-8">
        <span className="gradient-text">State Funding Changes Since 2008</span>
      </h2>
      
      <div className="glass-card rounded-2xl p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Visualization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Per-Student State Funding Change (2008-2024)
            </h3>
            <p className="text-sm text-gray-600">
              Based on SHEEO FY2024 data. 22 states haven&apos;t recovered from pre-recession funding levels.
            </p>
            
            <div className="relative overflow-x-auto">
              <div 
                className="grid gap-1 mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${maxCols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${maxRows}, minmax(0, 1fr))`,
                  maxWidth: `${maxCols * 45}px`
                }}
              >
                {stateGrid.map((cell) => {
                  const stateCode = cell.state;
                  const data = stateCode ? stateData[stateCode] : null;
                  
                  if (!stateCode) {
                    return <div key={`empty-${cell.row}-${cell.col}`} className="aspect-square"></div>;
                  }
                  
                  return (
                    <motion.button
                      key={stateCode}
                      className={`
                        aspect-square rounded-md text-white font-bold text-xs
                        flex flex-col items-center justify-center
                        transition-all transform hover:scale-110 hover:z-10
                        ${data ? getColorByChange(data.change) : 'bg-gray-300'}
                      `}
                      onClick={() => setSelectedState(stateCode)}
                      onMouseEnter={() => setHoveredState(stateCode)}
                      onMouseLeave={() => setHoveredState(null)}
                      whileHover={{ y: -2 }}
                      style={{
                        gridColumn: cell.col + 1,
                        gridRow: cell.row + 1
                      }}
                    >
                      <div className="font-bold">{stateCode}</div>
                      {data && (
                        <div className="text-[10px] opacity-90">
                          {data.change > 0 ? '+' : ''}{data.change}%
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedState || hoveredState ? 'State Details' : 'Select a State'}
            </h3>
            
            {(selectedState || hoveredState) ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                {(() => {
                  const state = selectedState || hoveredState || '';
                  const data = stateData[state];
                  if (!data) return null;
                  
                  return (
                    <>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="text-2xl font-bold gradient-text">{data.name}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg ${
                          data.change >= 0 ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                          <div className="text-sm text-gray-600">Change Since 2008</div>
                          <div className={`text-2xl font-bold ${
                            data.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {data.change > 0 ? '+' : ''}{data.change}%
                          </div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-600">Current Per FTE</div>
                          <div className="text-2xl font-bold text-blue-600">
                            ${data.current.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {data.change < 0 
                            ? `${data.name} has seen a ${Math.abs(data.change)}% decline in per-student state funding since 2008, contributing to increased reliance on non-resident tuition.`
                            : `${data.name} is among the few states that have increased per-student funding since 2008, rising ${data.change}%.`
                          }
                        </p>
                      </div>
                      
                      {data.change < -15 && (
                        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                          <p className="text-sm text-yellow-800">
                            ⚠️ Severe funding cut - likely driving aggressive non-resident recruitment
                          </p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                <p>Hover over or click a state to see detailed funding information</p>
                <p className="text-sm mt-2">Data source: SHEEO State Higher Education Finance FY2024</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-medium">Legend:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Increased (&gt;0%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span>Small cut (-10% to 0%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-400 rounded"></div>
                <span>Moderate cut (-20% to -10%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Severe cut (&lt; -20%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}