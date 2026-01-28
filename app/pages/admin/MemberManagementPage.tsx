import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"
import MemberManagementGridTable from "./member-management/MemberManagementGridTable"
import MemberForm from "./member-management/MemberForm"
import { MemberService } from "~/services/MemberService"
import ConfirmationDialog from "~/components/common/ConfirmationDialog"
import MemberViewDialog from "./member-management/MemberViewDialog"
import type { Member } from "~/types/member"

const MemberManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [viewingMember, setViewingMember] = useState<Member | null>(null)
  const [viewLoading, setViewLoading] = useState(false)
  const [refreshGrid, setRefreshGrid] = useState(0)
  const service = new MemberService()

  const handleOpenForm = (member: Member | null = null) => {
    setEditingMember(member)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingMember(null)
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

  const handleOpenConfirm = (member: Member) => {
    setMemberToDelete(member)
    setIsConfirmOpen(true)
  }

  const handleCloseConfirm = () => {
    setMemberToDelete(null)
    setIsConfirmOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (memberToDelete) {
      await service.delete(memberToDelete.id)
      handleCloseConfirm()
      setRefreshGrid((prev) => prev + 1)
    }
  }

  const handleOpenView = async (member: Member) => {
    setIsViewOpen(true)
    setViewLoading(true)
    const response = await service.getById(member.id)
    if (response && response.success && response.data) {
      setViewingMember(response.data)
    }
    setViewLoading(false)
  }

  const handleCloseView = () => {
    setIsViewOpen(false)
    setViewingMember(null)
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
          Member Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
        >
          Tambah Member
        </Button>
      </Box>
      <MemberManagementGridTable
        key={refreshGrid}
        onEditClick={handleOpenForm}
        onDeleteClick={handleOpenConfirm}
        onViewClick={handleOpenView}
      />
      <MemberForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        initialData={editingMember}
      />
      <ConfirmationDialog
        open={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus member "${
          memberToDelete?.fullName || ""
        }"?`}
      />
      <MemberViewDialog
        open={isViewOpen}
        onClose={handleCloseView}
        member={viewingMember}
        loading={viewLoading}
      />
    </Box>
  )
}

export default MemberManagementPage
