// src/components/BookCard.jsx
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function BookCard({ book }) {
  const { volumeInfo } = book;
  const title = volumeInfo.title || 'Sin título';
  const authors = volumeInfo.authors?.join(', ') || 'Autor desconocido';
  const description = volumeInfo.description
    ? volumeInfo.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
    : 'Sin descripción disponible.';
  const image = volumeInfo.imageLinks?.thumbnail
    ? volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
    : '/no-cover.png';
  const infoLink = volumeInfo.infoLink;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/128x192?text=No+Cover')}
        sx={{
          height: 240,
          objectFit: 'cover',
          bgcolor: '#f0f2f5',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
          {title.length > 60 ? title.substring(0, 60) + '…' : title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {authors}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {infoLink && (
          <Button
            variant="outlined"
            size="small"
            href={infoLink}
            target="_blank"
            rel="noopener"
            endIcon={<OpenInNewIcon />}
          >
            Ver en Google Books
          </Button>
        )}
      </CardContent>
    </Card>
  );
      }
