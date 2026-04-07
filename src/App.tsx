import router from '@/router/Router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthProvider.tsx';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
