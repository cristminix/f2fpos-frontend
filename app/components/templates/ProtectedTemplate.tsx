import { Box, Button } from "@mui/material"
import { DarkMode, LightMode } from "@mui/icons-material"
import React, { type ReactNode } from "react"
import Navigation from "~/components/ui/Navigation"
import { useTheme } from "../common/ThemeProvider"

const ProtectedTemplate: React.FC<{
  children: ReactNode
  showSidebar?: boolean
}> = ({ children, showSidebar = true }) => {
  const { toggleTheme, theme } = useTheme()

  return (
    <div className="protected-template flex">
      <div className="flex-1 w-full">
        <Box className="  px-4 py-2 shadow-md flex">
          <div className="pl-2 flex w-full">
            {showSidebar && <Navigation />}
            <div className="justify-between flex flex-row w-full">
              <h1 className="pt-3">F2F POS</h1>
              <Button onClick={toggleTheme} variant="text" color="inherit">
                {theme === "light" ? <DarkMode /> : <LightMode />}
              </Button>
            </div>
          </div>
        </Box>
        {children}
      </div>
    </div>
  )
}

export default ProtectedTemplate
