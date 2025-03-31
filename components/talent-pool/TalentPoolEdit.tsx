'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import {
  AirVent,
  AlignStartHorizontalIcon,
  ArrowUpDown,
  MoreHorizontal,
  Search,
} from 'lucide-react';
import { Button } from '../ui/button';
import { ColumnVisibilityDropdown } from '../ColumnVisibiliyDropdown';
import { useAppDispatch } from '@/hooks/use-app';
import { setSearchQuery } from '@/lib/store/slices/talent-pool-slice';
import { useDebounce } from '@/hooks/use-debounce';

const TalentPoolEdit = () => {
  const dispatch = useAppDispatch();
  const [localSearch, setLocalSearch] = useState('');
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <div className='pt-6 px-8 flex justify-end gap-4 items-center'>
      <div className='relative flex-grow max-w-[200px] transition-all duration-300 focus-within:max-w-[300px]'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search'
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className='pl-8 w-full transition-all duration-300'
        />
      </div>

      <Button variant='outline'>
        <ArrowUpDown className='h-4 w-4 mr-2' /> Sort
      </Button>
      <ColumnVisibilityDropdown />
      <Button variant='outline' className='hidden md:flex'>
        <AlignStartHorizontalIcon className='h-4 w-4 mr-2' /> Sheet View
      </Button>
      <Button variant='outline' className='md:hidden'>
        <AirVent className='h-4 w-4 mr-2' /> Ask AI
      </Button>
      <Button variant='link' size='icon'>
        <MoreHorizontal className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default TalentPoolEdit;
