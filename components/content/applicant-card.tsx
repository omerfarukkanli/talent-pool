import { Applicant } from '@/lib/types';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { FileText, MoreVertical } from 'lucide-react';
import { Badge } from '../ui/badge';
import StarRating from '@/components/raing-star';

interface ApplicantCardProps {
  applicant: Applicant;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

const ApplicantCard = ({
  applicant,
  isSelected,
  onSelect,
}: ApplicantCardProps) => {
  return (
    <Card className='mb-3'>
      <CardContent className='p-4'>
        <div className='flex items-start'>
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            className='mt-1 mr-3'
          />
          <div className='flex-1'>
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center'>
                <div>
                  <div className='font-medium'>{`${applicant.firstName} ${applicant.lastName}`}</div>
                  <div className='text-sm text-muted-foreground'>
                    {applicant.email}
                  </div>
                </div>
              </div>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <MoreVertical className='h-4 w-4' />
              </Button>
            </div>

            <div className='grid grid-cols-2 gap-2 mt-3'>
              <div>
                <div className='text-xs text-muted-foreground mb-1'>Stage</div>
                <Badge>{applicant.activeApplication.stage.name}</Badge>
              </div>
              <div>
                <div className='text-xs text-muted-foreground mb-1'>Rating</div>
                <StarRating rating={applicant.rating || 3} />
              </div>
              <div>
                <div className='text-xs text-muted-foreground mb-1'>
                  Applied Job
                </div>
                <Badge>{applicant.activeApplication.jobListing.name}</Badge>
              </div>
              <div>
                <div className='text-xs text-muted-foreground mb-1'>Resume</div>
                {applicant.activeApplication.resume ? (
                  <FileText className='h-5 w-5 text-red-500' />
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicantCard;
