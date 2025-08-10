"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { motion } from 'framer-motion';

type Point = { year: number; value: number };
type Series = { name: string; data: Point[]; color?: string };

export default function TrendChart({ series }: { series: Series[] }) {
  const years = series[0]?.data.map(d => d.year) ?? [];
  const data = years.map(year => {
    const row: Record<string, number | null> = { year };
    series.forEach(s => {
      const pt = s.data.find(p => p.year === year);
      row[s.name] = pt?.value ?? null;
    });
    return row;
  });

  const colors = ["#3b82f6", "#8b5cf6", "#ec4899"];

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  const formatTooltip = (value: number, name: string) => {
    if (name.includes('$') || name.includes('tuition') || name.includes('Tuition')) {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  return (
    <motion.figure 
      aria-labelledby="chart-title" 
      role="img" 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3 id="chart-title" className="sr-only">
        Trends in state funding, international enrollment, and nonresident tuition
      </h3>
      <div className="glass-card rounded-xl p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 10, right: 60, left: 60, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280"
              label={{ value: 'Year', position: 'insideBottom', offset: -10 }}
              domain={['dataMin', 'dataMax']}
              ticks={years}
            />
            <YAxis 
              stroke="#6b7280"
              tickFormatter={formatYAxis}
              label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}
              formatter={formatTooltip}
            />
            <Legend />
            {series.map((s, i) => (
              <Line 
                key={s.name} 
                type="monotone" 
                dataKey={s.name} 
                stroke={colors[i % colors.length]}
                strokeWidth={3}
                dot={{ fill: colors[i % colors.length], r: 5 }}
                activeDot={{ r: 7 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.figure>
  );
}