import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import type { MemberBankAccount } from "~/types/member-bank-account"

interface MemberBankAccountFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: any, formikBag: any) => void
  initialData?: MemberBankAccount | null
}

const MemberBankAccountForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: MemberBankAccountFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: initialData?.id || null,
      memberId: initialData?.memberId || "",
      bankName: initialData?.bankName || "",
      bankCode: initialData?.bankCode || "",
      accountNumber: initialData?.accountNumber || "",
      accountHolderName: initialData?.accountHolderName || "",
    },
    validationSchema: Yup.object({
      memberId: Yup.number()
        .typeError("Member ID harus berupa angka")
        .required("Member ID wajib diisi"),
      bankName: Yup.string().required("Nama Bank wajib diisi"),
      bankCode: Yup.string().required("Kode Bank wajib diisi"),
      accountNumber: Yup.string().required("Nomor Rekening wajib diisi"),
      accountHolderName: Yup.string().required(
        "Nama Pemilik Rekening wajib diisi",
      ),
    }),
    onSubmit: (values: any, formikBag: any) => {
      onSubmit(values, formikBag)
    },
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {initialData ? "Edit Rekening Bank" : "Tambah Rekening Bank Baru"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Member ID"
              name="memberId"
              type="number"
              value={formik.values.memberId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.memberId && Boolean(formik.errors.memberId)}
              helperText={formik.touched.memberId && formik.errors.memberId}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nama Bank"
              name="bankName"
              value={formik.values.bankName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bankName && Boolean(formik.errors.bankName)}
              helperText={formik.touched.bankName && formik.errors.bankName}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Kode Bank"
              name="bankCode"
              value={formik.values.bankCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bankCode && Boolean(formik.errors.bankCode)}
              helperText={formik.touched.bankCode && formik.errors.bankCode}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nomor Rekening"
              name="accountNumber"
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.accountNumber &&
                Boolean(formik.errors.accountNumber)
              }
              helperText={
                formik.touched.accountNumber && formik.errors.accountNumber
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nama Pemilik Rekening"
              name="accountHolderName"
              value={formik.values.accountHolderName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.accountHolderName &&
                Boolean(formik.errors.accountHolderName)
              }
              helperText={
                formik.touched.accountHolderName &&
                formik.errors.accountHolderName
              }
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? "Simpan" : "Tambah"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default MemberBankAccountForm
