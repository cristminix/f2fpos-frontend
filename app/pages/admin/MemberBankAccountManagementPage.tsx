import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"
import MemberBankAccountManagementGridTable from "./member-bank-account-management/MemberBankAccountManagementGridTable"
import MemberBankAccountForm from "./member-bank-account-management/MemberBankAccountForm"
import { MemberBankAccountService } from "~/services/MemberBankAccountService"
import ConfirmationDialog from "~/components/common/ConfirmationDialog"
import MemberBankAccountViewDialog from "./member-bank-account-management/MemberBankAccountViewDialog"
import type { MemberBankAccount } from "~/types/member-bank-account"

const MemberBankAccountManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMemberBankAccount, setEditingMemberBankAccount] =
    useState<MemberBankAccount | null>(null)
  const [memberBankAccountToDelete, setMemberBankAccountToDelete] =
    useState<MemberBankAccount | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [viewingMemberBankAccount, setViewingMemberBankAccount] =
    useState<MemberBankAccount | null>(null)
  const [viewLoading, setViewLoading] = useState(false)
  const [refreshGrid, setRefreshGrid] = useState(0)
  const service = new MemberBankAccountService()

  const handleOpenForm = (
    memberBankAccount: MemberBankAccount | null = null,
  ) => {
    setEditingMemberBankAccount(memberBankAccount)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingMemberBankAccount(null)
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

  const handleOpenConfirm = (memberBankAccount: MemberBankAccount) => {
    setMemberBankAccountToDelete(memberBankAccount)
    setIsConfirmOpen(true)
  }

  const handleCloseConfirm = () => {
    setMemberBankAccountToDelete(null)
    setIsConfirmOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (memberBankAccountToDelete) {
      await service.delete(memberBankAccountToDelete.id)
      handleCloseConfirm()
      setRefreshGrid((prev) => prev + 1)
    }
  }

  const handleOpenView = async (memberBankAccount: MemberBankAccount) => {
    setIsViewOpen(true)
    setViewLoading(true)
    const response = await service.getById(memberBankAccount.id)
    if (response && response.success && response.data) {
      setViewingMemberBankAccount(response.data)
    }
    setViewLoading(false)
  }

  const handleCloseView = () => {
    setIsViewOpen(false)
    setViewingMemberBankAccount(null)
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
          Member Bank Account Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
        >
          Tambah Rekening Bank
        </Button>
      </Box>
      <MemberBankAccountManagementGridTable
        key={refreshGrid}
        onEditClick={handleOpenForm}
        onDeleteClick={handleOpenConfirm}
        onViewClick={handleOpenView}
      />
      <MemberBankAccountForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        initialData={editingMemberBankAccount}
      />
      <ConfirmationDialog
        open={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus rekening bank "${memberBankAccountToDelete?.bankName} - ${memberBankAccountToDelete?.accountNumber || ""}"?`}
      />
      <MemberBankAccountViewDialog
        open={isViewOpen}
        onClose={handleCloseView}
        memberBankAccount={viewingMemberBankAccount}
        loading={viewLoading}
      />
    </Box>
  )
}

export default MemberBankAccountManagementPage
