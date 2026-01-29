import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material"
import type { Product } from "~/types/product"

interface ProductViewDialogProps {
  open: boolean
  onClose: () => void
  product: Product | null
  loading: boolean
}

const ProductViewDialog = ({
  open,
  onClose,
  product,
  loading,
}: ProductViewDialogProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detail Produk</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 150,
            }}
          >
            <CircularProgress />
          </Box>
        ) : product ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              <strong>Nama Produk:</strong> {product.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>SKU:</strong> {product.sku}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Berat:</strong> {product.weight} gram
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Harga:</strong> {formatCurrency(product.price)}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Deskripsi:</strong> {product.description || "-"}
            </Typography>
          </Box>
        ) : (
          <Typography>Data produk tidak ditemukan.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductViewDialog
