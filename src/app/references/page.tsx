"use client";

import { motion } from 'framer-motion';
import { REFERENCES_PAGE_INTRO } from "@/content/copy";
import referencesData from "@/data/references.json";

export default function ReferencesPage() {
  const courseRefs = referencesData.filter(ref => ref.group === "Course");
  const dataMediaRefs = referencesData.filter(ref => ref.group === "Data & Media");

  const getAnnotation = (id: string) => {
    const annotations: Record<string, string> = {
      'bound-2022': 'Primary empirical source for funding-enrollment correlation',
      'nafsa-2024': 'Key economic impact statistics',
      'hepi-2021': 'Critical perspective on commodification',
      'tuck-2009': 'Theoretical framework for avoiding damage narratives',
      'ross-2020': 'Anti-Blackness theoretical lens',
      'golashboza-2016': 'Racial capitalism framework'
    };
    return annotations[id] || '';
  };

  return (
    <div className="py-12 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-text">References</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {REFERENCES_PAGE_INTRO}
        </p>
      </motion.div>

      <motion.section 
        className="glass-card rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold gradient-text mb-6">📚 Course Materials</h2>
        <div className="space-y-4">
          {courseRefs.map((ref, index) => (
            <motion.div 
              key={ref.id} 
              id={ref.n.toString()} 
              className="scroll-mt-24 p-4 rounded-lg hover:bg-blue-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="flex items-start">
                <span className="inline-block min-w-[40px] px-2 py-1 bg-blue-100 text-blue-700 font-bold rounded text-sm">
                  [{ref.n}]
                </span>
                <div className="ml-4 flex-1">
                  <p className="text-gray-700">
                    {ref.text}
                  </p>
                  {getAnnotation(ref.id) && (
                    <p className="text-sm text-blue-600 mt-1 italic">
                      ↳ {getAnnotation(ref.id)}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="glass-card rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold gradient-text mb-6">📊 Data & Media Sources</h2>
        <div className="space-y-4">
          {dataMediaRefs.map((ref, index) => (
            <motion.div 
              key={ref.id} 
              id={ref.n.toString()} 
              className="scroll-mt-24 p-4 rounded-lg hover:bg-purple-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            >
              <div className="flex items-start">
                <span className="inline-block min-w-[40px] px-2 py-1 bg-purple-100 text-purple-700 font-bold rounded text-sm">
                  [{ref.n}]
                </span>
                <div className="ml-4 flex-1">
                  <p className="text-gray-700">
                    {ref.text}
                  </p>
                  {getAnnotation(ref.id) && (
                    <p className="text-sm text-purple-600 mt-1 italic">
                      ↳ {getAnnotation(ref.id)}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}