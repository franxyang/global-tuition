"use client";

import { cn } from "@/lib/utils";

type Option = { key: 'us' | 'uw' | 'alt'; label: string };

export default function CampusToggle({ 
  options, 
  onChange, 
  selected 
}: { 
  options: Option[]; 
  onChange: (key: 'us' | 'uw' | 'alt') => void; 
  selected: 'us' | 'uw' | 'alt' 
}) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1" role="group">
      {options.map((option) => (
        <button
          key={option.key}
          onClick={() => onChange(option.key)}
          aria-pressed={selected === option.key}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
            selected === option.key
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}