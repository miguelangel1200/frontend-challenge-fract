import React from "react";
import { Box, Grid } from "@mui/material";
import CardCountry from "../Card";

function Home() {
    return (
        <>
            <Box height={100} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <CardCountry />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CardCountry />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CardCountry />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CardCountry />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CardCountry />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CardCountry />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CardCountry />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CardCountry />
                </Grid>
            </Grid>
        </>
    )
}

export default Home;
