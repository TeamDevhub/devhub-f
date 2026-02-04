import commonCodeJson from "@/assets/jsonData/commonCode.json";
import Header from '@/components/_common/layout/Header';
import {injectLoadingHandler} from "@/utils/util.api";
import {setCommonCodes} from '@/utils/util._common';
import {useEffect} from 'react';
import {Outlet, useNavigation} from 'react-router-dom';
import {LoadingProvider} from "@/contexts/LoadingProvider";
import {CommonCodeProvider} from "@/contexts/CommonCodeProvider.tsx";
import {UseLoading} from "@/contexts/LoadingContext.ts";

export default function MainLayout() {

    useEffect(() => {
        setCommonCodes(commonCodeJson);
    }, []);

    return (
        <LoadingProvider>
            <CommonCodeProvider>
                <LoadingBridge/>
                <div id='devHub' className='wh-100'>
                    <Header></Header>
                    <main>
                        <Outlet></Outlet>
                    </main>
                </div>
            </CommonCodeProvider>
        </LoadingProvider>
    )
}

const LoadingBridge = () => {
    const {show, hide} = UseLoading();
    const navigation = useNavigation();
    useEffect(() => {
        if (navigation.state === 'loading') {
            show();
        } else {
            hide();
        }
    }, [navigation.state, show, hide]);

    useEffect(() => {
        injectLoadingHandler({show, hide});
    }, [show, hide]);

    return null;
};