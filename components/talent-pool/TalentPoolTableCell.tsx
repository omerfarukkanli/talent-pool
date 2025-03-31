import React from 'react';
import { format } from 'date-fns';
import { ChevronDown, MoreVertical } from 'lucide-react';

import { Applicant } from '@/lib/types';
import { columnWidths } from '@/lib/utils';
import { useAppSelector } from '@/hooks/use-app';

import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import StarRating from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PDFPreview } from '@/components/PdfPreview';
import UserAvatar from '@/components/UserAvatar';

interface TalentPoolTableCellProps {
  id: string;
  applicant: Applicant;
  selectedApplicants: string[];
  handleSelectApplicant: (id: string, checked: boolean) => void;
}

const TalentPoolTableCell = ({
  id,
  applicant,
  selectedApplicants,
  handleSelectApplicant,
}: TalentPoolTableCellProps) => {
  const { columnVisibility } = useAppSelector((state) => state.ui);

  const formattedSourceDate = format(applicant.createdAt, 'dd MMMM yyyy');
  const formattedDateAdded = format(applicant.createdAt, 'dd MMM yyyy');

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
            <UserAvatar
              alt={applicant.firstName + ' ' + applicant.lastName}
              cn={`${applicant.firstName[0]} ${applicant.lastName[0]}`}
              src={applicant.profilePhotoUrl}
            />

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
      {columnVisibility.aiFitScore && (
        <TableCell className={columnWidths.aiFitScore}>
          {!applicant.activeApplication.aiFit ? (
            <div className='text-center'>-</div>
          ) : (
            <div className='flex items-center justify-center gap-1'>
              <Progress
                value={applicant.activeApplication.aiFit}
                className='[&>div]:bg-green-500 bg-gray-200'
              />
              {'%' + applicant.activeApplication.aiFit}
            </div>
          )}
        </TableCell>
      )}
      {columnVisibility.source && (
        <TableCell className={`${columnWidths.source}  text-gray-700 text-xs`}>
          <div className='flex items-center flex-col'>
            <div> {applicant.sourceType.toLowerCase()}</div>
            <div>{formattedSourceDate}</div>
          </div>
        </TableCell>
      )}
      {columnVisibility.rating && (
        <TableCell className={columnWidths.rating}>
          <StarRating rating={applicant.rating} />
        </TableCell>
      )}
      {columnVisibility.dateAdded && (
        <TableCell
          className={`${columnWidths.dateAdded}  text-gray-700 text-xs`}
        >
          <div className='text-center'>{formattedDateAdded}</div>
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
            <PDFPreview pdfUrl={applicant.activeApplication.resume.url} />
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

export default TalentPoolTableCell;
