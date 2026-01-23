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
  outletId: number;
  name: string;
  code: string;
  qty: number;
  minQty: number;
  unit: string;
  alternateUnit?: string;
}

interface EditMasterIngredientDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  ingredientData: IngredientData | null;
}

export const EditMasterIngredientDialog: React.FC<
  EditMasterIngredientDialogProps
> = ({ open, onClose, onUpdateSuccess, ingredientData }) => {
  const [formData, setFormData] = useState<Partial<IngredientData>>({
    outletId: 0,
    name: "",
    code: "",
    qty: 0,
    minQty: 0,
    unit: "",
    alternateUnit: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (ingredientData) {
      setFormData({
        id: ingredientData.id,
        outletId: ingredientData.outletId,
        name: ingredientData.name,
        code: ingredientData.code,
        qty: ingredientData.qty,
        minQty: ingredientData.minQty,
        unit: ingredientData.unit,
        alternateUnit: ingredientData.alternateUnit || "",
      });
    } else {
      setFormData({
        outletId: 0,
        name: "",
        code: "",
        qty: 0,
        minQty: 0,
        unit: "",
        alternateUnit: "",
      });
    }
  }, [ingredientData]);

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

    if (!formData.code?.trim()) {
      newErrors.code = "Kode bahan baku wajib diisi";
    }

    if (formData.qty === undefined || formData.qty < 0) {
      newErrors.qty = "Stok saat ini harus berupa angka positif";
    }

    if (formData.minQty === undefined || formData.minQty < 0) {
      newErrors.minQty = "Stok minimum harus berupa angka positif";
    }

    if (!formData.unit?.trim()) {
      newErrors.unit = "Satuan dasar wajib diisi";
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
            name="name"
            label="Nama Bahan Baku"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name || ""}
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
            value={formData.code || ""}
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
              value={formData.qty || 0}
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
              value={formData.minQty || 0}
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
                value={formData.unit || ""}
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
              value={formData.alternateUnit || ""}
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
