import React, { useState, useEffect } from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  TextField,
  Divider,
  IconButton,
  Typography,
  Button,
} from "@mui/material"
import { Settings, Close } from "@mui/icons-material"

interface SettingsFormProps {
  open: boolean
  onClose: () => void
}

const SettingsForm: React.FC<SettingsFormProps> = ({ open, onClose }) => {
  const [apiBaseUrl, setApiBaseUrl] = useState("")

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedApiBaseUrl = localStorage.getItem("apiBaseUrl")

    if (savedApiBaseUrl !== null) setApiBaseUrl(savedApiBaseUrl)
  }, [])

  const handleApiBaseUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setApiBaseUrl(event.target.value)
  }

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem("apiBaseUrl", apiBaseUrl)
    // Close the settings panel after saving
    onClose()
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 350,
          padding: 2,
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="div">
            <Settings sx={{ mr: 1, verticalAlign: "middle" }} />
            Settings
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem>
            <TextField
              fullWidth
              label="API Base URL"
              variant="outlined"
              value={apiBaseUrl}
              onChange={handleApiBaseUrlChange}
              margin="normal"
            />
          </ListItem>
          <ListItem>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Button onClick={handleSave} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default SettingsForm
