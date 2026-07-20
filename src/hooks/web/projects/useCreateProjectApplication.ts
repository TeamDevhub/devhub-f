import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APPLICATION_FORM_TYPE, type ApplicationFormType } from "@/constants/projectCreate";
import type {
  CreateApplicationAnswerRequest,
  CreateApplicationRequest,
} from "@/types/type.projects";
import { useMutation } from "@/hooks/_common/api.hook";
import { createProjectApplication } from "@/api/web/api.projects";
import useSelectProjectFormDetail from "@/hooks/web/projects/useSelectProjectFormDetail";
import useSelectUserProfile from "@/hooks/web/profile/user/useSelectProfile";
import { useModal } from "@/hooks/_common/useModal";
import { useRequireAuth } from "@/hooks/_common/useRequireAuth";

type ApplyPosition = {
  requirementGuid: string;
  positionCd: string;
  level: string;
};

type ApplyFormField = {
  applicationFormGuid: string;
  projectApplicationFormGuid?: string;
  title: string;
  typeCd: ApplicationFormType;
  helpText?: string;
  itemList?: string[];
};

// 백엔드 응답에 존재하지만 프론트 타입에는 정확히 반영되지 않은 필드까지 안전하게 읽기 위한 원본 형태
type RawPosition = {
  requirementGuid?: string;
  position?: string;
  positionCd?: string;
  level?: string;
};

type RawForm = {
  projectApplicationFormGuid?: string;
  applicationFormGuid?: string;
  typeCd?: string;
  title?: string;
  helpText?: string;
  itemList?: string[];
};

export default function useCreateProjectApplication(projectGuid: string) {
  const navigate = useNavigate();
  const { alert } = useModal();
  const { requireAuth } = useRequireAuth();

  const { res: formRes } = useSelectProjectFormDetail(projectGuid);
  const { res: profileRes } = useSelectUserProfile();

  const project = formRes?.data;
  const profile = profileRes?.data;

  const projectTitle = project?.title ?? "";
  const registrantUsername = project?.username ?? "";
  const registrantEmail = project?.email ?? "";
  const registeredDate = project?.registeredDate ?? "";

  const applicantUsername = profile?.user?.username ?? "";
  const applicantEmail = "";
  const applicantMannerDegree =
    profile?.user?.mannerDegree != null ? String(profile.user.mannerDegree) : "";
  const applicantIntroduction = profile?.user?.introduction ?? "";
  const applicantSkillList = profile?.skillList ?? [];

  const positions: ApplyPosition[] = useMemo(() => {
    const list = (project?.positionList ?? []) as unknown as RawPosition[];
    return list.map((p) => ({
      requirementGuid: p.requirementGuid ?? "",
      positionCd: p.positionCd ?? p.position ?? "",
      level: p.level ?? "",
    }));
  }, [project]);

  const formFields: ApplyFormField[] = useMemo(() => {
    const base = (project?.applicationFormList ?? []) as unknown as RawForm[];
    const additional = (project?.additionalFormList ?? []) as unknown as RawForm[];
    return [...base, ...additional].map((f) => ({
      applicationFormGuid: f.applicationFormGuid ?? "",
      projectApplicationFormGuid: f.projectApplicationFormGuid,
      title: f.title ?? "",
      typeCd: (f.typeCd ?? "") as ApplicationFormType,
      helpText: f.helpText,
      itemList: f.itemList,
    }));
  }, [project]);

  const [requirementGuid, setRequirementGuid] = useState("");
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [checkboxAnswers, setCheckboxAnswers] = useState<Record<string, string[]>>({});

  const handleTextAnswer = (applicationFormGuid: string, value: string) => {
    setTextAnswers((prev) => ({ ...prev, [applicationFormGuid]: value }));
  };

  const handleCheckboxToggle = (applicationFormGuid: string) => (item: string) => {
    setCheckboxAnswers((prev) => {
      const current = prev[applicationFormGuid] ?? [];
      const next = current.includes(item)
        ? current.filter((v) => v !== item)
        : [...current, item];
      return { ...prev, [applicationFormGuid]: next };
    });
  };

  const handleSuccess = () => {
    alert("지원이 완료되었습니다.");
    navigate(`/projects/detail/${projectGuid}`);
  };
  const handleFail = () => {
    alert("지원에 실패했습니다.");
  };

  const { mutate, loading } = useMutation<CreateApplicationRequest, void>(
    createProjectApplication,
    handleSuccess,
    handleFail
  );

  const onSubmit = async () => {
    const allowed = await requireAuth();
    if (!allowed) return;

    if (!requirementGuid) {
      alert("지원 포지션을 선택해 주세요.");
      return;
    }

    const answers: CreateApplicationAnswerRequest[] = formFields
      .map((field) => {
        const content =
          field.typeCd === APPLICATION_FORM_TYPE.CHECKBOX
            ? (checkboxAnswers[field.applicationFormGuid] ?? []).join(", ")
            : (textAnswers[field.applicationFormGuid] ?? "").trim();
        return {
          projectApplicationFormGuid: field.projectApplicationFormGuid ?? "",
          applicationFormGuid: field.applicationFormGuid,
          content,
        };
      })
      .filter((a) => a.content !== "");

    if (answers.length === 0) {
      alert("입력 정보를 작성해 주세요.");
      return;
    }

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
    loading,
  };
}
