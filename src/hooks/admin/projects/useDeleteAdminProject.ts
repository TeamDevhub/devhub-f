import { deleteAdminProject } from '@/api/admin/api.project';
import { useMutation } from '@/hooks/_common/api.hook';
import { useModal } from '@/hooks/_common/useModal';

export default function useDeleteAdminProject(onDeleted?: () => void) {
  const { alert, confirm } = useModal();

  const onSuccess = () => {
    alert('프로젝트가 삭제되었습니다.');
    onDeleted?.();
  };

  const onFail = () => {
    alert('프로젝트 삭제에 실패했습니다.');
  };

  const { mutate, loading } = useMutation(deleteAdminProject, onSuccess, onFail, {
    invalidateKeys: ['admin-projects-list'],
  });

  const handleDelete = async (projectGuids: string[]) => {
    if (projectGuids.length === 0) {
      alert('삭제할 프로젝트를 선택해주세요.');
      return;
    }
    if (!(await confirm(`선택한 ${projectGuids.length}개의 프로젝트를 삭제하시겠습니까?`))) return;
    for (const guid of projectGuids) {
      await mutate(guid);
    }
  };

  return { handleDelete, loading };
}
