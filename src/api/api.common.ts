import fetcher from "@/utils/util.api.ts";
import type {CommonCodeRequest, CommonCodeResponse} from "@/types/type.api.ts";

export const getCommonCode = (req: CommonCodeRequest) =>
    fetcher<CommonCodeResponse, CommonCodeRequest>(
        "/common/code",
        req,
        { method: "get" }
    );