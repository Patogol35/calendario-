// src/components/SearchBar.jsx
import { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

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
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 1.5, width: '100%', alignItems: 'center' }}
      role="search"
      aria-label="Buscar libros por título, autor o ISBN"
    >
      <TextField
        inputRef={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ej: El nombre del viento, Dan Brown..."
        variant="standard"
        InputProps={{
          disableUnderline: true,
          sx: {
            py: 1.5,
            px: 2,
            fontSize: '1.05rem',
            bgcolor: 'transparent',
            width: '100%',
          },
        }}
        aria-label="Término de búsqueda para libros"
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        startIcon={<SearchIcon />}
        disabled={!inputValue.trim()}
        sx={{
          fontWeight: 600,
          borderRadius: '12px',
          whiteSpace: 'nowrap',
          px: 2.5,
        }}
        aria-label={`Buscar libros con el término: ${inputValue || 'vacío'}`}
      >
        Buscar
      </Button>
    </Box>
  );
}
