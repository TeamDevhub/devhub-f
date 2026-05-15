import { useEffect } from 'react';
import dayjs from 'dayjs';
import { updateAdminProject } from '@/api/admin/api.project';
import { useMutation } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState';
import { useModal } from '@/hooks/_common/useModal';
import type { AdminProjectDetail, UpdateAdminProjectRequest } from '@/types/type.project';
import type { DateType } from '@/types/type.api';

type EditFormState = Omit<UpdateAdminProjectRequest, 'projectGuid'>;

const initData: EditFormState = {
  title: '',
  recruitmentTypeCd: '',
  progressTypeCd: '',
  progressRegionCd: '',
  recruitmentStartDate: null as DateType,
  recruitmentEndDate: null as DateType,
  progressStartDate: null as DateType,
  progressEndDate: null as DateType,
};

export default function useUpdateAdminProject(
  projectGuid: string | undefined,
  detail?: AdminProjectDetail,
  onUpdated?: () => void,
) {
  const { state, setState, handleChange } = useFormState<EditFormState>({ ...initData });
  const { alert, confirm } = useModal();

  useEffect(() => {
    if (!detail) return;
    setState({
      title: detail.title,
      recruitmentTypeCd: detail.recruitmentTypeCd,
      progressTypeCd: detail.progressTypeCd,
      progressRegionCd: detail.progressRegionCd,
      recruitmentStartDate: detail.recruitmentStartDate ? dayjs(detail.recruitmentStartDate) : null,
      recruitmentEndDate: detail.recruitmentEndDate ? dayjs(detail.recruitmentEndDate) : null,
      progressStartDate: detail.progressStartDate ? dayjs(detail.progressStartDate) : null,
      progressEndDate: detail.progressEndDate ? dayjs(detail.progressEndDate) : null,
    });
  // setState is stable (controller ref); only re-run when detail identity changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  const onSuccess = () => {
    alert('프로젝트 정보가 저장되었습니다.');
    onUpdated?.();
  };

  const onFail = () => {
    alert('프로젝트 정보 저장에 실패했습니다.');
  };

  const { mutate, loading } = useMutation(
    updateAdminProject,
    onSuccess,
    onFail,
    {
      invalidateKeys: projectGuid
        ? [`admin-project-detail-${projectGuid}`, 'admin-projects-list']
        : [],
    },
  );

  const onSave = async () => {
    if (!projectGuid) return;
    if (!(await confirm('프로젝트 정보를 저장하시겠습니까?'))) return;
    await mutate({ ...state, projectGuid });
  };

  return { state, onHandleEvent: handleChange, onSave, loading };
}
