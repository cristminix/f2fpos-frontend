import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"
import MemberAddressGridTable from "./member-address-management/MemberAddressGridTable"
import MemberAddressForm from "./member-address-management/MemberAddressForm"
import { MemberAddressService } from "~/services/MemberAddressService"
import ConfirmationDialog from "~/components/common/ConfirmationDialog"
import MemberAddressViewDialog from "./member-address-management/MemberAddressViewDialog"
import type { MemberAddress } from "~/types/member-address"

const MemberAddressManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<MemberAddress | null>(
    null,
  )
  const [addressToDelete, setAddressToDelete] = useState<MemberAddress | null>(
    null,
  )
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [viewingAddress, setViewingAddress] = useState<MemberAddress | null>(
    null,
  )
  const [viewLoading, setViewLoading] = useState(false)
  const [refreshGrid, setRefreshGrid] = useState(0)
  const service = new MemberAddressService()

  const handleOpenForm = (address: MemberAddress | null = null) => {
    setEditingAddress(address)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingAddress(null)
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

  const handleOpenConfirm = (address: MemberAddress) => {
    setAddressToDelete(address)
    setIsConfirmOpen(true)
  }

  const handleCloseConfirm = () => {
    setAddressToDelete(null)
    setIsConfirmOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (addressToDelete) {
      await service.delete(addressToDelete.id)
      handleCloseConfirm()
      setRefreshGrid((prev) => prev + 1)
    }
  }

  const handleOpenView = async (address: MemberAddress) => {
    setIsViewOpen(true)
    setViewLoading(true)
    const response = await service.getById(address.id)
    if (response && response.success && response.data) {
      setViewingAddress(response.data)
    }
    setViewLoading(false)
  }

  const handleCloseView = () => {
    setIsViewOpen(false)
    setViewingAddress(null)
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
          Manajemen Alamat Member
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
        >
          Tambah Alamat
        </Button>
      </Box>
      <MemberAddressGridTable
        key={refreshGrid}
        onEditClick={handleOpenForm}
        onDeleteClick={handleOpenConfirm}
        onViewClick={handleOpenView}
      />
      <MemberAddressForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        initialData={editingAddress}
      />
      <ConfirmationDialog
        open={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus alamat untuk member ID "${
          addressToDelete?.memberId || ""
        }"?`}
      />
      <MemberAddressViewDialog
        open={isViewOpen}
        onClose={handleCloseView}
        address={viewingAddress}
        loading={viewLoading}
      />
    </Box>
  )
}

export default MemberAddressManagementPage
