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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  const [selectedOutlet, setSelectedOutlet] = useState("")

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
    { text: "Laporan Shift", icon: <SummarizeIcon />, path: "/shift-report" },
    { text: "Master Produk", icon: <InventoryIcon />, path: "/master-product" },
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          /* backgroundImage: "url(https://cdn.quasar.dev/img/material.png)",*/
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: 120,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="https://i.pinimg.com/736x/c0/5b/a5/c05ba59a93d4e7ca51cafd2575a21b84.jpg"
            alt="Avatar"
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              mr: 2,
              border: (theme) =>
                `2px solid ${theme.palette.primary.contrastText}`,
              objectFit: "cover",
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ fontWeight: "bold" }}>Lisa</Box>
            <Box sx={{ fontSize: "small", opacity: 0.8 }}>Protected</Box>
          </Box>
        </Box>
        <Box sx={{ pt: 2, mt: 1 }} onClick={(e) => e.stopPropagation()}>
          <FormControl fullWidth size="small">
            <InputLabel id="outlet-select-label">Pilih Outlet</InputLabel>
            <Select
              labelId="outlet-select-label"
              value={selectedOutlet}
              label="Pilih Outlet"
              sx={{
                backgroundColor: "background.paper",
                minWidth: 120,
                color: "text.primary",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "divider",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.light",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
              onChange={(e) => setSelectedOutlet(e.target.value as string)}
            >
              <MenuItem value="cafe-senja" sx={{ color: "text.primary" }}>
                Cafe Senja
              </MenuItem>
              <MenuItem value="f2f-mart" sx={{ color: "text.primary" }}>
                F2F Mart
              </MenuItem>
              <MenuItem value="f2f-laundry" sx={{ color: "text.primary" }}>
                F2F Laundry
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "divider" }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            {item.path ? (
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{ color: "text.primary" }}
              >
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ color: "text.primary" }}
                />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => (window.location.href = "/logout")}
                sx={{ color: "text.primary" }}
              >
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ color: "text.primary" }}
                />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: "divider" }} />
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
