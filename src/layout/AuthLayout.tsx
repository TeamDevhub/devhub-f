import {LoadingBridge} from "@/contexts/LoadingContext";
import {Outlet} from 'react-router-dom';
import {CommonCodeProvider} from "@/contexts/CommonCodeProvider.tsx";
import {LoadingProvider} from "@/contexts/LoadingProvider.tsx";
import {AuthProvider} from "@/contexts/AuthProvider.tsx";

export default function AuthLayout() {

  return (
    <LoadingProvider>
        <LoadingBridge/>
        <AuthProvider>
            <CommonCodeProvider>
              <div id='devHub' className='wh-100'>
                <main>
                  <Outlet></Outlet>
                </main>
              </div>
            </CommonCodeProvider>
        </AuthProvider>
    </LoadingProvider>
  )
}