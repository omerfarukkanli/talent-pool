'use client';

import { useState, useRef } from 'react';
import { FileText } from 'lucide-react';

interface PDFPreviewProps {
  pdfUrl: string;
}

export function PDFPreview({ pdfUrl }: PDFPreviewProps) {
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsHovering(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsHovering(false);
  };

  return (
    <div
      className='flex justify-center relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={pdfUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='h-5 w-5 text-red-500'
      >
        <FileText />
      </a>

      {isHovering && (
        <div
          className='absolute z-50 bg-white rounded-md shadow-lg border p-4 border-gray-200'
          style={{
            width: '700px',
            height: '500px',
            top: -50,
            left: -280,
            zIndex: 999,
            transform: 'translateX(-50%)',
          }}
        >
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            width='100%'
            height='100%'
            style={{ border: 'none' }}
            title='PDF Preview'
          />
        </div>
      )}
    </div>
  );
}
