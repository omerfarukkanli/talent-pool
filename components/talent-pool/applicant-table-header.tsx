'use client';
import React from 'react';
import { TableHead, TableRow } from '@/components/ui/table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { columnWidths } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app';
import { setSortQuery } from '@/lib/store/slices/talent-pool-slice';
import { HeaderFiledTpye, SortOrder } from '@/lib/types';

interface ApplicantTableHeaderProps {
  selectAll: boolean;
  handleSelectAll: (checked: boolean) => void;
}

const ApplicantTableHeader = ({
  selectAll,
  handleSelectAll,
}: ApplicantTableHeaderProps) => {
  const { columnVisibility } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.talentPool);

  const handleToggleSort = (field: HeaderFiledTpye) => {
    const currentSort = sort?.[field] ?? null;
    let newOrder: SortOrder | null = null;
    if (currentSort === null) {
      newOrder = 'asc';
    } else if (currentSort === 'asc') {
      newOrder = 'desc';
    } else {
      newOrder = null;
    }

    dispatch(setSortQuery({ field, order: newOrder }));
  };

  return (
    <TableRow>
      <TableHead className={columnWidths.checkbox}>
        <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
      </TableHead>
      {columnVisibility.name && (
        <TableHead className={`text-xs text-gray-600 ${columnWidths.name}`}>
          Name
        </TableHead>
      )}
      <TableHead className={`text-xs text-gray-600  ${columnWidths.email}`}>
        Email
      </TableHead>
      {columnVisibility.stage && (
        <TableHead
          className={`text-xs text-gray-600 ${columnWidths.stage}`}
          onClick={() => handleToggleSort('stage')}
        >
          <div className='flex justify-between'>
            Stage
            {sort?.stage &&
              (sort.stage === 'asc' ? (
                <ArrowDown className='inline-block w-4 h-4' />
              ) : (
                <ArrowUp className='inline-block w-4 h-4' />
              ))}
          </div>
        </TableHead>
      )}
      {columnVisibility.aiFitScore && (
        <TableHead
          className={`text-xs text-gray-600  ${columnWidths.aiFitScore}`}
          onClick={() => handleToggleSort('aiFit')}
        >
          <div className='flex justify-between'>
            AI Fit Score
            {sort?.aiFit &&
              (sort.aiFit === 'asc' ? (
                <ArrowDown className='inline-block w-4 h-4' />
              ) : (
                <ArrowUp className='inline-block w-4 h-4' />
              ))}
          </div>
        </TableHead>
      )}
      {columnVisibility.source && (
        <TableHead
          className={`text-xs text-gray-600  ${columnWidths.source}`}
          onClick={() => handleToggleSort('sourceType')}
        >
          Source
        </TableHead>
      )}
      {columnVisibility.rating && (
        <TableHead
          className={`text-xs text-gray-600  ${columnWidths.rating}`}
          onClick={() => handleToggleSort('avgRating')}
        >
          <div className='flex justify-between'>
            Rating
            {sort?.avgRating &&
              (sort.avgRating === 'asc' ? (
                <ArrowDown className='inline-block w-4 h-4' />
              ) : (
                <ArrowUp className='inline-block w-4 h-4' />
              ))}
          </div>
        </TableHead>
      )}
      {columnVisibility.dateAdded && (
        <TableHead
          className={`text-xs text-gray-600  ${columnWidths.dateAdded}`}
          onClick={() => handleToggleSort('createdAt')}
        >
          <div className='flex justify-between'>
            Date Added
            {sort?.createdAt &&
              (sort.createdAt === 'asc' ? (
                <ArrowDown className='inline-block w-4 h-4' />
              ) : (
                <ArrowUp className='inline-block w-4 h-4' />
              ))}
          </div>
        </TableHead>
      )}
      {columnVisibility.appliedJob && (
        <TableHead
          className={`text-xs text-gray-600  ${columnWidths.appliedJob}`}
        >
          Applied Job
        </TableHead>
      )}
      {columnVisibility.resume && (
        <TableHead
          className={`text-xs text-gray-600  ${columnWidths.resume} text-center`}
        >
          Resume
        </TableHead>
      )}
      <TableHead className={columnWidths.actions}></TableHead>
    </TableRow>
  );
};

export default ApplicantTableHeader;
