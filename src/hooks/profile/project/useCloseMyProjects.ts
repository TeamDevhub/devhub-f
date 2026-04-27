import { closeProject } from "@/api/web/projects.api";
import useFormState from '@/hooks/_common/useFormState.ts';
import type { FilterData, ProjectExtra, ProjectSearchRequest, SearchData } from "@/types/type.projects";
import { useSelect, useMutation } from "@/hooks/_common/api.hook";

export default function useCloseMyProjects(
) {
    const { mutate: projectCloseMutate } = useMutation<string, void>(closeProject);

    return { projectCloseMutate };

}