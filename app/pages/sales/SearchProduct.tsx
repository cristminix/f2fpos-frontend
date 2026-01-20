import React, { useState } from "react"
import { TextField, InputAdornment, IconButton } from "@mui/material"
import { Search as SearchIcon, QrCode as QrCodeIcon } from "@mui/icons-material"

const SearchProduct: React.FC = () => {
  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleQrCodeClick = () => {
    // Fungsi untuk menangani klik ikon QR Code
    console.log("QR Code clicked")
  }

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Cari nama/SKU..."
      value={searchValue}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleQrCodeClick}>
              <QrCodeIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchProduct
