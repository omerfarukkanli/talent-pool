import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const columnWidths = {
  checkbox: 'w-[40px]',
  name: 'w-[200px] border-r',
  email: 'w-[156px]  border-r overflow-hidden',
  stage: 'w-[180px]  border-r',
  rating: 'w-[128px]  border-r',
  appliedJob: 'w-[200px]  border-r',
  resume: 'w-[94px]  border-r',
  actions: 'w-[52px] ',
};
