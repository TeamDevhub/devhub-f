import { updateProjectLike } from '@/api/projects/projects.api';
import { useMutation } from '@/hooks/_common/api.hook';

export default function useUpdateProjectLike() {
  const { mutate, loading } = useMutation(updateProjectLike);

  const toggleLike = async (
    projectId: string,
    liked: boolean,
  ) => {
    return await mutate({
      projectId,
      liked: !liked,
    });
  };

  return {
    toggleLike,
    loading,
  };
}
