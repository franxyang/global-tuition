"use client";

import { motion } from 'framer-motion';
import Footnote from './Footnote';

export default function KeyFindings() {
  const findings = [
    {
      icon: "📊",
      title: "State $ ↓ → Intl Enroll ↑",
      description: "Public cuts correlate with enrolling more full-pay internationals.",
      footnote: 1,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "💵",
      title: "$43.8B Economic Impact",
      description: "International students contribute tens of billions annually; budgets depend on this flow.",
      footnote: 2,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "⚖️",
      title: "Equity Trade-offs",
      description: "Differential pricing & recruiting incentives can widen access gaps.",
      footnote: 5,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        <span className="gradient-text">Key Research Findings</span>
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {findings.map((finding, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="glass-card rounded-xl p-6 h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-transparent hover:border-blue-500">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${finding.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{finding.icon}</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {finding.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {finding.description}
              </p>
              <Footnote n={finding.footnote} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}