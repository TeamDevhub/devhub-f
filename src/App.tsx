import router from '@/router/Router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
