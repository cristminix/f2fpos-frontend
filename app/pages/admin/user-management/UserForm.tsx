import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Alert,
} from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
import { useEffect } from "react"

interface UserFormValues {
  id?: number
  username: string
  email: string
  password?: string
}

interface UserFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (
    values: UserFormValues,
    formikHelpers: { setErrors: (errors: any) => void },
  ) => void
  initialData?: UserFormValues | null
}

const UserForm = ({ open, onClose, onSubmit, initialData }: UserFormProps) => {
  const isEditMode = Boolean(initialData)

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .when([], {
        is: () => !isEditMode,
        then: (schema) => schema.required("Password is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
  })

  const formik = useFormik({
    initialValues: {
      id: initialData?.id || undefined,
      username: initialData?.username || "",
      email: initialData?.email || "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (
      values: UserFormValues,
      formikHelpers: { setErrors: (errors: any) => void },
    ) => {
      onSubmit(values, formikHelpers)
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    if (!open) {
      formik.resetForm()
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditMode ? "Edit User" : "Tambah User Baru"}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {formik.errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formik.errors.submit}
            </Alert>
          )}
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder={
              isEditMode ? "Kosongkan jika tidak ingin mengubah" : ""
            }
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button color="primary" variant="contained" type="submit">
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UserForm
