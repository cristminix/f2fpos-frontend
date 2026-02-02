import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
} from "@mui/material"
import type { ProductCategory } from "~/types/product-category"
import ProductCategoryImageDisplay from "./ProductCategoryImageDisplay"
import { ProductCategoryImageService } from "~/services/ProductCategoryImageService"

interface ProductCategoryFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: any, formik: any) => void
  initialData: ProductCategory | null
}

export const ProductCategoryForm: React.FC<ProductCategoryFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentFileId, setCurrentFileId] = useState("")
  const [localSubmitError, setLocalSubmitError] = useState<string | null>(null)
  async function loadImages() {
    //@ts-ignore
    const { id: productCategoryId } = initialData
    const productImageService = new ProductCategoryImageService()
    const images = await productImageService.getListByProductCategoryId(productCategoryId)
    console.log({ images })
    if (images.length > 0) {
      const [currentImage] = images
      const { key: fileId } = currentImage
      console.log({ fileId })
      setCurrentFileId(fileId)
    }
    // const fileInfo: any = await FileUploadService.getFile(product.id)
    // setProductImages(images)
  }
  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      if (initialData.fileId) {
        setCurrentFileId(initialData.fileId)
      }
    } else {
      setName("")
      setCurrentFileId("")
    }
    setErrors({})
  }, [initialData, open])

  function setFileId(fileId: string) {
    setCurrentFileId(fileId)
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Nama kategori wajib diisi"
    } else if (name.length > 256) {
      newErrors.name = "Nama kategori maksimal 256 karakter"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      const values = initialData?.id
        ? { id: initialData.id, name, fileId: currentFileId }
        : { name, fileId: currentFileId }

      onSubmit(values, {
        setErrors: (fieldErrors: Record<string, string>) =>
          setErrors(fieldErrors),
      })
    }
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }
  useEffect(() => {
    if (open) {
      setLocalSubmitError(null)
      if (initialData) {
        console.log({ initialData })
        loadImages()
      }
    } else {
      setCurrentFileId("")
    }
  }, [open])
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      onKeyDown={handleKeyDown}
    >
      <DialogTitle>
        {initialData ? "Edit Kategori Produk" : "Tambah Kategori Produk Baru"}
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1, py: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nama Kategori"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              inputProps={{
                maxLength: 256,
              }}
            />
          </Box>
          <Box sx={{ flex: 1, mt: 1 }}>
            <ProductCategoryImageDisplay
              setError={(error: string) => setErrors({ ...errors, submit: error })}
              setFileId={setFileId}
              fileId={currentFileId}
            />
          </Box>
        </Box>
        {errors.submit && (
          <Box sx={{ py: 1 }}>
            <Alert severity="error">{errors.submit}</Alert>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Batal</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  )
}
