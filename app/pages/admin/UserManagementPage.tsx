import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"
import UserManagementGridTable from "./user-management/UserManagementGridTable"
import UserForm from "./user-management/UserForm"
import { UserService } from "~/services/UserService"

const UserManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [refreshGrid, setRefreshGrid] = useState(0)
  const service = new UserService()

  const handleOpenForm = (user: any = null) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingUser(null)
    setIsFormOpen(false)
  }

  const handleSubmitForm = async (values: any, { setErrors }: any) => {
    const { id, ...data } = values
    const serviceAction = id ? service.update(id, data) : service.create(data)

    const response = await serviceAction

    if (response.success) {
      handleCloseForm()
      setRefreshGrid((prev) => prev + 1)
    } else {
      setErrors({ submit: response.message })
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
        >
          Tambah User
        </Button>
      </Box>
      <UserManagementGridTable key={refreshGrid} onEditClick={handleOpenForm} />
      <UserForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        initialData={editingUser}
      />
    </Box>
  )
}

export default UserManagementPage
