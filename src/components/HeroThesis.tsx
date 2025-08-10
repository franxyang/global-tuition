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
    <section className="text-center space-y-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="gradient-text">{title}</span>
        </h1>
      </motion.div>
      
      <motion.p 
        className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {subtitle}
      </motion.p>

      <motion.div 
        className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {stakes.map((stake, index) => (
          <div key={index} className="glass-card rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-3xl mb-3">
              {index === 0 ? '🌍' : index === 1 ? '🎯' : '⚖️'}
            </div>
            <p className="text-sm text-gray-700">{stake}</p>
          </div>
        ))}
      </motion.div>

      <motion.div 
        className="glass-card rounded-xl p-6 max-w-2xl mx-auto border-l-4 border-blue-600"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p className="text-sm text-gray-700 italic">
          💡 {uwHook}
        </p>
      </motion.div>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link href={ctas[0].href} className="btn-primary">
          {ctas[0].label}
        </Link>
        <Link href={ctas[1].href} className="btn-secondary">
          {ctas[1].label}
        </Link>
      </motion.div>
    </section>
  );
}