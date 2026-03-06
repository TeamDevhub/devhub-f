import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getUserProfile } from '@/api/profile/profile.api';

import type { UserBasicResponse } from '@/types/type.user';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserBasicResponse | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));

  useEffect(() => {
    if (!isLoggedIn) return;

    getUserProfile()
      .then((res) => {
        setUser(res.data?.user);
      })
      .catch(() => {
        setUser(undefined);
        setIsLoggedIn(false);
        sessionStorage.removeItem('accessToken');
      });
  }, [isLoggedIn]);

  const login = async (token?: string) => {
    if (!token) return;

    sessionStorage.setItem('accessToken', token);
    setIsLoggedIn(true);

    const res = await getUserProfile();
    setUser(res.data?.user);
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setUser(undefined);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const AuthProvider = ({ children } : { children: ReactNode }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));

//     const login = (token?: string) => {
//         if(!token) return;
//         setSessionStorage('accessToken', token);
//         setIsLoggedIn(true);
//     };

//     const logout = () => {
//         sessionStorage.removeItem('accessToken');
//         setIsLoggedIn(false);
//     };

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
