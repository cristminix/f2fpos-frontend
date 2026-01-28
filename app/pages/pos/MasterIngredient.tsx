import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Container,
  TextField,
  IconButton,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material"
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid"
import SearchIcon from "@mui/icons-material/Search"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import RefreshIcon from "@mui/icons-material/Refresh"

interface IngredientData {
  id: number
  nama: string
  kode: string
  stokSaatIni: number
  stokMinimum: number
  satuanDasar: string
  satuanLain?: string
}

const MasterIngredient: React.FC = () => {
  const theme = useTheme()
  const [data, setData] = useState<IngredientData[]>([])
  const [filteredData, setFilteredData] = useState<IngredientData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  )

  // Mock data initialization
  useEffect(() => {
    // Simulasi fetching data
    setTimeout(() => {
      const mockData: IngredientData[] = [
        {
          id: 1,
          nama: "Gula Pasir",
          kode: "BHN001",
          stokSaatIni: 50,
          stokMinimum: 10,
          satuanDasar: "Kg",
          satuanLain: "Gram",
        },
        {
          id: 2,
          nama: "Tepung Terigu",
          kode: "BHN002",
          stokSaatIni: 30,
          stokMinimum: 5,
          satuanDasar: "Kg",
          satuanLain: "Gram",
        },
        {
          id: 3,
          nama: "Minyak Goreng",
          kode: "BHN003",
          stokSaatIni: 20,
          stokMinimum: 8,
          satuanDasar: "Liter",
          satuanLain: "Ml",
        },
      ]
      setData(mockData)
      setFilteredData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter data based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data)
    } else {
      const filtered = data.filter(
        (item) =>
          item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.kode.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredData(filtered)
    }
  }, [searchTerm, data])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleDeleteClick = (id: number) => {
    setSelectedId(id)
    setOpenConfirmDialog(true)
  }

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      const newData = data.filter((item) => item.id !== selectedId)
      setData(newData)
      setFilteredData(newData)
      setOpenConfirmDialog(false)
      setSelectedId(null)
      showSnackbar("Bahan baku berhasil dihapus", "success")
    }
  }

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false)
    setSelectedId(null)
  }

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  // Column definitions
  const columns: GridColDef[] = [
    {
      field: "nama",
      headerName: "Nama Bahan Baku",
      flex: 2,
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
      field: "kode",
      headerName: "Kode/SKU",
      flex: 1,
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}↓
        </Box>
      ),
    },
    {
      field: "stokSaatIni",
      headerName: "Stok Saat Ini",
      flex: 1,
      type: "number",
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}↓
        </Box>
      ),
    },
    {
      field: "stokMinimum",
      headerName: "Stok Minimum",
      flex: 1,
      type: "number",
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}↓
        </Box>
      ),
    },
    {
      field: "satuanDasar",
      headerName: "Satuan Dasar",
      flex: 1,
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}↓
        </Box>
      ),
    },
    {
      field: "satuanLain",
      headerName: "Satuan Beli Lain",
      flex: 1,
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          {params.colDef.headerName}↓
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
            onClick={() => handleDeleteClick(params.row.id)}
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
      <Box>
        <Box mb={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" component="h1">
              Master Bahan Baku
            </Typography>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => console.log("Tambah bahan baku clicked")}
            >
              Tambah Bahan Baku
            </Button>
          </Box>

          <Box mb={3} className="flex">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Cari bahan baku..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <IconButton edge="start" disabled>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              sx={{ minWidth: { xs: "100%", sm: 300 } }}
            />
            <IconButton
              onClick={() => {
                setLoading(true)
                setTimeout(() => {
                  setLoading(false)
                }, 1000)
              }}
              sx={{
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              height: 500,
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
              rows={filteredData}
              columns={columns}
              loading={loading}
              pageSizeOptions={[5, 10, 25]}
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
                noRowsOverlay: () => (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                  >
                    Data tidak ditemukan atau belum ada
                  </Box>
                ),
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
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus bahan baku ini?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Batal</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export { MasterIngredient }
