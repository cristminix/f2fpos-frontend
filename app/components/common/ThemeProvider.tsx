import React, { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material"
import { darkTheme, lightTheme } from "../../theme"

// Membuat context untuk tema
const ThemeContext = createContext({
  toggleTheme: () => {},
  theme: "light",
})

// Custom hook untuk menggunakan tema
export const useTheme = () => useContext(ThemeContext)

// Provider komponen untuk tema
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Fungsi untuk toggle antara tema terang dan gelap
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  // Menyimpan tema ke localStorage dan menerapkannya ke dokumen
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  // Memilih tema yang aktif
  const currentTheme = theme === "light" ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
