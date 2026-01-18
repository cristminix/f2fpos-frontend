import React, { useState } from "react"
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

import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect to home if user is already authenticated
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    // Dummy authentication - in real app, this would be an API call
    if (username && password) {
      // Create dummy user data
      const dummyUser = {
        id: "1",
        username: username,
        email: `${username}@example.com`,
        role: "user",
        name: username,
      }

      // Save user data to localStorage via AuthContext
      login(dummyUser)

      // The navigation will be handled by the useEffect above
    } else {
      setError("Please enter both username and password.")
      setIsSubmitting(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {/*@ts-ignore*/}
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
            {/*@ts-ignore*/}
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
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
