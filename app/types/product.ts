export interface Product {
  id: number
  name: string
  weight: number
  price: number
  description: string
  sku: string
  fileId: string
  categoryId?: number | null
}
