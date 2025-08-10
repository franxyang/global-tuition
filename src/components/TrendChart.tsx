"use client";

import { useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, 
  ResponsiveContainer, CartesianGrid
} from "recharts";
import { motion } from 'framer-motion';

type Point = { year: number; value: number };
type Series = { name: string; data: Point[]; color?: string };


export default function TrendChart({ series }: { series: Series[] }) {
  const [indexed, setIndexed] = useState(false);
  
  const years = series[0]?.data.map(d => d.year) ?? [];
  const data = years.map(year => {
    const row: Record<string, number | null> = { year };
    series.forEach(s => {
      const pt = s.data.find(p => p.year === year);
      const value = pt?.value ?? null;
      
      if (indexed && value !== null && s.data[0]) {
        // Calculate percentage change from base year
        const baseValue = s.data[0].value;
        row[s.name] = Math.round((value / baseValue) * 100);
      } else {
        row[s.name] = value;
      }
    });
    return row;
  });

  const colors = ["#3b82f6", "#8b5cf6", "#ec4899"];

  const formatYAxis = (value: number) => {
    if (indexed) return `${value}%`;
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  const formatTooltip = (value: number, name: string) => {
    if (indexed) return `${value}%`;
    if (name.toLowerCase().includes('tuition') || name.includes('$')) {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  return (
    <motion.section 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          <span className="gradient-text">National Trends Over Time</span>
        </h3>
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            checked={indexed}
            onChange={() => setIndexed(s => !s)}
            aria-label="Toggle percent change view"
          />
          <span>Show as % change (base year = 100)</span>
        </label>
      </div>

      <figure role="img" aria-labelledby="chart-title" className="glass-card rounded-xl p-6">
        <h3 id="chart-title" className="sr-only">
          Trends in state funding, international enrollment, and nonresident tuition
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 60, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280"
              tickMargin={10}
              label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
              domain={['dataMin', 'dataMax']}
              ticks={years}
            />
            <YAxis 
              stroke="#6b7280"
              tickFormatter={formatYAxis}
              tickMargin={10}
              label={{ 
                value: indexed ? '% Change (base year = 100)' : 'Value', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}
              formatter={formatTooltip}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ paddingBottom: '10px' }}
            />
            {series.map((s, i) => (
              <Line 
                key={s.name} 
                type="monotone" 
                dataKey={s.name} 
                stroke={colors[i % colors.length]}
                strokeWidth={3}
                dot={{ fill: colors[i % colors.length], r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <figcaption className="text-sm text-gray-600 mt-4">
          {indexed 
            ? "When shown as % change, both series are comparable on one axis." 
            : "State support per FTE fell while international enrollment and nonresident tuition rose."
          } <sup><a href="/references#1" className="text-blue-600 hover:underline">[1]</a></sup>
        </figcaption>
      </figure>
    </motion.section>
  );
}