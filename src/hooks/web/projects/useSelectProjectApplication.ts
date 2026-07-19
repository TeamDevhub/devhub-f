import type { ProjectApplicationResponse } from "@/types/type.projects";
import { useSelect } from "@/hooks/_common/api.hook";
import { getProjectApplication } from "@/api/web/api.projects";

export default function useSelectProjectApplication(
  applicationGuid?: string,
  enabled: boolean = true
) {
  const options = {
    apiFn: getProjectApplication,
    req: applicationGuid!,
    enabled: !!applicationGuid && enabled,
  };

  const { res, loading, error } = useSelect<ProjectApplicationResponse, string>(options);

  return { res, loading, error };
}
