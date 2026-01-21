import React, { useState } from "react"
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  GridToolbarContainer,
} from "@mui/x-data-grid"
import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"

// Interface untuk data Purchase Order
interface PurchaseOrder {
  id: number
  poNumber: string
  supplier: string
  date: string
  total: number
  status: string
}

// Data contoh
const initialData: PurchaseOrder[] = [
  {
    id: 1,
    poNumber: "PO-001",
    supplier: "Supplier ABC",
    date: "2024-01-15",
    total: 5000000,
    status: "Pending",
  },
  {
    id: 2,
    poNumber: "PO-002",
    supplier: "Supplier XYZ",
    date: "2024-01-16",
    total: 7500000,
    status: "Approved",
  },
  {
    id: 3,
    poNumber: "PO-003",
    supplier: "Supplier DEF",
    date: "2024-01-17",
    total: 3000000,
    status: "Completed",
  },
]

// Custom toolbar component untuk header
const CustomToolbar = () => {
  const handleAddClick = () => {
    console.log("Tambah PO clicked")
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      px={1}
    >
      <Typography variant="h6">Purchase Order</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
      >
        BUAT PO BARU
      </Button>
    </Box>
  )
}

const PurchaseOrderPage: React.FC = () => {
  const theme = useTheme()
  const [data] = useState<PurchaseOrder[]>(initialData)

  // Definisi kolom tabel
  const columns: GridColDef[] = [
    {
      field: "poNumber",
      headerName: "No. PO",
      flex: 1,
      headerAlign: "left",
      align: "left",
      sortable: true,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
      headerAlign: "left",
      align: "left",
      sortable: true,
    },
    {
      field: "date",
      headerName: "Tanggal",
      flex: 1,
      headerAlign: "left",
      align: "left",
      sortable: true,
    },
    {
      field: "total",
      headerName: "Total (Rp)",
      flex: 1,
      headerAlign: "left",
      align: "right",
      sortable: true,
      valueFormatter: (value) => {
        if (typeof value === "number") {
          return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(value)
        }
        return ""
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "left",
      align: "left",
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Aksi",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box display="flex" gap={1}>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => console.log("Edit", params.row.id)}
                sx={{
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    opacity: 0.8,
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => console.log("Delete", params.row.id)}
                sx={{
                  color: theme.palette.error.main,
                  "&:hover": {
                    backgroundColor: theme.palette.error.light,
                    opacity: 0.8,
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )
      },
    },
  ]

  return (
    <Box className="p-6">
      <CustomToolbar />
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{
          border: 1,
          borderColor: theme.palette.divider,
          "& .MuiDataGrid-cell:hover": {
            color: theme.palette.primary.main,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[200],
            color: theme.palette.text.primary,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[200],
            color: theme.palette.text.primary,
          },
        }}
      />
    </Box>
  )
}

export { PurchaseOrderPage }
