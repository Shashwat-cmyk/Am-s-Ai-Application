import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MarkdownRenderer } from './MarkdownRenderer';

interface AvatarOutputProps {
  markdown: string;
}

export const AvatarOutput: React.FC<AvatarOutputProps> = ({ markdown }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    const source = contentRef.current;
    if (!source) {
      console.error("Content element not found for PDF generation.");
      return;
    }

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(source, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: '#1f2937', // Match bg-gray-800
        // Explicitly set width and height to capture the entire scrollable content
        width: source.scrollWidth,
        height: source.scrollHeight,
        windowWidth: source.scrollWidth,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / pdfWidth;
      const scaledHeight = canvasHeight / ratio;

      let heightLeft = scaledHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
      heightLeft -= pdfHeight;

      // Add new pages if content overflows
      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('customer-avatar-deep-dive.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 flex justify-end items-center mb-4">
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            'Download as PDF'
          )}
        </button>
      </div>
      {/* Scrollable container. Padding is moved to the inner div to help html2canvas calculate width correctly. */}
      <div ref={contentRef} className="flex-grow overflow-y-auto bg-gray-800 rounded-md">
        <div className="prose prose-invert prose-sm md:prose-base max-w-none p-4">
          <MarkdownRenderer markdown={markdown} />
        </div>
      </div>
    </div>
  );
};
