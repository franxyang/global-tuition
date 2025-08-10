"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type TabContent = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export default function EquityTabs({ tabs }: { tabs: TabContent[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <div className="w-full">
      <div 
        role="tablist" 
        className="flex border-b border-gray-200"
        aria-label="Equity perspectives"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className="py-6"
        >
          <div className="prose max-w-none text-gray-700">
            {tab.content}
          </div>
        </div>
      ))}
    </div>
  );
}