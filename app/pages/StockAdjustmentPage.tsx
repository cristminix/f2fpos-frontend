import React from "react"
import { Box, Typography, Paper } from "@mui/material"

export const StockAdjustmentPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Stock Adjustment
        </Typography>
        <Typography variant="body1">Hello World</Typography>
      </Paper>
    </Box>
  )
}
