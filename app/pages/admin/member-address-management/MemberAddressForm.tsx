import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import type { MemberAddress } from "~/types/member-address"

interface MemberAddressFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: any, formikBag: any) => void
  initialData?: MemberAddress | null
}

const MemberAddressForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: MemberAddressFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: initialData?.id || null,
      memberId: initialData?.memberId || "",
      street: initialData?.street || "",
      subDistrict: initialData?.subDistrict || "",
      city: initialData?.city || "",
      province: initialData?.province || "",
      zipCode: initialData?.zipCode || "",
      isPrimary: initialData?.isPrimary || 0,
    },
    validationSchema: Yup.object({
      memberId: Yup.number()
        .required("ID Member wajib diisi")
        .typeError("ID Member harus berupa angka"),
      street: Yup.string().required("Jalan wajib diisi"),
      subDistrict: Yup.string().required("Kecamatan wajib diisi"),
      city: Yup.string().required("Kota wajib diisi"),
      province: Yup.string().required("Provinsi wajib diisi"),
      zipCode: Yup.string()
        .required("Kode Pos wajib diisi")
        .matches(/^[0-9]+$/, "Kode Pos harus berupa angka"),
    }),
    onSubmit: (values: any, formikBag: any) => {
      const submitData = {
        ...values,
        memberId: Number(values.memberId),
        isPrimary: values.isPrimary ? 1 : 0,
      }
      onSubmit(submitData, formikBag)
    },
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {initialData ? "Edit Alamat Member" : "Tambah Alamat Member Baru"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="ID Member"
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
              label="Jalan"
              name="street"
              multiline
              rows={2}
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Kecamatan"
              name="subDistrict"
              value={formik.values.subDistrict}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.subDistrict && Boolean(formik.errors.subDistrict)
              }
              helperText={
                formik.touched.subDistrict && formik.errors.subDistrict
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Kota"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Provinsi"
              name="province"
              value={formik.values.province}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.province && Boolean(formik.errors.province)}
              helperText={formik.touched.province && formik.errors.province}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Kode Pos"
              name="zipCode"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isPrimary"
                  checked={formik.values.isPrimary === 1}
                  onChange={(e) =>
                    formik.setFieldValue("isPrimary", e.target.checked ? 1 : 0)
                  }
                />
              }
              label="Jadikan sebagai alamat utama"
              sx={{ mt: 1 }}
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

export default MemberAddressForm
