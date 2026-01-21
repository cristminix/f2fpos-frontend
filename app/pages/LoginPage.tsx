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

import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { LoginService } from "~/services/LoginService"
const loginService = new LoginService()
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
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  // Redirect to home if user is already authenticated
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    // Password minimal 6 karakter
    return password.length >= 6
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    // Reset errors
    setEmailError("")
    setPasswordError("")

    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    let isValid = true

    // Validate email
    if (!email) {
      setEmailError("Email is required")
      isValid = false
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters")
      isValid = false
    }

    // Stop if validation fails
    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    if (email && password) {
      // // Create dummy user data
      // const dummyUser = {
      //   id: "1",
      //   username: email.split("@")[0], // Extract username from email
      //   email: email,
      //   role: "user",
      //   name: email.split("@")[0],
      // }

      // // Save user data to localStorage via AuthContext
      // login(dummyUser)
      const result = await loginService.login(email, password)
      console.log({ result })
      const { success, message, user, roles } = result
      if (!success) {
        setError(message)
      } else {
        for (const role of roles) {
          if (role.includes("group:")) {
            const roleName = role.replace("group:", "")
            console.log(roleName)
            user.role = roleName
          }
        }
        login(user)
      }
      setIsSubmitting(false)

      // The navigation will be handled by the useEffect above
    } else {
      setError("Please enter both email and password.")
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
            <Grid size={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>
          </Grid>
          {error && (
            <Box mt={2} mb={2}>
              <Typography color="error" align="center">
                {error}
              </Typography>
            </Box>
          )}
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </StyledButton>
          <Grid container>
            {/* <Grid size={12}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid size={12}>
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
