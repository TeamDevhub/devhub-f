import fetcher from "@/utils/util.api";
import type {FileResponse} from "@/types/type.file.ts";

export const deleteFile = async (req: string) => 
    await fetcher<void, string>(
        `/files/${req}`,
        undefined,
        { method: "delete" }
);

export const selectFile = async (req: string) =>
    await fetcher<FileResponse, string>(
        `/files/${req}/meta`,
        req,
        {method: "get"}
);