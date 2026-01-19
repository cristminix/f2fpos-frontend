import React, { useEffect } from "react"
import { Box, Typography, Card, CardContent, Grid } from "@mui/material"
import DashboardCard from "../components/common/DashboardCard"
import ApexCharts from "apexcharts"
const loadChart = () => {
  const chartConfig = {
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    chart: {
      type: "line",
      height: 240,
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  }

  const chart = new ApexCharts(
    document.querySelector("#chart-tren-penjualan"),
    chartConfig,
  )

  chart.render()
}
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
  useEffect(() => {
    loadChart()
  }, [])
  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} mt={3}>
          <Grid container spacing={2}>
            {dashboardItems.map((item, i) => {
              return (
                <Grid
                  size={{ xs: 12, sm: 6, md: 3 }}
                  className="grid-item"
                  key={i}
                >
                  <DashboardCard title={item.title} value={item.value} />
                </Grid>
              )
            })}
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }} mt={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }} className="grid-item">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "background.paper",
                  color: "text.primary",
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Tren Penjualan
                  </Typography>
                  <div id="chart-tren-penjualan"></div>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} className="grid-item">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "background.paper",
                  color: "text.primary",
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Produk Terlaris
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default DashboardPage
