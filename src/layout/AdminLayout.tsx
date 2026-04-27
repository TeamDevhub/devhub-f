import {Outlet} from 'react-router-dom';
import {LoadingProvider} from "@/contexts/LoadingProvider";
import {CommonCodeProvider} from "@/contexts/CommonCodeProvider.tsx";
import {LoadingBridge} from "@/contexts/LoadingContext.ts";
import {AuthProvider} from "@/contexts/AuthProvider.tsx";
import {ModalProvider} from "@/contexts/ModalProvider.tsx";
import LeftMenuBar from "@/components/_design/LeftMenuBar.tsx";

export default function AdminLayout() {

    return (
        <LoadingProvider>
            <LoadingBridge/>
            <CommonCodeProvider>
                <AuthProvider>
                    <ModalProvider>
                        <div id='devHubAdmin' className='wh-100'>
                          {/* 어드민 헤더 현재 미정 -> 임시 헤더 적용 */}
                            {/* <Header></Header> */}
                            <div className='align-center' style={{ position: 'fixed', zIndex: 100, width: '100%', height: '6.4rem', padding: '0 2.4rem', backgroundColor: 'var(--primary-main)' }}>
                                <h1 style={{ color: '#fff' }}>DevHub</h1>
                            </div>
                            <main>
                                <div className='admin-page flex'>
                                    <LeftMenuBar selectedKey='banner' />
                                    <Outlet></Outlet>
                                </div>
                            </main>
                        </div>
                    </ModalProvider>
                </AuthProvider>
            </CommonCodeProvider>
        </LoadingProvider>
    )
}