import type { ReportCreate } from "@/types/type.reports";
import fetcher from "@/utils/util.api";

export const createReport = (req : ReportCreate) =>
    fetcher<void, ReportCreate>(
        `/reports`,
        req,
        { method : "post"}
    );

