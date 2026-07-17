import { updateProjectLike } from '@/api/web/api.projects';
import { useMutation } from '@/hooks/_common/api.hook';
import { useRequireAuth } from '@/hooks/_common/useRequireAuth';

export default function useUpdateProjectLike() {
  const { mutate, loading } = useMutation(updateProjectLike);
  const { requireAuth } = useRequireAuth();

  const toggleLike = async (
    projectId: string,
    liked: boolean,
  ) => {
    await requireAuth(() => mutate({
      projectId,
      liked: !liked,
    }));
  };

  return {
    toggleLike,
    loading,
  };
}
