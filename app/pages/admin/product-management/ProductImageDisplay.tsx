import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import FileUploadService from "../../../services/FileUploadService"

const ProductImageDisplay = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      const result: any = await FileUploadService.upload(file)

      if (result.success && result.fileId) {
        const fileInfo: any = await FileUploadService.getFile(result.fileId)
        console.log(fileInfo)
        setImagePreview(fileInfo.content)
      } else if (result.error) {
        alert(result.error)
      }
    }
  }

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        p: 2,
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <input
          accept="image/*"
          id="upload-image"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <label htmlFor="upload-image">
            <Button variant="contained" component="span">
              Upload Gambar
            </Button>
          </label>
          {imagePreview && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => setImagePreview(null)}
            >
              Hapus Gambar
            </Button>
          )}
        </Box>

        {imagePreview && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Preview Gambar:
            </Typography>
            <img
              src={imagePreview}
              alt="Preview Produk"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </Box>
        )}

        {!imagePreview && (
          <>
            <div>Kotak Informasi Tambahan</div>
            <div style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
              Konten tambahan dapat ditampilkan di sini
            </div>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ProductImageDisplay
