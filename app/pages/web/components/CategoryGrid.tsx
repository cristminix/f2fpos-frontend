import React, { useEffect, useState } from 'react'
import { CategoryCard } from './CategoryCard'
import { ProductCategoryService } from '~/services/ProductCategoryService'
import type { ProductCategory } from '~/types/product-category'

interface CategoryGridProps {
    onCategoryClick?: (categoryId: number) => void
}

// Default categories with emojis as fallback
const defaultCategories: any = [
]

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
    const [categories, setCategories] = useState<ProductCategory[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        try {
            const service = new ProductCategoryService()
            const response = await service.getList(1, 100) // Get up to 100 categories

            if (response.records && Array.isArray(response.records)) {
                setCategories(response.records)
            }
        } catch (error) {
            console.error('Failed to load categories:', error)
        } finally {
            setLoading(false)
        }
    }

    const getCategoryEmoji = (name: string, index: number): string => {
        // Try to match category name with default categories
        const match = defaultCategories.find(dc =>
            dc.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(dc.name.toLowerCase())
        )

        return match?.emoji || defaultCategories[index % defaultCategories.length]?.emoji || '📦'
    }

    const displayCategories = categories.length > 0
        ? categories
        : defaultCategories.map((cat, idx) => ({
            id: idx,
            name: cat.name,
            outletId: 0,
            timestamp: ''
        }))

    return (
        <section className="bg-gradient-to-b from-[#E4D5B7] to-white py-6">
            <div className="container mx-auto px-4">
                <h2 className="text-xl font-bold text-[#3E2723] mb-4 flex items-center gap-2">
                    Semua Kategori 🔥
                </h2>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D4C41]"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto pb-4 -mx-4 px-4">
                        <div className="grid grid-cols-4 gap-4">
                            {displayCategories.map((category, index) => (
                                <CategoryCard
                                    key={category.id}
                                    title={category.name}
                                    emoji={getCategoryEmoji(category.name, index)}
                                    bgColor="bg-gradient-to-br from-white to-[#F5E6D3] border border-[#C4A57B]"
                                    onClick={() => onCategoryClick?.(category.id)}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
