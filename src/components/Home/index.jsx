import React, { useState, useEffect } from "react";
import { Box, Grid, Paper} from "@mui/material";
import CardCountry from "../Card";
import CardDetail from "../CardDetail";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import Searching from "../Searching";

const query = gql`
  query {
    countries {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
      currency
      subdivisions {
        name
      }
    }
  }
`;

const FIND_COUNTRY = gql`
  query ListFilteredCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
      currency
      subdivisions {
        name
      }
    }
  }
`;

const FIND_COUNTRY_CONTINENT = gql`
  query ListFilteredCountriesContinent($filter: ContinentFilterInput) {
    countries(filter: { continent: { name: $filter } }) {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
      currency
      subdivisions {
        name
      }
    }
  }
`;

function Home() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [searchCountries, { data: searchData, loading: searchLoading, error: searchError }] = useLazyQuery(
    FIND_COUNTRY
  );
  const [selectedContinent, setSelectedContinent] = useState(null);

  const continents = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"];

  const openDrawer = (country) => {
    setSelectedCountry(country);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSelectedCountry(null);
    setDrawerOpen(false);
  };

  const { data, error, loading } = useQuery(query);
  const fetchedCountries = data ? data.countries : [];

  if (error) {
    return <span style={{ color: "red" }}>{error}</span>;
  }

  const handleSearch = (query1) => {
    searchCountries({ variables: { filter: { name: query1 } } });
  };

  const handleSelectContinent = (continent) => {
    setSelectedContinent(continent);
    if (continent) {
      searchCountries({ variables: { filter: { continent: continent } } });
    } else {
      setSearchedCountries([]);
    }
  };

  const displayedCountries =
    selectedContinent === null ? fetchedCountries : searchedCountries;

  useEffect(() => {
    if (searchData && selectedContinent) {
      setSearchedCountries(searchData.countries);
    }
  }, [searchData, selectedContinent]);

  return (
    <>
      <Box height={100} />
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <Searching onSearch={handleSearch} continents={continents} />
      </Paper>
      <Box height={50} />
      <Grid container spacing={4}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          displayedCountries.map((country, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <CardCountry country={country} openDrawer={openDrawer} />
            </Grid>
          ))
        )}
      </Grid>
      <CardDetail
        country={selectedCountry}
        isOpen={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}

export default Home;
