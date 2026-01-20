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
  onCheckout?: () => void
}

const ProductBasket: React.FC<ProductBasketProps> = ({
  items = [],
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
  onCheckout = () => {},
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

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
            <Typography variant="h6">Keranjang Belanja</Typography>
            <Chip
              label={`${totalItems} item`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        }
        sx={{ backgroundColor: "#f5f5f5" }}
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
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onCheckout}
                disabled={items.length === 0}
              >
                Checkout
              </Button>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            p={3}
          >
            <Typography color="textSecondary" align="center">
              Keranjang belanja kosong. Tambahkan produk untuk memulai.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductBasket
