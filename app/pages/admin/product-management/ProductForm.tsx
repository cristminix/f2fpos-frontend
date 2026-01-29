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
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import type { Product } from "~/types/product"
import ProductImageDisplay from "./ProductImageDisplay"
import { ProductImageService } from "~/services/ProductImageService"

interface ProductFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: any, formikBag: any) => void
  initialData?: Product | null
  submitError?: string | null
}

const ProductForm = (props: ProductFormProps) => {
  const { open, onClose, onSubmit, initialData, submitError } = props
  const [localSubmitError, setLocalSubmitError] = useState<string | null>(null)
  const [currentFileId, setCurrentFileId] = useState("")
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: initialData?.id || null,
      name: initialData?.name || "",
      weight: initialData?.weight || 0,
      price: initialData?.price || 0,
      description: initialData?.description || "",
      sku: initialData?.sku || "",
      fileId: initialData?.fileId || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama Produk wajib diisi"),
      weight: Yup.number()
        .required("Berat wajib diisi")
        .min(0, "Berat tidak boleh negatif")
        .integer("Berat harus berupa bilangan bulat"),
      price: Yup.number()
        .required("Harga wajib diisi")
        .min(0, "Harga tidak boleh negatif")
        .integer("Harga harus berupa bilangan bulat"),
      description: Yup.string(),
      sku: Yup.string().required("SKU wajib diisi"),
    }),
    onSubmit: (values: any, formikBag: any) => {
      setLocalSubmitError(null) // Reset error saat submit
      onSubmit(values, formikBag)
    },
  })
  function setFileId(fileId: string) {
    console.log(fileId)
    formik.setFieldValue("fileId", fileId)
  }
  async function loadImages() {
    //@ts-ignore
    const { id: productId } = initialData
    const productImageService = new ProductImageService()
    const images = await productImageService.getListByProductId(productId)
    if (images.length > 0) {
      const [currentImage] = images
      const { key: fileId } = currentImage
      console.log({ fileId })
      setCurrentFileId(fileId)
    }
    // const fileInfo: any = await FileUploadService.getFile(product.id)
    // setProductImages(images)
  }
  // Reset error ketika form dibuka kembali atau data awal berubah
  useEffect(() => {
    if (open) {
      setLocalSubmitError(null)
      if (initialData) {
        loadImages()
      }
    } else {
      setCurrentFileId("")
    }
  }, [open])

  // Update local error state when props error changes
  useEffect(() => {
    setLocalSubmitError(submitError || null)
  }, [submitError])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {initialData ? "Edit Produk" : "Tambah Produk Baru"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1, mt: 2 }}>
              <TextField
                fullWidth
                label="Nama Produk"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
              />
              <TextField
                fullWidth
                label="SKU"
                name="sku"
                value={formik.values.sku}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sku && Boolean(formik.errors.sku)}
                helperText={formik.touched.sku && formik.errors.sku}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Berat (gram)"
                name="weight"
                type="number"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Harga"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Deskripsi"
                name="description"
                multiline
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                margin="normal"
              />
            </Box>
            <Box sx={{ flex: 1, mt: 2 }}>
              <ProductImageDisplay
                setError={setLocalSubmitError}
                setFileId={setFileId}
                fileId={currentFileId}
              />
            </Box>
          </Box>
          {localSubmitError && (
            <Box sx={{ py: 1 }}>
              <Alert severity="error">{localSubmitError}</Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? "Simpan" : "Tambah"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ProductForm
