import { useMutation } from "@/hooks/_common/api.hook";
import { approveProjectApplication } from "@/api/web/api.projects";

type ApproveProjectApplicationReq = {
  projectGuid: string;
  applicationGuid: string;
  approved: boolean;
};

export default function useApproveProjectApplication(
  onSuccess?: () => void,
  onError?: () => void
) {
  const { mutate, loading, error } = useMutation<ApproveProjectApplicationReq, void>(
    approveProjectApplication,
    onSuccess ? () => onSuccess() : undefined,
    onError ? () => onError() : undefined
  );

  return { mutate, loading, error };
}
