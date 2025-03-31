'use client';
import React, { useEffect, useState } from 'react';
import { AirVent } from 'lucide-react';
import { CommandDialog, CommandInput } from '@/components/ui/command';
import { Button } from './ui/button';

const AIButton = () => {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Button
        variant='outline'
        className='md:hidden'
        onClick={() => setOpen(true)}
      >
        <AirVent className='h-4 w-4 mr-2' /> Ask AI
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search all channels and members' />
      </CommandDialog>
    </>
  );
};

export default AIButton;
