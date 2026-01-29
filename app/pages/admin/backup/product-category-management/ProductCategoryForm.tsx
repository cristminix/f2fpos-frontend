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

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
    } else {
      setName("")
    }
    setErrors({})
  }, [initialData, open])

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
      const values = initialData?.id ? { id: initialData.id, name } : { name }

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
        <Box sx={{ py: 1 }}>
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
