import { Columns } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

import { toggleColumnVisibility } from '@/lib/store/slices/ui-slice';
import type { ColumnVisibility } from '@/lib/types';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app';

export function ColumnVisibilityDropdown() {
  const dispatch = useAppDispatch();
  const { columnVisibility } = useAppSelector((state) => state.ui);

  const columnLabels: Record<keyof ColumnVisibility, string> = {
    name: 'Name',
    stage: 'Stage',
    aiFitScore: 'AI Fit Score',
    source: 'Source',
    rating: 'Rating',
    dateAdded: 'Date Added',
    appliedJob: 'Applied Job',
    resume: 'Resume',
  };

  const handleToggleColumn = (column: keyof ColumnVisibility) => {
    dispatch(toggleColumnVisibility(column));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='lg:flex items-center gap-2 hidden'>
          <Columns className='h-4 w-4' />
          <span>Columns</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        {(Object.keys(columnVisibility) as Array<keyof ColumnVisibility>).map(
          (column) => (
            <div
              key={column}
              className='flex items-center justify-between px-2 py-2'
            >
              <span className='text-sm'>{columnLabels[column]}</span>
              <Switch
                checked={columnVisibility[column]}
                disabled={column === 'name'}
                onCheckedChange={() => handleToggleColumn(column)}
              />
            </div>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
