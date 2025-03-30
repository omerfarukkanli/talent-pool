import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { Applicant } from '@/lib/types';
import { ChevronDown, FileText, MoreVertical } from 'lucide-react';
import StarRating from './raing-star';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { columnWidths } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAppSelector } from '@/hooks/use-app';

interface ApplicantTableCellProps {
  id: string;
  applicant: Applicant;
  selectedApplicants: string[];
  handleSelectApplicant: (id: string, checked: boolean) => void;
}

const ApplicantTableCell = ({
  id,
  applicant,
  selectedApplicants,
  handleSelectApplicant,
}: ApplicantTableCellProps) => {
  const { columnVisibility } = useAppSelector((state) => state.ui);
  return (
    <TableRow key={id} className='hover:bg-muted/5'>
      <TableCell className={columnWidths.checkbox}>
        <Checkbox
          checked={selectedApplicants.includes(applicant.id)}
          onCheckedChange={(checked) =>
            handleSelectApplicant(applicant.id, checked as boolean)
          }
        />
      </TableCell>
      {columnVisibility.name && (
        <TableCell className={`${columnWidths.name} 'text-gray-700 text-xs`}>
          <div className='flex gap-3'>
            <Avatar>
              <AvatarImage
                width={24}
                height={24}
                src={applicant.profilePhotoUrl}
                alt='@shadcn'
                className=''
              />
              <AvatarFallback className='border'>{`${applicant.firstName[0]}${applicant.lastName[0]}`}</AvatarFallback>
            </Avatar>

            <div className='flex items-center gap-2'>
              <span>{`${applicant.firstName} ${applicant.lastName}`}</span>
            </div>
          </div>
        </TableCell>
      )}
      <TableCell className={`${columnWidths.email}text-gray-700 text-xs`}>
        {applicant.email}
      </TableCell>
      {columnVisibility.stage && (
        <TableCell className={`${columnWidths.stage} text-gray-700 text-xs`}>
          <div className='flex justify-between'>
            <div className='flex items-center gap-1'>
              <div className='bg-[#36BFFA] w-1.5 h-1.5 rounded-full' />
              {applicant.activeApplication.stage.name}
            </div>
            <ChevronDown className='ml-1 inline-block w-4 h-4' />
          </div>
        </TableCell>
      )}
      {columnVisibility.rating && (
        <TableCell className={columnWidths.rating}>
          <StarRating rating={applicant.rating || 3} />
        </TableCell>
      )}
      {columnVisibility.appliedJob && (
        <TableCell
          className={`${columnWidths.appliedJob} text-gray-700 text-xs`}
        >
          <Badge className='text-[#6927DA] bg-[#F5F3FF] border border-[#6927DA]'>
            {applicant.activeApplication.jobListing.name}
          </Badge>
        </TableCell>
      )}
      {columnVisibility.resume && (
        <TableCell
          className={`${columnWidths.resume} 'text-gray-700 text-xs' text-center`}
        >
          {applicant.activeApplication.resume ? (
            <div className='flex justify-center'>
              <FileText className='h-5 w-5 text-red-500' />
            </div>
          ) : (
            <div className='flex justify-center'>-</div>
          )}
        </TableCell>
      )}
      <TableCell className={columnWidths.actions}>
        <Button variant='ghost' size='icon' className='h-8 w-8'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ApplicantTableCell;
