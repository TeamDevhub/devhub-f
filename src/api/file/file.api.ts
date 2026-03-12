import fetcher from "@/utils/util.api";

export const deleteFile = async (req: string) => 
    await fetcher<void, string>(
        `/files/${req}`,
        undefined,
        { method: "delete" }
);
 