import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function CardCountry({ country }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="./icons/netflix-logo.png"
          alt="green iguana"
        />
        <CardContent>
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