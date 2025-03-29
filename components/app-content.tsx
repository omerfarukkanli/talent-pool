import React from 'react';
import { SidebarInset } from './ui/sidebar';
import TalentPoolHeader from '@/components/header/talent-pool-header';

const AppContent = () => {
  return (
    <SidebarInset className='flex flex-col'>
      <TalentPoolHeader />
    </SidebarInset>
  );
};

export default AppContent;
