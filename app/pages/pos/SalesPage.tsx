import React from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import SearchProduct from "./sales/SearchProduct"
import ProductTabView from "./sales/ProductTabView"
import ProductBasket from "./sales/ProductBasket"

interface ProductItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface Product {
  name: string
  price: string
  badge: string
  image?: string
}

const SalesPage: React.FC = () => {
  const [basketItems, setBasketItems] = React.useState<ProductItem[]>([])

  const handleRemoveItem = (id: string) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setBasketItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    )
  }

  const handleClearBasket = () => {
    setBasketItems([])
  }

  const handleAddToBasket = (product: Product) => {
    // Konversi harga dari string ke angka (misalnya: "Rp 25.000" -> 25000)
    const priceNumber = parseInt(product.price.replace(/[^\d]/g, ""), 10)

    // Cek apakah produk sudah ada di keranjang
    const existingItemIndex = basketItems.findIndex(
      (item) => item.name === product.name,
    )

    if (existingItemIndex >= 0) {
      // Jika sudah ada, tambahkan jumlahnya
      const updatedItems = [...basketItems]
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1,
      }
      setBasketItems(updatedItems)
    } else {
      // Jika belum ada, tambahkan sebagai item baru
      const newItem: ProductItem = {
        id: `${Date.now()}`, // ID unik berdasarkan timestamp
        name: product.name,
        price: priceNumber,
        quantity: 1,
        category: "General", // Kategori default, bisa dimodifikasi sesuai kebutuhan
      }
      setBasketItems([...basketItems, newItem])
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }} mt={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }} className="grid-item p-4">
          <SearchProduct />
          <ProductTabView onAddToBasket={handleAddToBasket} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} className="grid-item p-4">
          <ProductBasket
            items={basketItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onClearBasket={handleClearBasket}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SalesPage
