import React, { useEffect, useState } from "react"
import { Box, Typography, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { ProductCategoryService } from "~/services/ProductCategoryService"
import { ProductCategoryGrid } from "./category-management/ProductCategoryGrid"
import { ProductCategoryForm } from "./category-management/ProductCategoryForm"
import type { ProductCategory } from "~/types/product-category"

interface ProductCategoryData {
  id: number
  name: string
  createdAt: string
}

interface ApiResponse {
  limit: number
  totalPages: number
  totalRecords: number
  recordCount: number
  records: ProductCategoryData[]
}

const ProductCategoryManagementPage: React.FC = () => {
  const service = new ProductCategoryService()
  // State management for server-side sorting and pagination
  const [data, setData] = useState<ProductCategoryData[]>([])
  // const [formData, setFormData] = useState<ProductCategoryData | null>(null)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [totalRows, setTotalRows] = useState(0)
  const [sortField, setSortField] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [loading, setLoading] = useState(false)


  // Form dialog state
  const [formOpen, setFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null)

  async function loadGridData() {
    setLoading(true)
    try {
      const response: ApiResponse = await service.getList(
        page + 1,
        pageSize,
        sortField,
        sortOrder,
      )
      console.log({ response })

      setData(response.records)
      setTotalRows(response.totalRecords)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddClick = () => {
    setSelectedCategory(null)
    setFormOpen(true)
  }

  const handleEditClick = async (id: number) => {
    try {
      const response = await service.getById(id)
      const category = response.data || response
      setSelectedCategory(category)
      setFormOpen(true)
    } catch (error) {
      console.error("Error loading category:", error)
    }
  }

  const handleDeleteClick = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      try {
        await service.delete(id)
        await loadGridData()
      } catch (error) {
        console.error("Error deleting category:", error)
      }
    }
  }

  const handleFormSubmit = async (values: any, formik: any) => {
    try {
      if (selectedCategory?.id) {
        await service.update(selectedCategory.id, values)
      } else {
        await service.create(values)
      }
      setFormOpen(false)
      await loadGridData()
    } catch (error: any) {
      console.error("Error submitting form:", error)
      formik.setErrors({
        submit: error.message || "Terjadi kesalahan saat menyimpan data",
      })
    }
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setSelectedCategory(null)
  }

  useEffect(() => {
    loadGridData()
  }, [page, pageSize, sortField, sortOrder])
  return (
    <Box className="p-4">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Kategori Produk
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          startIcon={<AddIcon />}
        >
          Tambah Kategori
        </Button>
      </Box>

      <ProductCategoryGrid
        data={data}
        totalRows={totalRows}
        loading={loading}
        page={page}
        pageSize={pageSize}
        sortField={sortField}
        sortOrder={sortOrder}
        onPaginationChange={(newPage, newPageSize) => {
          setPage(newPage)
          setPageSize(newPageSize)
        }}
        onSortChange={(field, order) => {
          setSortField(field)
          setSortOrder(order)
        }}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <ProductCategoryForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={selectedCategory}
      />
    </Box>
  )
}

export { ProductCategoryManagementPage }
