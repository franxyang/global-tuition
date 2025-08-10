"use client";

import MarkdownContent from "@/components/MarkdownContent";
import { REFLECTION_MD } from "@/content/copy";

export default function ReflectionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        className="no-print border border-gray-300 px-4 py-2 rounded-lg mb-6 hover:bg-gray-50 transition-colors"
        onClick={() => window.print()}
      >
        Print this reflection
      </button>
      
      <MarkdownContent content={REFLECTION_MD} />
    </div>
  );
}