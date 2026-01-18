import React from "react"
import { Box, Typography, Container, Button } from "@mui/material"
import { Link } from "react-router"

interface AccessDeniedProps {
  pathname?: string
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ pathname }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Box
        sx={{
          p: 4,
          border: "1px solid #ddd",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          Akses Ditolak
        </Typography>
        <Typography variant="body1" gutterBottom>
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
        </Typography>
        {pathname && (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Rute: {pathname}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Silakan hubungi administrator jika Anda merasa seharusnya memiliki
          akses.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Kembali ke Beranda
        </Button>
      </Box>
    </Container>
  )
}

export default AccessDenied
