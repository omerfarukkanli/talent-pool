'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/hooks/use-app';
import MobileToggle from '@/components/MobileToggle';

const TalentPoolHeader = () => {
  const { total } = useAppSelector((state) => state.talentPool);

  return (
    <header className='md:pt-8 md:mx-8 pt-4 px-4 border-b h- pb-4'>
      <div className='flex w-full justify-between md:flex-row flex-col'>
        <MobileToggle />
        <div className='flex  flex-col items-center md:items-start'>
          <div className='flex gap-1'>
            <h1 className='font-semibold text-3xl'>Talent Pool</h1>
            <Badge className='bg-gray-100 text-gray-700 text-base font-normal'>
              {total}
            </Badge>
          </div>
          <Label className='text-gray-500 text-base font-normal py-1'>
            Keep track of the applicants
          </Label>
        </div>
        <Button>
          <Plus className='w-8 h-8' />
          <Label className='text-sm font-[600]'>Add Talent</Label>
        </Button>
      </div>
    </header>
  );
};

export default TalentPoolHeader;
