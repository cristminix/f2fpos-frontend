import React from 'react'

interface CategoryCardProps {
    title: string
    image?: string
    emoji?: string
    bgColor?: string
    onClick?: () => void
    className?: string
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
    title,
    image,
    emoji,
    bgColor = 'bg-gradient-to-br from-[#E4D5B7] to-[#D4B896]',
    onClick,
    className = ''
}) => {
    return (
        <button
            onClick={onClick}
            className={`${bgColor} rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 ${className}`}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                {/* Image or Emoji */}
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-white/50 flex items-center justify-center">
                    {image ? (
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-4xl md:text-5xl">{emoji || '📦'}</span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-[#3E2723] line-clamp-2">
                    {title}
                </h3>
            </div>
        </button>
    )
}
