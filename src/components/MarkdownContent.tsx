import React from 'react';

export default function MarkdownContent({ content }: { content: string }) {
  const processContent = (text: string) => {
    // Split by lines
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let currentIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Headers
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={currentIndex++} className="text-xl font-bold mt-6 mb-3">
            {processInlineStyles(line.substring(3))}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={currentIndex++} className="text-2xl font-bold mt-4 mb-4">
            {processInlineStyles(line.substring(2))}
          </h1>
        );
      } 
      // List items
      else if (line.startsWith('- ')) {
        const listItems = [];
        let j = i;
        while (j < lines.length && lines[j].startsWith('- ')) {
          listItems.push(lines[j].substring(2));
          j++;
        }
        elements.push(
          <ul key={currentIndex++} className="list-disc list-inside mb-4 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx}>{processInlineStyles(item)}</li>
            ))}
          </ul>
        );
        i = j - 1;
      }
      // Paragraphs
      else if (line.trim()) {
        elements.push(
          <p key={currentIndex++} className="mb-4">
            {processInlineStyles(line)}
          </p>
        );
      }
    }
    
    return elements;
  };

  const processInlineStyles = (text: string): (string | React.ReactElement)[] => {
    const parts: (string | React.ReactElement)[] = [];
    let key = 0;

    // Process bold text
    const boldRegex = /\*\*(.*?)\*\*/g;
    
    // First handle bold
    let match;
    const elements: { start: number; end: number; element: React.ReactElement }[] = [];
    
    while ((match = boldRegex.exec(text)) !== null) {
      elements.push({
        start: match.index,
        end: match.index + match[0].length,
        element: <strong key={`b${key++}`}>{match[1]}</strong>
      });
    }
    
    // Sort elements by position
    elements.sort((a, b) => a.start - b.start);
    
    // Build result
    let currentPos = 0;
    for (const elem of elements) {
      if (elem.start > currentPos) {
        const textBefore = text.substring(currentPos, elem.start);
        // Check for italics in plain text
        const italicProcessed = textBefore.replace(/\*([^*]+)\*/g, (_, p1) => {
          return `<em>${p1}</em>`;
        });
        if (italicProcessed !== textBefore) {
          parts.push(<span key={`t${key++}`} dangerouslySetInnerHTML={{ __html: italicProcessed }} />);
        } else {
          parts.push(textBefore);
        }
      }
      parts.push(elem.element);
      currentPos = elem.end;
    }
    
    if (currentPos < text.length) {
      const remaining = text.substring(currentPos);
      const italicProcessed = remaining.replace(/\*([^*]+)\*/g, (_, p1) => {
        return `<em>${p1}</em>`;
      });
      if (italicProcessed !== remaining) {
        parts.push(<span key={`t${key++}`} dangerouslySetInnerHTML={{ __html: italicProcessed }} />);
      } else {
        parts.push(remaining);
      }
    }
    
    return parts.length > 0 ? parts : [text];
  };

  return (
    <article className="prose prose-lg max-w-4xl mx-auto print:prose-print">
      {processContent(content)}
    </article>
  );
}