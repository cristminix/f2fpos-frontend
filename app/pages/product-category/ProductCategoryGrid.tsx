import React, { useEffect, useState, useRef, forwardRef } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductCategoryService } from "~/services/ProductCategoryService";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { EditProductCategoryDialog } from "./EditProductCategoryDialog";

interface ProductCategoryData {
  id: number;
  outletId: number;
  name: string;
  timestamp: string;
}

interface ApiResponse {
  limit: number;
  totalPages: number;
  totalRecords: number;
  recordCount: number;
  records: ProductCategoryData[];
}
interface ProductCategoryData {
  id: number;
  outletId: number;
  name: string;
  timestamp: string;
}

interface ProductCategoryGridProps {}

// Define the ref type to expose methods
export interface ProductCategoryGridRef {
  loadGridData: () => void;
}

const ProductCategoryGrid: React.ForwardRefRenderFunction<
  ProductCategoryGridRef,
  ProductCategoryGridProps
> = (_, ref) => {
  const theme = useTheme();
  const service = new ProductCategoryService();
  // Data from API
  const [data, setData] = useState<ProductCategoryData[]>([]);
  // State for delete confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProductCategoryData | null>(
    null,
  );
  // State for edit dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingRow, setEditingRow] = useState<ProductCategoryData | null>(
    null,
  );

  // Definisi kolom
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nama Kategori",
      flex: 1,
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}
        </Box>
      ),
      sortComparator: (v1, v2) => {
        if (typeof v1 === "string" && typeof v2 === "string") {
          return v1.localeCompare(v2);
        }
        return 0;
      },
      cellClassName: "MuiDataGrid-cell--textPrimary",
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton
            size="small"
            onClick={() => handleOpenEditDialog(params.row)}
            sx={{
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleOpenDeleteDialog(params.row)}
            sx={{
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  async function loadGridData() {
    const response: ApiResponse = await service.getList();
    // console.log({ response })

    setData(response.records);
  }

  // Handler for opening delete confirmation dialog
  const handleOpenDeleteDialog = (row: ProductCategoryData) => {
    setSelectedRow(row);
    setOpenDeleteDialog(true);
  };

  // Handler for closing delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedRow(null);
  };

  // Handler for confirming delete action
  const handleConfirmDelete = async () => {
    if (selectedRow) {
      try {
        // Call the delete API
        await service.remove(selectedRow.id.toString());
        // Refresh the grid data after successful deletion
        await loadGridData();
        // Close the dialog
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Error deleting product category:", error);
        // Optionally show an error message to the user
        alert(`Failed to delete category: ${error}`);
      }
    }
  };

  // Handler for opening edit dialog
  const handleOpenEditDialog = (row: ProductCategoryData) => {
    setEditingRow(row);
    setOpenEditDialog(true);
  };

  // Handler for closing edit dialog
  const handleCloseEditDialog = () => {
    setEditingRow(null);
    setOpenEditDialog(false);
  };

  // Handler for when edit is successful
  const handleEditSuccess = async () => {
    // Refresh the grid data after successful update
    await loadGridData();
    // Close the dialog
    handleCloseEditDialog();
  };

  useEffect(() => {
    loadGridData();
  }, []);

  // Expose the loadGridData function to parent components
  React.useImperativeHandle(ref, () => ({
    loadGridData,
  }));

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .MuiDataGrid-root": {
          border: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          sorting: {
            sortModel: [{ field: "name", sort: "asc" }],
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        sx={{
          border: 0,
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
          },
        }}
      />
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={selectedRow?.name}
      />
      <EditProductCategoryDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onUpdateSuccess={handleEditSuccess}
        categoryData={editingRow}
      />
    </Box>
  );
};

export default forwardRef(ProductCategoryGrid);

export { ProductCategoryGrid };
