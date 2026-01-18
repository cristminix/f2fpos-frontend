import React from "react"
import { Grid, Box } from "@mui/material"

export const ResponsiveGrid = () => {
  return (
    <Grid container spacing={2} component="div">
      <Grid item xs={12} sm={6} md={4} component="div">
        <Box p={2} bgcolor="primary.main" color="white">
          Box 1
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} component="div">
        <Box p={2} bgcolor="secondary.main" color="white">
          Box 2
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4} component="div">
        <Box p={2} bgcolor="error.main" color="white">
          Box 3
        </Box>
      </Grid>
    </Grid>
  )
}
