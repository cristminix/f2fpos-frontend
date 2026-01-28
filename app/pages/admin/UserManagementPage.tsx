import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"
import UserManagementGridTable from "./user-management/UserManagementGridTable"
import UserForm from "./user-management/UserForm"
import { UserService } from "~/services/UserService"
import ConfirmationDialog from "~/components/common/ConfirmationDialog"
import UserViewDialog from "./user-management/UserViewDialog"
import type { User } from "~/types/user"

const UserManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [viewingUser, setViewingUser] = useState<User | null>(null)
  const [viewLoading, setViewLoading] = useState(false)
  const [refreshGrid, setRefreshGrid] = useState(0)
  const service = new UserService()

  const handleOpenForm = (user: User | null = null) => {
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

  const handleOpenConfirm = (user: User) => {
    setUserToDelete(user)
    setIsConfirmOpen(true)
  }

  const handleCloseConfirm = () => {
    setUserToDelete(null)
    setIsConfirmOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await service.delete(userToDelete.id)
      handleCloseConfirm()
      setRefreshGrid((prev) => prev + 1)
    }
  }

  const handleOpenView = async (user: User) => {
    setIsViewOpen(true)
    setViewLoading(true)
    const response = await service.getById(user.id)
    if (response && response.success && response.data) {
      setViewingUser(response.data)
    }
    setViewLoading(false)
  }

  const handleCloseView = () => {
    setIsViewOpen(false)
    setViewingUser(null)
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
      <UserManagementGridTable
        key={refreshGrid}
        onEditClick={handleOpenForm}
        onDeleteClick={handleOpenConfirm}
        onViewClick={handleOpenView}
      />
      <UserForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        initialData={editingUser}
      />
      <ConfirmationDialog
        open={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus pengguna "${
          userToDelete?.username || ""
        }"?`}
      />
      <UserViewDialog
        open={isViewOpen}
        onClose={handleCloseView}
        user={viewingUser}
        loading={viewLoading}
      />
    </Box>
  )
}

export default UserManagementPage
