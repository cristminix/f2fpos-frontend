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
import { MemberService } from "~/services/MemberService"
import type { Member } from "~/types/member"

interface MemberManagementGridTableProps {
  onEditClick: (member: Member) => void
  onDeleteClick: (member: Member) => void
  onViewClick: (member: Member) => void
}

const MemberManagementGridTable = ({
  onEditClick,
  onDeleteClick,
  onViewClick,
}: MemberManagementGridTableProps) => {
  const theme = useTheme()
  const service = new MemberService()

  const [rows, setRows] = useState<Member[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  })

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Nama Lengkap",
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
      field: "phoneNumber",
      headerName: "Nomor Telepon",
      flex: 1,
      sortable: true,
    },
    {
      field: "memberType",
      headerName: "Jenis Member",
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.replace(/_/g, " "),
    },
    {
      field: "accountStatus",
      headerName: "Status Akun",
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.replace(/_/g, " "),
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      sortable: true,
      renderCell: () => "•••••••", // Mask password
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

export default MemberManagementGridTable
