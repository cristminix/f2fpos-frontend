import { Box, IconButton, useTheme } from "@mui/material"
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { ProductService } from "~/services/ProductService"
import type { Product } from "~/types/product"

interface ProductManagementGridTableProps {
  onEditClick: (product: Product) => void
  onDeleteClick: (product: Product) => void
  onViewClick: (product: Product) => void
}

const ProductManagementGridTable = ({
  onEditClick,
  onDeleteClick,
  onViewClick,
}: ProductManagementGridTableProps) => {
  const theme = useTheme()
  const service = new ProductService()

  const [rows, setRows] = useState<Product[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  })

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nama Produk",
      flex: 1,
      sortable: true,
    },
    {
      field: "sku",
      headerName: "SKU",
      flex: 0.5,
      sortable: true,
    },
    {
      field: "weight",
      headerName: "Berat (gram)",
      flex: 0.5,
      sortable: true,
      renderCell: (params) => `${params.value} gram`,
    },
    {
      field: "price",
      headerName: "Harga",
      flex: 0.5,
      sortable: true,
      renderCell: (params) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(params.value)
      },
    },
    {
      field: "description",
      headerName: "Deskripsi",
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: 200,
          }}
        >
          {params.value || "-"}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Aksi",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="view"
            sx={{ color: theme.palette.info.main }}
            onClick={() => onViewClick(params.row)}
          >
            <ViewIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            sx={{ color: theme.palette.primary.main }}
            onClick={() => onEditClick(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ color: theme.palette.error.main }}
            onClick={() => onDeleteClick(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await service.getList(
        paginationModel.page + 1,
        paginationModel.pageSize,
      )
      if (response && response.records) {
        setRows(response.records)
        setRowCount(response.totalRecords)
      }
      setLoading(false)
    }
    fetchData()
  }, [paginationModel])

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .MuiDataGrid-root": {
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.background.paper,
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        "& .MuiTablePagination-root": {
          color: theme.palette.text.secondary,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  )
}

export default ProductManagementGridTable
