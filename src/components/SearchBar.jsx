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
          label: `${item.volumeInfo.title || 'Sin título'}${item.volumeInfo.authors ? ' - ' + item.volumeInfo.authors[0] : ''}`,
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: '100%', maxWidth: 700, mx: 'auto', mb: 6 }}
    >
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
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  <IconButton type="submit" edge="end">
                    <SearchIcon />
                  </IconButton>
                </>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                pr: 0,
                borderRadius: '16px',
              },
            }}
          />
        )}
        sx={{ width: '100%' }}
      />
    </Box>
  );
}
