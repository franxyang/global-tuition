"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

type CTA = { href: string; label: string };

export default function HeroThesis({ 
  title, 
  subtitle, 
  stakes,
  uwHook,
  ctas 
}: { 
  title: string; 
  subtitle: string; 
  stakes: string[];
  uwHook: string;
  ctas: CTA[] 
}) {
  return (
    <section className="text-center space-y-10 py-16">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="gradient-text">{title}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {stakes.map((stake, index) => {
          const icons = ['🌐', '📊', '⚖️'];
          const colors = [
            'from-blue-50 to-cyan-50 border-blue-200',
            'from-purple-50 to-pink-50 border-purple-200',
            'from-amber-50 to-orange-50 border-amber-200'
          ];
          
          return (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${colors[index]} rounded-xl p-6 border hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-4xl mb-4">{icons[index]}</div>
              <p className="text-gray-700 font-medium">{stake}</p>
            </div>
          );
        })}
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 max-w-3xl mx-auto border border-blue-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p className="text-gray-700">
          <span className="inline-block mr-2">📌</span>
          <span className="italic">{uwHook}</span>
        </p>
      </motion.div>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Link 
          href={ctas[0].href} 
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          {ctas[0].label}
          <span className="ml-2">→</span>
        </Link>
        <Link 
          href={ctas[1].href} 
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          {ctas[1].label}
          <span className="ml-2">📖</span>
        </Link>
      </motion.div>
    </section>
  );
}