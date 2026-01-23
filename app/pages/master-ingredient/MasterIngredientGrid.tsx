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
import { MasterIngredientService } from "~/services/MasterIngredientService";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { EditMasterIngredientDialog } from "./EditMasterIngredientDialog";
import { useOutlet } from "~/contexts/OutletContext";

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

interface ApiResponse {
  limit: number;
  totalPages: number;
  totalRecords: number;
  recordCount: number;
  records: IngredientData[];
}

interface MasterIngredientGridProps {}

// Define the ref type to expose methods
export interface MasterIngredientGridRef {
  loadGridData: () => void;
}

const MasterIngredientGrid: React.ForwardRefRenderFunction<
  MasterIngredientGridRef,
  MasterIngredientGridProps
> = (_, ref) => {
  const theme = useTheme();
  const service = new MasterIngredientService();
  // Data from API
  const [data, setData] = useState<IngredientData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  // State for pagination and sorting
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [sortModel, setSortModel] = useState([
    { field: "name", sort: "asc" as const },
  ]);
  // State for delete confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IngredientData | null>(null);
  // State for edit dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingRow, setEditingRow] = useState<IngredientData | null>(null);
  const { selectedOutlet } = useOutlet();

  // Column definitions
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nama Bahan Baku",
      flex: 2,
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
      field: "code",
      headerName: "Kode/SKU",
      flex: 1,
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}
        </Box>
      ),
    },
    {
      field: "qty",
      headerName: "Stok Saat Ini",
      flex: 1,
      type: "number",
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}
        </Box>
      ),
    },
    {
      field: "minQty",
      headerName: "Stok Minimum",
      flex: 1,
      type: "number",
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}
        </Box>
      ),
    },
    {
      field: "unit",
      headerName: "Satuan Dasar",
      flex: 1,
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}
        </Box>
      ),
    },
    {
      field: "alternateUnit",
      headerName: "Satuan Beli Lain",
      flex: 1,
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}
        </Box>
      ),
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
    setLoading(true);
    try {
      // Determine sort field and order
      const sortField = sortModel[0]?.field || "name";
      const sortOrder = sortModel[0]?.sort || "asc";

      // Get the current service instance and temporarily set the outlet ID
      // We'll create a temporary service instance with the selected outlet
      const response: ApiResponse = await service.getList(
        paginationModel.page + 1, // Convert to 1-based index
        paginationModel.pageSize,
        sortField,
        sortOrder,
      );

      setData(response.records || []);
      setTotalRows(response.totalRecords || 0);
    } catch (error) {
      console.error("Error loading grid data:", error);
      setData([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  }

  // Handler for opening delete confirmation dialog
  const handleOpenDeleteDialog = (row: IngredientData) => {
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
        console.error("Error deleting ingredient:", error);
        // Optionally show an error message to the user
        alert(`Failed to delete ingredient: ${error}`);
      }
    }
  };

  // Handler for opening edit dialog
  const handleOpenEditDialog = (row: IngredientData) => {
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
  }, [paginationModel, sortModel]);

  // Trigger loadGridData when outlet changes
  useEffect(() => {
    loadGridData();
  }, [selectedOutlet]);

  // Expose the loadGridData function to parent components
  React.useImperativeHandle(ref, () => ({
    loadGridData,
  }));

  return (
    <Box
      sx={{
        minHeight: 400,
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
        loading={loading}
        rowCount={totalRows}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode="server"
        sortModel={sortModel}
        //@ts-ignore
        onSortModelChange={setSortModel}
        paginationMode="server"
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
      <EditMasterIngredientDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onUpdateSuccess={handleEditSuccess}
        ingredientData={editingRow}
      />
    </Box>
  );
};

export default forwardRef(MasterIngredientGrid);

export { MasterIngredientGrid };
