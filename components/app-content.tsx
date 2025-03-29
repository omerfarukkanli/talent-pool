import React from 'react';
import { SidebarInset } from './ui/sidebar';
import TalentPoolHeader from '@/components/talent-pool-header';
import TalentPoolEdit from './content/talent-pool-edit';

const AppContent = () => {
  return (
    <SidebarInset className='flex flex-col'>
      <TalentPoolHeader />
      <TalentPoolEdit />
    </SidebarInset>
  );
};

export default AppContent;
