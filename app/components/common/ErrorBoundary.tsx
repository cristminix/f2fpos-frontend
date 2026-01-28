import { Box, Button, Container, Typography } from "@mui/material"
import { Link, isRouteErrorResponse } from "react-router"
import type { Route } from "../../+types/root"

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined
  console.log(error)
  if (isRouteErrorResponse(error)) {
    message = error.statusText
    details =
      (error.data as string) ||
      (error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details)
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

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
          {message}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {details}
        </Typography>
        {stack && (
          <Box
            component="pre"
            sx={{
              width: "100%",
              p: 2,
              overflowX: "auto",
              background: "#eee",
              border: "1px solid #ddd",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              mt: 2,
              mb: 2,
            }}
          >
            <code>{stack}</code>
          </Box>
        )}
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
