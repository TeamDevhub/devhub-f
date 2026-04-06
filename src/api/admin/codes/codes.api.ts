import fetcher from "@/utils/util.api.ts";
import type { CommonCodeItem } from "@/types/type._common.ts";

export const saveCode = (req : CommonCodeItem) =>
    fetcher<void, CommonCodeItem>(
        `/admin/code`,
        req,
        { method : "put"}
    );