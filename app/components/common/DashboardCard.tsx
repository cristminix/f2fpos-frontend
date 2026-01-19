import React from "react"
import { Card, CardContent, Typography, Box } from "@mui/material"

interface DashboardCardProps {
  title: string
  value: string
  icon?: React.ReactNode // Opsional jika ingin menambahkan ikon
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,

  icon,
}) => {
  return (
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
        <Box display="flex" alignItems="center" mb={1}>
          {icon && <Box mr={1}>{icon}</Box>}
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" className="text-xl">
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DashboardCard
