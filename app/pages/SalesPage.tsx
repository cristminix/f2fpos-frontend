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
import ProductBasket from "./sales/ProductBasket"

interface ProductItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

const SalesPage: React.FC = () => {
  const sampleBasketItems: ProductItem[] = [
    {
      id: "1",
      name: "Kopi Arabica",
      price: 25000,
      quantity: 2,
      category: "Beverages",
    },
    {
      id: "2",
      name: "Roti Tawar",
      price: 15000,
      quantity: 1,
      category: "Food",
    },
    {
      id: "3",
      name: "Susu Segar",
      price: 10000,
      quantity: 3,
      category: "Beverages",
    },
  ]
  return (
    <Box sx={{ flexGrow: 1 }} mt={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }} className="grid-item p-4">
          <SearchProduct />
          <ProductTabView />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} className="grid-item p-4">
          <ProductBasket items={sampleBasketItems} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SalesPage
