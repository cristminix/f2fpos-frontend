import React, { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  SentimentDissatisfied as SentimentDissatisfiedIcon,
} from "@mui/icons-material"

const ShiftReportPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [openNewShiftModal, setOpenNewShiftModal] = useState(false)
  const [initialCash, setInitialCash] = useState("")

  const handleViewClick = (row: any) => {
    setSelectedRow(row)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedRow(null)
  }

  const handleOpenFirstShift = () => {
    // Fungsi untuk membuka shift pertama
    setOpenNewShiftModal(true)
  }

  const handleCloseNewShiftModal = () => {
    setOpenNewShiftModal(false)
    setInitialCash("")
  }

  const handleOpenShift = () => {
    // Logika untuk membuka shift baru dan menambahkan data ke datagrid
    // Di sini bisa ditambahkan logika untuk menyimpan data ke state atau API
    console.log("Membuka shift dengan modal awal:", initialCash)

    // Membuat data baru untuk ditambahkan ke datagrid
    const newShiftData = {
      id: rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1,
      waktuTutupShift: new Date().toLocaleString("id-ID"),
      kasir: "Kasir Saat Ini", // Ini bisa diganti dengan informasi kasir yang sedang login
      tunaiDiharapkan: parseInt(initialCash) || 0,
      tunaiDihitung: parseInt(initialCash) || 0,
      selisih: 0,
    }

    // Menambahkan data baru ke rows
    setRows([...rows, newShiftData])

    // Reset form dan tutup modal
    handleCloseNewShiftModal()
  }

  const columns: GridColDef[] = [
    { field: "waktuTutupShift", headerName: "Waktu Tutup Shift", width: 200 },
    { field: "kasir", headerName: "Kasir", width: 150 },
    {
      field: "tunaiDiharapkan",
      headerName: "Tunai Diharapkan (Rp)",
      width: 200,
    },
    { field: "tunaiDihitung", headerName: "Tunai Dihitung (Rp)", width: 200 },
    { field: "selisih", headerName: "Selisih (Rp)", width: 150 },
    {
      field: "aksi",
      headerName: "Aksi",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleViewClick(params.row)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ]

  const [rows, setRows] = useState<any[]>([])
  const rows2 = [
    {
      id: 1,
      waktuTutupShift: "2023-05-01 22:00",
      kasir: "Budi",
      tunaiDiharapkan: 1000000,
      tunaiDihitung: 980000,
      selisih: -20000,
    },
    {
      id: 2,
      waktuTutupShift: "2023-05-02 22:00",
      kasir: "Ani",
      tunaiDiharapkan: 1200000,
      tunaiDihitung: 1220000,
      selisih: 20000,
    },
    {
      id: 3,
      waktuTutupShift: "2023-05-03 22:00",
      kasir: "Sari",
      tunaiDiharapkan: 800000,
      tunaiDihitung: 800000,
      selisih: 0,
    },
  ]

  return (
    <Box p={6}>
      <Typography variant="h4" component="h1" gutterBottom>
        Laporan Shift (Z-Report)
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayCircleOutlineIcon />}
          sx={{ py: 1, px: 2, fontSize: "1rem" }}
          onClick={handleOpenFirstShift}
        >
          BUKA SHIFT BARU
        </Button>
      </Box>
      <Box
        sx={{
          borderRadius: 1,
          boxShadow: 1,
          p: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Cari laporan shift..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <RefreshIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          borderRadius: 1,
          boxShadow: 1,
          p: 3,
          height: 600,
          width: "100%",
        }}
      >
        {rows.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            <SentimentDissatisfiedIcon
              sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" mb={2}>
              Belum ada riwayat laporan shift.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayCircleOutlineIcon />}
              sx={{ py: 1, px: 2, fontSize: "1rem" }}
              onClick={handleOpenFirstShift}
            >
              Buka Shift Pertama
            </Button>
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          />
        )}
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="detail-shift-modal"
        aria-describedby="detail-shift-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="detail-shift-modal"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Detail Laporan Shift
          </Typography>

          {selectedRow && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>{selectedRow.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Waktu Tutup Shift</TableCell>
                    <TableCell>{selectedRow.waktuTutupShift}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Kasir</TableCell>
                    <TableCell>{selectedRow.kasir}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tunai Diharapkan (Rp)</TableCell>
                    <TableCell>
                      {selectedRow.tunaiDiharapkan?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tunai Dihitung (Rp)</TableCell>
                    <TableCell>
                      {selectedRow.tunaiDihitung?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Selisih (Rp)</TableCell>
                    <TableCell>
                      {selectedRow.selisih?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ mt: 2, textAlign: "right" }}>
            <IconButton onClick={handleCloseModal}>Tutup</IconButton>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openNewShiftModal}
        onClose={handleCloseNewShiftModal}
        aria-labelledby="new-shift-modal"
        aria-describedby="new-shift-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="new-shift-modal"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Buka Shift Baru
          </Typography>

          <TextField
            fullWidth
            label="Modal awal (Tunai di laci)"
            variant="outlined"
            type="number"
            value={initialCash}
            onChange={(e) => setInitialCash(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 3, display: "block" }}
          >
            Masukkan jumlah uang tunai anda dilaci saat ini
          </Typography>

          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenShift}
            >
              BUKA SHIFT
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default ShiftReportPage
