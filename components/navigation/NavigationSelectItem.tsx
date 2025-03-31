import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const NavigationSelectItem = () => {
  const selectItemData = [
    {
      value: 'hrpanda',
      label: 'Hrpanda',
    },
    {
      value: 'hrpanda.v1',
      label: 'Hrpanda.v.1.0',
    },
  ];

  return (
    <Select defaultValue={selectItemData[0].value}>
      <SelectTrigger className='!w-full !h-[52px] !py-0'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {selectItemData.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className='h-8 w-8 bg-[#9600D7] rounded-md' />
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default NavigationSelectItem;
