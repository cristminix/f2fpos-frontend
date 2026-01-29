import { useEffect, useState } from "react"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import type { ProductCategory } from "~/types/product-category"
import { ProductCategoryService } from "~/services/ProductCategoryService"

interface ProductCategoryGridTableProps {
  key?: number
  onEdit: (category: ProductCategory) => void
  onDelete: (category: ProductCategory) => void
}

export const ProductCategoryGridTable: React.FC<
  ProductCategoryGridTableProps
> = ({ key, onEdit, onDelete }) => {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(false)
  const service = new ProductCategoryService()

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      const response = await service.getList()
      if (response.success && response.data?.records) {
        setCategories(response.data.records)
      }
      setLoading(false)
    }

    fetchCategories()
  }, [key])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="product category table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Nama Kategori
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Box sx={{ py: 4 }}>
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : categories.length > 0 ? (
            categories.map((category, index) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{category.name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    size="small"
                    onClick={() => onEdit(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    size="small"
                    onClick={() => onDelete(category)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Box sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    Belum ada data kategori produk
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
