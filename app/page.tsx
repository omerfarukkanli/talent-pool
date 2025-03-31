import TalentPoolEdit from '@/components/content/talent-pool-edit';
import TalentPoolTable from '@/components/content/talent-pool-table';
import TalentPoolHeader from '@/components/talent-pool-header';

export default function Home() {
  return (
    <div>
      <div className='flex-shrink-0'>
        <TalentPoolHeader />
        <TalentPoolEdit />
      </div>
      <div className='flex-1 pt-6 md:px-8 px-4 overflow-hidden'>
        <TalentPoolTable />
      </div>
    </div>
  );
}
