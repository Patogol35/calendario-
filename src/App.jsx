// src/App.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
  Divider,
  Link,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CloseIcon from '@mui/icons-material/Close';
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
  const [selectedBook, setSelectedBook] = useState(null);
  const resultsRef = useRef(null);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setHasSearched(true);
    setSelectedBook(null);
    try {
      const res = await axios.get(`${API_BASE}?q=${encodeURIComponent(query)}&maxResults=24`);
      setBooks(res.data.items || []);
    } catch (err) {
      setError('No pudimos conectar con Google Books. Inténtalo más tarde.');
      setBooks([]);
    } finally {
      setLoading(false);
      if (resultsRef.current) {
        resultsRef.current.focus(); // Enfocar resultados para lectores de pantalla
      }
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
    if (resultsRef.current) {
      resultsRef.current.focus();
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', position: 'relative', pb: 6 }}>
        {/* Skip link para accesibilidad (opcional avanzado) */}
        

        {/* Botón de modo */}
        <IconButton
          onClick={toggleColorMode}
          sx={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 1200,
            width: 48,
            height: 48,
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 3,
            '&:hover': {
              bgcolor: 'background.paper',
              boxShadow: 6,
            },
          }}
          aria-label={mode === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Container sx={{ pt: 8 }}>
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                background: mode === 'light'
                  ? 'linear-gradient(120deg, #1d4ed8, #0ea5e9)'
                  : 'linear-gradient(120deg, #7dd3fc, #bae6fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                mb: 1.5,
              }}
              aria-label="BookFinder: buscador de libros"
            >
              BookFinder
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', px: 2, fontWeight: 400 }}
            >
              Autor: Jorge Patricio Santamaría Cherrez
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
  <SearchBar onSearch={handleSearch} />
</Box>

          {/* Zona de resultados con enfoque accesible */}
          <Box
            ref={resultsRef}
            tabIndex={-1}
            id="main-content"
            sx={{ outline: 'none' }}
            aria-live="polite"
            aria-atomic="true"
          >
            {error && (
              <Alert severity="error" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                {error}
              </Alert>
            )}

            {selectedBook && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{ maxWidth: 900, mx: 'auto', mb: 8 }}
                role="dialog"
                aria-modal="true"
                aria-label={`Detalles del libro: ${selectedBook.volumeInfo.title}`}
              >
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: '24px',
                    bgcolor: 'background.paper',
                    position: 'relative',
                  }}
                >
                  <IconButton
                    onClick={handleCloseDetail}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: 'background.default',
                      '&:hover': { bgcolor: 'divider' },
                    }}
                    aria-label="Cerrar detalles del libro"
                  >
                    <CloseIcon />
                  </IconButton>

                  <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                      <Box
                        component="img"
                        src={
                          selectedBook.volumeInfo.imageLinks?.thumbnail
                            ? selectedBook.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
                            : 'https://placehold.co/400x600/e2e8f0/64748b?text=Portada+no+disponible'
                        }
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x600/e2e8f0/64748b?text=Portada+no+disponible')}
                        alt={`Portada del libro: ${selectedBook.volumeInfo.title || 'desconocido'}`}
                        sx={{
                          width: '100%',
                          borderRadius: '16px',
                          boxShadow: 3,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h4" fontWeight={700} gutterBottom>
                        {selectedBook.volumeInfo.title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        {selectedBook.volumeInfo.authors?.join(', ') || 'Autor desconocido'}
                      </Typography>

                      <Box mt={2} mb={3}>
                        <Typography variant="body1" paragraph>
                          {selectedBook.volumeInfo.description
                            ? selectedBook.volumeInfo.description.replace(/<[^>]*>/g, '')
                            : 'Sin descripción disponible.'}
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={1}>
                        {selectedBook.volumeInfo.publishedDate && (
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Fecha de publicación:</strong> {selectedBook.volumeInfo.publishedDate}
                            </Typography>
                          </Grid>
                        )}
                        {selectedBook.volumeInfo.pageCount && (
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Páginas:</strong> {selectedBook.volumeInfo.pageCount}
                            </Typography>
                          </Grid>
                        )}
                        {selectedBook.volumeInfo.categories?.[0] && (
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Categoría:</strong> {selectedBook.volumeInfo.categories.join(', ')}
                            </Typography>
                          </Grid>
                        )}
                        {selectedBook.volumeInfo.industryIdentifiers?.length > 0 && (
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              <strong>ISBN:</strong>{' '}
                              {selectedBook.volumeInfo.industryIdentifiers
                                .map(id => `${id.type}: ${id.identifier}`)
                                .join(', ')}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>

                      {selectedBook.volumeInfo.previewLink && (
                        <Box mt={3}>
                          <Link
                            href={selectedBook.volumeInfo.previewLink}
                            target="_blank"
                            rel="noopener"
                            underline="hover"
                            sx={{ fontWeight: 600, color: 'primary.main' }}
                            aria-label={`Vista previa del libro ${selectedBook.volumeInfo.title} en Google Books (se abre en nueva pestaña)`}
                          >
                            👁️ Ver vista previa (Google Books)
                          </Link>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            )}

            {!selectedBook && (
              <>
                {loading ? (
                  <Box display="flex" justifyContent="center" my={10} aria-live="polite">
                    <CircularProgress size={48} aria-label="Cargando resultados de búsqueda..." />
                  </Box>
                ) : (
                  <AnimatePresence>
                    {books.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="region"
                        aria-label="Lista de libros encontrados"
                      >
                        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
                          {books.map((book) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                              <BookCard
                                book={book}
                                mode={mode}
                                onClick={() => handleSelectBook(book)}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {!loading && !error && books.length === 0 && hasSearched && (
                  <Box textAlign="center" mt={8} aria-live="polite">
                    <Typography variant="h6" color="text.secondary">
                      No encontramos libros con esa búsqueda 😕
                    </Typography>
                  </Box>
                )}

                {!hasSearched && (
                  <Box textAlign="center" mt={8} aria-live="polite">
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
                      Busca por título, autor o ISBN para comenzar.
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
                        }
