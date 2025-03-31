'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOGGED_IN_USER } from '@/lib/graphql/queries';
import { LoggedInUser } from '@/lib/types';
import { Bookmark, Home, LifeBuoy, Mail, Settings, Users2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import NavigationItem from '@/components/navigation/NavigationItem';
import NavigationSelectItem from '@/components/navigation/NavigationSelectItem';
import UserAvatar from '@/components/UserAvatar';
import { Label } from '@/components/ui/label';

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

const NavigationSideBar = () => {
  const { data } = useQuery<LoggedInUser>(GET_LOGGED_IN_USER);
  const user = data?.loggedInUser;
  const router = useRouter();
  return (
    <div className='pt-8 bg-white px-6 h-4/5 flex justify-between flex-col'>
      <div>
        <NavigationSelectItem />

        <div className='flex-col gap-2 flex items-start w-full pt-6'>
          {routeItems.map((route, i) => (
            <NavigationItem
              key={i}
              icon={route.icon}
              name={route.label}
              onClik={() => router.push(route.path)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className='pb-6'>
          <NavigationItem
            icon={<LifeBuoy />}
            name='Support'
            onClik={() => router.push('#')}
          />
          <NavigationItem
            icon={<Settings />}
            name='Setting'
            onClik={() => router.push('#')}
          />
        </div>

        {user && (
          <div className='flex border-t pt-6 gap-3'>
            <UserAvatar
              cn={`${user?.firstName[0]}${user.lastName[0]}`}
              alt={user.firstName + ' ' + user.lastName}
              src={user.profilePictureUrl}
            />
            <div>
              <Label className='font-[600] text-sm'>
                {user.firstName + ' ' + user.lastName}
              </Label>
              <Label className='font-normal text-sm'>{user.email}</Label>
            </div>
            <div className='relative'>
              <span className='font-bold text-lg absolute -top-3'>...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationSideBar;
