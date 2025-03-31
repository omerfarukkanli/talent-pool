import TalentPoolEdit from '@/components/talent-pool/TalentPoolEdit';
import TalentPoolTable from '@/components/talent-pool/TalentPoolTable';
import TalentPoolHeader from '@/components/talent-pool/TalentPoolHeader';

export default function Home() {
  return (
    <div>
      <div>
        <TalentPoolHeader />
        <TalentPoolEdit />
      </div>
      <div className='flex-1 pt-6 md:px-8 px-4 overflow-hidden'>
        <TalentPoolTable />
      </div>
    </div>
  );
}
