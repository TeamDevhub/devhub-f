import useSelectUserProfile from '@/hooks/web/profile/user/useSelectProfile';
import MyProfileUpdate from '@/components/web/profile/MyProfileUpdate';

export default function MyProfileUpdateWrapper() {
  const { res, loading, error } = useSelectUserProfile();

  if (loading) return null;
  if (error || !res?.data) return null;

  return <MyProfileUpdate profile={res.data} />;
}
