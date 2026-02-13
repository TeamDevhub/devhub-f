import type {ApplicationFormRequest, ApplicationFormBasic} from "@/types/type.projects";
import { useSelect } from "../_common/api.hook";
import { getApplicationForms } from "@/api/projects/projects.api"

export default function useSelectApplicationForms(params: ApplicationFormRequest) {
    const options = {
        apiFn: getApplicationForms,
        req: params,
        cacheKey: `projects-${JSON.stringify(params)}`,
    }

    const { res, loading } = useSelect<ApplicationFormBasic, ApplicationFormRequest>(options);
    return { res, loading };
}