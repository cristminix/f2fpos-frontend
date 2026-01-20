import React from "react"

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem as MuiMenuItem,
  Chip,
  Stack,
  Button,
} from "@mui/material"
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Receipt as ReceiptIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material"

interface SalesHistoryItem {
  id: string
  invoiceNumber: string
  date: string
  time: string
  customer: string
  items: number
  total: number
  paymentMethod: string
  status: "Completed" | "Cancelled" | "Pending" | "Void" | "Return"
}

const SalesHistoryPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedItem, setSelectedItem] =
    React.useState<SalesHistoryItem | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [dateFilter, setDateFilter] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("Semua")
  const [refreshKey, setRefreshKey] = React.useState(0)

  // Data dummy untuk riwayat penjualan
  const salesHistoryData: SalesHistoryItem[] = [
    {
      id: "1",
      invoiceNumber: "INV-001",
      date: "2024-01-15",
      time: "10:30",
      customer: "Budi Santoso",
      items: 3,
      total: 75000,
      paymentMethod: "Cash",
      status: "Completed",
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      date: "2024-01-15",
      time: "11:15",
      customer: "Siti Aisyah",
      items: 2,
      total: 50000,
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: "3",
      invoiceNumber: "INV-003",
      date: "2024-01-15",
      time: "12:45",
      customer: "Ahmad Fauzi",
      items: 5,
      total: 125000,
      paymentMethod: "Debit Card",
      status: "Pending",
    },
    {
      id: "4",
      invoiceNumber: "INV-004",
      date: "2024-01-14",
      time: "09:20",
      customer: "Dewi Lestari",
      items: 1,
      total: 25000,
      paymentMethod: "Cash",
      status: "Void",
    },
    {
      id: "5",
      invoiceNumber: "INV-005",
      date: "2024-01-14",
      time: "14:30",
      customer: "Rizki Ramadhan",
      items: 4,
      total: 100000,
      paymentMethod: "Credit Card",
      status: "Return",
    },
  ]

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: SalesHistoryItem,
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedItem(item)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedItem(null)
  }

  const handlePrint = () => {
    console.log("Print invoice:", selectedItem?.invoiceNumber)
    handleMenuClose()
  }

  const handleDownload = () => {
    console.log("Download invoice:", selectedItem?.invoiceNumber)
    handleMenuClose()
  }

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  // Filter data berdasarkan tanggal dan status
  const filteredData = salesHistoryData.filter((item) => {
    const matchesSearch =
      item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = !dateFilter || item.date === dateFilter

    const matchesStatus =
      statusFilter === "Semua" ||
      (statusFilter === "Lunas(Paid)" && item.status === "Completed") ||
      (statusFilter === "Pending(Open Bill)" && item.status === "Pending") ||
      (statusFilter === "Void/Batal" && item.status === "Void") ||
      (statusFilter === "Return" && item.status === "Return")

    return matchesSearch && matchesDate && matchesStatus
  })

  return (
    <Box sx={{ flexGrow: 1 }} mt={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography variant="h5">Riwayat Penjualan</Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    label="Cari Riwayat"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Filter Tanggal"
                    type="date"
                    variant="outlined"
                    size="small"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <FormControl
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 180 }}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(e.target.value as string)
                      }
                      input={<OutlinedInput label="Status" />}
                    >
                      <MuiMenuItem value="Semua">Semua</MuiMenuItem>
                      <MuiMenuItem value="Lunas(Paid)">Lunas(Paid)</MuiMenuItem>
                      <MuiMenuItem value="Pending(Open Bill)">
                        Pending(Open Bill)
                      </MuiMenuItem>
                      <MuiMenuItem value="Void/Batal">Void/Batal</MuiMenuItem>
                      <MuiMenuItem value="Return">Return</MuiMenuItem>
                    </Select>
                  </FormControl>
                  <IconButton
                    onClick={handleRefresh}
                    color="primary"
                    title="Refresh"
                  >
                    <RefreshIcon />
                  </IconButton>
                </Stack>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No. Invoice</TableCell>
                      <TableCell>Tanggal & Waktu</TableCell>
                      <TableCell>Pelanggan</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Metode Pembayaran</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.invoiceNumber}</TableCell>
                        <TableCell>
                          {item.date} {item.time}
                        </TableCell>
                        <TableCell>{item.customer}</TableCell>
                        <TableCell>{item.items}</TableCell>
                        <TableCell>Rp {item.total.toLocaleString()}</TableCell>
                        <TableCell>{item.paymentMethod}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "inline-block",
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor:
                                item.status === "Completed"
                                  ? "success.light"
                                  : item.status === "Pending"
                                    ? "warning.light"
                                    : item.status === "Void"
                                      ? "error.light"
                                      : item.status === "Return"
                                        ? "info.light"
                                        : "default.light",
                              color:
                                item.status === "Completed"
                                  ? "success.dark"
                                  : item.status === "Pending"
                                    ? "warning.dark"
                                    : item.status === "Void"
                                      ? "error.dark"
                                      : item.status === "Return"
                                        ? "info.dark"
                                        : "default.dark",
                            }}
                          >
                            {item.status === "Completed"
                              ? "Lunas"
                              : item.status === "Pending"
                                ? "Pending"
                                : item.status === "Void"
                                  ? "Void"
                                  : item.status === "Return"
                                    ? "Return"
                                    : item.status}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={(event) => handleMenuOpen(event, item)}
                            size="small"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Menu Aksi */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handlePrint}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cetak Invoice</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Unduh Invoice</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default SalesHistoryPage
