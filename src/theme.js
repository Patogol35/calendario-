// src/theme.js
import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#2563eb' },
          secondary: { main: '#dc2626' },
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569',
          },
          divider: '#e2e8f0',
        }
      : {
          primary: { main: '#60a5fa' },
          secondary: { main: '#f87171' },
          background: {
            default: '#020814',
            paper: '#0f172a',
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#94a3b8',
          },
          divider: '#1e293b',
        }),
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 800,
      fontSize: '3rem',
      letterSpacing: '-0.03em',
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '2.25rem',
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '1.02rem',
      lineHeight: 1.7,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          overflow: 'hidden',
          border: `1px solid ${mode === 'light' ? '#e2e8f0' : '#1e293b'}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 20px',
        },
        outlined: {
          borderWidth: '1.5px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
          },
        },
      },
    },
  },
});

export const theme = (mode) => createTheme(getDesignTokens(mode));
