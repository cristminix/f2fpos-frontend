import React, { useState } from "react"
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Button,
} from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  QrCode as QrCodeIcon,
} from "@mui/icons-material"

const ProductGridTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Define columns for the data grid
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <Box
          component="img"
          src={params.value || "/placeholder-image.jpg"}
          alt="Product"
          sx={{ width: 50, height: 50, objectFit: "cover", borderRadius: 1 }}
        />
      ),
    },
    { field: "namaProduk", headerName: "Nama Produk", width: 200 },
    { field: "kategori", headerName: "Kategori", width: 150 },
    { field: "sku", headerName: "SKU", width: 150 },
    {
      field: "hargaJual",
      headerName: "Harga Jual (Rp)",
      width: 150,
      renderCell: (params) => {
        const value = params.row.hargaJual
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(Number(value) || 0)
      },
    },
    { field: "stokSaatIni", headerName: "Stok Saat Ini", width: 150 },
    {
      field: "aksi",
      headerName: "Aksi",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            size="small"
            onClick={() =>
              console.log("Edit clicked for product:", params.row.namaProduk)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() =>
              console.log("Delete clicked for product:", params.row.namaProduk)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </IconButton>
        </Box>
      ),
    },
  ]

  // Sample data for the grid
  const rows = [
    {
      id: 1,
      image: "",
      namaProduk: "Produk 1",
      kategori: "Kategori A",
      sku: "SKU001",
      hargaJual: "10000",
      stokSaatIni: 10,
      aksi: "",
    },
    {
      id: 2,
      image: "",
      namaProduk: "Produk 2",
      kategori: "Kategori B",
      sku: "SKU002",
      hargaJual: "25000",
      stokSaatIni: 5,
      aksi: "",
    },
    {
      id: 3,
      image: "",
      namaProduk: "Produk 3",
      kategori: "Kategori A",
      sku: "SKU003",
      hargaJual: "15000",
      stokSaatIni: 20,
      aksi: "",
    },
  ]

  return (
    <Box>
      {/* Search box with icons and add button */}

      <Box
        sx={{
          borderRadius: 1,
          boxShadow: 1,
          p: 2,
          mb: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ flex: 1 }}
          placeholder="Cari produk..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => console.log("Refresh clicked")}>
                  <RefreshIcon />
                </IconButton>
                <IconButton onClick={() => console.log("QR Code clicked")}>
                  <QrCodeIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Data grid table */}
      <Paper
        sx={{
          borderRadius: 1,
          boxShadow: 1,
          p: 3,
          height: 600,
          width: "100%",
        }}
      >
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
      </Paper>
    </Box>
  )
}

export default ProductGridTable
