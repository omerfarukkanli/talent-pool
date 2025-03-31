import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NavigationSidebar from '@/components/navigation/NavigationSidebar';

const MobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0 gap-0 m-0 w-72'>
        <div className='h-full w-72 flex-col fixed inset-y-0'>
          <NavigationSidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileToggle;
