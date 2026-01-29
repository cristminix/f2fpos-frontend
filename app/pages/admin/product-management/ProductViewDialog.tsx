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
import { useEffect, useState } from "react"
import FileUploadService from "~/services/FileUploadService"
import { ProductImageService } from "~/services/ProductImageService"
import type { Product } from "~/types/product"
import { ProductImageItem } from "./ProductImageItem"

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
  const [productImages, setProductImages] = useState([])
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }
  async function loadImages() {
    // console.log("Hello", product)
    if (product) {
      const { id: productId } = product
      const productImageService = new ProductImageService()
      const images = await productImageService.getListByProductId(productId)
      console.log({ images })
      // const fileInfo: any = await FileUploadService.getFile(product.id)
      setProductImages(images)
    } else {
      setProductImages([])
    }
  }
  useEffect(() => {
    loadImages()
  }, [product])
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
          <Box className="">
            {" "}
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
            <Box className="w-[80%]">
              {productImages.map((item, key) => {
                return (
                  <div key={key}>
                    <ProductImageItem imageUpload={item} />
                  </div>
                )
              })}
            </Box>
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
