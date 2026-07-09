import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#1976D2',
      light: '#DBEAFE',
      dark: '#1E40AF',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#9C27B0',
      light: '#E2E8F0',
      dark: '#334155',
      contrastText: '#FFFFFF',
    },

    error: {
      main: '#D32F2F',
    },

    warning: {
      main: '#EF6C00',
    },

    info: {
      main: '#0284C7',
    },

    success: {
      main: '#16A34A',
    },

    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },

    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },

    divider: '#E5E7EB',
  },

  typography: {
    fontFamily:
      '"Pretendard", sans-serif',
  },
  
});

export default theme;
