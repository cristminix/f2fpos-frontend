import React, { useState } from "react"
import { Link } from "react-router"
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Divider, Box } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import PeopleIcon from "@mui/icons-material/People"
import GridOnIcon from "@mui/icons-material/GridOn"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return
    }

    setIsOpen(open)
  }

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Material Grid", icon: <GridOnIcon />, path: "/material-grid" },
    { text: "Logout", icon: <PowerSettingsNewIcon />, path: "/logout" },
  ]

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  )

  return (
    <>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  )
}

export default Navigation
