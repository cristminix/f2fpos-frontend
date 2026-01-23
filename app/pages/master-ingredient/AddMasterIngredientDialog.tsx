import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MasterIngredientService } from "~/services/MasterIngredientService";

interface IngredientData {
  id: number;
  outletId: number;
  name: string;
  code: string;
  qty: number;
  minQty: number;
  unit: string;
  alternateUnit?: string;
}

interface AddMasterIngredientDialogProps {
  open: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export const AddMasterIngredientDialog: React.FC<
  AddMasterIngredientDialogProps
> = ({ open, onClose, onAddSuccess }) => {
  const service = new MasterIngredientService();
  const [formData, setFormData] = useState<Omit<IngredientData, "id">>({
    outletId: service.getCurrentOutletId() || 1, // get outletId from service
    name: "",
    code: "",
    qty: 0,
    minQty: 0,
    unit: "",
    alternateUnit: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "qty" || name === "minQty" ? Number(value) : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Nama bahan baku wajib diisi";
    }

    // if (!formData.code?.trim()) {
    //   newErrors.code = "Kode bahan baku wajib diisi";
    // }

    if (formData.qty < 0) {
      newErrors.qty = "Stok saat ini harus berupa angka positif";
    }

    if (formData.minQty < 0) {
      newErrors.minQty = "Stok minimum harus berupa angka positif";
    }

    if (!formData.unit?.trim()) {
      newErrors.unit = "Satuan dasar wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare the data with the current outletId
      const dataToSend = {
        ...formData,
        outletId: service.getCurrentOutletId(), // Ensure we always have a valid outletId
      };

      const response = await service.create(dataToSend);
      console.log(response);
      // Check if the response indicates success
      if (response && response.success !== false) {
        onAddSuccess();
        handleClose();
      } else {
        // Handle error response from API
        if (response && (response.error || response.message)) {
          // Parse the error message to show specific field errors if possible
          const errorMessage = response.message ?? response.error.message;
          console.log(errorMessage);

          setErrors({
            general:
              errorMessage || "Gagal menambah bahan baku. Silakan coba lagi.",
          });
        } else {
          setErrors({
            general: "Gagal menambah bahan baku. Silakan coba lagi.",
          });
        }
      }
    } catch (err) {
      console.error("Error adding ingredient:", err);
      setErrors({ general: "Terjadi kesalahan saat menambah bahan baku" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      outletId: 0, // get outletId from service
      name: "",
      code: "",
      qty: 0,
      minQty: 0,
      unit: "",
      alternateUnit: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Tambah Bahan Baku Baru</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box mt={2} mb={2}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nama Bahan Baku"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Box>
          <Box mt={2} mb={2}>
            <TextField
              margin="dense"
              name="code"
              label="Kode/SKU"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.code}
              onChange={handleChange}
              error={!!errors.code}
              helperText={errors.code}
            />
          </Box>
          <Box display="flex" gap={2}>
            <Box flex={1}>
              <TextField
                margin="dense"
                name="qty"
                label="Stok Saat Ini"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.qty}
                onChange={handleChange}
                error={!!errors.qty}
                helperText={errors.qty}
              />
            </Box>
            <Box flex={1}>
              <TextField
                margin="dense"
                name="minQty"
                label="Stok Minimum"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.minQty}
                onChange={handleChange}
                error={!!errors.minQty}
                helperText={errors.minQty}
              />
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            <Box flex={1}>
              <FormControl fullWidth margin="dense" error={!!errors.unit}>
                <InputLabel>Satuan Dasar</InputLabel>
                <Select
                  name="unit"
                  value={formData.unit}
                  label="Satuan Dasar"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      unit: e.target.value,
                    });

                    // Clear error when user selects a value
                    if (errors.unit) {
                      setErrors({
                        ...errors,
                        unit: "",
                      });
                    }
                  }}
                >
                  <MenuItem value="Kg">Kg</MenuItem>
                  <MenuItem value="Gram">Gram</MenuItem>
                  <MenuItem value="Liter">Liter</MenuItem>
                  <MenuItem value="Ml">Ml</MenuItem>
                  <MenuItem value="Buah">Buah</MenuItem>
                  <MenuItem value="Pack">Pack</MenuItem>
                </Select>
                {errors.unit && <FormHelperText>{errors.unit}</FormHelperText>}
              </FormControl>
            </Box>
            <Box flex={1}>
              <TextField
                margin="dense"
                name="alternateUnit"
                label="Satuan Beli Lain"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.alternateUnit}
                onChange={handleChange}
              />
            </Box>
          </Box>
          {errors.general && (
            <Box mt={2} display="flex" justifyContent="center">
              <Typography color="error" variant="body2">
                {errors.general}
              </Typography>
            </Box>
          )}
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
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
