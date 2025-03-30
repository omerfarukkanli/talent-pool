import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const columnWidths = {
  checkbox: 'w-[40px]',
  name: 'w-[200px]',
  email: 'w-[200px]',
  stage: 'w-[150px]',
  rating: 'w-[150px]',
  appliedJob: 'w-[200px]',
  resume: 'w-[100px]',
  actions: 'w-[40px]',
};
