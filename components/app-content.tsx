import React from 'react';
import { SidebarInset } from './ui/sidebar';

const AppContent = () => {
  return (
    <SidebarInset className='flex flex-col'>
      <TalentPoolHeader />
    </SidebarInset>
  );
};

export default AppContent;
