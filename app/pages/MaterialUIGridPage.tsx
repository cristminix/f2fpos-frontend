import React from "react"
import { Container, Typography, Paper, Box, Button } from "@mui/material"
import { MaterialUIGrid } from "../components/ui/MaterialUIGrid"
import { useTheme } from "../components/common/ThemeProvider"

const MaterialUIGridPage = () => {
  const { toggleTheme, theme } = useTheme()

  const sampleItems = [
    {
      id: 1,
      title: "Dashboard",
      description: "Ringkasan informasi penting dan metrik utama",
    },
    {
      id: 2,
      title: "Analytics",
      description: "Analisis data dan statistik aplikasi",
    },
    {
      id: 3,
      title: "Settings",
      description: "Pengaturan aplikasi dan preferensi pengguna",
    },
    {
      id: 4,
      title: "Reports",
      description: "Laporan dan dokumentasi sistem",
    },
    {
      id: 5,
      title: "Users",
      description: "Manajemen pengguna dan izin akses",
    },
    {
      id: 6,
      title: "Products",
      description: "Daftar produk dan inventaris",
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: "background.paper",
          color: "text.primary",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Material UI Responsive Grid
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            paragraph
          >
            Contoh implementasi grid responsive menggunakan Material UI dengan
            berbagai ukuran layar
          </Typography>
        </Box>
        <Button onClick={toggleTheme} variant="outlined" color="inherit">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Paper>

      <Box sx={{ py: 2 }}>
        <MaterialUIGrid
          items={sampleItems}
          columns={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        />
      </Box>
    </Container>
  )
}

export default MaterialUIGridPage
