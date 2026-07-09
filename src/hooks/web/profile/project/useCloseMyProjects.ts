import { closeProject } from "@/api/web/api.projects";
import { useMutation } from "@/hooks/_common/api.hook";

export default function useCloseMyProjects(
) {
    const { mutate: projectCloseMutate } = useMutation<string, void>(closeProject);

    return { projectCloseMutate };

}