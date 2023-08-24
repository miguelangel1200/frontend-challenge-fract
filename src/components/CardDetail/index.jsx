import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import { Height } from '@mui/icons-material';

export default function CardDetail({ isOpen, onClose, country }) {
  const clientUnsplashId = "pezn-T124OfIv4WkotAHhn_R-5GyEcqLza8UjkQcqz8"
  const endpoint = "https://api.unsplash.com/search/photos"

  const { code, name, continent, capital, languages, currency, subdivisions } = country || {};

  const renderLanguages = languages ? languages.map(lang => lang.name).join(', ') : '';
  const renderSubdivisions = subdivisions ? subdivisions.map(sub => sub.name).join(', ') : '';

  const [imageURL, setImageURL] = useState('');


  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(endpoint, {
          params: {
            client_id: clientUnsplashId,
            query: name, // Use the country name to search for images
          },
        });

        const firstImage = response.data.results[0];
        if (firstImage) {
          setImageURL(firstImage.urls.regular); // Set the image URL in state
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [name]);


  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 400 }}>
        <Box height={80} />
        <Typography variant="h4" sx={{ margin: '10px' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>Details of Country</span>
        </Typography>
        <CardMedia
          component="img"
          height="140"
          image={imageURL || './icons/netflix-logo.png'}
          alt={`Image of ${name}`}
        />
        <Typography variant="body1" sx={{ margin: '10px' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>Name:</span> {name}
        </Typography>
        <Typography variant="body1" sx={{ margin: '10px' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>Continent:</span> {continent?.name}
        </Typography>
        <Typography variant="body1" sx={{ margin: '10px' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>Capital:</span> {capital}
        </Typography>
        <Typography variant="body1" sx={{ margin: '10px' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>Lenguages:</span> {renderLanguages}
        </Typography>
        <Typography variant="body1" sx={{ margin: '10px' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>Currency:</span> {currency}
        </Typography>
        <Typography variant="body1" sx={{ margin: '10px' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>Subdivisions:</span> {renderSubdivisions || "Empty"}
        </Typography>
      </Box>
    </Drawer>
  );
}