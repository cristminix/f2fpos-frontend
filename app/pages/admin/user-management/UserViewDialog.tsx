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
import type { User } from "~/types/user"

interface UserViewDialogProps {
  open: boolean
  onClose: () => void
  user: User | null
  loading: boolean
}

const UserViewDialog = ({
  open,
  onClose,
  user,
  loading,
}: UserViewDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detail Pengguna</DialogTitle>
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
        ) : user ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Email:</strong> {user.email}
            </Typography>
            {/* Tambahkan detail lain jika ada */}
          </Box>
        ) : (
          <Typography>Data pengguna tidak ditemukan.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserViewDialog
