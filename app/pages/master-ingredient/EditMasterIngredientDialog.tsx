import React, { useState, useEffect } from "react";
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
} from "@mui/material";

interface IngredientData {
  id: number;
  nama: string;
  kode: string;
  stokSaatIni: number;
  stokMinimum: number;
  satuanDasar: string;
  satuanLain?: string;
}

interface EditMasterIngredientDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  ingredientData: IngredientData | null;
}

export const EditMasterIngredientDialog: React.FC<EditMasterIngredientDialogProps> = ({
  open,
  onClose,
  onUpdateSuccess,
  ingredientData,
}) => {
  const [formData, setFormData] = useState<Partial<IngredientData>>({
    nama: "",
    kode: "",
    stokSaatIni: 0,
    stokMinimum: 0,
    satuanDasar: "",
    satuanLain: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (ingredientData) {
      setFormData({
        id: ingredientData.id,
        nama: ingredientData.nama,
        kode: ingredientData.kode,
        stokSaatIni: ingredientData.stokSaatIni,
        stokMinimum: ingredientData.stokMinimum,
        satuanDasar: ingredientData.satuanDasar,
        satuanLain: ingredientData.satuanLain || "",
      });
    } else {
      setFormData({
        nama: "",
        kode: "",
        stokSaatIni: 0,
        stokMinimum: 0,
        satuanDasar: "",
        satuanLain: "",
      });
    }
  }, [ingredientData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('stok') ? Number(value) : value,
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

    if (!formData.nama?.trim()) {
      newErrors.nama = "Nama bahan baku wajib diisi";
    }

    if (!formData.kode?.trim()) {
      newErrors.kode = "Kode bahan baku wajib diisi";
    }

    if (formData.stokSaatIni === undefined || formData.stokSaatIni < 0) {
      newErrors.stokSaatIni = "Stok saat ini harus berupa angka positif";
    }

    if (formData.stokMinimum === undefined || formData.stokMinimum < 0) {
      newErrors.stokMinimum = "Stok minimum harus berupa angka positif";
    }

    if (!formData.satuanDasar?.trim()) {
      newErrors.satuanDasar = "Satuan dasar wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real implementation, this would call the API to update the ingredient
      // For now, we'll just simulate a successful update
      console.log("Updating ingredient:", formData);

      // Call the success callback to refresh the data
      onUpdateSuccess();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {ingredientData ? "Edit Bahan Baku" : "Tambah Bahan Baku"}
      </DialogTitle>
      <DialogContent dividers>
        <Box mt={2} mb={2}>
          <TextField
            autoFocus
            margin="dense"
            name="nama"
            label="Nama Bahan Baku"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.nama || ""}
            onChange={handleChange}
            error={!!errors.nama}
            helperText={errors.nama}
          />
        </Box>
        <Box mt={2} mb={2}>
          <TextField
            margin="dense"
            name="kode"
            label="Kode/SKU"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.kode || ""}
            onChange={handleChange}
            error={!!errors.kode}
            helperText={errors.kode}
          />
        </Box>
        <Box display="flex" gap={2}>
          <Box flex={1}>
            <TextField
              margin="dense"
              name="stokSaatIni"
              label="Stok Saat Ini"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.stokSaatIni || 0}
              onChange={handleChange}
              error={!!errors.stokSaatIni}
              helperText={errors.stokSaatIni}
            />
          </Box>
          <Box flex={1}>
            <TextField
              margin="dense"
              name="stokMinimum"
              label="Stok Minimum"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.stokMinimum || 0}
              onChange={handleChange}
              error={!!errors.stokMinimum}
              helperText={errors.stokMinimum}
            />
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <Box flex={1}>
            <FormControl fullWidth margin="dense" error={!!errors.satuanDasar}>
              <InputLabel>Satuan Dasar</InputLabel>
              <Select
                name="satuanDasar"
                value={formData.satuanDasar || ""}
                label="Satuan Dasar"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    satuanDasar: e.target.value,
                  });

                  // Clear error when user selects a value
                  if (errors.satuanDasar) {
                    setErrors({
                      ...errors,
                      satuanDasar: "",
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
              {errors.satuanDasar && (
                <FormHelperText>{errors.satuanDasar}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box flex={1}>
            <TextField
              margin="dense"
              name="satuanLain"
              label="Satuan Beli Lain"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.satuanLain || ""}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};
