import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Container,
  IconButton,
  useTheme,
  Button,
} from "@mui/material"
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid"

// Icons
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { ProductCategoryService } from "~/services/ProductCategoryService"

interface ProductCategoryData {
  id: number
  name: string
  createdAt: string
}

interface ApiResponse {
  limit: number
  totalPages: number
  totalRecords: number
  recordCount: number
  records: ProductCategoryData[]
}

const ProductCategoryManagementPage: React.FC = () => {
  const theme = useTheme()
  const service = new ProductCategoryService()
  // State management for server-side sorting and pagination
  const [data, setData] = useState<ProductCategoryData[]>([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [totalRows, setTotalRows] = useState(0)
  const [sortField, setSortField] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [loading, setLoading] = useState(false)

  // Definisi kolom
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
      field: "createdAt",
      headerName: "Tanggal Dibuat",
      flex: 1,
      type: "date",
      valueFormatter: (value) => {
        if (!value) return ""
        return new Date(value).toLocaleDateString("id-ID")
      },
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

  async function loadGridData() {
    setLoading(true)
    try {
      const response: ApiResponse = await service.getList(
        page + 1,
        pageSize,
        sortField,
        sortOrder,
      )
      console.log({ response })

      setData(response.records)
      setTotalRows(response.totalRecords)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGridData()
  }, [page, pageSize, sortField, sortOrder])
  return (
    <Box className="p-4">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Kategori Produk
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Tambah kategori clicked")}
        >
          + Tambah Kategori
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
          rowCount={totalRows}
          pageSizeOptions={[5, 10, 25]}
          paginationMode="server"
          sortingMode="server"
          onPaginationModelChange={(model) => {
            setPage(model.page)
            setPageSize(model.pageSize)
          }}
          onSortModelChange={(model) => {
            if (model.length > 0) {
              setSortField(model[0].field)
              setSortOrder(model[0].sort === "desc" ? "desc" : "asc")
            } else {
              setSortField("name")
              setSortOrder("asc")
            }
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            sorting: {
              sortModel: [{ field: "name", sort: "asc" }],
            },
          }}
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
    </Box>
  )
}

export { ProductCategoryManagementPage }
