import { useState } from "react"
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import { ProductCategoryForm } from "./product-category-management/ProductCategoryForm"
import { ProductCategoryGridTable } from "./product-category-management/ProductCategoryGridTable"
import { ProductCategoryService } from "~/services/ProductCategoryService"
import ConfirmationDialog from "~/components/common/ConfirmationDialog"
import type { ProductCategory } from "~/types/product-category"

const ProductCategoryManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] =
    useState<ProductCategory | null>(null)
  const [categoryToDelete, setCategoryToDelete] =
    useState<ProductCategory | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const [refreshGrid, setRefreshGrid] = useState(0)
  const service = new ProductCategoryService()

  const handleOpenForm = (category: ProductCategory | null = null) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingCategory(null)
    setIsFormOpen(false)
  }

  const handleSubmitForm = async (values: any, { setErrors }: any) => {
    const { id, ...data } = values
    const serviceAction = id ? service.update(id, data) : service.create(data)

    const response = await serviceAction

    if (response.success) {
      handleCloseForm()
      setRefreshGrid((prev) => prev + 1)
      showSnackbar(
        id ? "Kategori berhasil diperbarui" : "Kategori berhasil ditambahkan",
        "success",
      )
    } else {
      console.log(response)
      setErrors({ submit: response.message })
      showSnackbar(response.message || "Terjadi kesalahan", "error")
    }
  }

  const handleOpenConfirm = (category: ProductCategory) => {
    setCategoryToDelete(category)
    setIsConfirmOpen(true)
  }

  const handleCloseConfirm = () => {
    setCategoryToDelete(null)
    setIsConfirmOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      const response = await service.delete(categoryToDelete.id)
      if (response.success) {
        showSnackbar("Kategori berhasil dihapus", "success")
      } else {
        showSnackbar(response.message || "Gagal menghapus kategori", "error")
      }
      handleCloseConfirm()
      setRefreshGrid((prev) => prev + 1)
    }
  }

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info",
  ) => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            Manajemen Kategori Produk
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenForm()}
          >
            Tambah Kategori
          </Button>
        </Box>

        <Paper elevation={3}>
          <ProductCategoryGridTable
            key={refreshGrid}
            onEdit={handleOpenForm}
            onDelete={handleOpenConfirm}
          />
        </Paper>

        <ProductCategoryForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          initialData={editingCategory}
        />

        <ConfirmationDialog
          open={isConfirmOpen}
          onClose={handleCloseConfirm}
          onConfirm={handleConfirmDelete}
          title="Konfirmasi Hapus"
          message={`Apakah Anda yakin ingin menghapus kategori "${
            categoryToDelete?.name || ""
          }"?`}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity as any}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  )
}

export default ProductCategoryManagementPage
