import { useAuth } from '@/hooks/_common/useAuth';
import MyProfileUpdate from '@/components/web/profile/MyProfileUpdate';

export default function MyProfileUpdateWrapper() {
  const { profile, initialized } = useAuth();

  if (!initialized) return null;
  if (!profile) return null;

  return <MyProfileUpdate profile={profile} />;
}
