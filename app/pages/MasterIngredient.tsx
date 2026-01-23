import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MasterIngredientGrid, {
  type MasterIngredientGridRef,
} from "./master-ingredient/MasterIngredientGrid";
import { AddMasterIngredientDialog } from "./master-ingredient/AddMasterIngredientDialog";

const MasterIngredient: React.FC = () => {
  const theme = useTheme();
  const gridRef = useRef<MasterIngredientGridRef>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddIngredient = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddSuccess = () => {
    // Setelah berhasil menambah bahan baku, tutup dialog dan refresh data
    setIsDialogOpen(false);
    // Refresh data di grid
    if (gridRef.current) {
      gridRef.current.loadGridData();
    }
  };

  return (
    <Box className="p-4">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Master Bahan Baku
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddIngredient}
          startIcon={<AddIcon />}
        >
          Tambah Bahan Baku
        </Button>
      </Box>

      <MasterIngredientGrid ref={gridRef} />

      <AddMasterIngredientDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onAddSuccess={handleAddSuccess}
      />
    </Box>
  );
};

export { MasterIngredient };
