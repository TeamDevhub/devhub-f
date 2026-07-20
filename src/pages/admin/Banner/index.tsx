import {Tab, Tabs} from '@mui/material'
import {useState} from 'react'
import BannerTabPanel from "@/components/admin/banner/BannerTabPanel.tsx";
import useSelectBanner from "@/hooks/admin/banner/useSelectBanner.ts";
import BannerPopup from "@/components/admin/banner/BannerPopup.tsx";
import useDisclosure from "@/hooks/_common/useDisclosure.ts";
import type {Banner} from "@/types/type.banner.ts";

export default function BannerManagementPage(){
    const { isOpen, close, open } = useDisclosure();
    const [tab, setTab] = useState(0);
    const [banner, setBanner] = useState<Banner | null>(null);

    const {
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
        subRefetch,
    } = useSelectBanner();

    const handleOpen = (data: Banner | null) => {
        setBanner(data);
        open();
    }

    const handleClose = (isUpdate? :boolean) => {
        if(isUpdate){
            if(tab == 0) mainRefetch().then();
            else subRefetch().then();
        }
        close();
    }

    return (
        <div className="content-box w-100 flex-col gap-32">
            {/* 2-1. 타이틀 */}
            <strong className="title">배너 관리</strong>
            {/* 2-2. 탭 영역 */}
            <Tabs
                value={tab}
                variant='standard'
                onChange={(_, tab) => setTab(tab) }
                textColor="primary"
                indicatorColor="primary"
                aria-label="banner-tabs"
            >
                <Tab label="메인 배너" />
                <Tab label="서브 배너" />
            </Tabs>
            {/* 메인 배녀 */}
            <BannerTabPanel key='main' data={mainBannerRes} tab={tab} index={0} state={mainBannerState} onChange={mainBannerChange} onOptionChange={handleOpen} onCreate={()=>{handleOpen(null)}} onSearch={mainSearch} onPageChange={setMainPage}/>
            {/* 서브 배너 */}
            <BannerTabPanel key='sub' data={subBannerRes} tab={tab} index={1} state={subBannerState} onChange={subBannerChange} onOptionChange={handleOpen} onCreate={()=>{handleOpen({bannerType:"SUB"})}} onSearch={subSearch} onPageChange={setSubPage}/>
            <BannerPopup key={isOpen ? 'open' : 'close'} isOpen={isOpen} onClose={handleClose} data={banner}/>
        </div>
    )
}
