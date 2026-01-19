import React from "react"
import { Box, Typography, Card, CardContent, Grid } from "@mui/material"
import { MaterialUIGrid } from "../components/ui/MaterialUIGrid"
import DashboardCard from "../components/common/DashboardCard"

const DashboardPage: React.FC = () => {
  const dashboardItems = [
    {
      id: 1,
      title: "Total Pendapatan",
      value: "Rp 1.200.000",
    },
    {
      id: 2,
      title: "Total Transaksi",
      value: "150",
    },
    {
      id: 3,
      title: "Laba Kotor (Est.)",
      value: "Rp 1300",
    },
    {
      id: 4,
      title: "Rata-Rata Basket",
      value: "Rp 850.000",
    },
  ]

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} mt={3}>
          <Grid container spacing={2}>
            {dashboardItems.map((item) => {
              return (
                <Grid size={3} className="grid-item">
                  <DashboardCard title={item.title} value={item.value} />
                </Grid>
              )
            })}
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }} mt={3}>
          <Grid container spacing={2}>
            <Grid size={8} className="grid-item">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "background.paper",
                  color: "text.primary",
                }}
              >
                <CardContent> Tren Penjualan</CardContent>
              </Card>
            </Grid>
            <Grid size={4} className="grid-item">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "background.paper",
                  color: "text.primary",
                }}
              >
                <CardContent> Produk Terlaris</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default DashboardPage
