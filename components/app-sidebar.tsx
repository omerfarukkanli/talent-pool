'use client';
import React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bookmark,
  Home,
  LifeBuoyIcon,
  Mail,
  Settings,
  Users2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';
import { useRouter } from 'next/navigation';

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

const routeItems = [
  {
    icon: <Home className='w-6 h-6 text-gray-700' />,
    label: 'Overview',
    path: '#',
  },
  {
    icon: <Bookmark className='w-6 h-6 text-gray-700' />,
    label: 'Jobs',
    path: '#',
  },
  {
    icon: <Users2 className='w-6 h-6 text-gray-700' />,
    label: 'Talent Pool',
    path: '#',
  },
  {
    icon: <Mail className='w-6 h-6 text-gray-700' />,
    label: 'Inbox',
    path: '#',
  },
];

export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar className='!border-0'>
      <div className='flex flex-col justify-between h-3/4'>
        <div>
          <SidebarHeader className='px-6 pt-8'>
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
          </SidebarHeader>
          <SidebarMenu className='px-4 pt-4 gap-1'>
            {routeItems.map((item) => (
              <SidebarMenuButton
                key={item.label}
                onClick={() => router.push(item.path)}
                className='flex gap-2 px-3 py-2 text-base cursor-pointer'
              >
                {item.icon}
                {item.label}
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </div>
        <div>
          <SidebarMenu className='px-4 pt-4 gap-1'>
            <div>
              <SidebarMenuButton className='flex gap-2 px-3 py-2 text-base cursor-pointer'>
                <LifeBuoyIcon className='w-6 h-6 text-gray-700' />
                Support
              </SidebarMenuButton>
              <SidebarMenuButton className='flex gap-2 px-3 py-2 text-base cursor-pointer mb-6'>
                <Settings className='w-6 h-6 text-gray-700' />
                Settings
              </SidebarMenuButton>
              <div className='flex border-t pt-6 gap-3'>
                <Avatar>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                    className=''
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <Label className='font-[600] text-sm'>Olivia Rhye</Label>
                  <Label className='font-normal text-sm'>
                    oliviarhye@hrpanda.co
                  </Label>
                </div>
                <div className='relative'>
                  <span className='font-bold text-lg absolute -top-3'>...</span>
                </div>
              </div>
            </div>
          </SidebarMenu>
        </div>
      </div>
    </Sidebar>
  );
}
