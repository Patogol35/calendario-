// src/theme.js
import { createTheme, useMediaQuery } from '@mui/material';
import { grey, blue, red } from '@mui/material/colors';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: blue[700] },
          secondary: { main: red[400] },
          background: { default: '#f9fbfd', paper: '#ffffff' },
          text: { primary: '#111827', secondary: '#4b5563' },
        }
      : {
          primary: { main: blue[400] },
          secondary: { main: red[300] },
          background: { default: '#0f172a', paper: '#1e293b' },
          text: { primary: '#f1f5f9', secondary: '#94a3b8' },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Roboto Serif", serif', fontWeight: 700, fontSize: '2.8rem' },
    h2: { fontFamily: '"Roboto Serif", serif', fontWeight: 600, fontSize: '2.2rem' },
    body1: { fontSize: '1.02rem', lineHeight: 1.7 },
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
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export const theme = (mode) => createTheme(getDesignTokens(mode));
