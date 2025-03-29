'use client';

import type React from 'react';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Candidate } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppSelector } from '@/hooks/use-app';
import Image from 'next/image';
import { CVPreview } from '../cs-preview';

interface TalentPoolTableProps {
  candidates: Candidate[];
  loading: boolean;
  lastCandidateRef: (node: HTMLTableRowElement | null) => void;
  onSort: (column: string) => void;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  isMobile: boolean;
}

export function TalentPoolTable({
  candidates,
  loading,
  lastCandidateRef,
  onSort,
  sortColumn,
  sortDirection,
  isMobile,
}: TalentPoolTableProps) {
  const { columnVisibility } = useAppSelector((state) => state.ui);
  const [previewCandidate, setPreviewCandidate] = useState<Candidate | null>(
    null
  );
  const [previewPosition, setPreviewPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Function to handle mouse enter on resume button
  const handleResumeMouseEnter = (
    candidate: Candidate,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (isMobile) return; // Don't show preview on hover for mobile

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    // Calculate position for the preview
    // Position it to the right of the button on desktop
    setPreviewPosition({
      top: rect.top + window.scrollY - 100, // Position above the button
      left: rect.left + window.scrollX + rect.width + 20, // Position to the right with some spacing
    });

    setPreviewCandidate(candidate);
  };

  // Function to handle mouse leave on resume button
  const handleResumeMouseLeave = () => {
    if (isMobile) return;
    setPreviewCandidate(null);
  };

  // Function to handle click on resume button for mobile
  const handleResumeClick = (candidate: Candidate) => {
    if (!isMobile) return;
    setPreviewCandidate(candidate);
    setShowMobilePreview(true);
  };

  // Function to close mobile preview
  const handleCloseMobilePreview = () => {
    setShowMobilePreview(false);
    setPreviewCandidate(null);
  };

  // Function to render the sort indicator
  const renderSortIndicator = (column: string) => {
    if (sortColumn !== column) return null;

    return sortDirection === 'asc' ? (
      <ChevronUp className='h-4 w-4 ml-1' />
    ) : (
      <ChevronDown className='h-4 w-4 ml-1' />
    );
  };

  // Function to render the stage badge
  const renderStageBadge = (stage: string) => {
    const stageColors: Record<string, string> = {
      Applied: 'bg-blue-100 text-blue-800',
      Interview: 'bg-purple-100 text-purple-800',
      Evaluation: 'bg-orange-100 text-orange-800',
      Offer: 'bg-green-100 text-green-800',
      Contacted: 'bg-yellow-100 text-yellow-800',
    };

    return (
      <Badge
        className={cn(
          'font-normal',
          stageColors[stage] || 'bg-gray-100 text-gray-800'
        )}
      >
        {stage}
      </Badge>
    );
  };

  // Function to render the job category badge
  const renderJobBadge = (job: string) => {
    const jobColors: Record<string, string> = {
      'Frontend Dev': 'bg-purple-100 text-purple-800',
      'Software Engineering': 'bg-blue-100 text-blue-800',
      Operations: 'bg-green-100 text-green-800',
      Design: 'bg-pink-100 text-pink-800',
      Finance: 'bg-yellow-100 text-yellow-800',
    };

    return (
      <Badge
        className={cn(
          'font-normal',
          jobColors[job] || 'bg-gray-100 text-gray-800'
        )}
      >
        {job}
      </Badge>
    );
  };

  // Function to render star ratings
  const renderRating = (rating: number) => {
    return (
      <div className='flex'>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={cn(
              'h-4 w-4',
              i < rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 fill-gray-300'
            )}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
          </svg>
        ))}
      </div>
    );
  };

  // Loading skeleton for mobile
  if (loading && candidates.length === 0 && isMobile) {
    return (
      <div className='flex-1 overflow-auto p-4'>
        <div className='space-y-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className='overflow-hidden'>
              <CardContent className='p-4'>
                <div className='flex items-center gap-3 mb-3'>
                  <Skeleton className='h-10 w-10 rounded-full' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-3 w-32' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <Skeleton className='h-5 w-20' />
                    <Skeleton className='h-5 w-20' />
                  </div>
                  <div className='flex justify-between'>
                    <Skeleton className='h-5 w-24' />
                    <Skeleton className='h-5 w-16' />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Loading skeleton for desktop
  if (loading && candidates.length === 0 && !isMobile) {
    return (
      <div className='flex-1 overflow-auto p-4'>
        <div className='rounded-md border'>
          <table className='w-full'>
            <thead>
              <tr className='border-b bg-muted/50'>
                {columnVisibility.name && (
                  <th className='p-3 text-left font-medium'>Name</th>
                )}
                {columnVisibility.email && (
                  <th className='p-3 text-left font-medium'>Email</th>
                )}
                {columnVisibility.stage && (
                  <th className='p-3 text-left font-medium'>Stage</th>
                )}
                {columnVisibility.rating && (
                  <th className='p-3 text-left font-medium'>Rating</th>
                )}
                {columnVisibility.appliedJob && (
                  <th className='p-3 text-left font-medium'>Applied Job</th>
                )}
                {columnVisibility.resume && (
                  <th className='p-3 text-left font-medium'>Resume</th>
                )}
                {columnVisibility.aiFitScore && (
                  <th className='p-3 text-left font-medium'>AI Fit Score</th>
                )}
                {columnVisibility.source && (
                  <th className='p-3 text-left font-medium'>Source</th>
                )}
                {columnVisibility.dateAdded && (
                  <th className='p-3 text-left font-medium'>Date Added</th>
                )}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className='border-b'>
                  {columnVisibility.name && (
                    <td className='p-3'>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-8 w-8 rounded-full' />
                        <Skeleton className='h-4 w-24' />
                      </div>
                    </td>
                  )}
                  {columnVisibility.email && (
                    <td className='p-3'>
                      <Skeleton className='h-4 w-32' />
                    </td>
                  )}
                  {columnVisibility.stage && (
                    <td className='p-3'>
                      <Skeleton className='h-6 w-20' />
                    </td>
                  )}
                  {columnVisibility.rating && (
                    <td className='p-3'>
                      <Skeleton className='h-4 w-24' />
                    </td>
                  )}
                  {columnVisibility.appliedJob && (
                    <td className='p-3'>
                      <Skeleton className='h-6 w-32' />
                    </td>
                  )}
                  {columnVisibility.resume && (
                    <td className='p-3'>
                      <Skeleton className='h-8 w-8' />
                    </td>
                  )}
                  {columnVisibility.aiFitScore && (
                    <td className='p-3'>
                      <Skeleton className='h-4 w-24' />
                    </td>
                  )}
                  {columnVisibility.source && (
                    <td className='p-3'>
                      <Skeleton className='h-4 w-24' />
                    </td>
                  )}
                  {columnVisibility.dateAdded && (
                    <td className='p-3'>
                      <Skeleton className='h-4 w-24' />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Mobile view with cards
  if (isMobile) {
    return (
      <div className='flex-1 overflow-auto p-4 relative'>
        <div className='space-y-4'>
          {candidates.map((candidate, index) => (
            <Card
              key={`${candidate.id}-${index}`}
              className='overflow-hidden'
              ref={
                index === candidates.length - 1
                  ? (node) => lastCandidateRef(node as HTMLTableRowElement)
                  : undefined
              }
            >
              <CardContent className='p-4'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
                    {candidate.avatar ? (
                      <Image
                        src={candidate.avatar || '/placeholder.svg'}
                        alt={candidate.name}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <span className='text-sm font-medium'>
                        {candidate.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className='font-medium'>{candidate.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {candidate.email}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-2 mb-2'>
                  <div className='text-sm'>
                    <span className='text-muted-foreground'>Stage:</span>
                    <div className='mt-1'>
                      {renderStageBadge(candidate.stage)}
                    </div>
                  </div>
                  <div className='text-sm'>
                    <span className='text-muted-foreground'>Rating:</span>
                    <div className='mt-1'>{renderRating(candidate.rating)}</div>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <div className='text-sm'>
                    <span className='text-muted-foreground'>Applied Job:</span>
                    <div className='mt-1'>
                      {renderJobBadge(candidate.appliedJob)}
                    </div>
                  </div>
                  <div className='text-sm flex items-end justify-end'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-8 w-8'
                      onClick={() => handleResumeClick(candidate)}
                    >
                      <FileText className='h-4 w-4 text-red-500' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {loading && (
            <div className='p-4 text-center'>
              <div className='flex justify-center items-center gap-2'>
                <div className='h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin' />
                <span>Loading more candidates...</span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile CV Preview Modal */}
        {isMobile && showMobilePreview && previewCandidate && (
          <>
            <div
              className='fixed inset-0 bg-black/50 z-50'
              onClick={handleCloseMobilePreview}
            />
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
              <div className='relative w-full max-w-lg max-h-[90vh] overflow-auto'>
                <CVPreview candidate={previewCandidate} isMobile={true} />
                <Button
                  className='absolute top-2 right-2 rounded-full h-8 w-8 p-0 bg-white text-gray-800 hover:bg-gray-200'
                  onClick={handleCloseMobilePreview}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18'></line>
                    <line x1='6' y1='6' x2='18' y2='18'></line>
                  </svg>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop view with table
  return (
    <div className='flex-1 overflow-auto p-4 relative'>
      <div className='rounded-md border'>
        <table className='w-full'>
          <thead>
            <tr className='border-b bg-muted/50'>
              {columnVisibility.name && (
                <th
                  className='p-3 text-left font-medium cursor-pointer hover:bg-muted/80'
                  onClick={() => onSort('name')}
                >
                  <div className='flex items-center'>
                    Name
                    {renderSortIndicator('name')}
                  </div>
                </th>
              )}

              {columnVisibility.email && (
                <th
                  className='p-3 text-left font-medium cursor-pointer hover:bg-muted/80'
                  onClick={() => onSort('email')}
                >
                  <div className='flex items-center'>
                    Email
                    {renderSortIndicator('email')}
                  </div>
                </th>
              )}

              {columnVisibility.stage && (
                <th
                  className='p-3 text-left font-medium cursor-pointer hover:bg-muted/80'
                  onClick={() => onSort('stage')}
                >
                  <div className='flex items-center'>
                    Stage
                    {renderSortIndicator('stage')}
                  </div>
                </th>
              )}

              {columnVisibility.rating && (
                <th
                  className='p-3 text-left font-medium cursor-pointer hover:bg-muted/80'
                  onClick={() => onSort('rating')}
                >
                  <div className='flex items-center'>
                    Rating
                    {renderSortIndicator('rating')}
                  </div>
                </th>
              )}

              {columnVisibility.appliedJob && (
                <th
                  className='p-3 text-left font-medium cursor-pointer hover:bg-muted/80'
                  onClick={() => onSort('appliedJob')}
                >
                  <div className='flex items-center'>
                    Applied Job
                    {renderSortIndicator('appliedJob')}
                  </div>
                </th>
              )}

              {columnVisibility.resume && (
                <th className='p-3 text-left font-medium'>Resume</th>
              )}

              {columnVisibility.aiFitScore && (
                <th
                  className='p-3 text-left font-medium cursor-pointer hover:bg-muted/80'
                  onClick={() => onSort('aiFitScore')}
                >
                  <div className='flex items-center'>
                    AI Fit Score
                    {renderSortIndicator('aiFitScore')}
                  </div>
                </th>
              )}

              {columnVisibility.source && (
                <th
                  className='p-3 text-left font-medium cursor-pointer hover:bg-muted/80'
                  onClick={() => onSort('source')}
                >
                  <div className='flex items-center'>
                    Source
                    {renderSortIndicator('source')}
                  </div>
                </th>
              )}

              {columnVisibility.dateAdded && (
                <th
                  className='p-3 text-left font-medium cursor-pointer hover:bg-muted/80'
                  onClick={() => onSort('dateAdded')}
                >
                  <div className='flex items-center'>
                    Date Added
                    {renderSortIndicator('dateAdded')}
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr
                key={`${candidate.id}-${index}`}
                ref={index === candidates.length - 1 ? lastCandidateRef : null}
                className='border-b hover:bg-muted/50 transition-colors'
              >
                {columnVisibility.name && (
                  <td className='p-3'>
                    <div className='flex items-center gap-2'>
                      <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
                        {candidate.avatar ? (
                          <Image
                            src={candidate.avatar || '/placeholder.svg'}
                            alt={candidate.name}
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <span className='text-xs font-medium'>
                            {candidate.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span>{candidate.name}</span>
                    </div>
                  </td>
                )}

                {columnVisibility.email && (
                  <td className='p-3'>{candidate.email}</td>
                )}

                {columnVisibility.stage && (
                  <td className='p-3'>{renderStageBadge(candidate.stage)}</td>
                )}

                {columnVisibility.rating && (
                  <td className='p-3'>{renderRating(candidate.rating)}</td>
                )}

                {columnVisibility.appliedJob && (
                  <td className='p-3'>
                    {renderJobBadge(candidate.appliedJob)}
                  </td>
                )}

                {columnVisibility.resume && (
                  <td className='p-3'>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8 relative'
                      onMouseEnter={(e) => handleResumeMouseEnter(candidate, e)}
                      onMouseLeave={handleResumeMouseLeave}
                      onClick={() => handleResumeClick(candidate)}
                    >
                      <FileText className='h-4 w-4 text-red-500' />
                    </Button>
                  </td>
                )}

                {columnVisibility.aiFitScore && (
                  <td className='p-3'>
                    <div className='flex items-center'>
                      <span className='font-medium'>
                        {candidate.aiFitScore}%
                      </span>
                      <div className='ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-green-500 rounded-full'
                          style={{ width: `${candidate.aiFitScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                )}

                {columnVisibility.source && (
                  <td className='p-3'>{candidate.source}</td>
                )}

                {columnVisibility.dateAdded && (
                  <td className='p-3'>{candidate.dateAdded}</td>
                )}
              </tr>
            ))}

            {loading && (
              <tr>
                <td
                  colSpan={
                    Object.values(columnVisibility).filter(Boolean).length
                  }
                  className='p-4 text-center'
                >
                  <div className='flex justify-center items-center gap-2'>
                    <div className='h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin' />
                    <span>Loading more candidates...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CV Preview for desktop hover */}
      {!isMobile && previewCandidate && previewPosition && (
        <CVPreview
          candidate={previewCandidate}
          position={previewPosition}
          isMobile={false}
        />
      )}
    </div>
  );
}
