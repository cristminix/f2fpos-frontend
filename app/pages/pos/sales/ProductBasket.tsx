import React from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Chip,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PersonIcon from "@mui/icons-material/Person"
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen"
import PaymentsIcon from "@mui/icons-material/Payments"
import QrCode2Icon from "@mui/icons-material/QrCode2"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

interface ProductItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface ProductBasketProps {
  items?: ProductItem[]
  onRemoveItem?: (id: string) => void
  onUpdateQuantity?: (id: string, quantity: number) => void
  onDiscountChange?: (discount: number) => void
  onCheckout?: (discount?: number) => void
  onClearBasket?: () => void
}

const ProductBasket: React.FC<ProductBasketProps> = ({
  items = [],
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
  onDiscountChange = () => {},
  onCheckout = () => {},
  onClearBasket = () => {
    // Jika tidak ada fungsi onClearBasket yang disediakan, hapus semua item satu per satu
    items.forEach((item) => {
      onRemoveItem(item.id)
    })
  },
}) => {
  const [discountPercent, setDiscountPercent] = React.useState<number>(0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const discountAmount = totalPrice * (discountPercent / 100)
  const finalPrice = totalPrice - discountAmount

  const handleClearBasket = () => {
    onClearBasket()
  }

  const handleIncreaseQuantity = (id: string) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      onUpdateQuantity(id, item.quantity + 1)
    }
  }

  const handleDecreaseQuantity = (id: string) => {
    const item = items.find((i) => i.id === id)
    if (item && item.quantity > 1) {
      onUpdateQuantity(id, item.quantity - 1)
    }
  }

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <ShoppingCartIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Keranjang</Typography>
              <Chip
                label={`${totalItems}`}
                size="small"
                color="primary"
                variant="outlined"
                className="ml-2"
              />
            </Box>
            <Box>
              <IconButton
                onClick={handleClearBasket}
                color="error"
                size="small"
                title="Hapus Semua"
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        }
        sx={{}}
      />
      <CardContent
        sx={{ flexGrow: 1, p: 0, display: "flex", flexDirection: "column" }}
      >
        {items.length > 0 ? (
          <>
            <List
              sx={{
                flex: 1,
                overflow: "auto",
                maxHeight: "calc(100vh - 300px)",
              }}
            >
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={item.name}
                      secondary={`Rp ${item.price.toLocaleString("id-ID")}`}
                    />
                    <Box display="flex" alignItems="center" mr={2}>
                      <IconButton
                        size="small"
                        onClick={() => handleDecreaseQuantity(item.id)}
                        color="primary"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2" mx={1}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleIncreaseQuantity(item.id)}
                        color="primary"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onRemoveItem(item.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box p={2} borderTop="1px solid #e0e0e0">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                onClick={() => {}}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" alignItems="center">
                  <PersonIcon sx={{ mr: 1, color: "action.active" }} />
                  <Typography variant="body1">Pelanggan</Typography>
                </Box>
                <IconButton size="small" edge="end">
                  <Typography variant="body1">Umum</Typography>
                  <ChevronRightIcon />
                </IconButton>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                onClick={() => {}}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" alignItems="center">
                  <TableRestaurantIcon sx={{ mr: 1, color: "action.active" }} />
                  <Typography variant="body1">Meja</Typography>
                </Box>
                <IconButton size="small" edge="end">
                  <Typography variant="body1">Pilih Meja</Typography>
                  <ChevronRightIcon />
                </IconButton>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                onClick={() => {}}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" alignItems="center">
                  <Typography variant="body1">Diskon</Typography>
                </Box>
                <IconButton size="small" edge="end">
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                    value={discountPercent}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setDiscountPercent(value)
                      onDiscountChange(value)
                    }}
                    style={{
                      width: "60px",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "4px",
                      marginRight: "8px",
                    }}
                  />
                  <Typography variant="body1">%</Typography>
                </IconButton>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body1">
                  Diskon ({discountPercent}%):
                </Typography>
                <Typography variant="body1">
                  -Rp {discountAmount.toLocaleString("id-ID")}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  Rp {finalPrice.toLocaleString("id-ID")}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => onCheckout(discountPercent)}
                disabled={items.length === 0}
              >
                <SoupKitchenIcon sx={{ mr: 1 }} />
                Open Bill (DAPUR)
              </Button>
              <Box display="flex" gap={2} mt={2}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<PaymentsIcon />}
                  fullWidth
                  onClick={() => console.log("TUNAI clicked")}
                >
                  TUNAI
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<QrCode2Icon />}
                  fullWidth
                  onClick={() => console.log("QRIS clicked")}
                >
                  QRIS
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            p={3}
          >
            <ShoppingBagIcon
              sx={{ fontSize: 60, color: "action.active", mb: 2 }}
            />
            <Typography color="textSecondary" align="center">
              Keranjang belanja kosong.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductBasket
