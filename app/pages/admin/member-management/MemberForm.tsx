import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import type { Member } from "~/types/member"

interface MemberFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: any, formikBag: any) => void
  initialData?: Member | null
}

const MemberForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: MemberFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: initialData?.id || null,
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phoneNumber: initialData?.phoneNumber || "",
      memberType: initialData?.memberType || "",
      accountStatus: initialData?.accountStatus || "",
      password: initialData?.password || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Nama Lengkap wajib diisi"),
      email: Yup.string()
        .email("Format email tidak valid")
        .required("Email wajib diisi"),
      phoneNumber: Yup.string().required("Nomor Telepon wajib diisi"),
      memberType: Yup.string().required("Jenis Member wajib diisi"),
      accountStatus: Yup.string().required("Status Akun wajib diisi"),
      password: Yup.string()
        .min(8, "Password minimal 8 karakter")
        .required("Password wajib diisi"),
    }),
    onSubmit: (values: any, formikBag: any) => {
      onSubmit(values, formikBag)
    },
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {initialData ? "Edit Member" : "Tambah Member Baru"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nomor Telepon"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Jenis Member</InputLabel>
              <Select
                name="memberType"
                value={formik.values.memberType || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.memberType && Boolean(formik.errors.memberType)
                }
              >
                <MenuItem value="OWNER">OWNER</MenuItem>
                <MenuItem value="DISTRIBUTOR">DISTRIBUTOR</MenuItem>
                <MenuItem value="RESELLER">RESELLER</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status Akun</InputLabel>
              <Select
                name="accountStatus"
                value={formik.values.accountStatus || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.accountStatus &&
                  Boolean(formik.errors.accountStatus)
                }
              >
                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
                <MenuItem value="WAITING_FOR_CHANGES">
                  WAITING FOR CHANGES
                </MenuItem>
                <MenuItem value="WAITING_FOR_REVIEW">
                  WAITING FOR REVIEW
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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

export default MemberForm
