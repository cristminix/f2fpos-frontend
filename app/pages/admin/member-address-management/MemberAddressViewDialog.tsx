import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material"
import type { MemberAddress } from "~/types/member-address"

interface MemberAddressViewDialogProps {
  open: boolean
  onClose: () => void
  address: MemberAddress | null
  loading: boolean
}

const MemberAddressViewDialog = ({
  open,
  onClose,
  address,
  loading,
}: MemberAddressViewDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Detail Alamat Member</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 150,
            }}
          >
            <CircularProgress />
          </Box>
        ) : address ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              <strong>ID Member:</strong> {address.memberId}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Jalan:</strong> {address.street}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Kecamatan:</strong> {address.subDistrict}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Kota:</strong> {address.city}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Provinsi:</strong> {address.province}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Kode Pos:</strong> {address.zipCode}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip
                label={
                  address.isPrimary === 1 ? "Alamat Utama" : "Alamat Tambahan"
                }
                color={address.isPrimary === 1 ? "primary" : "default"}
              />
            </Box>
          </Box>
        ) : (
          <Typography>Data alamat tidak ditemukan.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MemberAddressViewDialog
