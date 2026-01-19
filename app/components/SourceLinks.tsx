'use client';

import { linkSources, type LinkedSource } from '@/lib/sourceLinks';

interface SourceLinksProps {
  sources: string[];
  className?: string;
}

export default function SourceLinks({ sources, className = '' }: SourceLinksProps) {
  const linkedSources = linkSources(sources);

  return (
    <div className={`space-y-2 ${className}`}>
      {linkedSources.map((source, index) => (
        <div key={index} className="flex items-start">
          <span className="text-purple-600 mr-2">•</span>
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-purple-600 underline decoration-purple-300 hover:decoration-purple-600 transition-colors"
            >
              {source.text}
              <svg
                className="inline-block w-3 h-3 ml-1 mb-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ) : (
            <span className="text-sm text-gray-700">
              {source.text}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
