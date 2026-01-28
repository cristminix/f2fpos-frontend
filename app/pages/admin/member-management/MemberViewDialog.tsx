import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material"
import type { Member } from "~/types/member"

interface MemberViewDialogProps {
  open: boolean
  onClose: () => void
  member: Member | null
  loading: boolean
}

const MemberViewDialog = ({
  open,
  onClose,
  member,
  loading,
}: MemberViewDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detail Member</DialogTitle>
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
        ) : member ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              <strong>Nama Lengkap:</strong> {member.fullName}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Email:</strong> {member.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Nomor Telepon:</strong> {member.phoneNumber}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Jenis Member:</strong> {member.memberType}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Status Akun:</strong>{" "}
              {member.accountStatus?.replace(/_/g, " ")}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Password:</strong> ••••••••
            </Typography>
          </Box>
        ) : (
          <Typography>Data member tidak ditemukan.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MemberViewDialog
