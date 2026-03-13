import fetcher from "@/utils/util.api.ts";
import type {Banner, BannerSearchRequest} from "@/types/type.banner.ts";

export const selectBanner = (req : BannerSearchRequest) =>
    fetcher<Banner, BannerSearchRequest>(
        `/admin/banner`,
        req,
        { method : "post"}
    );

export const saveBanner = (req : Banner) =>
    fetcher<void, Banner>(
        req.bannerGuid ? `/admin/banner/${req.bannerGuid}` : `/admin/banner`,
        req,
        { method : "put"}
    );

export const deleteBanner = (guid : string) =>
    fetcher<void, string>(
        `/admin/banner/${guid}`,
        guid,
        { method : "delete"}
    );
