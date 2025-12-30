// src/components/SearchBar.jsx
import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);

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
      setOpen(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Autocomplete
        freeSolo
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        inputValue={inputValue}
        onInputChange={(e, newInput) => setInputValue(newInput)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Ej: El nombre del viento, Dan Brown, 9780307474278..."
            variant="standard"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: (
                <IconButton type="submit" edge="end" sx={{ mr: -1 }}>
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </IconButton>
              ),
            }}
            sx={{
              '& input': {
                py: 1.5,
                px: 2,
                fontSize: '1.05rem',
              },
            }}
          />
        )}
        sx={{ width: '100%' }}
      />
    </Box>
  );
}
