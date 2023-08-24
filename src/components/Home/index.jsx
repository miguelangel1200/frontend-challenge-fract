import React from "react";
import { Box, Grid } from "@mui/material";
import CardCountry from "../Card";

import { gql, useQuery } from '@apollo/client'

const query = gql`
  query {
    countries {
      name
      capital
      continent{
        name
      }
      languages {
        name
      }
      currency
      subdivisions{
        name
      }
    }
  }
`

const Home = ({ countries }) => {
    const { data, error, loading } = useQuery(query);
    const fetchedCountries = data ? data.countries : [];
  

    if (error) {
        return <span style='color: red'>{error}</span>
    }

    return (
      <>
        <Box height={100} />
        <Grid container spacing={4}>
            { loading 
                ? <p>Loading...</p>
                : fetchedCountries.map((country, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                      <CardCountry country={country} />
                    </Grid>
                ))
            }
        </Grid>
      </>
    );
  }
  
  export default Home;