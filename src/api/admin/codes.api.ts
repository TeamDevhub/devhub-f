import fetcher from "@/utils/util.api.ts";
import type { RequestCommonCodeItem } from "@/types/type._common.ts";

export const saveCode = (req : RequestCommonCodeItem) =>
    fetcher<void, RequestCommonCodeItem>(
        `/admin/code`,
        req,
        { method : "put"}
    );