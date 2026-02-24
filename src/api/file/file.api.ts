import fetcher from "@/utils/util.api";

export const deleteFile = async (req: string) => 
    await fetcher<void, string>(
        `/projects/${req}`,
        undefined,
        { method: "delete" }
);
 