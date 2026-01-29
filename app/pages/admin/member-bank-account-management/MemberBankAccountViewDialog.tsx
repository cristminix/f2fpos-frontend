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
import type { MemberBankAccount } from "~/types/member-bank-account"

interface MemberBankAccountViewDialogProps {
  open: boolean
  onClose: () => void
  memberBankAccount: MemberBankAccount | null
  loading: boolean
}

const MemberBankAccountViewDialog = ({
  open,
  onClose,
  memberBankAccount,
  loading,
}: MemberBankAccountViewDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detail Rekening Bank</DialogTitle>
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
        ) : memberBankAccount ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              <strong>Member ID:</strong> {memberBankAccount.memberId}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Nama Bank:</strong> {memberBankAccount.bankName}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Kode Bank:</strong> {memberBankAccount.bankCode}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Nomor Rekening:</strong> {memberBankAccount.accountNumber}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Nama Pemilik Rekening:</strong>{" "}
              {memberBankAccount.accountHolderName}
            </Typography>
          </Box>
        ) : (
          <Typography>Data rekening bank tidak ditemukan.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MemberBankAccountViewDialog
