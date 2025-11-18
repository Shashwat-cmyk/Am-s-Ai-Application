import React, { useMemo } from 'react';

interface MarkdownRendererProps {
  markdown: string;
}

// Fix: Add explicit return type to prevent type inference issues with JSX.
const parseMarkdownTable = (tableLines: string[]): React.ReactElement | null => {
  if (tableLines.length < 2) return null;

  const header = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
  const rows = tableLines.slice(2).map(rowLine => rowLine.split('|').map(c => c.trim()).filter(Boolean));

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-600">
        <thead className="bg-gray-700">
          <tr>
            {header.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const content = useMemo(() => {
    if (!markdown) return [];
    
    const lines = markdown.split('\n');
    // Fix: Use React.ReactElement instead of JSX.Element to resolve "Cannot find namespace 'JSX'" error.
    const elements: (React.ReactElement | null)[] = [];
    let listItems: { type: 'ul' | 'ol', items: string[] } | null = null;
    let inTable = false;
    let tableLines: string[] = [];

    const flushList = () => {
      if (listItems) {
        const ListComponent = listItems.type;
        elements.push(
          <ListComponent key={`list-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4">
            {listItems.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </ListComponent>
        );
        listItems = null;
      }
    };
    
    const flushTable = () => {
        if (inTable && tableLines.length > 0) {
            elements.push(parseMarkdownTable(tableLines));
            inTable = false;
            tableLines = [];
        }
    }

    for (const line of lines) {
      // Table detection
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (!inTable) {
            flushList();
            inTable = true;
        }
        tableLines.push(line);
        continue;
      } else if (inTable) {
        flushTable();
      }

      if (line.startsWith('## ')) {
        flushList();
        elements.push(<h2 key={elements.length} className="text-2xl font-bold text-cyan-400 mt-6 mb-3 border-b border-gray-600 pb-2">{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(<h3 key={elements.length} className="text-xl font-semibold text-cyan-300 mt-4 mb-2">{line.substring(4)}</h3>);
      } else if (line.startsWith('* ')) {
        if (listItems?.type !== 'ul') flushList();
        if (!listItems) listItems = { type: 'ul', items: [] };
        listItems.items.push(line.substring(2));
      } else if (line.match(/^\d+\. /)) {
        if (listItems?.type !== 'ol') flushList();
        if (!listItems) listItems = { type: 'ol', items: [] };
        listItems.items.push(line.replace(/^\d+\. /, ''));
      } else if (line.trim() !== '') {
        flushList();
        elements.push(<p key={elements.length} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />);
      } else {
        flushList();
      }
    }
    
    flushList(); // Flush any remaining list
    flushTable(); // Flush any remaining table

    return elements;
  }, [markdown]);

  return <>{content}</>;
};