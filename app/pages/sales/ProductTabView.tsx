import React, { useState } from "react"
import { Box, Tab, Tabs, Paper, IconButton } from "@mui/material"
import GridViewIcon from "@mui/icons-material/GridView"

interface ProductCategory {
  id: string
  name: string
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

  // Default categories if none provided
  const categories =
    productCategories.length > 0
      ? productCategories
      : [
          { id: "popular", name: "Produk Terlaris" },
          { id: "new", name: "Produk Baru" },
          { id: "all", name: "Semua Produk" },
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
        {categories.map(
          (category) =>
            value === category.id && (
              <div key={category.id}>{category.name}</div>
            ),
        )}
      </Box>
    </Paper>
  )
}

export default ProductTabView
