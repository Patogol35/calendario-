// src/App.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import { theme as createTheme } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useColorMode } from './hooks/useColorMode';

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export default function App() {
  const { mode, toggleColorMode } = useColorMode();
  const muiTheme = createTheme(mode);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setHasSearched(true);
    try {
      const res = await axios.get(`${API_BASE}?q=${encodeURIComponent(query)}&maxResults=24`);
      setBooks(res.data.items || []);
    } catch (err) {
      setError('No pudimos conectar con Google Books. Inténtalo más tarde.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: { xs: 4, sm: 6, md: 8 } }}>
        <Container>
          <Box textAlign="center" mb={6} position="relative">
            <IconButton
              onClick={toggleColorMode}
              sx={{
                position: 'absolute',
                right: 0,
                top: { xs: -50, sm: -60 },
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'background.paper',
                  boxShadow: 4,
                },
              }}
            >
              {muiTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' },
                  background: mode === 'light'
                    ? 'linear-gradient(90deg, #1e40af, #0ea5e9)'
                    : 'linear-gradient(90deg, #60a5fa, #93c5fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  mb: 1,
                }}
              >
                BookFinder
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto', px: 2 }}
              >
                Descubre, explora y guarda tus libros favoritos desde +40 millones de títulos.
              </Typography>
            </motion.div>
          </Box>

          <SearchBar onSearch={handleSearch} />

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" my={10}>
              <CircularProgress size={48} />
            </Box>
          ) : (
            <AnimatePresence>
              {books.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    {books.map((book) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                        <BookCard book={book} mode={mode} />
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {!loading && !error && books.length === 0 && hasSearched && (
            <Box textAlign="center" mt={8}>
              <Typography variant="h6" color="text.secondary">
                No encontramos libros con esa búsqueda 😕
              </Typography>
            </Box>
          )}

          {!hasSearched && (
            <Box textAlign="center" mt={8}>
              <Typography variant="body1" color="text.secondary">
                Escribe en la barra de búsqueda para comenzar.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
