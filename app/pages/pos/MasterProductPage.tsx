import React from "react"
import { Box, Button, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import ProductGridTable from "./master-product/ProductGridTable"

const MasterProductPage: React.FC = () => {
  return (
    <Box p={6}>
      <Typography variant="h4" component="h1" gutterBottom>
        Master Produk
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => console.log("Add Product clicked")}
        >
          Tambah Produk
        </Button>
      </Box>
      <ProductGridTable />
    </Box>
  )
}

export default MasterProductPage
