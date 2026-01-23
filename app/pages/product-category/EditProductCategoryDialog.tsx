import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ProductCategoryService } from "~/services/ProductCategoryService";

interface ProductCategoryData {
  id: number;
  outletId: number;
  name: string;
  timestamp: string;
}

interface EditProductCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  categoryData: ProductCategoryData | null;
}

export const EditProductCategoryDialog: React.FC<
  EditProductCategoryDialogProps
> = ({ open, onClose, onUpdateSuccess, categoryData }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const service = new ProductCategoryService();

  // Update the form when categoryData changes
  useEffect(() => {
    if (categoryData) {
      setName(categoryData.name);
    } else {
      setName("");
    }
    setError("");
  }, [categoryData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Nama kategori wajib diisi");
      return;
    }

    if (!categoryData) {
      setError("Data kategori tidak ditemukan");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call the update API
      const response = await service.update(categoryData.id.toString(), {
        name,
        outletId: categoryData.outletId,
      });

      if (response && (response.success || response.id || !response.error)) {
        onUpdateSuccess();
        handleClose();
      } else {
        setError("Gagal memperbarui kategori. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memperbarui kategori");
      console.error("Error updating category:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Ubah Kategori</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nama Kategori"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!error}
            helperText={error}
            disabled={loading}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Batal
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Memperbarui..." : "Perbarui"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
