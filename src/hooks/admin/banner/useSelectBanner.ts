import useFormState from "@/hooks/_common/useFormState.ts";
import type {BannerSearchRequest} from "@/types/type.banner.ts";
import useSelect from "@/hooks/_common/api.hook.ts";
import {selectBanner} from "@/api/admin/api.banner.ts";
import {useState} from "react";

const initData = {
    publicationStartDate: null,
    publicationEndDate: null,
    alwaysPublication: '',
    used: '',
    keyword: '',
    bannerType: 'MAIN',
    page: 0,
    size: 10
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

    const [mainSearchParams, setMainSearchParams] = useState<BannerSearchRequest>({...initData, bannerType: "MAIN"});
    const [subSearchParams, setSubSearchParams] = useState<BannerSearchRequest>({...initData, bannerType: "SUB"});

    const mainOptions = {
        apiFn: selectBanner,
        req : mainSearchParams,
    }
    const {res: mainBannerRes, refetch: mainRefetch} = useSelect(mainOptions);

    const subOptions = {
        apiFn: selectBanner,
        req : subSearchParams,
    }
    const {res: subBannerRes, refetch: subRefetch} = useSelect(subOptions);

    const mainSearch = () => {
        setMainSearchParams(mainBannerState);
    }

    const subSearch = () => {
        setSubSearchParams(subBannerState);
    }

    // MUI Pagination은 1부터 시작하지만 백엔드는 0부터 시작하므로 여기서 변환한다.
    const setMainPage = (page: number) => {
        setMainSearchParams((prev) => ({ ...prev, page: page - 1 }));
    }

    const setSubPage = (page: number) => {
        setSubSearchParams((prev) => ({ ...prev, page: page - 1 }));
    }

    return {
        mainBannerState,
        mainBannerChange,
        mainBannerRes,
        mainSearch,
        setMainPage,
        subBannerState,
        subBannerChange,
        subBannerRes,
        subSearch,
        setSubPage,
        mainRefetch,
        subRefetch
    }
}