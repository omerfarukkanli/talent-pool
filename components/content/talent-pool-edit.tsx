'use client';
import React from 'react';
import { Input } from '../ui/input';
import { LayoutGrid, MoreHorizontal, Search, SortAscIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { ColumnVisibilityDropdown } from '../column.visibility.dropdown';

const TalentPoolEdit = () => {
  return (
    <div className='pt-6 flex justify-end gap-4 px-8'>
      <div className='relative flex-1 max-w-md'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input placeholder='Search' className='pl-8' />
      </div>
      <Button variant='outline'>
        <SortAscIcon className='h-4 w-4' /> Sort
      </Button>
      <ColumnVisibilityDropdown />
      <Button variant='outline' size='icon'>
        <LayoutGrid className='h-4 w-4' />
      </Button>

      <Button variant='link' size='icon'>
        <MoreHorizontal className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default TalentPoolEdit;
