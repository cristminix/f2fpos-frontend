import React, { useState } from "react"
import { Link } from "react-router"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import PeopleIcon from "@mui/icons-material/People"
import GridOnIcon from "@mui/icons-material/GridOn"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import HistoryIcon from "@mui/icons-material/History"
import SummarizeIcon from "@mui/icons-material/Summarize"
import InventoryIcon from "@mui/icons-material/Inventory"
import CategoryIcon from "@mui/icons-material/Category"
import ScienceIcon from "@mui/icons-material/Science"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import RuleIcon from "@mui/icons-material/Rule"
import StoreIcon from "@mui/icons-material/Store"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import LogoutIcon from "@mui/icons-material/Logout"
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setIsOpen(open)
    }

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Sales", icon: <ShoppingCartIcon />, path: "/sales" },
    {
      text: "Riwayat Penjualan",
      icon: <HistoryIcon />,
      path: "/sales/history",
    },
    { text: "Laporan Shift", icon: <SummarizeIcon />, path: "/reports" },
    { text: "Master Produk", icon: <InventoryIcon />, path: "/inventory" },
    {
      text: "Master Kategori",
      icon: <CategoryIcon />,
      path: "/inventory/categories",
    },
    { text: "Master Bahan Baku", icon: <ScienceIcon />, path: "/ingredients" },
    {
      text: "Supplier",
      icon: <LocalShippingIcon />,
      path: "/procurement/suppliers",
    },
    {
      text: "Purchase Order",
      icon: <ReceiptLongIcon />,
      path: "/procurement/orders",
    },
    { text: "Penyesuaian Stok", icon: <RuleIcon />, path: "/stock-adjustment" },
    { text: "Outlet Saya", icon: <StoreIcon />, path: "/my-outlet" },
    { text: "Manajemen Staff", icon: <ManageAccountsIcon />, path: "/staff" },
    { text: "Laporan Owner", icon: <AnalyticsIcon />, path: "/owner/reports" },
    { text: "Logout", icon: <LogoutIcon />, path: null },
  ]

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            {item.path ? (
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => (window.location.href = "/logout")}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  )

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  )
}

export default Navigation
