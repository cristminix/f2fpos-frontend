import { Box, IconButton, useTheme } from "@mui/material"
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { UserService } from "~/services/UserService"

interface UserData {
  id: number
  username: string
  email: string
}

interface UserManagementGridTableProps {
  onEditClick: (user: UserData) => void
}

const UserManagementGridTable = ({
  onEditClick,
}: UserManagementGridTableProps) => {
  const theme = useTheme()
  const service = new UserService()

  const [rows, setRows] = useState<UserData[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  })

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Aksi",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Box>
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

export default UserManagementGridTable
