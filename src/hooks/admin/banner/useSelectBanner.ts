import useFormState from "@/hooks/_common/useFormState.ts";
import type {BannerSearchRequest} from "@/types/type.banner.ts";
import useSelect from "@/hooks/_common/api.hook.ts";
import {selectBanner} from "@/api/admin/banner/banner.api.ts";
import {useState} from "react";

const initData = {
    publicationStartDate: null,
    publicationEndDate: null,
    alwaysPublication: '',
    used: '',
    keyword: '',
    bannerType: 'MAIN',
} as BannerSearchRequest;
export default function useSelectBanner () {

    const {
        state: mainBannerState
        , handleChange: mainBannerChange
    } = useFormState<BannerSearchRequest>({...initData, bannerType: "MAIN"});

    const {
        state: subBannerState
        , handleChange: subBannerChange
    } = useFormState<BannerSearchRequest>({...initData, bannerType: "SUB"});

    const [mainSearchParams, setMainSearchParams] = useState<BannerSearchRequest>(mainBannerState);
    const [subSearchParams, setSubSearchParams] = useState<BannerSearchRequest>(subBannerState);

    const mainOptions = {
        apiFn: selectBanner,
        req : mainSearchParams,
        cacheKey: `boards-${JSON.stringify(mainBannerState)}`
    }
    const {res: mainBannerRes} = useSelect(mainOptions);

    const subOptions = {
        apiFn: selectBanner,
        req : subSearchParams,
        cacheKey: `boards-${JSON.stringify(subBannerState)}`
    }
    const {res: subBannerRes} = useSelect(subOptions);

    const mainSearch = () => {
        setMainSearchParams(mainBannerState);
    }

    const subSearch = () => {
        setSubSearchParams(subBannerState);
    }

    return {
        mainBannerState,
        mainBannerChange,
        mainBannerRes,
        mainSearch,
        subBannerState,
        subBannerChange,
        subBannerRes,
        subSearch,
    }
}