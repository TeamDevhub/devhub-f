import commonCodeJson from "@/assets/jsonData/commonCode.json";
import Header from '@/components/_common/layout/Header';
import {setCommonCodes} from '@/utils/util._common';
import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {LoadingProvider} from "@/contexts/LoadingProvider";
import {CommonCodeProvider} from "@/contexts/CommonCodeProvider.tsx";
import {LoadingBridge} from "@/contexts/LoadingContext.ts";

export default function MainLayout() {

    useEffect(() => {
        setCommonCodes(commonCodeJson);
    }, []);

    return (
        <LoadingProvider>
            <LoadingBridge/>
            <CommonCodeProvider>
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