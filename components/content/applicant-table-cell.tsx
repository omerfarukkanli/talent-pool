import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { Applicant } from '@/lib/types';
import { FileText, MoreVertical } from 'lucide-react';
import StarRating from './raing-star';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ApplicantTableCellProps {
  id: string;
  applicant: Applicant;
  selectedApplicants: string[];
  handleSelectApplicant: (id: string, checked: boolean) => void;
}

const columnWidths = {
  checkbox: 'w-[40px]',
  name: 'w-[200px]',
  email: 'w-[200px]',
  stage: 'w-[150px]',
  rating: 'w-[150px]',
  appliedJob: 'w-[200px]',
  resume: 'w-[100px]',
  actions: 'w-[40px]',
};

const ApplicantTableCell = ({
  id,
  applicant,
  selectedApplicants,
  handleSelectApplicant,
}: ApplicantTableCellProps) => {
  return (
    <TableRow key={id} className='hover:bg-muted/5'>
      <TableCell
        className={`${columnWidths.checkbox} pr-0 sticky left-0 bg-white z-10 border-r-2`}
      >
        <Checkbox
          checked={selectedApplicants.includes(applicant.id)}
          onCheckedChange={(checked) =>
            handleSelectApplicant(applicant.id, checked as boolean)
          }
        />
      </TableCell>
      <TableCell className={columnWidths.name}>
        <div className='flex items-center gap-2'>
          <span>{`${applicant.firstName} ${applicant.lastName}`}</span>
        </div>
      </TableCell>
      <TableCell className={columnWidths.email}>{applicant.email}</TableCell>
      <TableCell className={columnWidths.stage}>
        <Badge>{applicant.activeApplication.stage.name}</Badge>
      </TableCell>
      <TableCell className={columnWidths.rating}>
        <StarRating rating={applicant.rating || 3} />
      </TableCell>
      <TableCell className={columnWidths.appliedJob}>
        <Badge>{applicant.activeApplication.jobListing.name}</Badge>
      </TableCell>
      <TableCell className={`${columnWidths.resume} text-center`}>
        {applicant.activeApplication.resume ? (
          <div className='flex justify-center'>
            <FileText className='h-5 w-5 text-red-500' />
          </div>
        ) : (
          <div className='flex justify-center'>-</div>
        )}
      </TableCell>
      <TableCell className={columnWidths.actions}>
        <Button variant='ghost' size='icon' className='h-8 w-8'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </TableCell>
      {/* Additional cells can be added here */}
    </TableRow>
  );
};

export default ApplicantTableCell;
