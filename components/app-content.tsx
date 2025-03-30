'use client';
import React from 'react';
import { SidebarInset } from './ui/sidebar';
import TalentPoolHeader from '@/components/talent-pool-header';
import TalentPoolEdit from './content/talent-pool-edit';
import TalentPoolTable from './content/talent-pool-table';

const AppContent = () => {
  return (
    <SidebarInset className='flex flex-col'>
      <TalentPoolHeader />
      <TalentPoolEdit />
      <div className='pt-6 md:mx-8'>
        <TalentPoolTable />
      </div>
    </SidebarInset>
  );
};

export default AppContent;
