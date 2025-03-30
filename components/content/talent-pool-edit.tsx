'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import {
  AirVent,
  LayoutGrid,
  MoreHorizontal,
  Search,
  SortAscIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import { ColumnVisibilityDropdown } from '../column.visibility.dropdown';
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
    <div className='pt-6 px-8'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-end gap-4'>
        <div className='relative w-full lg:w-auto lg:max-w-[280px] lg:flex-1'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search'
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className='pl-8 w-full'
          />
        </div>
        <div className='flex flex-wrap items-center gap-2 lg:gap-4 lg:flex-shrink-0'>
          <Button variant='outline' className='w-auto'>
            <SortAscIcon className='h-4 w-4 mr-2' /> Sort
          </Button>
          <ColumnVisibilityDropdown />
          <Button variant='outline' className='w-auto'>
            <LayoutGrid className='h-4 w-4 mr-2' /> Sheet View
          </Button>
          <Button variant='outline' className='w-auto md:hidden'>
            <AirVent className='h-4 w-4 mr-2' /> Ask AI
          </Button>
          <Button variant='link' size='icon' className='w-auto'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TalentPoolEdit;
