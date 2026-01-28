import { Box, Button } from "@mui/material"
import { DarkMode, LightMode, Settings } from "@mui/icons-material"
import React, { type ReactNode, useState } from "react"
import Navigation from "~/components/ui/pos/Navigation"
import { useTheme } from "../common/ThemeProvider"
import SettingsForm from "../common/SettingsForm"

const ProtectedTemplate: React.FC<{
  children: ReactNode
  showSidebar?: boolean
}> = ({ children, showSidebar = true }) => {
  const { toggleTheme, theme } = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
  }

  return (
    <div className="protected-template flex">
      <div className="flex-1 w-full">
        <Box className="  px-4 py-2 shadow-md flex">
          <div className="pl-2 flex w-full">
            {showSidebar && <Navigation />}
            <div className="justify-between flex flex-row w-full">
              <h1 className="pt-3">B2B</h1>
              <div>
                <Button onClick={toggleTheme} variant="text" color="inherit">
                  {theme === "light" ? <DarkMode /> : <LightMode />}
                </Button>
                <Button onClick={toggleSettings} variant="text" color="inherit">
                  <Settings />
                </Button>
              </div>
            </div>
          </div>
        </Box>
        {children}
        <SettingsForm open={settingsOpen} onClose={toggleSettings} />
      </div>
    </div>
  )
}

export default ProtectedTemplate
