import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1230,
      xl: 1536,
    },
  },

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

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        },
        notchedOutline: {
          borderColor: '#E5E7EB',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease, color 0.15s ease',
        },
      },
    },
  },
});

export default theme;
