import React from "react"
import { Box, IconButton, useTheme } from "@mui/material"
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

interface ProductCategoryData {
  id: number
  name: string
  createdAt: string
}

interface ProductCategoryGridProps {
  data: ProductCategoryData[]
  totalRows: number
  loading: boolean
  page: number
  pageSize: number
  sortField: string
  sortOrder: "asc" | "desc"
  onPaginationChange: (page: number, pageSize: number) => void
  onSortChange: (field: string, order: "asc" | "desc") => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const ProductCategoryGrid: React.FC<ProductCategoryGridProps> = ({
  data,
  totalRows,
  loading,
  page,
  pageSize,
  sortField,
  sortOrder,
  onPaginationChange,
  onSortChange,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme()

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nama Kategori",
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
      field: "actions",
      headerName: "Aksi",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton
            size="small"
            onClick={() => onEdit?.(params.row.id)}
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
            onClick={() => onDelete?.(params.row.id)}
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

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    onPaginationChange(model.page, model.pageSize)
  }

  const handleSortModelChange = (model: GridSortModel) => {
    if (model.length > 0) {
      onSortChange(model[0].field, model[0].sort === "desc" ? "desc" : "asc")
    } else {
      onSortChange("name", "asc")
    }
  }

  return (
    <Box
      sx={{
        height: "auto",
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
        rowCount={totalRows}
        pageSizeOptions={[5, 10, 25]}
        paginationMode="server"
        sortingMode="server"
        onPaginationModelChange={handlePaginationModelChange}
        onSortModelChange={handleSortModelChange}
        paginationModel={{ page, pageSize }}
        sortModel={[{ field: sortField, sort: sortOrder }]}
        loading={loading}
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
  )
}

export { ProductCategoryGrid }
