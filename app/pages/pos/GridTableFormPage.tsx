import React, { useState } from "react"
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { useTheme } from "../../components/common/ThemeProvider"

// Interface untuk data user
interface User {
  id: number
  name: string
  email: string
  role: string
}

const GridTableFormPage = () => {
  const { toggleTheme, theme } = useTheme()

  // State untuk form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  })

  // State untuk data tabel
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "moderator" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "user" },
  ])

  // State untuk dialog
  const [openDialog, setOpenDialog] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Handler untuk perubahan input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handler untuk submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === currentUser.id
            ? ({ ...formData, id: currentUser.id } as User)
            : user,
        ),
      )
      setCurrentUser(null)
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        ...formData,
      }
      setUsers([...users, newUser])
    }

    // Reset form
    setFormData({ name: "", email: "", role: "user" })
  }

  // Handler untuk edit user
  const handleEdit = (user: User) => {
    setCurrentUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    })
  }

  // Handler untuk delete user
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
    setOpenDialog(false)
  }

  // Handler untuk buka dialog delete
  const handleOpenDialog = (user: User) => {
    setCurrentUser(user)
    setOpenDialog(true)
  }

  // Handler untuk tutup dialog
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCurrentUser(null)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: "background.paper",
          color: "text.primary",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Material UI Responsive Grid with Table & Form
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            paragraph
          >
            Contoh implementasi grid responsive menggunakan Material UI dengan
            tabel dan form
          </Typography>
        </Box>
        <Button onClick={toggleTheme} variant="outlined" color="inherit">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Paper>

      {/* Grid dengan Form dan Tabel */}
      <Grid container spacing={3}>
        {/* Kolom untuk Form */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {currentUser ? "Edit User" : "Add New User"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="dense"
                required
                size="small"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="dense"
                required
                size="small"
              />
              <FormControl fullWidth margin="dense" size="small">
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  label="Role"
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as string })
                  }
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>
              <Box
                sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {currentUser ? "Update User" : "Add User"}
                </Button>
                {currentUser && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => {
                      setCurrentUser(null)
                      setFormData({ name: "", email: "", role: "user" })
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Kolom untuk Tabel */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              User Data Table
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                      ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                      Role
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textAlign: "right",
                        fontSize: "0.8rem",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {user.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {user.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {user.email}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {user.role}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(user)}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleOpenDialog(user)}
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog Konfirmasi Hapus */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete user{" "}
            <strong>{currentUser?.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => currentUser && handleDelete(currentUser.id)}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default GridTableFormPage
