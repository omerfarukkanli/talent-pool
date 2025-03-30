import React from 'react';
import { TableHead, TableRow } from '../ui/table';
import { ChevronDown } from 'lucide-react';
import { columnWidths } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { useAppSelector } from '@/hooks/use-app';

interface ApplicantTableHeaderProps {
  selectAll: boolean;
  handleSelectAll: (checked: boolean) => void;
}

const ApplicantTableHeader = ({
  selectAll,
  handleSelectAll,
}: ApplicantTableHeaderProps) => {
  const { columnVisibility } = useAppSelector((state) => state.ui);

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
        <TableHead className={`text-xs text-gray-600 ${columnWidths.stage}`}>
          <div className='flex justify-between'>
            Stage
            <ChevronDown className='ml-1 inline-block w-4 h-4' />
          </div>
        </TableHead>
      )}
      {columnVisibility.rating && (
        <TableHead className={`text-xs text-gray-600  ${columnWidths.rating}`}>
          <div className='flex justify-between'>
            Rating
            <ChevronDown className='ml-1 inline-block w-4 h-4' />
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
