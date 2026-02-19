import Header from '@/components/_common/layout/Header';
import {Outlet} from 'react-router-dom';
import {LoadingProvider} from "@/contexts/LoadingProvider";
import {CommonCodeProvider} from "@/contexts/CommonCodeProvider.tsx";
import {LoadingBridge} from "@/contexts/LoadingContext.ts";
import {AuthProvider} from "@/contexts/AuthProvider.tsx";

export default function MainLayout() {

    return (
        <LoadingProvider>
            <LoadingBridge/>
            <AuthProvider>
                <CommonCodeProvider>
                    <div id='devHub' className='wh-100'>
                        <Header></Header>
                        <main>
                            <Outlet></Outlet>
                        </main>
                    </div>
                </CommonCodeProvider>
            </AuthProvider>
        </LoadingProvider>
    )
}