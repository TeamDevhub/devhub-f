import router from '@/router/Router';
import { authStore } from '@/stores/auth.store';
import { codesStore } from '@/stores/codes.store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

function App() {
  useEffect(() => {
    authStore.init();
    codesStore.init();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
