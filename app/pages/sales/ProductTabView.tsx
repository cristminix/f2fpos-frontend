import React, { useState } from "react"
import { Box, Tab, Tabs, Paper, IconButton, Grid } from "@mui/material"
import GridViewIcon from "@mui/icons-material/GridView"
import { ProductItem } from "./ProductItem"

interface ProductCategory {
  id: string
  name: string
}

interface Product {
  name: string
  price: string
  badge: string
  image?: string
}

interface ProductTabViewProps {
  productCategories?: ProductCategory[]
}

const ProductTabView: React.FC<ProductTabViewProps> = ({
  productCategories = [],
}) => {
  const [value, setValue] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleViewModeToggle = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid")
  }

  const handleProductClick = (product: Product) => {
    console.log("Product clicked:", product)
    // Di sini nanti bisa ditambahkan logika untuk menambahkan produk ke keranjang
  }

  const productLists = [
    {
      name: "Americano",
      price: "Rp 25.000",
      badge: "2777",
      image: "",
    },
    {
      name: "Caffe Latte",
      price: "Rp 32.000",
      badge: "500",
      image: "",
    },
    {
      name: "Kopi Susu Gula Aren",
      price: "Rp 28.000",
      badge: "333",
      image: "",
    },
    {
      name: "Caramel Macchiato",
      price: "Rp 38.000",
      badge: "250",
      image: "",
    },
  ]
  // Default categories if none provided
  const categories =
    productCategories.length > 0
      ? productCategories
      : [
          { id: "all", name: "Semua" },

          { id: "cofee", name: "Coffe" },
          { id: "non_coffe", name: "Non Coffe" },
        ]

  return (
    <Paper sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          pt: 2,
        }}
      >
        <IconButton onClick={handleViewModeToggle} sx={{ mr: 2 }}>
          <GridViewIcon />
        </IconButton>
        <Tabs value={value} onChange={handleChange} aria-label="product tabs">
          {categories.map((category) => (
            <Tab key={category.id} label={category.name} value={category.id} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {productLists.map((product, index) => (
            <Box>
              <ProductItem
                name={product.name}
                price={product.price}
                badge={product.badge}
                image={product.image}
                onClick={() => handleProductClick(product)}
              />
            </Box>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}

export default ProductTabView
