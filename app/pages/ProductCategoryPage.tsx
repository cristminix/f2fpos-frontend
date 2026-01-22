import React, { useEffect, useState, useRef } from "react"
import { Box, Typography, Container, IconButton, useTheme, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import ProductCategoryGrid, { type ProductCategoryGridRef } from "./product-category/ProductCategoryGrid"
import { AddProductCategoryDialog } from "./product-category/AddProductCategoryDialog"

const ProductCategoryPage: React.FC = () => {
  const theme = useTheme()
  const gridRef = useRef<ProductCategoryGridRef>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddCategory = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleAddSuccess = () => {
    // Setelah berhasil menambah kategori, tutup dialog dan refresh data
    setIsDialogOpen(false)
    // Refresh data di grid
    if (gridRef.current) {
      gridRef.current.loadGridData()
    }
  }

  return (
    <Box className="p-4">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Master Kategori
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddCategory} startIcon={<AddIcon />}>
          Tambah Kategori
        </Button>
      </Box>

      <ProductCategoryGrid ref={gridRef} />

      <AddProductCategoryDialog open={isDialogOpen} onClose={handleCloseDialog} onAddSuccess={handleAddSuccess} />
    </Box>
  )
}

export { ProductCategoryPage }
