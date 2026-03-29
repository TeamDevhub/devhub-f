import { useModal } from '@/hooks/_common/useModal';
import { deleteProject } from "@/api/projects/projects.api";
import { useMutation } from "../_common/api.hook";

export default function useDeleteProject(
  projectId: string
) {
  const { alert, confirm, closeModal} = useModal();
  const onSuccess = () => {
    history.back();
  }

  const onFail = () => {
    alert("프로젝트 삭제에 실패했습니다.");
  }

  const { mutate } = useMutation<string, void>(deleteProject, onSuccess, onFail);
  const onDeleteProject = async () => {
    const isConfirmed = await confirm("프로젝트를 삭제하시겠습니까?");
    if(!isConfirmed) {
        closeModal?.();
        return; 
    }
    closeModal?.();
    await mutate(projectId);
  }

  return {
    onDeleteProject
  };
}