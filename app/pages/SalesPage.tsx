import React from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import SearchProduct from "./sales/SearchProduct"
import ProductTabView from "./sales/ProductTabView"

const SalesPage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mt={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }} className="grid-item p-4">
          <SearchProduct />
          <ProductTabView />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} className="grid-item p-4">
          Hello
        </Grid>
      </Grid>
    </Box>
  )
}

export default SalesPage
