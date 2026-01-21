import React, { useState } from "react"
import { Box, Typography, IconButton, useTheme, Button } from "@mui/material"
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid"

// Icons
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

interface SupplierData {
  id: number
  nama: string
  kontak: string
  telepon: string
}

export function Supplier() {
  const theme = useTheme()

  // Data contoh
  const [data] = useState<SupplierData[]>([
    {
      id: 1,
      nama: "PT. ABC Supplier",
      kontak: "Budi Santoso",
      telepon: "021-12345678",
    },
    {
      id: 2,
      nama: "CV. XYZ Trading",
      kontak: "Siti Aminah",
      telepon: "021-87654321",
    },
    {
      id: 3,
      nama: "UD. Jaya Abadi",
      kontak: "Ahmad Fauzi",
      telepon: "021-56781234",
    },
  ])

  // Definisi kolom
  const columns: GridColDef[] = [
    {
      field: "nama",
      headerName: "Nama Supplier",
      flex: 1,
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}↓
        </Box>
      ),
      sortComparator: (v1, v2) => {
        if (typeof v1 === "string" && typeof v2 === "string") {
          return v1.localeCompare(v2)
        }
        return 0
      },
      cellClassName: "MuiDataGrid-cell--textPrimary",
    },
    {
      field: "kontak",
      headerName: "Kontak",
      flex: 1,
      cellClassName: "MuiDataGrid-cell--textPrimary",
    },
    {
      field: "telepon",
      headerName: "Telepon",
      flex: 1,
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
            onClick={() => console.log("Edit:", params.row.id)}
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
            onClick={() => console.log("Delete:", params.row.id)}
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
  ]

  return (
    <Box className="p-4">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Supplier
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Tambah supplier clicked")}
        >
          + Tambah Supplier
        </Button>
      </Box>

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
              sortModel: [{ field: "nama", sort: "asc" }],
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
      </Box>
    </Box>
  )
}
