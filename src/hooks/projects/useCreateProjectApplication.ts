import { createProjectApplication, getProjectFormDetail } from "@/api/projects/projects.api";
import { getUserProfile } from "@/api/profile/profile.api";
import { useSelect, useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { ApplicationFormResponse, CreateApplicationRequest, PositionDetail } from "@/types/type.projects";
import { APPLICATION_FORM_TYPE } from "@/types/const.projectCreate";

export default function useCreateProjectApplication(projectGuid: string) {
  const navigate = useNavigate();
  const { alert } = useModal();

  const { res: profileRes } = useSelect({
    apiFn: getUserProfile,
    req: undefined,
  });

  const { res: formDetailRes, loading: formLoading } = useSelect({
    apiFn: getProjectFormDetail,
    req: projectGuid,
    enabled: !!projectGuid,
  });

  const applicantUsername = profileRes?.data?.user?.username ?? '';
  const applicantEmail = profileRes?.data?.user?.email ?? '';
  const applicantMannerDegree = profileRes?.data?.user?.mannerDegree ?? 36.5;
  const applicantIntroduction = profileRes?.data?.user?.introduction ?? '';
  const applicantSkillList: string[] = profileRes?.data?.skillList ?? [];

  const projectTitle = formDetailRes?.data?.title ?? '';
  const registrantUsername = formDetailRes?.data?.username ?? '';
  const registrantEmail = formDetailRes?.data?.email ?? '';
  const registeredDate = formDetailRes?.data?.registeredDate
    ? formDetailRes.data.registeredDate.slice(0, 10).replace(/-/g, '.')
    : '';
  const positions: PositionDetail[] = formDetailRes?.data?.positionList ?? [];
  const formFields: ApplicationFormResponse[] = formDetailRes?.data?.applicationFormList ?? [];

  const [requirementGuid, setRequirementGuid] = useState('');
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [checkboxAnswers, setCheckboxAnswers] = useState<Record<string, string[]>>({});

  const handleTextAnswer = (applicationFormGuid: string, value: string) => {
    setTextAnswers(prev => ({ ...prev, [applicationFormGuid]: value }));
  };

  const handleCheckboxToggle = (applicationFormGuid: string) => (value: string) => {
    setCheckboxAnswers(prev => {
      const current = prev[applicationFormGuid] ?? [];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [applicationFormGuid]: next };
    });
  };

  const { mutate, loading: submitLoading } = useMutation<CreateApplicationRequest, void>(
    createProjectApplication,
    () => {
      alert('지원이 완료되었습니다.');
      navigate(-1);
    },
    () => {
      alert('지원에 실패했습니다. 다시 시도해주세요.');
    },
  );

  const onSubmit = async () => {
    if (!requirementGuid) {
      alert('지원 포지션을 선택해주세요.');
      return;
    }

    const answers = formFields.map(field => ({
      projectApplicationFormGuid: field.projectApplicationFormGuid,
      applicationFormGuid: field.applicationFormGuid,
      content: field.typeCd === APPLICATION_FORM_TYPE.CHECKBOX
        ? (checkboxAnswers[field.applicationFormGuid] ?? []).join(', ')
        : textAnswers[field.applicationFormGuid] ?? '',
    }));

    await mutate({ projectGuid, requirementGuid, answers });
  };

  return {
    projectTitle,
    registrantUsername,
    registrantEmail,
    registeredDate,
    applicantUsername,
    applicantEmail,
    applicantMannerDegree,
    applicantIntroduction,
    applicantSkillList,
    positions,
    formFields,
    requirementGuid,
    setRequirementGuid,
    textAnswers,
    checkboxAnswers,
    handleTextAnswer,
    handleCheckboxToggle,
    onSubmit,
    loading: submitLoading || formLoading,
  };
}
