import Header from '@/components/_common/layout/Header';
import {Outlet} from 'react-router-dom';
import {LoadingProvider} from "@/contexts/LoadingProvider";
import {CommonCodeProvider} from "@/contexts/CommonCodeProvider.tsx";
import {LoadingBridge} from "@/contexts/LoadingContext.ts";
import {AuthProvider} from "@/contexts/AuthProvider.tsx";
import {ModalProvider} from "@/contexts/ModalProvider.tsx";

export default function AdminLayout() {

    return (
        <LoadingProvider>
            <LoadingBridge/>
            <CommonCodeProvider>
                <AuthProvider>
                    <ModalProvider>
                        <div id='devHub' className='wh-100'>
                          {/* 어드민 헤더 현재 미정 -> 추후 변경 필요 */}
                            <Header></Header>
                            <main>
                              <Outlet></Outlet>
                            </main>
                        </div>
                    </ModalProvider>
                </AuthProvider>
            </CommonCodeProvider>
        </LoadingProvider>
    )
}