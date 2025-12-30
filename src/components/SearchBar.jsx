// src/components/SearchBar.jsx
import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);

  // Autocompletado: se mantiene
  useEffect(() => {
    if (inputValue.length < 2) {
      setOptions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`${API_BASE}?q=${encodeURIComponent(inputValue)}&maxResults=6`);
        const suggestions = (res.data.items || []).map((item) => ({
          label: `${item.volumeInfo.title || 'Sin título'}${item.volumeInfo.authors ? ' – ' + item.volumeInfo.authors[0] : ''}`,
          value: item.volumeInfo.title || inputValue,
        }));
        setOptions(suggestions);
      } catch (err) {
        setOptions([]);
      }
    };

    const handler = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Permitir búsqueda incluso si está vacío (aunque no hará nada)
    // Pero el botón siempre está habilitado visualmente
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="search"
      aria-label="Buscar libros por título, autor o ISBN"
    >
      <Autocomplete
        freeSolo
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        inputValue={inputValue}
        onInputChange={(e, newInput) => setInputValue(newInput)}
        sx={{ width: '100%', maxWidth: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Ej: El nombre del viento, Dan Brown, 9780307474278..."
            variant="outlined"
            size="medium"
            InputProps={{
              ...params.InputProps,
              sx: {
                borderRadius: '16px',
                fontSize: '1.05rem',
                pr: 1.5,
              },
            }}
            aria-label="Término de búsqueda para libros"
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        startIcon={<SearchIcon />}
        // 🔑 ¡SIEMPRE habilitado visualmente!
        // (aunque internamente no busque si está vacío)
        sx={{
          fontWeight: 600,
          borderRadius: '16px',
          whiteSpace: 'nowrap',
          px: 3,
          height: '56px',
          bgcolor: '#2563eb', // Azul fijo
          color: '#ffffff',
          '&:hover': {
            bgcolor: '#1d4ed8',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
          },
          '&:active': {
            bgcolor: '#1e40af',
          },
          // 🔸 Siempre visible, incluso si está vacío
          opacity: 1,
          pointerEvents: 'auto',
        }}
        aria-label={`Buscar libros con el término: ${inputValue || 'actual'}`}
      >
        Buscar
      </Button>
    </Box>
  );
}
