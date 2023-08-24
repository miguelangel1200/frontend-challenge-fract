import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardDetail from '../CardDetail';

import axios from 'axios';

export default function CardCountry({ country, openDrawer }) {
  const clientUnsplashId = "pezn-T124OfIv4WkotAHhn_R-5GyEcqLza8UjkQcqz8"
  const endpoint = "https://api.unsplash.com/search/photos"
  // const endpointFlags = `https://flagcdn.com/w80/${country.code}.png`

  // console.log("errorFlag" + endpointFlags)

  const [imageURL, setImageURL] = useState('');
  // const [flagImageURL, setFlagImageURL] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(endpoint, {
          params: {
            client_id: clientUnsplashId,
            query: country.name, // Use the country name to search for images
          },
        });

        const firstImage = response.data.results[0];
        if (firstImage) {
          setImageURL(firstImage.urls.regular); // Set the image URL in state
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }

      /*try {
        const flagResponse = await axios.get(endpointFlags);
        setFlagImageURL(flagResponse.config.url);
      } catch (error) {
        console.error('Error fetching flag image:', error);
      }*/
    };

    fetchImage(); // Call the fetchImage function
  }, [country.name, country.code]);
  
  
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea onClick={() => openDrawer(country)}>
        <CardMedia
          component="img"
          height="140"
          image={imageURL || './icons/netflix-logo.png'}
          alt="green iguana"
        />
        <CardContent>
          {/* <div>
            <img src={flagImageURL} alt={`Flag of ${country.name}`} />
          </div> */}
          <Typography gutterBottom variant="h5" component="div">
            {country.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {country.continent.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}