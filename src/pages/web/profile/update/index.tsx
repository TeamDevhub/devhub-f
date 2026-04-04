import useSelectUserProfile from '@/hooks/profile/useSelectProfile';
import MyProfileUpdate from '@/components/profile/update/MyProfileUpdate';

export default function MyProfileUpdateWrapper() {
  const { res, loading, error } = useSelectUserProfile();

  if (loading) return null;
  if (error || !res?.data) return null;

  return <MyProfileUpdate profile={res.data} />;
}
