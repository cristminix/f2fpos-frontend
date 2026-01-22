import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, IconButton, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { ProductCategoryService } from "~/services/ProductCategoryService"

interface AddProductCategoryDialogProps {
  open: boolean
  onClose: () => void
  onAddSuccess: () => void
}

export const AddProductCategoryDialog: React.FC<AddProductCategoryDialogProps> = ({ open, onClose, onAddSuccess }) => {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const service = new ProductCategoryService()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Nama kategori wajib diisi")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Panggil API untuk menambah kategori
      // Panggil API untuk menambah kategori
      // Kita perlu mendapatkan outletId dari tempat lain, mungkin dari context atau state
      const response = await service.create({ name, outletId: 1 }) // outletId sementara

      if (response.success && response.data?.id) {
        onAddSuccess()
        handleClose()
      } else {
        setError("Gagal menambah kategori. Silakan coba lagi.")
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menambah kategori")
      console.error("Error adding category:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setName("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Tambah Kategori Produk</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField autoFocus margin="dense" name="name" label="Nama Kategori" type="text" fullWidth variant="outlined" value={name} onChange={(e) => setName(e.target.value)} error={!!error} helperText={error} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Batal
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
