import React from 'react'
import { CategoryCard } from './CategoryCard'

interface PromoCategory {
    id: string
    title: string
    emoji: string
    bgColor: string
}

interface PromoGridProps {
    onCategoryClick?: (categoryId: string) => void
}

const promoCategories: PromoCategory[] = [
    {
        id: 'santapan-praktis',
        title: 'Santapan Praktis',
        emoji: '🍱',
        bgColor: 'bg-gradient-to-br from-rose-200 to-rose-300'
    },
    {
        id: 'refreshing-snack',
        title: 'Refreshing Snack',
        emoji: '🍿',
        bgColor: 'bg-gradient-to-br from-red-200 to-red-300'
    },
    {
        id: 'tinggal-disantapin',
        title: 'Tinggal Disantapin',
        emoji: '🍽️',
        bgColor: 'bg-gradient-to-br from-yellow-200 to-yellow-300'
    },
    {
        id: 'glowing-perawatan',
        title: 'Glowing Perawatan',
        emoji: '✨',
        bgColor: 'bg-gradient-to-br from-cyan-200 to-cyan-300'
    },
    {
        id: 'segar-bernutrisi',
        title: 'Segar & Bernutrisi',
        emoji: '🥗',
        bgColor: 'bg-gradient-to-br from-pink-200 to-pink-300'
    },
    {
        id: 'produk-beragam',
        title: 'Produk Beragam',
        emoji: '🛒',
        bgColor: 'bg-gradient-to-br from-green-200 to-green-300'
    }
]

export const PromoGrid: React.FC<PromoGridProps> = ({ onCategoryClick }) => {
    return (
        <section className="bg-white py-6">
            <div className="container mx-auto px-4">
                <h2 className="text-xl font-bold text-[#3E2723] mb-4">
                    BIG Banget Promo
                </h2>

                <div className="grid grid-cols-4 gap-4">
                    {promoCategories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            title={category.title}
                            emoji={category.emoji}
                            bgColor={category.bgColor}
                            onClick={() => onCategoryClick?.(category.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
