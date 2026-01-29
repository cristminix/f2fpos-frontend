import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"
import ProductManagementGridTable from "./product-management/ProductManagementGridTable"
import ProductForm from "./product-management/ProductForm"
import { ProductService } from "~/services/ProductService"
import ConfirmationDialog from "~/components/common/ConfirmationDialog"
import ProductViewDialog from "./product-management/ProductViewDialog"
import type { Product } from "~/types/product"

const ProductManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)
  const [viewLoading, setViewLoading] = useState(false)
  const [refreshGrid, setRefreshGrid] = useState(0)
  const service = new ProductService()

  const handleOpenForm = (product: Product | null = null) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingProduct(null)
    setIsFormOpen(false)
  }

  const handleSubmitForm = async (values: any, { setErrors }: any) => {
    const { id, ...data } = values
    const serviceAction = id ? service.update(id, data) : service.create(data)

    const response = await serviceAction

    if (response.success) {
      handleCloseForm()
      setRefreshGrid((prev) => prev + 1)
    } else {
      setErrors({ submit: response.message })
    }
  }

  const handleOpenConfirm = (product: Product) => {
    setProductToDelete(product)
    setIsConfirmOpen(true)
  }

  const handleCloseConfirm = () => {
    setProductToDelete(null)
    setIsConfirmOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await service.delete(productToDelete.id)
      handleCloseConfirm()
      setRefreshGrid((prev) => prev + 1)
    }
  }

  const handleOpenView = async (product: Product) => {
    setIsViewOpen(true)
    setViewLoading(true)
    const response = await service.getById(product.id)
    if (response && response.success && response.data) {
      setViewingProduct(response.data)
    }
    setViewLoading(false)
  }

  const handleCloseView = () => {
    setIsViewOpen(false)
    setViewingProduct(null)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Product Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
        >
          Tambah Produk
        </Button>
      </Box>
      <ProductManagementGridTable
        key={refreshGrid}
        onEditClick={handleOpenForm}
        onDeleteClick={handleOpenConfirm}
        onViewClick={handleOpenView}
      />
      <ProductForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        initialData={editingProduct}
      />
      <ConfirmationDialog
        open={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus produk "${
          productToDelete?.name || ""
        }"?`}
      />
      <ProductViewDialog
        open={isViewOpen}
        onClose={handleCloseView}
        product={viewingProduct}
        loading={viewLoading}
      />
    </Box>
  )
}

export default ProductManagementPage
