import { Button } from '@/components/ui/button';

interface NavigationItemProps {
  icon: React.ReactNode;
  name: string;
  onClik: () => void;
}

const NavigationItem = ({ icon, name, onClik }: NavigationItemProps) => {
  return (
    <Button className='w-full justify-start' onClick={onClik} variant={'ghost'}>
      {icon} {name}
    </Button>
  );
};

export default NavigationItem;
