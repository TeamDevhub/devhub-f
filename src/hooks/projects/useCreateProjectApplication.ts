import { createProjectApplication } from "@/api/projects/projects.api";
import useFormState from "@/hooks/_common/useFormState";
import { useMutation } from "@/hooks/_common/api.hook";
import type { CreateApplicationRequest } from "@/types/type.projects";

export interface ProjectApplyForm {
  requirementGuid: string;
  name: string;
  age: string;
  motivation: string;
  career: string;
  attachment: string;
  days: string[];
}

const initData: ProjectApplyForm = {
  requirementGuid: '',
  name: '',
  age: '',
  motivation: '',
  career: '',
  attachment: '',
  days: [],
};

export default function useCreateProjectApplication(
  onSuccess?: () => void,
  onFail?: () => void,
) {
  const { state, handleChange, createToggle } = useFormState(initData);

  const { mutate, loading, error } = useMutation<CreateApplicationRequest, void>(
    createProjectApplication,
    () => onSuccess?.(),
    () => onFail?.(),
  );

  const onSubmit = async (projectGuid: string, answers: CreateApplicationRequest['answers']) => {
    await mutate({
      projectGuid,
      requirementGuid: state.requirementGuid,
      answers,
    });
  };

  return {
    values: state,
    onHandleEvent: handleChange,
    createToggle,
    onSubmit,
    loading,
    error,
  };
}
