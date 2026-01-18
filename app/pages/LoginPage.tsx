import React from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { type Theme } from "@mui/material"

const StyledPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 400,
  margin: "auto",
  marginTop: theme.spacing(8),
}))

const StyledForm = styled("form")(({ theme }: { theme: Theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}))

const StyledButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(3, 0, 2),
}))

const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <StyledForm noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </StyledButton>
          <Grid container>
            {/* <Grid item xs={12}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </StyledForm>
      </StyledPaper>
    </Container>
  )
}

export default LoginPage
