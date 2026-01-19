import React, { useEffect } from "react"
import { Box, Typography, Card, CardContent, Grid } from "@mui/material"
import DashboardCard from "../components/common/DashboardCard"
import ApexCharts from "apexcharts"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

function createData(no: number, name: string, qty: number, total: number) {
  return { no, name, qty, total }
}

const rows = [
  createData(1, "Frozen yoghurt", 159, 20000),
  createData(2, "Ice cream sandwich", 237, 20000),
  createData(3, "Eclair", 262, 20000),
  createData(4, "Cupcake", 305, 20000),
  createData(5, "Gingerbread", 356, 20000),
]

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.no}</TableCell>
              <TableCell align="left">
                <div>{row.name} </div>
                <div>{row.qty} Unit</div>
              </TableCell>
              <TableCell align="right">Rp{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// State to keep track of the chart instance
let chartInstance: ApexCharts | null = null

const loadChart = () => {
  // Destroy the existing chart if it exists to prevent duplicates
  if (chartInstance) {
    chartInstance.destroy()
  }

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

  // Store the chart instance for cleanup
  chartInstance = chart
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
      value: "Rp 500.000",
    },
    {
      id: 4,
      title: "Rata-Rata Basket",
      value: "Rp 850.000",
    },
  ]
  useEffect(() => {
    loadChart()

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy()
        chartInstance = null
      }
    }
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
                  <Box sx={{ height: 400, width: "100%" }}>
                    <BasicTable />
                  </Box>
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
