import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserAvatarProps {
  src: string;
  alt: string;
  cn: string;
}

const UserAvatar = ({ src, alt, cn }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage width={24} height={24} src={src} alt={alt} />
      <AvatarFallback className='border'>{cn}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
