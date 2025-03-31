'use client';
import React, { useEffect, useState } from 'react';
import { AirVent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { removeFilter, setFilter } from '@/lib/store/slices/talent-pool-slice';
import { useAppDispatch } from '@/hooks/use-app';

const AIButton = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  const HandlePrompt = async () => {
    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      dispatch(setFilter(JSON.parse(data).filter));
    } catch (error) {
      console.error('Error fetching AI filter:', error);
    }
  };
  return (
    <>
      <Button
        variant='outline'
        className='md:hidden'
        onClick={() => setOpen(true)}
      >
        <AirVent className='h-4 w-4 mr-2' /> Ask AI
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Search With AI</DialogTitle>
          </DialogHeader>
          <div className='flex items-end justify-between gap-2'>
            <div className='w-full'>
              <Label className='text-xs'>Search AI</Label>
              <Input
                placeholder='ask anything'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <Button onClick={HandlePrompt}>Search</Button>
            <Button onClick={() => dispatch(removeFilter())}>Clear</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIButton;
