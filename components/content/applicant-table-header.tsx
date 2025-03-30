import React from 'react';
import { TableHead, TableHeader, TableRow } from '../ui/table';
import { ChevronDown } from 'lucide-react';
import { columnWidths } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';

interface ApplicantTableHeaderProps {
  selectAll: boolean;
  handleSelectAll: (checked: boolean) => void;
}

const ApplicantTableHeader = ({
  selectAll,
  handleSelectAll,
}: ApplicantTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead
          className={`${columnWidths.checkbox} pr-0 sticky left-0 bg-white border-r-2 z-10`}
        >
          <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
        </TableHead>
        <TableHead className={`font-medium ${columnWidths.name}`}>
          Name
        </TableHead>
        <TableHead className={`font-medium ${columnWidths.email}`}>
          Email
        </TableHead>
        <TableHead className={`font-medium ${columnWidths.stage}`}>
          Stage
          <ChevronDown className='ml-1 inline-block w-4 h-4' />
        </TableHead>
        <TableHead className={`font-medium ${columnWidths.rating}`}>
          Rating
          <ChevronDown className='ml-1 inline-block w-4 h-4' />
        </TableHead>
        <TableHead className={`font-medium ${columnWidths.appliedJob}`}>
          Applied Job
        </TableHead>
        <TableHead className={`font-medium ${columnWidths.resume} text-center`}>
          Resume
        </TableHead>
        <TableHead className={columnWidths.actions}></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ApplicantTableHeader;
