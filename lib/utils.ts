import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const columnWidths = {
  checkbox: 'w-4 bg-white',
  name: 'w-30 border-r',
  email: 'w-30 border-r overflow-hidden bg-white',
  stage: 'w-10  border-r bg-white',
  rating: 'w-10  border-r bg-white',
  appliedJob: 'w-10  border-r bg-white',
  resume: 'w-4  border-r bg-white',
  aiFitScore: 'w-10  border-r bg-white',
  source: 'w-10  border-r bg-white',
  dateAdded: 'w-10  border-r bg-white',
  actions: 'w-4 ',
};
